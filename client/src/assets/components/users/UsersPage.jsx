import { useEffect, useState } from 'react';
import UserController from '../../user/user.controller.js';
import AppAlert from '../common/AppAlert';

export default function UsersPage() {
  const empty = { id: null, fullName: '', email: '', phone: '' };

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(empty);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const load = async () => {
    setLoading(true);
    const res = await UserController.getAll();
    if (res?.success) setUsers(res.data || []);
    else setAlert({ type: 'danger', msg: res?.message || 'No se pudieron cargar los usuarios' });
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(empty); setShow(true); };
  const openEdit = (u) => { setForm(u); setShow(true); };
  const close = () => setShow(false);

  const save = async () => {
    const isUpdate = !!form.id;
    const res = isUpdate
      ? await UserController.update(form)
      : await UserController.create(form);

    if (res?.success) {
      setAlert({ type: 'success', msg: isUpdate ? 'Usuario actualizado exitosamente' : 'Usuario creado exitosamente' });
      close();
      load();
    } else {
      setAlert({ type: 'danger', msg: res?.message || 'Error al guardar el usuario' });
    }
  };

  const remove = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;
    const res = await UserController.remove(id);
    if (res?.success) {
      setAlert({ type: 'success', msg: 'Usuario eliminado exitosamente' });
      load();
    } else {
      setAlert({ type: 'danger', msg: res?.message || 'No se pudo eliminar el usuario' });
    }
  };

  const renderTableContent = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="5">
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <span>Cargando usuarios...</span>
            </div>
          </td>
        </tr>
      );
    }

    if (!users?.length) {
      return (
        <tr>
          <td colSpan="5">
            <div className="empty-state">
              <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>
                <h4>No hay usuarios registrados</h4>
                <p>Comienza agregando tu primer usuario al sistema</p>
              </div>
            </div>
          </td>
        </tr>
      );
    }

    return users.map((u) => (
      <tr key={u.id}>
        <td>
          <div className="id-badge">{u.id}</div>
        </td>
        <td>
          <div>
            <div style={{ fontWeight: '500' }}>{u.fullName}</div>
          </div>
        </td>
        <td>
          <div style={{ color: 'var(--text-secondary)' }}>{u.email}</div>
        </td>
        <td>
          <div style={{ color: 'var(--text-secondary)' }}>{u.phone}</div>
        </td>
        <td>
          <div className="d-flex gap-2">
            <button
              className="btn-modern btn-warning btn-sm"
              onClick={() => openEdit(u)}
            >
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar
            </button>
            <button
              className="btn-modern btn-danger btn-sm"
              onClick={() => remove(u.id)}
            >
              <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="main-container">
      {/* Header */}
      <div className="header-section">
        <div className="header-content">
          <div>
            <h1 className="header-title">Sistema de Gestión de Usuarios</h1>
            <p className="header-subtitle">
              Administra y organiza la información de usuarios del sistema
            </p>
          </div>
          <button className="btn-modern btn-primary" onClick={openNew}>
            <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nuevo Usuario
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="table-section">
        <AppAlert alert={alert} onClose={() => setAlert(null)} />

        <div className="table-container">
          <table className="table-modern">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>ID</th>
                <th>Nombre Completo</th>
                <th>Correo Electrónico</th>
                <th>Teléfono</th>
                <th style={{ width: '200px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {renderTableContent()}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {show && (
        <>
          <div className="modal-backdrop-modern" onClick={close}></div>
          <div className="modal-modern">
            <div className="modal-header-modern">
              <h2 className="modal-title-modern">
                <svg style={{ width: '1.5rem', height: '1.5rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {form.id ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
              </h2>
              <button className="modal-close" onClick={close}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="modal-body-modern">
              <form onSubmit={(e) => { e.preventDefault(); save(); }}>
                <div className="form-group">
                  <label className="form-label">
                    <svg style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Nombre Completo
                  </label>
                  <input
                    className="form-input"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Ingresa el nombre completo"
                    required
                    autoFocus
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    <svg style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ejemplo@dominio.com"
                    required
                  />
                </div>
                
                <div className="form-group mb-0">
                  <label className="form-label">
                    <svg style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Número de Teléfono
                  </label>
                  <input
                    className="form-input"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+52 777 123 4567"
                    required
                  />
                </div>
              </form>
            </div>
            
            <div className="modal-footer-modern">
              <button className="btn-modern btn-secondary" onClick={close}>
                <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancelar
              </button>
              <button className="btn-modern btn-success" onClick={save}>
                <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {form.id ? 'Actualizar Usuario' : 'Crear Usuario'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
