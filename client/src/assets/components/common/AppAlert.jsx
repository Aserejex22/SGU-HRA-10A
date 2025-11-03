export default function AppAlert({ alert, onClose }) {
  if (!alert?.msg) return null;

  const getIcon = () => {
    if (alert.type === 'success') {
      return (
        <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    if (alert.type === 'danger') {
      return (
        <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className={`alert-modern alert-${alert.type}`} role="alert">
      {getIcon()}
      <span>{alert.msg}</span>
      <button
        type="button"
        className="alert-close"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
