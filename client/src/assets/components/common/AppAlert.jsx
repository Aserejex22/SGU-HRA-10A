export default function AppAlert({ alert, onClose }) {
  if (!alert?.msg) return null;

  return (
    <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
      {alert.msg}
      <button
        type="button"
        className="btn-close"
        onClick={onClose}
        aria-label="Cerrar"
      ></button>
    </div>
  );
}
