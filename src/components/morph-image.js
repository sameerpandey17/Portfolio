/**
 * MorphImage — WebGL Noise-Dissolve Texture Transition
 * Vanilla JavaScript module for continuous scroll-driven image morphing.
 *
 * Features:
 * - Raw WebGL 1.0 / 2.0 with Simplex/FBM noise fragment shader
 * - Luminance-biased threshold dissolve (matches incoming image structure)
 * - Parallax drift between frames (u_drift)
 * - Aspect-ratio preserving coverUV mapping (matches CSS object-fit: cover)
 * - Prefers-reduced-motion detection (skips dissolve directly to target image)
 * - WebGL context lost & restored lifecycle handling
 * - Automatic ResizeObserver with devicePixelRatio scaling
 * - Idles when static to ensure zero GPU drain during normal reading
 */

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = (a_position + 1.0) * 0.5;
  v_uv.y = 1.0 - v_uv.y; // Match image top-to-bottom orientation
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SOURCE = `
precision mediump float;

varying vec2 v_uv;

uniform sampler2D u_texFrom;
uniform sampler2D u_texTo;
uniform float u_progress;
uniform float u_noiseScale;
uniform float u_edge;
uniform float u_drift;
uniform vec2 u_resolution;
uniform vec2 u_imageSizeFrom;
uniform vec2 u_imageSizeTo;
uniform vec3 u_edgeColor;

// 2D Simplex Noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,
                      0.366025403784439,
                     -0.577350269189626,
                      0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float f = 0.0;
  f += 0.5000 * snoise(p); p *= 2.02;
  f += 0.2500 * snoise(p); p *= 2.03;
  f += 0.1250 * snoise(p); p *= 2.01;
  f += 0.0625 * snoise(p);
  return f * 0.5 + 0.5;
}

vec2 getCoverUV(vec2 uv, vec2 canvasRes, vec2 imgRes) {
  float sCanvas = canvasRes.x / max(1.0, canvasRes.y);
  float sImage  = imgRes.x / max(1.0, imgRes.y);
  vec2 newUV = uv;
  if (sCanvas > sImage) {
    float scale = sImage / sCanvas;
    newUV.y = (uv.y - 0.5) * scale + 0.5;
  } else {
    float scale = sCanvas / sImage;
    newUV.x = (uv.x - 0.5) * scale + 0.5;
  }
  return newUV;
}

void main() {
  vec2 uv = v_uv;

  // Parallax drift between incoming and outgoing
  vec2 uvFrom = getCoverUV(uv + vec2(u_drift * u_progress * 0.04, 0.0), u_resolution, u_imageSizeFrom);
  vec2 uvTo   = getCoverUV(uv - vec2(u_drift * (1.0 - u_progress) * 0.04, 0.0), u_resolution, u_imageSizeTo);

  vec4 colFrom = texture2D(u_texFrom, uvFrom);
  vec4 colTo   = texture2D(u_texTo, uvTo);

  // Luminance bias of incoming target image
  float lum = dot(colTo.rgb, vec3(0.299, 0.587, 0.114));

  // Coarse FBM noise map
  float noise = fbm(uv * u_noiseScale);

  // Combined dissolve threshold
  float dissolveMap = mix(noise, lum, 0.32);

  // Threshold progression
  float t = u_progress * (1.0 + u_edge * 2.0) - u_edge;

  // Smoothstep dissolve mask
  float factor = smoothstep(t - u_edge, t + u_edge, dissolveMap);

  // Edge accent along the front
  float edgeDist = abs(dissolveMap - t);
  float edgeMask = smoothstep(u_edge, 0.0, edgeDist) * smoothstep(0.04, 0.96, u_progress);

  vec4 finalColor = mix(colTo, colFrom, factor);
  finalColor.rgb = mix(finalColor.rgb, u_edgeColor, edgeMask * 0.45);

  gl_FragColor = finalColor;
}
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile failed:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vsSource, fsSource) {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link failed:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export class MorphImage {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {string[]} images
   * @param {Object} options
   */
  constructor(canvas, images, options = {}) {
    this.canvas = canvas;
    this.imageUrls = images || [];
    this.options = {
      noiseScale: options.noiseScale ?? 2.8,  // Coarser tears suit flat illustration
      edge: options.edge ?? 0.2,             // Softer dissolve edge
      drift: options.drift ?? 0.25,          // Subtle drift between frames
      duration: options.duration ?? 850,     // Transition duration in ms
      edgeColor: options.edgeColor ?? [0.118, 0.227, 0.541], // Default #1E3A8A cobalt
      ...options,
    };

    this.currentIndex = 0;
    this.fromIndex = 0;
    this.toIndex = 0;
    this.progress = 1.0;
    this.isAnimating = false;
    this.rafId = null;

    this.loadedImages = [];
    this.textures = [];

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.initWebGL();
    this.loadAllImages().then(() => {
      this.render();
    });

    this.setupResizeObserver();
    this.setupContextHandling();
  }

  initWebGL() {
    this.gl = this.canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
    }) || this.canvas.getContext('experimental-webgl');

    if (!this.gl) {
      console.warn('WebGL not available; MorphImage will fallback to 2D canvas.');
      this.ctx2d = this.canvas.getContext('2d');
      return;
    }

    const gl = this.gl;
    this.program = createProgram(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE);
    if (!this.program) return;

    gl.useProgram(this.program);

    // Quad geometry: 2 triangles covering [-1, 1]
    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    this.posAttrib = gl.getAttribLocation(this.program, 'a_position');
    gl.enableVertexAttribArray(this.posAttrib);
    gl.vertexAttribPointer(this.posAttrib, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations cache
    this.uniforms = {
      u_texFrom: gl.getUniformLocation(this.program, 'u_texFrom'),
      u_texTo: gl.getUniformLocation(this.program, 'u_texTo'),
      u_progress: gl.getUniformLocation(this.program, 'u_progress'),
      u_noiseScale: gl.getUniformLocation(this.program, 'u_noiseScale'),
      u_edge: gl.getUniformLocation(this.program, 'u_edge'),
      u_drift: gl.getUniformLocation(this.program, 'u_drift'),
      u_resolution: gl.getUniformLocation(this.program, 'u_resolution'),
      u_imageSizeFrom: gl.getUniformLocation(this.program, 'u_imageSizeFrom'),
      u_imageSizeTo: gl.getUniformLocation(this.program, 'u_imageSizeTo'),
      u_edgeColor: gl.getUniformLocation(this.program, 'u_edgeColor'),
    };
  }

  async loadAllImages() {
    this.loadedImages = await Promise.all(
      this.imageUrls.map((url) => this.loadImage(url))
    );

    if (this.gl) {
      const gl = this.gl;
      this.textures = this.loadedImages.map((img) => this.createTexture(gl, img));
    }
  }

  loadImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => {
        console.warn(`MorphImage: Failed to load ${url}, generating solid fallback.`);
        const fallback = document.createElement('canvas');
        fallback.width = 1280;
        fallback.height = 720;
        const ctx = fallback.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#1E3A8A';
          ctx.fillRect(0, 0, 1280, 720);
        }
        resolve(fallback);
      };
      img.src = url;
    });
  }

  createTexture(gl, image) {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    return tex;
  }

  setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => {
      this.resize();
      this.render();
    });
    this.resizeObserver.observe(this.canvas);
    this.resize();
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round((rect.width || this.canvas.clientWidth || 800) * dpr));
    const height = Math.max(1, Math.round((rect.height || this.canvas.clientHeight || 500) * dpr));

    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
      if (this.gl) {
        this.gl.viewport(0, 0, width, height);
      }
    }
  }

  setupContextHandling() {
    this.onContextLost = (e) => {
      e.preventDefault();
      if (this.rafId) cancelAnimationFrame(this.rafId);
      this.isAnimating = false;
    };
    this.onContextRestored = () => {
      this.initWebGL();
      if (this.loadedImages.length > 0 && this.gl) {
        this.textures = this.loadedImages.map((img) => this.createTexture(this.gl, img));
      }
      this.render();
    };

    this.canvas.addEventListener('webglcontextlost', this.onContextLost);
    this.canvas.addEventListener('webglcontextrestored', this.onContextRestored);
  }

  /**
   * Transitions to the target image index
   * @param {number} targetIndex
   */
  goTo(targetIndex) {
    if (this.imageUrls.length === 0) return;
    const clamped = Math.max(0, Math.min(this.imageUrls.length - 1, targetIndex));
    if (clamped === this.currentIndex && !this.isAnimating) return;

    this.fromIndex = this.currentIndex;
    this.toIndex = clamped;
    this.currentIndex = clamped;

    if (this.reducedMotion) {
      this.progress = 1.0;
      this.render();
      return;
    }

    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.startTime = performance.now();
    this.isAnimating = true;

    const animate = (time) => {
      const elapsed = time - this.startTime;
      const rawProgress = Math.min(1.0, elapsed / this.options.duration);
      this.progress = easeInOutCubic(rawProgress);

      this.render();

      if (rawProgress < 1.0) {
        this.rafId = requestAnimationFrame(animate);
      } else {
        this.isAnimating = false;
        this.progress = 1.0;
        this.render();
      }
    };

    this.rafId = requestAnimationFrame(animate);
  }

  render() {
    // 2D Fallback
    if (!this.gl || !this.program) {
      if (this.ctx2d && this.loadedImages[this.currentIndex]) {
        const img = this.loadedImages[this.currentIndex];
        this.ctx2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx2d.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      }
      return;
    }

    const gl = this.gl;
    if (this.textures.length === 0) return;

    const texFrom = this.textures[this.fromIndex] || this.textures[0];
    const texTo = this.textures[this.toIndex] || this.textures[0];
    const imgFrom = this.loadedImages[this.fromIndex] || { width: 1280, height: 720 };
    const imgTo = this.loadedImages[this.toIndex] || { width: 1280, height: 720 };

    gl.useProgram(this.program);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texFrom);
    gl.uniform1i(this.uniforms.u_texFrom, 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texTo);
    gl.uniform1i(this.uniforms.u_texTo, 1);

    gl.uniform1f(this.uniforms.u_progress, this.progress);
    gl.uniform1f(this.uniforms.u_noiseScale, this.options.noiseScale);
    gl.uniform1f(this.uniforms.u_edge, this.options.edge);
    gl.uniform1f(this.uniforms.u_drift, this.options.drift);
    gl.uniform2f(this.uniforms.u_resolution, this.canvas.width, this.canvas.height);
    gl.uniform2f(this.uniforms.u_imageSizeFrom, imgFrom.width || 1280, imgFrom.height || 720);
    gl.uniform2f(this.uniforms.u_imageSizeTo, imgTo.width || 1280, imgTo.height || 720);
    gl.uniform3fv(this.uniforms.u_edgeColor, new Float32Array(this.options.edgeColor));

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.resizeObserver) this.resizeObserver.disconnect();

    if (this.canvas) {
      this.canvas.removeEventListener('webglcontextlost', this.onContextLost);
      this.canvas.removeEventListener('webglcontextrestored', this.onContextRestored);
    }

    if (this.gl) {
      const gl = this.gl;
      this.textures.forEach((tex) => gl.deleteTexture(tex));
      if (this.positionBuffer) gl.deleteBuffer(this.positionBuffer);
      if (this.program) gl.deleteProgram(this.program);
    }
    this.loadedImages = [];
    this.textures = [];
  }
}
