export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F7F4EE',
        color: '#151515',
        padding: '2rem',
        fontFamily: "'Inter Tight', -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: '480px',
          width: '100%',
          padding: '2.5rem',
          backgroundColor: '#FFFFFF',
          border: '1px solid #1E3A8A',
          boxShadow: '4px 4px 0 #1E3A8A',
          borderRadius: '4px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#FEE2E2',
            color: '#E5484D',
            marginBottom: '1.25rem',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h1
          style={{
            fontFamily: 'Fraunces, serif',
            fontSize: '2rem',
            fontWeight: 700,
            color: '#1E3A8A',
            margin: '0 0 0.5rem 0',
            letterSpacing: '-0.02em',
          }}
        >
          404 &mdash; Page Not Found
        </h1>

        <p
          style={{
            fontSize: '0.95rem',
            color: '#6B7280',
            lineHeight: 1.5,
            margin: '0 0 1.75rem 0',
          }}
        >
          The page you are looking for does not exist or has been relocated.
        </p>

        <a
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#1E3A8A',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: '3px',
            transition: 'background-color 0.15s ease',
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Return to Portfolio
        </a>
      </div>
    </main>
  );
}
