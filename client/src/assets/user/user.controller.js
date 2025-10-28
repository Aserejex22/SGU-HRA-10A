const UserController = {};
const ENV = import.meta.env;

// Ejemplo: http://localhost:8080/api/user
const API_URL = `http://${ENV.VITE_API_HOST}:${ENV.VITE_API_PORT}${ENV.VITE_API_BASE}`;

// Obtener todos los usuarios
UserController.getAll = async () => {
  try {
    const res = await fetch(`${API_URL}`, {
      method: 'GET',
      headers: { 
        'Accept': 'application/json' 
      },
    });

    if (!res.ok) {
      console.error('getAll: response not ok', res.status, await res.text());
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
};

// Obtener usuario por ID
UserController.getById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    const data = await res.json();
    console.log('Usuario:', data);
    return data;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
  }
};

// Crear usuario
UserController.create = async (user) => {
  try {
    const res = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log('Usuario creado:', data);
    return data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
};

// Actualizar usuario
UserController.update = async (user) => {
  try {
    const res = await fetch(`${API_URL}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log('Usuario actualizado:', data);
    return data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
  }
};

// Eliminar usuario
UserController.remove = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json' },
    });
    const data = await res.json();
    console.log('Usuario eliminado:', data);
    return data;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
  }
};

export default UserController;
