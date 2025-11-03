export default function AppAlert({ alert, onClose }) {
  if (!alert?.msg) return null;

  const alertType = alert.type === 'danger' ? 'error' : alert.type;
  
  return (
    <div className={`alert alert-${alertType}`} role="alert">
      {alert.type === 'success' ? '✅' : '⚠️'} {alert.msg}
    </div>
  );
}
