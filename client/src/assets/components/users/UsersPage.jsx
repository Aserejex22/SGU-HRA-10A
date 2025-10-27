import { useEffect, useState } from 'react';
import UserController from '../../user/user.controller.js';
import AppAlert from '../common/AppAlert';

export default function UsersPage() {
  const empty = { id: null, fullName: '', email: '', phone: '' };

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(empty);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null); // {type:'success'|'danger', msg:''}

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
      setAlert({ type: 'success', msg: isUpdate ? 'Usuario actualizado' : 'Usuario creado' });
      close();
      load();
    } else {
      setAlert({ type: 'danger', msg: res?.message || 'Error al guardar' });
    }
  };

  const remove = async (id) => {
    if (!confirm('¿Eliminar este usuario?')) return;
    const res = await UserController.remove(id);
    if (res?.success) {
      setAlert({ type: 'success', msg: 'Usuario eliminado' });
      load();
    } else {
      setAlert({ type: 'danger', msg: res?.message || 'No se pudo eliminar' });
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="m-0">Gestión de Usuarios</h3>
        <button className="btn btn-primary" onClick={openNew}>
          + Nuevo
        </button>
      </div>

      <AppAlert alert={alert} onClose={() => setAlert(null)} />

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: 80 }}>ID</th>
              <th>Nombre completo</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th style={{ width: 180 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Cargando...
                </td>
              </tr>
            ) : users?.length ? (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => openEdit(u)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => remove(u.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  Sin registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {show && (
        <>
          <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {form.id ? 'Editar usuario' : 'Nuevo usuario'}
                  </h5>
                  <button type="button" className="btn-close" onClick={close}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={(e) => { e.preventDefault(); save(); }}>
                    <div className="mb-3">
                      <label className="form-label">Nombre completo</label>
                      <input
                        className="form-control"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="Nombre(s) y apellidos"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Correo</label>
                      <input
                        type="email"
                        className="form-control"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="correo@dominio.com"
                        required
                      />
                    </div>
                    <div className="mb-0">
                      <label className="form-label">Teléfono</label>
                      <input
                        className="form-control"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+52 777 123 4567"
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={close}>
                    Cancelar
                  </button>
                  <button className="btn btn-success" onClick={save}>
                    {form.id ? 'Actualizar' : 'Guardar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}
