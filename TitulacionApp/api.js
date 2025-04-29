const BASE_API = 'http://127.0.0.1:8000'; // Cambia según la URL de tu backend Django

// Funciones para Carreras
export const getCarreras = async () => {
  try {
    const response = await fetch(`${BASE_API}/carreras/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching carreras:', error);
    throw error;
  }
};

export const createCarrera = async (carreraData) => {
  try {
    const response = await fetch(`${BASE_API}/carreras/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carreraData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating carrera:", error);
    throw error;
  }
};

export const updateCarrera = async (id, carreraData) => {
  try {
    const response = await fetch(`${BASE_API}/carreras/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carreraData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating carrera:", error);
    throw error;
  }
};

export const deleteCarrera = async (id) => {
  try {
    const response = await fetch(`${BASE_API}/carreras/${id}/`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting carrera:", error);
    throw error;
  }
};

// Funciones para Estudiantes
export const getEstudiantes = async () => {
  try {
    const response = await fetch(`${BASE_API}/estudiantes/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching estudiantes:', error);
    throw error;
  }
};

export const createEstudiante = async (estudianteData) => {
  try {
    const response = await fetch(`${BASE_API}/estudiantes/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(estudianteData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating estudiante:", error);
    throw error;
  }
};

export const updateEstudiante = async (id, estudianteData) => {
  try {
    const response = await fetch(`${BASE_API}/estudiantes/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(estudianteData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating estudiante:", error);
    throw error;
  }
};

export const deleteEstudiante = async (id) => {
  try {
    const response = await fetch(`${BASE_API}/estudiantes/${id}/`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting estudiante:", error);
    throw error;
  }
};

// Funciones para Profesores
export const getProfesores = async () => {
  try {
    const response = await fetch(`${BASE_API}/profesores/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching profesores:', error);
    throw error;
  }
};

export const createProfesor = async (profesorData) => {
  try {
    const response = await fetch(`${BASE_API}/profesores/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profesorData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating profesor:", error);
    throw error;
  }
};

export const updateProfesor = async (id, profesorData) => {
  try {
    const response = await fetch(`${BASE_API}/profesores/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profesorData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating profesor:", error);
    throw error;
  }
};

export const deleteProfesor = async (id) => {
  try {
    const response = await fetch(`${BASE_API}/profesores/${id}/`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting profesor:", error);
    throw error;
  }
};

// Funciones para Proyectos de Titulación
export const getProyectos = async () => {
  try {
    const response = await fetch(`${BASE_API}/proyectos/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching proyectos:', error);
    throw error;
  }
};

export const createProyecto = async (proyectoData) => {
  try {
    const response = await fetch(`${BASE_API}/proyectos/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(proyectoData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating proyecto:", error);
    throw error;
  }
};

export const updateProyecto = async (id, proyectoData) => {
  try {
    const response = await fetch(`${BASE_API}/proyectos/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(proyectoData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating proyecto:", error);
    throw error;
  }
};

export const deleteProyecto = async (id) => {
  try {
    const response = await fetch(`${BASE_API}/proyectos/${id}/`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting proyecto:", error);
    throw error;
  }
};

// Funciones para Evaluaciones
export const getEvaluaciones = async () => {
  try {
    const response = await fetch(`${BASE_API}/evaluaciones/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching evaluaciones:', error);
    throw error;
  }
};

export const createEvaluacion = async (evaluacionData) => {
  try {
    const response = await fetch(`${BASE_API}/evaluaciones/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(evaluacionData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating evaluacion:", error);
    throw error;
  }
};

export const updateEvaluacion = async (id, evaluacionData) => {
  try {
    const response = await fetch(`${BASE_API}/evaluaciones/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(evaluacionData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating evaluacion:", error);
    throw error;
  }
};

export const deleteEvaluacion = async (id) => {
  try {
    const response = await fetch(`${BASE_API}/evaluaciones/${id}/`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting evaluacion:", error);
    throw error;
  }
};

// Funciones para Documentos
export const getDocumentos = async () => {
  try {
    const response = await fetch(`${BASE_API}/documentos/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching documentos:', error);
    throw error;
  }
};

export const createDocumento = async (documentoData) => {
  try {
    const response = await fetch(`${BASE_API}/documentos/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(documentoData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating documento:", error);
    throw error;
  }
};

export const updateDocumento = async (id, documentoData) => {
  try {
    const response = await fetch(`${BASE_API}/documentos/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(documentoData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating documento:", error);
    throw error;
  }
};

export const deleteDocumento = async (id) => {
  try {
    const response = await fetch(`${BASE_API}/documentos/${id}/`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting documento:", error);
    throw error;
  }
};

// Funciones de autenticación
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${BASE_API}/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_API}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};