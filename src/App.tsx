import {
  type CSSProperties,
  type ReactNode,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import NotFound from '@/pages/not-found';
import {
  FRAME_COUNT,
  FRAME_HEIGHT,
  FRAME_PATH,
  FRAME_WIDTH,
  LAPTOP_RECT,
  PHOTO_OVERLAY,
  PHOTO_RECT,
  SCROLL_LENGTH,
  TITLE_RECT,
  TIMELINE,
  VIDEO_ASSETS,
  WATERMARK_COVER,
  ZOOM_END,
} from '@/config';
import { portfolioContent } from '@/content';
import { TagRow } from '@/components/tag-row';
import { SectionHeading } from '@/components/section-heading';
import { ScribbleLink } from '@/components/scribble-link';
import { HalftoneDivider } from '@/components/halftone-divider';
import { CustomCursor } from '@/components/custom-cursor';
import { AboutSection } from '@/components/about-section';
import { SkillsSection } from '@/components/skills-section';
import { ProjectsHorizontal } from '@/components/projects-horizontal';
import { Timeline } from '@/components/timeline';
import { WhatsNextSection } from '@/components/whats-next-section';
import { ContactSection } from '@/components/contact-section';
import { ChatWidget } from '@/components/chat-widget';
import { Route, Router as WouterRouter, Switch, useLocation } from 'wouter';

const queryClient = new QueryClient();
gsap.registerPlugin(ScrollTrigger);

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

/**
 * ChatbotWatermarkLauncher
 * Circular badge featuring the custom Robot Chatbot logo.
 * Permanently positioned at scroll progress 0–1 to 100% cover the Gemini 4-pointed
 * sparkle watermark baked into the video frames.
 * Clicking opens the interactive Sameer AI assistant.
 */
function ChatbotWatermarkLauncher({
  badgeRef,
  coords,
  onOpenChat,
}: {
  badgeRef?: RefObject<HTMLDivElement>;
  coords: { x: number; y: number; w: number; h: number };
  onOpenChat?: () => void;
}) {
  return (
    <div
      className="watermark-cover watermark-bot-launcher"
      ref={badgeRef}
      style={{
        left: `${coords.x}%`,
        top: `${coords.y}%`,
        width: `${coords.w}%`,
        height: `${coords.h}%`,
      }}
      onClick={onOpenChat}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenChat?.();
        }
      }}
      title="Ask Sameer AI Chatbot (Click to open)"
      aria-label="Open Sameer AI chatbot assistant"
    >
      <div className="watermark-bot-inner">
        <img
          src="/assets/chatbot-avatar.png"
          alt="Sameer AI Chatbot"
          className="watermark-bot-img"
        />
        <span className="watermark-bot-pulse" aria-hidden="true" />
      </div>
      <div className="watermark-bot-pill">
        <span className="bot-pill-dot" aria-hidden="true" />
        <span>Ask Sameer AI</span>
      </div>
    </div>
  );
}


/**
 * HeroLaptopScreen
 * Renders Sameer Pandey's workstation display inside the central laptop screen.
 * Integrates the hero eyebrow, editorial masthead, bio description,
 * and tech stack tags directly within the laptop viewport.
 */
function HeroLaptopScreen({
  coords,
  laptopRef,
  titleBlockRef,
}: {
  coords: { x: number; y: number; w: number; h: number };
  laptopRef?: React.RefObject<HTMLDivElement>;
  titleBlockRef?: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      ref={laptopRef}
      className="hero-laptop-screen"
      style={{
        left: `${coords.x}%`,
        top: `${coords.y}%`,
        width: `${coords.w}%`,
        height: `${coords.h}%`,
      }}
      aria-label="Sameer Pandey workstation interface"
    >
      {/* 1. TOP WINDOW STATUS BAR */}
      <div className="laptop-status-bar">
        <div className="laptop-window-controls" aria-hidden="true">
          <span className="window-dot dot-red" />
          <span className="window-dot dot-amber" />
          <span className="window-dot dot-green" />
          <span className="laptop-status-sep">/</span>
          <span className="laptop-status-label">SP // ARCHITECTURE & SYSTEMS</span>
        </div>
        <div className="laptop-status-right">
          <span className="laptop-live-dot" aria-hidden="true" />
          <span className="laptop-time-display">READY</span>
        </div>
      </div>

      {/* 2. LAPTOP SCREEN WORKSPACE & HERO STACK */}
      <div className="laptop-screen-content" ref={titleBlockRef}>


        {/* Eyebrow Pill */}
        <div className="title-row title-row-eyebrow">
          <div className="title-line-mask">
            <div className="laptop-eyebrow-pill title-line-inner">
              <span className="eyebrow-dot" aria-hidden="true" />
              <span>{portfolioContent.profile.eyebrow}</span>
            </div>
          </div>
        </div>

        {/* Editorial Masthead Heading */}
        <div className="title-row title-row-name">
          <div className="title-line-mask">
            <h1 className="laptop-name title-line-inner">
              {portfolioContent.profile.name}
            </h1>
          </div>
        </div>

        {/* Value Bio Description */}
        <div className="title-row title-row-value">
          <div className="title-line-mask">
            <p className="laptop-desc title-line-inner">
              {portfolioContent.profile.valueLine}
            </p>
          </div>
        </div>

        {/* Core Tech Stack Tags */}
        <div className="title-row title-row-tags">
          <div className="laptop-tag-row">
            {portfolioContent.heroTags.slice(0, 5).map((tag) => (
              <span key={tag} className="laptop-tag-pill hero-tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CinematicHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const introCopyRef = useRef<HTMLDivElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const watermarkCoverRef = useRef<HTMLDivElement>(null);
  const resumeHintRef = useRef<HTMLParagraphElement>(null);
  const frameIndexRef = useRef(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [frameFailed, setFrameFailed] = useState(false);
  const [loadPercent, setLoadPercent] = useState(4);
  const [stage, setStage] = useState({ left: 0, top: 0, width: 1, height: 1 });

  const debug = new URLSearchParams(window.location.search).get('debug') === '1';
  const [debugRect, setDebugRect] = useState<'laptop' | 'watermark'>('laptop');
  const [debugValues, setDebugValues] = useState({
    laptop: { ...LAPTOP_RECT },
    watermark: { ...WATERMARK_COVER },
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (debug) {
      document.body.classList.add('is-debug');
    } else {
      document.body.classList.remove('is-debug');
    }
    return () => {
      document.body.classList.remove('is-debug');
    };
  }, [debug]);

  // Pointer drag and resize handlers for calibration overlay
  const handlePointerDown = (
    e: React.PointerEvent,
    key: 'laptop' | 'watermark',
    isResize: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDebugRect(key);

    const startX = e.clientX;
    const startY = e.clientY;
    const initialValues = { ...debugValues[key] };

    const onPointerMove = (moveEvent: PointerEvent) => {
      const deltaPxX = moveEvent.clientX - startX;
      const deltaPxY = moveEvent.clientY - startY;

      const deltaPercentX = (deltaPxX / (stage.width || 1)) * 100;
      const deltaPercentY = (deltaPxY / (stage.height || 1)) * 100;

      setDebugValues((prev) => {
        const current = { ...prev[key] };
        if (isResize) {
          current.w = Math.max(1, Math.round((initialValues.w + deltaPercentX) * 10) / 10);
          current.h = Math.max(1, Math.round((initialValues.h + deltaPercentY) * 10) / 10);
        } else {
          current.x = Math.round((initialValues.x + deltaPercentX) * 10) / 10;
          current.y = Math.round((initialValues.y + deltaPercentY) * 10) / 10;
        }
        return { ...prev, [key]: current };
      });
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Keyboard nudge & resize controls
  useEffect(() => {
    if (!debug) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (['1', '2'].includes(event.key)) {
        const map: Record<string, 'laptop' | 'watermark'> = {
          '1': 'laptop',
          '2': 'watermark',
        };
        setDebugRect(map[event.key]);
        return;
      }
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const step = event.shiftKey ? 5 : 0.5;
      const isAlt = event.altKey;

      setDebugValues((prev) => {
        const next = { ...prev[debugRect] };
        if (isAlt) {
          // Resize mode with Alt + Arrow
          if (event.key === 'ArrowRight') next.w = Math.round((next.w + step) * 10) / 10;
          if (event.key === 'ArrowLeft') next.w = Math.max(1, Math.round((next.w - step) * 10) / 10);
          if (event.key === 'ArrowDown') next.h = Math.round((next.h + step) * 10) / 10;
          if (event.key === 'ArrowUp') next.h = Math.max(1, Math.round((next.h - step) * 10) / 10);
        } else {
          // Position move mode with Arrow keys
          if (event.key === 'ArrowUp') next.y = Math.round((next.y - step) * 10) / 10;
          if (event.key === 'ArrowDown') next.y = Math.round((next.y + step) * 10) / 10;
          if (event.key === 'ArrowLeft') next.x = Math.round((next.x - step) * 10) / 10;
          if (event.key === 'ArrowRight') next.x = Math.round((next.x + step) * 10) / 10;
        }
        return { ...prev, [debugRect]: next };
      });
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [debug, debugRect]);

  const handleFreezeDesk = () => {
    const st = ScrollTrigger.getById('hero-trigger') || ScrollTrigger.getAll()[0];
    if (st) {
      const deskY = st.start + (st.end - st.start) * 0.8;
      window.scrollTo(0, deskY);
      st.scroll(deskY);
    }
  };

  const handleCopyConfig = () => {
    const snippet = `// Generated via ?debug=1 Calibration Tool
export const LAPTOP_RECT = { x: ${debugValues.laptop.x}, y: ${debugValues.laptop.y}, w: ${debugValues.laptop.w}, h: ${debugValues.laptop.h} };
export const TITLE_RECT = LAPTOP_RECT;
export const WATERMARK_COVER = { x: ${debugValues.watermark.x}, y: ${debugValues.watermark.y}, w: ${debugValues.watermark.w}, h: ${debugValues.watermark.h} };`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(snippet).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      }).catch(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      });
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
    console.info('Config copied to clipboard:\n' + snippet);
  };

  const updateContentBox = () => {
    const hero = heroRef.current;
    if (!hero) return;
    const scale = Math.max(hero.clientWidth / FRAME_WIDTH, hero.clientHeight / FRAME_HEIGHT);
    const contentWidth = FRAME_WIDTH * scale;
    const contentHeight = FRAME_HEIGHT * scale;
    setStage({
      left: (hero.clientWidth - contentWidth) / 2,
      top: (hero.clientHeight - contentHeight) / 2,
      width: contentWidth,
      height: contentHeight,
    });
  };

  useEffect(() => {
    let cancelled = false;
    let loadedFrames = 0;
    const images = Array.from({ length: FRAME_COUNT }, (_, index) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = FRAME_PATH(index);
      image.onload = () => {
        if (cancelled) return;
        loadedFrames += 1;
        if (loadedFrames === 1) setLoadPercent(12);
        else if (loadedFrames % 8 === 0) setLoadPercent(Math.min(99, Math.round((loadedFrames / FRAME_COUNT) * 100)));
      };
      return image;
    });

    Promise.all(images.map((image) => new Promise<void>((resolve) => {
      image.onload = () => resolve();
      image.onerror = () => resolve();
    }))).then(() => {
      if (!cancelled) {
        setLoadPercent(100);
        setLoaded(true);
        window.setTimeout(() => ScrollTrigger.refresh(), 150);
      }
    });

    const timeout = window.setTimeout(() => {
      if (!cancelled) {
        setLoaded(true);
        window.setTimeout(() => ScrollTrigger.refresh(), 150);
      }
    }, 6000);

    updateContentBox();
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const scrollParam = new URLSearchParams(window.location.search).get('scroll');
    if (scrollParam && loaded) {
      const scrollY = Number(scrollParam);
      window.setTimeout(() => {
        window.scrollTo(0, scrollY);
        ScrollTrigger.refresh();
      }, 200);
    }
  }, [loaded]);

  useEffect(() => {
    const onResize = () => {
      updateContentBox();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const previousOverflow = document.documentElement.style.overflow;
    if (!loaded) document.documentElement.style.overflow = 'hidden';
    else {
      document.documentElement.style.overflow = previousOverflow;
      window.setTimeout(() => ScrollTrigger.refresh(), 0);
    }
    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [loaded]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;
    const lenis = new Lenis({
      autoRaf: false,
    });
    const onLenisScroll = () => ScrollTrigger.update();
    const onTick = (time: number) => lenis.raf(time * 1000);
    lenis.on('scroll', onLenisScroll);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const titleRows = titleBlockRef.current
      ? Array.from(titleBlockRef.current.querySelectorAll<HTMLElement>('.title-line-inner'))
      : [];
    const tagPills = titleBlockRef.current
      ? Array.from(titleBlockRef.current.querySelectorAll<HTMLElement>('.hero-tag-pill'))
      : [];

    const timeline = gsap.timeline({
      scrollTrigger: {
        id: 'hero-trigger',
        trigger: hero,
        start: 'top top',
        end: SCROLL_LENGTH,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const nextProgress = self.progress;
          const zoomProgress = clamp(nextProgress / ZOOM_END);
          const nextFrame = Math.round(zoomProgress * (FRAME_COUNT - 1));
          if (nextFrame !== frameIndexRef.current) {
            frameIndexRef.current = nextFrame;
            setFrameIndex(nextFrame);
          }

          // Direct DOM opacity control on laptop screen
          if (laptopRef.current && !debug) {
            const laptopOpacity = clamp((nextProgress - 0.58) / 0.10, 0, 1);
            laptopRef.current.style.opacity = `${laptopOpacity}`;
            laptopRef.current.style.pointerEvents = laptopOpacity > 0.5 ? 'auto' : 'none';
          }

          const isUnpinned = nextProgress >= 0.995;
          document.body.classList.toggle('hero-unpinned', isUnpinned);
          const nav = document.querySelector('.site-nav');
          if (nav) {
            nav.classList.toggle('has-brand', isUnpinned);
            nav.classList.toggle('is-scrolled', isUnpinned);
          }
        },
        onLeave: () => {
          document.body.classList.add('hero-unpinned');
          const nav = document.querySelector('.site-nav');
          if (nav) {
            nav.classList.add('has-brand', 'is-scrolled');
          }
          if (laptopRef.current && !debug) {
            laptopRef.current.style.opacity = '1';
            laptopRef.current.style.pointerEvents = 'auto';
          }
        },
        onEnterBack: () => {
          document.body.classList.remove('hero-unpinned');
          const nav = document.querySelector('.site-nav');
          if (nav) {
            nav.classList.remove('has-brand', 'is-scrolled');
          }
        },
        onRefresh: (self) => {
          const isUnpinned = self.progress >= 0.995;
          document.body.classList.toggle('hero-unpinned', isUnpinned);
          const nav = document.querySelector('.site-nav');
          if (nav) {
            nav.classList.toggle('has-brand', isUnpinned);
            nav.classList.toggle('is-scrolled', isUnpinned);
          }
          if (laptopRef.current && !debug) {
            const laptopOpacity = clamp((self.progress - 0.58) / 0.10, 0, 1);
            laptopRef.current.style.opacity = `${laptopOpacity}`;
            laptopRef.current.style.pointerEvents = laptopOpacity > 0.5 ? 'auto' : 'none';
          }
        },
      },
    });

    timeline
      .to(introCopyRef.current, {
        opacity: 0,
        y: -32,
        ease: 'none',
        duration: TIMELINE.introFadeOut[1] - TIMELINE.introFadeOut[0],
      }, TIMELINE.introFadeOut[0])
      .fromTo(titleBlockRef.current, { opacity: 0 }, {
        opacity: 1,
        ease: 'power2.out',
        duration: TIMELINE.titleIn[1] - TIMELINE.titleIn[0],
      }, TIMELINE.titleIn[0])
      .fromTo(titleRows, { yPercent: 110, opacity: 0 }, {
        yPercent: 0,
        opacity: 1,
        ease: 'power3.out',
        duration: TIMELINE.titleIn[1] - TIMELINE.titleIn[0],
        stagger: 0.025,
      }, TIMELINE.titleIn[0])
      .fromTo(tagPills, { opacity: 0, scale: 0.85, y: 6 }, {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: 'back.out(1.5)',
        duration: 0.08,
        stagger: 0.012,
      }, TIMELINE.titleIn[0] + 0.04)
      .fromTo(watermarkCoverRef.current, { scale: 1 }, {
        scale: 1.08,
        repeat: 1,
        yoyo: true,
        ease: 'power2.out',
        duration: TIMELINE.hintIn[1] - TIMELINE.hintIn[0],
      }, TIMELINE.hintIn[0])
      .fromTo(resumeHintRef.current, { opacity: 0, y: 12, xPercent: -50 }, {
        opacity: 1,
        y: 0,
        xPercent: -50,
        ease: 'power2.out',
        duration: TIMELINE.hintIn[1] - TIMELINE.hintIn[0],
      }, TIMELINE.hintIn[0])
      .to({}, { duration: 0 }, 1); // Exact 1.0 timeline anchor

    window.setTimeout(() => ScrollTrigger.refresh(), 120);

    const progressParam = new URLSearchParams(window.location.search).get('progress');
    if (progressParam) {
      const p = parseFloat(progressParam);
      window.setTimeout(() => {
        const st = timeline.scrollTrigger;
        if (st) {
          const targetY = st.start + (st.end - st.start) * p;
          window.scrollTo(0, targetY);
          st.scroll(targetY);
        }
        timeline.progress(p);
        setProgress(p);
        const zProgress = clamp(p / ZOOM_END);
        const targetFrame = Math.round(zProgress * (FRAME_COUNT - 1));
        frameIndexRef.current = targetFrame;
        setFrameIndex(targetFrame);
      }, 100);
    }

    return () => {
      document.body.classList.remove('hero-unpinned');
      timeline.scrollTrigger?.kill(true);
      timeline.kill();
      lenis.off('scroll', onLenisScroll);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  const stageStyle = useMemo<CSSProperties>(() => ({
    left: stage.left,
    top: stage.top,
    width: stage.width,
    height: stage.height,
  }), [stage]);

  const phase = progress < ZOOM_END ? 'ZOOM' : 'HOLD';
  const activeLaptop = debug ? debugValues.laptop : LAPTOP_RECT;
  const activeWatermark = debug ? debugValues.watermark : WATERMARK_COVER;

  return (
    <section className="hero-scroll" ref={heroRef} aria-label="Cinematic portfolio introduction">
      <div className="hero-pin">

        {frameFailed ? (
          <div className="room-fallback" aria-label="Illustrated room fallback">
            <img src={VIDEO_ASSETS.fallback} alt="" />
          </div>
        ) : (
          <img
            className="hero-frame"
            src={FRAME_PATH(frameIndex)}
            alt=""
            aria-hidden="true"
            onError={() => setFrameFailed(true)}
          />
        )}

        {/* Initial wide-room intro text */}
        <div className="intro-copy" ref={introCopyRef}>
          <span className="intro-eyebrow">AI / FULL-STACK / SYSTEMS</span>
          <h1 className="intro-title">{portfolioContent.profile.name}</h1>
          <div className="scroll-cue" aria-hidden="true">
            <span>Scroll to enter</span>
            <span className="scroll-cue-line" />
          </div>
        </div>

        <div className="covered-stage" style={stageStyle}>
          {/* Desk Laptop Screen (Hosting Sameer's Masthead, Eyebrow, Bio & Tech Stack) */}
          <HeroLaptopScreen
            coords={activeLaptop}
            laptopRef={laptopRef}
            titleBlockRef={titleBlockRef}
          />

          {/* Chatbot Robot Logo Launcher (Permanently covers Gemini watermark) */}
          <ChatbotWatermarkLauncher
            badgeRef={watermarkCoverRef}
            coords={activeWatermark}
            onOpenChat={() => window.dispatchEvent(new CustomEvent('open-sameer-chat'))}
          />

          {/* Interactive Debug Calibration Overlay */}
          {debug && (
            <>
              {/* 1. LAPTOP_RECT (SCREEN & HERO CONTENT) */}
              <div
                className={`debug-rect-interactive type-laptop ${debugRect === 'laptop' ? 'is-selected' : ''}`}
                style={{
                  left: `${activeLaptop.x}%`,
                  top: `${activeLaptop.y}%`,
                  width: `${activeLaptop.w}%`,
                  height: `${activeLaptop.h}%`,
                }}
                onPointerDown={(e) => handlePointerDown(e, 'laptop', false)}
              >
                <div className="debug-rect-badge">
                  <span>[1] LAPTOP (HERO SCREEN)</span>
                  <span>x:{activeLaptop.x}% y:{activeLaptop.y}%</span>
                </div>
                <div
                  className="debug-rect-handle"
                  title="Drag to resize laptop screen"
                  onPointerDown={(e) => handlePointerDown(e, 'laptop', true)}
                />
              </div>

              {/* 2. WATERMARK_COVER */}
              <div
                className={`debug-rect-interactive type-watermark ${debugRect === 'watermark' ? 'is-selected' : ''}`}
                style={{
                  left: `${activeWatermark.x}%`,
                  top: `${activeWatermark.y}%`,
                  width: `${activeWatermark.w}%`,
                  height: `${activeWatermark.h}%`,
                }}
                onPointerDown={(e) => handlePointerDown(e, 'watermark', false)}
              >
                <div className="debug-rect-badge">
                  <span>[2] WATERMARK (CHATBOT LOGO)</span>
                  <span>x:{activeWatermark.x}% y:{activeWatermark.y}%</span>
                </div>
                <div
                  className="debug-rect-handle"
                  title="Drag to resize badge"
                  onPointerDown={(e) => handlePointerDown(e, 'watermark', true)}
                />
              </div>
            </>
          )}
        </div>

        {/* Floating Debug Control Panel */}
        {debug && (
          <div className="debug-panel-card" role="region" aria-label="Hero Calibration Tool">
            <div className="debug-panel-head">
              <span className="debug-panel-title">HERO CALIBRATION // ?debug=1</span>
              <span className="debug-panel-status">
                {phase} · {(progress * 100).toFixed(0)}%
              </span>
            </div>

            <div className="debug-panel-targets">
              <button
                type="button"
                className={`debug-target-btn type-laptop ${debugRect === 'laptop' ? 'is-active' : ''}`}
                onClick={() => setDebugRect('laptop')}
              >
                [1] Laptop Screen
              </button>
              <button
                type="button"
                className={`debug-target-btn type-watermark ${debugRect === 'watermark' ? 'is-active' : ''}`}
                onClick={() => setDebugRect('watermark')}
              >
                [2] Badge
              </button>
            </div>

            <div className="debug-panel-coords">
              <b>{debugRect.toUpperCase()}</b>: x: {debugValues[debugRect].x}% · y: {debugValues[debugRect].y}% · w: {debugValues[debugRect].w}% · h: {debugValues[debugRect].h}%
            </div>

            <div className="debug-panel-actions">
              <button
                type="button"
                className="debug-action-btn"
                title="Snap camera to the desk hold view where all items are fully in frame"
                onClick={handleFreezeDesk}
              >
                Freeze Desk
              </button>
              <button
                type="button"
                className={`debug-action-btn btn-copy ${copied ? 'is-copied' : ''}`}
                title="Copy all calibrated rect values to clipboard as TypeScript code"
                onClick={handleCopyConfig}
              >
                {copied ? '✓ Copied!' : 'Copy Config'}
              </button>
            </div>

            <div className="debug-panel-hints">
              Drag boxes or bottom-right handles · Keys 1-4 switch · Arrows nudge (Shift=5%) · Alt+Arrows resize
            </div>
          </div>
        )}

        <p className="resume-hint" ref={resumeHintRef}>
          Keep scrolling <span aria-hidden="true">↓</span>
        </p>

        {/* Loading overlay with Monogram */}
        <div className={`loader${loaded ? ' is-hidden' : ''}`} aria-live="polite">
          <div className="loader-inner">
            <div className="loader-brand">
              <span className="loader-title font-display">SAMEER PANDEY</span>
            </div>
            <div className="loader-label">
              <span>Loading the frames</span>
              <span>{loadPercent}%</span>
            </div>
            <div className="loader-bar">
              <div className="loader-progress" style={{ width: `${loadPercent}%` }} />
            </div>
            <p className="loader-foot">High-definition 24fps camera scrub.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteNav() {
  return (
    <header className="site-nav" aria-label="Main site navigation">
      <div className="site-brand">
        <a className="site-mark" href="#hero" aria-label="Sameer Pandey Home">
          <span className="site-mark-name">{portfolioContent.profile.name}</span>
        </a>
      </div>

      <nav className="site-nav-links" aria-label="Primary navigation">
        <ScribbleLink href="#about">About</ScribbleLink>
        <ScribbleLink href="#skills">Skills</ScribbleLink>
        <ScribbleLink href="#projects">Projects</ScribbleLink>
        <ScribbleLink href="#achievements">Timeline</ScribbleLink>
        <ScribbleLink href="#contact">Contact</ScribbleLink>
      </nav>

      <div className="site-nav-telemetry" aria-label="Location: Pune, India (UTC +5:30)">
        <span className="telemetry-glyph" aria-hidden="true">
          <svg className="telemetry-reticle" viewBox="0 0 14 14" width="12" height="12" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
            <circle cx="7" cy="7" r="1.5" fill="currentColor" />
            <path d="M7 0.5V2.5M7 11.5V13.5M0.5 7H2.5M11.5 7H13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </span>
        <span className="telemetry-prefix">LOC //</span>
        <span className="telemetry-val">Pune, India</span>
        <span className="telemetry-sep" aria-hidden="true">·</span>
        <span className="telemetry-tz" aria-hidden="true">UTC+5:30</span>
      </div>
    </header>
  );
}

function Home() {
  return (
    <>
      <CustomCursor />
      <SiteNav />
      <main className="portfolio-page">
        <div className="hero-scroll-wrapper">
          <CinematicHero />
        </div>

        {/* ── 02 ABOUT SECTION ────────────────────────────────────────────── */}
        <HalftoneDivider />
        <AboutSection />

        {/* ── 03 SKILLS SECTION ────────────────────────────────────────────── */}
        <HalftoneDivider />
        <SkillsSection categories={portfolioContent.skills} />

        {/* ── 04 PROJECTS SECTION (Horizontal Pinning Centerpiece) ─────────── */}
        <HalftoneDivider />
        <div className="projects-scroll-wrapper">
          <ProjectsHorizontal projects={portfolioContent.projects} />
        </div>

        {/* ── 05 ACHIEVEMENTS SECTION (Progressive Timeline) ───────────────── */}
        <HalftoneDivider />
        <section className="site-section section-achievements" id="achievements" aria-labelledby="achievements-heading">
          <div className="section-container">
            <SectionHeading
              number="05"
              kicker="Milestones & Path"
              title="Honors, Education & Trajectory"
              subtitle="Verified milestones from competitive hackathons, high-distinction academic performance, and foundational computer science study."
              id="achievements-heading"
            />
            <Timeline items={portfolioContent.achievements} />
          </div>
        </section>

        {/* ── 06 WHAT'S NEXT SECTION ───────────────────────────────────────── */}
        <HalftoneDivider />
        <WhatsNextSection items={portfolioContent.whatsNext} />

        {/* ── 07 CONTACT SECTION ───────────────────────────────────────────── */}
        <HalftoneDivider />
        <ContactSection />
      </main>
      {/* ── INTERACTIVE CHATBOT (LAYER 1 INSTANT Q&A + LAYER 2 GROQ LLM FALLBACK) ── */}
      <ChatWidget />
    </>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;