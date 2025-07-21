// ==========================================================
// BASE DE DATOS SIMULADA EN EL NAVEGADOR (localStorage para persistencia básica)
// IMPORTANTE: Para una aplicación real, esto se manejaría con un servidor seguro
//             y una base de datos real, NO con localStorage.
// ==========================================================

// --- Advertencia de Seguridad Importante ---
// El almacenamiento de contraseñas y otros datos sensibles directamente en localStorage
// NO ES SEGURO y es solo para fines de SIMULACIÓN.
// En una aplicación real, las contraseñas DEBEN ser hasheadas (ej. con bcrypt) y
// almacenadas en una base de datos segura en el servidor, nunca en texto plano
// ni accesibles directamente desde el cliente.
// Otros datos sensibles (cuentas bancarias, contactos de emergencia) también
// deben ser protegidos con cifrado y almacenado de forma segura en el servidor.
// Esta simulación NO IMPLEMENTA SEGURIDAD REAL de datos.
// --- Fin de Advertencia ---

// Cargar datos al inicio o inicializar si no existen
// `usuariosRegistrados`: Almacena información de todos los usuarios (admin, hiring, empresa, candidato, contratado).
let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || {
    "admin01": { tipo: "admin", clave: "admin123", permisoAdmin: true, nombreCompleto: "Administrador Principal" }, // Clave en texto plano: INSEGURO
    "hiringuser": { tipo: "hiring", clave: "hiring123", permisoAdmin: false, nombreCompleto: "Usuario Hiring Group" }, // Clave en texto plano: INSEGURO
    "empresa23": { tipo: "empresa", clave: "emp456", permisoAdmin: false, nombreEmpresa: "Empresas Contratistas S.A.", sector: "Tecnología", contacto: "Juan Pérez" },
    "candidatoA": { tipo: "candidato", clave: "cand789", permisoAdmin: false, nombreCompleto: "Ana García", correo: "ana.g@email.com", profesion: "Desarrollador Web", universidad: "UNEG", experiencias: [], postulaciones: [], recibosNomina: [], constanciasEmitidas: [] },
    "contratadoB": { // Se actualizó esta entrada para incluir campos de contratación
        tipo: "contratado",
        clave: "contra001",
        permisoAdmin: false,
        nombreCompleto: "Carlos López",
        salarioMensual: 900,
        tipoSangre: "O+",
        contactoEmergencia: "María López",
        telEmergencia: "0414-1234567",
        nroCuenta: "0001-0002-03-0405060708",
        banco: "Banco de Venezuela",
        recibosNomina: [], // Ahora es recibosNomina
        constanciasEmitidas: [], // Nuevo campo para constancias
        fechaContratacion: "01/01/2024", // Fecha de contratación de ejemplo
        puestoContratado: "Desarrollador Frontend", // Puesto contratado de ejemplo
        empresaContratante: "empresa23" // Clave de la empresa contratante de ejemplo
    }
};
// `empresasRegistradas`: Almacena detalles específicos de las empresas clientes.
let empresasRegistradas = JSON.parse(localStorage.getItem("empresasRegistradas")) ||
{
    "empresa23": { nombre: "Empresas Contratistas S.A.", sector: "Tecnología", contacto: "Juan Pérez", usuarioRH: "rhempr23", claveRH: "rh456" }
};
// `ofertasPublicadas`: Almacena todas las ofertas de trabajo publicadas por las empresas.
let ofertasPublicadas = JSON.parse(localStorage.getItem("ofertasPublicadas")) ||
[
    { id: 1, empresa: "empresa23", titulo: "Desarrollador Frontend", descripcion: "Experiencia en React y Vue.js", salario: 1200, profesion: "Desarrollador Web", cargo: "Desarrollador Frontend", estatus: "activa", postulaciones: [] },
    { id: 2, empresa: "empresa23", titulo: "Analista de Datos Jr.", descripcion: "Conocimientos en SQL y Python", salario: 950, profesion: "Analista de Datos", cargo: "Analista de Datos", estatus: "activa", postulaciones: [] }
];
// `contratacionesRealizadas`: Registra las contrataciones efectivas de candidatos.
let contratacionesRealizadas = JSON.parse(localStorage.getItem("contratacionesRealizadas")) || [];
// `bancos`: Lista de bancos disponibles en el sistema.
let bancos = JSON.parse(localStorage.getItem("bancos")) || ["Banco de Venezuela", "Banco Provincial", "Banesco"];

/**
 * Guarda todos los datos principales (usuarios, empresas, ofertas, contrataciones, bancos) en localStorage.
 * Esta función simula la persistencia de datos en una base de datos real.
 */
function guardarDatos() {
    localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));
    localStorage.setItem("empresasRegistradas", JSON.stringify(empresasRegistradas));
    localStorage.setItem("ofertasPublicadas", JSON.stringify(ofertasPublicadas));
    localStorage.setItem("contratacionesRealizadas", JSON.stringify(contratacionesRealizadas));
    localStorage.setItem("bancos", JSON.stringify(bancos));
}

// ==========================================================
// FUNCIONES DE AUTENTICACIÓN Y REGISTRO
// ==========================================================

/**
 * Simula el inicio de sesión de un usuario.
 * Obtiene el usuario y la clave de los elementos del DOM con IDs 'usuario' y 'clave'.
 * Redirige al usuario al menú principal si las credenciales son correctas.
 * @returns {boolean} - true si el inicio de sesión fue exitoso, false de lo contrario.
 */
function iniciarSesion() {
    const usuario = document.getElementById('usuario').value;
    const clave = document.getElementById('clave').value;

    const user = usuariosRegistrados[usuario];
    if (user && user.clave === clave) {
        localStorage.setItem('usuarioActivo', usuario);
        // Mostrar mensaje de bienvenida
        alert(`¡Bienvenido, ${user.nombreCompleto || user.usuario}! Has iniciado sesión como ${user.tipo}.`);
        // Redirigir SIEMPRE al menú principal (index.html) después de un login exitoso
        window.location.href = "index.html"; 
        return true;
    } else {
        alert("Usuario o contraseña incorrectos.");
        return false;
    }
}

/**
 * Obtiene la información del usuario que está actualmente logueado.
 * @returns {object|null} - El objeto del usuario activo o null si no hay nadie logueado.
 */
function obtenerUsuarioActivo() {
    const usuario = localStorage.getItem("usuarioActivo");
    return usuariosRegistrados[usuario] || null;
}

/**
 * Cierra la sesión del usuario actual.
 */
function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    alert("Sesión cerrada.");
    window.location.href = "index.html"; // Redirige a la página de inicio.
}

/**
 * Registra un nuevo usuario en el sistema.
 * @param {string} nuevoUsuario - El nombre de usuario a registrar.
 * @param {string} tipo - El tipo de usuario (ej. "candidato", "empresa").
 * @param {string} clave - La contraseña (en esta simulación, en texto plano).
 * @param {object} datosAdicionales - Un objeto con datos específicos del tipo de usuario.
 * @returns {boolean} - true si el registro fue exitoso, false si el usuario ya existe o la clave es débil.
 */
function registrarUsuario(nuevoUsuario, tipo, clave, datosAdicionales = {}) {
    if (usuariosRegistrados[nuevoUsuario]) {
        alert("Este usuario ya existe.");
        return false;
    }

    // Medida de seguridad básica (validación de contraseña):
    // En una app real, se aplicarían políticas de contraseñas fuertes (longitud, caracteres especiales, etc.).
    if (clave.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return false;
    }
    // Se podría añadir validación para el formato del correo electrónico si está en datosAdicionales.correo
    if (datosAdicionales.correo && !/\S+@\S+\.\S+/.test(datosAdicionales.correo)) {
        alert("Por favor, introduce un correo electrónico válido.");
        return false;
    }

    usuariosRegistrados[nuevoUsuario] = {
        tipo: tipo,
        clave: clave, // ¡Recuerda la advertencia de seguridad sobre contraseñas en texto plano!
        permisoAdmin: false, // Solo el admin puede asignar esto explícitamente
        ...datosAdicionales
    };
    guardarDatos();
    alert(`${tipo} registrado exitosamente: ${nuevoUsuario}`);
    return true;
}

// ==========================================================
// FUNCIONES ESPECÍFICAS DE USUARIO HIRING GROUP (Administrador del sistema)
// ==========================================================

/**
 * Crea el perfil de una nueva empresa cliente.
 * Solo accesible por usuarios 'hiring'.
 * @param {string} nombreUsuario - El nombre de usuario para la empresa.
 * @param {string} nombreEmpresa - El nombre comercial de la empresa.
 * @param {string} sector - El sector industrial de la empresa.
 * @param {string} contacto - Nombre de la persona de contacto en la empresa.
 * @param {string} usuarioRH - Usuario para el acceso del personal de RRHH de la empresa.
 * @param {string} claveRH - Contraseña para el usuario RH (en texto plano: INSEGURO).
 * @returns {boolean} - true si la empresa fue creada, false de lo contrario.
 */
function crearEmpresa(nombreUsuario, nombreEmpresa, sector, contacto, usuarioRH, claveRH) {
    const actual = obtenerUsuarioActivo();
    if (actual?.tipo !== "hiring") {
        alert("Acceso denegado. Solo usuarios de Hiring Group pueden registrar empresas.");
        return false;
    }
    if (empresasRegistradas[nombreUsuario]) {
        alert("Ya existe una empresa con este nombre de usuario.");
        return false;
    }
    if (usuariosRegistrados[usuarioRH]) {
        alert("Ya existe un usuario RH con este nombre. Elija otro.");
        return false;
    }

    empresasRegistradas[nombreUsuario] = {
        nombre: nombreEmpresa,
        sector: sector,
        contacto: contacto,
        usuarioRH: usuarioRH,
        claveRH: claveRH // Almacenado en texto plano: INSEGURO
    };
    // También registramos un usuario de tipo 'empresa' para el RH de la empresa.
    // Aquí la clave también se guarda en texto plano.
    registrarUsuario(usuarioRH, "empresa", claveRH, { nombreEmpresa: nombreEmpresa });
    guardarDatos();
    alert(`Empresa "${nombreEmpresa}" y usuario RH "${usuarioRH}" registrados exitosamente.`);
    return true;
}

/**
 * Obtiene una lista de todas las empresas registradas.
 * @returns {Array} - Un array de objetos de empresa.
 */
function obtenerEmpresas() {
    return Object.keys(empresasRegistradas).map(key => ({ ...empresasRegistradas[key], usuario: key }));
}

/**
 * Actualiza los datos de una empresa existente. Solo accesible por usuarios 'hiring'.
 * @param {string} nombreUsuario - El nombre de usuario de la empresa a actualizar.
 * @param {object} newData - Un objeto con los nuevos datos a aplicar.
 * @returns {boolean} - true si la actualización fue exitosa, false de lo contrario.
 */
function actualizarEmpresa(nombreUsuario, newData) {
    const actual = obtenerUsuarioActivo();
    if (actual?.tipo !== "hiring") {
        alert("Acceso denegado. Solo usuarios de Hiring Group pueden actualizar empresas.");
        return false;
    }
    if (!empresasRegistradas[nombreUsuario]) {
        alert("Empresa no encontrada.");
        return false;
    }
    Object.assign(empresasRegistradas[nombreUsuario], newData);
    guardarDatos();
    alert("Datos de la empresa actualizados.");
    return true;
}

/**
 * Elimina el registro de una empresa del sistema.
 * Solo accesible por usuarios 'hiring'.
 * @param {string} nombreUsuario - El nombre de usuario de la empresa a eliminar.
 * @returns {boolean} - true si la eliminación fue exitosa, false de lo contrario.
 */
function eliminarEmpresa(nombreUsuario) {
    const actual = obtenerUsuarioActivo();
    if (actual?.tipo !== "hiring") {
        alert("Acceso denegado. Solo usuarios de Hiring Group pueden eliminar empresas.");
        return false;
    }
    if (!empresasRegistradas[nombreUsuario]) {
        alert("Empresa no encontrada.");
        return false;
    }
    // Elimina la empresa de la lista de empresas registradas.
    const usuarioRHAsociado = empresasRegistradas[nombreUsuario].usuarioRH;
    delete empresasRegistradas[nombreUsuario];
    // Opcional: eliminar también al usuario RH asociado si ya no es necesario
    if (usuarioRHAsociado && usuariosRegistrados[usuarioRHAsociado]) {
        delete usuariosRegistrados[usuarioRHAsociado];
    }
    // También se deberían eliminar las ofertas publicadas por esta empresa y las contrataciones relacionadas.
    ofertasPublicadas = ofertasPublicadas.filter(oferta => oferta.empresa !== nombreUsuario);
    contratacionesRealizadas = contratacionesRealizadas.filter(contrato => contrato.empresaContratante !== nombreUsuario);

    guardarDatos();
    alert("Empresa y datos asociados eliminados.");
    return true;
}

/**
 * Realiza la contratación de un candidato para una oferta específica.
 * Solo accesible por usuarios 'hiring'.
 * Transforma el tipo de usuario de "candidato" a "contratado" y registra los detalles de la contratación.
 * @param {number} ofertaId - El ID de la oferta para la que se realiza la contratación.
 * @param {string} candidatoUsuario - El nombre de usuario del candidato a contratar.
 * @param {string} duracion - Duración del contrato (ej. "6 meses", "indefinido").
 * @param {number} salario - Salario mensual acordado.
 * @param {string} tipoSangre - Tipo de sangre del candidato.
 * @param {string} contactoEmergencia - Nombre del contacto de emergencia.
 * @param {string} telEmergencia - Teléfono del contacto de emergencia.
 * @param {string} nroCuenta - Número de cuenta bancaria del candidato.
 * @param {string} banco - Nombre del banco de la cuenta.
 * @returns {boolean} - true si la contratación fue exitosa, false de lo contrario.
 */
function contratarCandidato(ofertaId, candidatoUsuario, duracion, salario, tipoSangre, contactoEmergencia, telEmergencia, nroCuenta, banco) {
    const actual = obtenerUsuarioActivo();
    if (actual?.tipo !== "hiring") {
        alert("Acceso denegado. Solo usuarios de Hiring Group pueden contratar.");
        return false;
    }

    const oferta = ofertasPublicadas.find(o => o.id === ofertaId);
    const candidato = usuariosRegistrados[candidatoUsuario];
    if (!oferta || !candidato || candidato.tipo !== "candidato") {
        alert("Oferta o candidato inválido para la contratación.");
        return false;
    }

    // --- Medidas de seguridad/validación para datos sensibles ---
    // Validación básica del salario.
    if (isNaN(salario) || salario <= 0) {
        alert("El salario debe ser un número positivo.");
        return false;
    }
    // Validación básica del número de cuenta (ej. longitud mínima/máxima)
    if (!nroCuenta || nroCuenta.length < 10 || !/^\d+$/.test(nroCuenta)) { // Asume que la cuenta es solo números
        alert("Número de cuenta bancaria inválido.");
        return false;
    }
    // Validación básica del teléfono de emergencia
    if (!telEmergencia || !/^\d{7,15}$/.test(telEmergencia.replace(/[-\s()]/g, ''))) { // Acepta números de 7 a 15 dígitos
        alert("Número de teléfono de emergencia inválido.");
        return false;
    }
    // Otros datos como tipoSangre, contactoEmergencia se asumen válidos por la entrada del usuario.
    // --- Fin de medidas de seguridad/validación ---

    // Cambiar tipo de usuario a 'contratado'
    candidato.tipo = "contratado";
    candidato.salarioMensual = salario;
    candidato.tipoSangre = tipoSangre;
    candidato.contactoEmergencia = contactoEmergencia; // ¡Dato sensible almacenado en localStorage!
    candidato.telEmergencia = telEmergencia;           // ¡Dato sensible almacenado en localStorage!
    candidato.nroCuenta = nroCuenta;                   // ¡Dato sensible almacenado en localStorage!
    candidato.banco = banco;                           // ¡Dato sensible almacenado en localStorage!
    candidato.recibosNomina = []; // Inicializar array de recibos de nómina.
    candidato.constanciasEmitidas = []; // Inicializar array de constancias.
    candidato.fechaContratacion = new Date().toLocaleDateString('es-ES'); // Añadir fecha de contratación
    candidato.puestoContratado = oferta.cargo; // Añadir puesto contratado
    candidato.empresaContratante = oferta.empresa; // Añadir empresa contratante
    usuariosRegistrados[candidatoUsuario] = candidato; // Actualizar el usuario en el registro global

    // Marcar oferta como inactiva después de la contratación (o cerrada).
    oferta.estatus = "cerrada";

    // Registrar la contratación en el array de contrataciones realizadas
    contratacionesRealizadas.push({
        id: contratacionesRealizadas.length + 1,
        ofertaId: ofertaId,
        candidatoUsuario: candidatoUsuario,
        empresaContratante: oferta.empresa, // El usuario de la empresa que hizo la oferta
        duracionContrato: duracion,
        salarioMensual: salario,
        fechaContratacion: candidato.fechaContratacion, // Usar la fecha del objeto candidato
        puestoContratado: candidato.puestoContratado // Usar el puesto del objeto candidato
    });

    guardarDatos(); // Guardar todos los cambios en localStorage
    alert(`Candidato ${candidatoUsuario} contratado para la oferta "${oferta.titulo}".`);
    return true;
}

/**
 * Genera un reporte de nómina para una empresa específica en un mes y año dados.
 * Solo accesible por usuarios 'hiring'.
 * @param {string} nombreEmpresa - El nombre de la empresa para la que se genera la nómina.
 * @param {number} mes - El mes de la nómina (1-12).
 * @param {number} anio - El año de la nómina.
 * @returns {Array} - Un array de empleados y sus detalles de nómina para el período.
 */
function generarNominaEmpresa(nombreEmpresa, mes, anio) {
    const actual = obtenerUsuarioActivo();
    if (actual?.tipo !== "hiring") {
        alert("Acceso denegado. Solo usuarios de Hiring Group pueden generar nóminas.");
        return null;
    }

    const empresaUsuarioKey = Object.keys(empresasRegistradas).find(key => empresasRegistradas[key].nombre === nombreEmpresa);
    if (!empresaUsuarioKey) {
        alert("Empresa no encontrada.");
        return null;
    }

    const empleadosEnNomina = Object.values(usuariosRegistrados).filter(user =>
        user.tipo === "contratado" &&
        user.empresaContratante === empresaUsuarioKey // Filtrar directamente por la empresa contratante del empleado
    );

    const reporteNomina = empleadosEnNomina.map(empleado => {
        // Asumimos que el empleado tiene sus datos de contratación directamente en su objeto
        return {
            nombre: empleado.nombreCompleto,
            salarioMensual: empleado.salarioMensual,
            puesto: empleado.puestoContratado || "N/A",
            fechaContratacion: empleado.fechaContratacion || "N/A",
            empresaContratante: empresasRegistradas[empleado.empresaContratante]?.nombre || empleado.empresaContratante || "N/A"
        };
    });
    return reporteNomina;
}

/**
 * Genera un recibo de nómina para un empleado contratado específico.
 * Solo accesible por usuarios 'hiring'.
 * @param {string} usuarioContratado - El nombre de usuario del empleado contratado.
 * @param {number} mes - El mes del recibo (1-12).
 * @param {number} anio - El año del recibo.
 * @param {number} diasTrabajados - Días trabajados en el mes.
 * @param {number} deducciones - Monto total de deducciones.
 * @param {string} conceptoDeducciones - Descripción de las deducciones.
 * @returns {object|null} - El objeto del recibo de nómina generado o null si falla.
 */
function generarReciboNomina(usuarioContratado, mes, anio, diasTrabajados, deducciones, conceptoDeducciones = "Ninguna") {
    const actual = obtenerUsuarioActivo();
    if (actual?.tipo !== "hiring") {
        alert("Acceso denegado. Solo usuarios de Hiring Group pueden generar recibos de nómina.");
        return null;
    }

    const empleado = usuariosRegistrados[usuarioContratado];
    if (!empleado || empleado.tipo !== "contratado") {
        alert("Usuario no encontrado o no es de tipo 'contratado'.");
        return null;
    }

    if (!empleado.salarioMensual || empleado.salarioMensual <= 0) {
        alert(`El empleado ${empleado.nombreCompleto} no tiene un salario mensual definido.`);
        return null;
    }

    const salarioDiario = empleado.salarioMensual / 30; // Suponiendo 30 días en el mes
    const salarioBruto = salarioDiario * diasTrabajados;
    const salarioNeto = salarioBruto - deducciones;

    const recibo = {
        id: empleado.recibosNomina ? empleado.recibosNomina.length + 1 : 1,
        usuario: usuarioContratado,
        nombreEmpleado: empleado.nombreCompleto,
        mes: mes,
        anio: anio,
        fechaEmision: new Date().toLocaleDateString('es-ES'),
        salarioMensualBase: empleado.salarioMensual,
        diasTrabajados: diasTrabajados,
        deducciones: deducciones.toFixed(2),
        conceptoDeducciones: conceptoDeducciones,
        salarioNeto: salarioNeto.toFixed(2),
        empresaContratante: empresasRegistradas[empleado.empresaContratante]?.nombre || empleado.empresaContratante || "N/A", // Nombre de la empresa
        puesto: empleado.puestoContratado // Puesto del empleado
    };

    if (!empleado.recibosNomina) {
        empleado.recibosNomina = [];
    }
    empleado.recibosNomina.push(recibo);
    usuariosRegistrados[usuarioContratado] = empleado; // Actualiza el usuario en el objeto global
    guardarDatos();
    alert(`Recibo de nómina generado para ${empleado.nombreCompleto} del mes ${mes}/${anio}.`);
    return recibo;
}

/**
 * Genera el texto formateado para una Constancia de Trabajo.
 * Es una función auxiliar para `solicitarConstanciaTrabajo` en el HTML.
 * @param {string} usuarioContratado - El nombre de usuario del empleado contratado.
 * @returns {string|null} - El texto de la constancia de trabajo o null si los datos son insuficientes.
 */
function generarConstanciaTrabajo(usuarioContratado) {
    const empleado = usuariosRegistrados[usuarioContratado];

    if (!empleado || empleado.tipo !== "contratado" || !empleado.nombreCompleto || !empleado.puestoContratado || !empleado.empresaContratante || !empleado.fechaContratacion) {
        return null; // Datos insuficientes
    }

    const nombreEmpresa = empresasRegistradas[empleado.empresaContratante]?.nombre || empleado.empresaContratante;
    const fechaActual = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

    let texto = `
A quien pueda interesar,

Por medio de la presente hacemos constar que el(la) ciudadano(a) ${empleado.nombreCompleto},
titular de la Cédula de Identidad número V-XX.XXX.XXX (este dato se podría añadir si lo tienes),
presta servicios en nuestra distinguida empresa **${nombreEmpresa}**,
desempeñando el cargo de **${empleado.puestoContratado}**
desde el día ${empleado.fechaContratacion}.

La presente constancia se expide a solicitud de la parte interesada, en Caracas, a los
${new Date().getDate()} días del mes de ${new Date().toLocaleDateString('es-ES', { month: 'long' })} de ${new Date().getFullYear()}.

Atentamente,

__________________________
Firma Autorizada
[Nombre del Departamento o Persona Autorizada]
Hiring Group
    `.trim(); // .trim() para eliminar espacios en blanco al inicio/final

    return texto;
}

/**
 * Genera y emite una constancia para un empleado contratado, incluyendo el texto formateado.
 * @param {string} usuarioContratado - El nombre de usuario del empleado contratado.
 * @param {string} tipoConstancia - Tipo de constancia (ej. "Trabajo", "Salario").
 * @param {string} textoConstancia - El texto ya formateado de la constancia.
 * @param {object} detallesAdicionales - Objeto con detalles adicionales para la constancia.
 * @returns {object|null} - El objeto de la constancia generada o null si falla.
 */
function emitirConstancia(usuarioContratado, tipoConstancia, textoConstancia, detallesAdicionales = {}) {
  const empleado = usuariosRegistrados[usuarioContratado];
  if (!empleado || empleado.tipo !== "contratado") {
    alert("Usuario no encontrado o no es de tipo 'contratado'.");
    return null;
  }

  // Validar datos esenciales para la constancia
  if (!empleado.nombreCompleto || !empleado.puestoContratado || !empleado.empresaContratante || !empleado.fechaContratacion) {
      alert(`Datos incompletos para generar la constancia de ${empleado.nombreCompleto}. Asegúrese de que el empleado tiene nombre completo, puesto contratado, empresa contratante y fecha de contratación.`);
      return null;
  }

  const constancia = {
    id: empleado.constanciasEmitidas ? empleado.constanciasEmitidas.length + 1 : 1,
    usuario: usuarioContratado,
    nombreEmpleado: empleado.nombreCompleto,
    tipo: tipoConstancia,
    fechaEmision: new Date().toLocaleDateString('es-ES'),
    texto: textoConstancia, // Se almacena el texto formateado
    detalles: { // Se mantienen los detalles para consistencia
        puesto: empleado.puestoContratado,
        empresaContratante: empresasRegistradas[empleado.empresaContratante] ? empresasRegistradas[empleado.empresaContratante].nombre : empleado.empresaContratante,
        fechaContratacion: empleado.fechaContratacion,
        ...(tipoConstancia === "Salario" && { salarioMensual: empleado.salarioMensual }), // "Salario" con S mayúscula
        ...detallesAdicionales
    }
  };

  if (!empleado.constanciasEmitidas) {
    empleado.constanciasEmitidas = [];
  }
  empleado.constanciasEmitidas.push(constancia);
  usuariosRegistrados[usuarioContratado] = empleado; // Actualiza el usuario en el objeto global
  guardarDatos();
  return constancia;
}

// ==========================================================
// FUNCIONES DE MANIPULACIÓN DEL DOM (Ejemplo, para interfaz de usuario)
// ==========================================================

/**
 * Crea un botón de menú con la clase 'main-menu-button'.
 * @param {string} text - El texto del botón.
 * @param {string} href - La URL a la que redirige el botón.
 * @returns {HTMLButtonElement} El elemento botón creado.
 */
function createMainMenuButton(text, href) {
    const button = document.createElement("button");
    button.textContent = text;
    button.onclick = () => window.location.href = href;
    button.classList.add("main-menu-button"); // Clase para los estilos del botón grande
    return button;
}

/**
 * Función para cargar la interfaz de usuario basada en el tipo de usuario activo.
 * Esta función asume la existencia de elementos HTML con IDs como 'header-nav'
 * y dinámicamente agrega opciones al menú de navegación principal y a la sección de botones.
 */
function cargarInterfazUsuario() {
    const usuarioActivo = obtenerUsuarioActivo();
    const nav = document.getElementById("header-nav");
    const mainMenuOptionsDiv = document.getElementById("main-menu-options"); // Nuevo div para los botones del menú principal

    if (!nav) return; // Si no hay barra de navegación, salimos.

    nav.innerHTML = ''; // Limpiar navegación existente
    if (mainMenuOptionsDiv) {
        mainMenuOptionsDiv.innerHTML = ''; // Limpiar botones existentes en el área principal
    }

    if (usuarioActivo) {
        // Opciones del HEADER (Enlaces más pequeños)
        // Opción: Cerrar Sesión (para todos los usuarios logueados)
        const liCerrarSesion = document.createElement("li");
        const aCerrarSesion = document.createElement("a");
        aCerrarSesion.href = "#";
        aCerrarSesion.textContent = "Cerrar Sesión";
        aCerrarSesion.classList.add("boton-header");
        aCerrarSesion.onclick = cerrarSesion;
        liCerrarSesion.appendChild(aCerrarSesion);
        nav.appendChild(liCerrarSesion);
        
        // MENÚ PRINCIPAL EN LA SECCIÓN DE CONTENIDO (Botones grandes)
        if (mainMenuOptionsDiv) {
            // mainMenuOptionsDiv.innerHTML = '<p class="welcome-message">Elige una opción:</p>'; // Mensaje o título para los botones
        }

        // Opción: Ver Ofertas Laborales (accesible para todos los logueados)
        if (mainMenuOptionsDiv) {
            mainMenuOptionsDiv.appendChild(createMainMenuButton("Ver Ofertas Laborales", "ofertas_laborales.html"));
        }
        
        // Opciones específicas por tipo de usuario
        switch (usuarioActivo.tipo) {
            case "admin":
                if (mainMenuOptionsDiv) {
                    mainMenuOptionsDiv.appendChild(createMainMenuButton("Gestionar Usuarios", "panel_admin.html"));
                    mainMenuOptionsDiv.appendChild(createMainMenuButton("Registrar Candidato", "registro_candidato.html"));
                    mainMenuOptionsDiv.appendChild(createMainMenuButton("Gestionar Empresas", "gestion_empresas.html")); // Si tienes una página para esto
                    mainMenuOptionsDiv.appendChild(createMainMenuButton("Generar Reportes", "reportes_admin.html")); // Si tienes una página para esto
                }
                // También se puede añadir al header si es necesario para navegación rápida
                nav.appendChild(createHeaderLink("Panel Administrador", "panel_admin.html"));
                break;
            case "hiring":
                if (mainMenuOptionsDiv) {
                    mainMenuOptionsDiv.appendChild(createMainMenuButton("Registrar Candidato", "registro_candidato.html"));
                    mainMenuOptionsDiv.appendChild(createMainMenuButton("Gestionar Empresas", "gestion_empresas.html"));
                    mainMenuOptionsDiv.appendChild(createMainMenuButton("Gestionar Ofertas", "gestion_ofertas.html"));
                    mainMenuOptionsDiv.appendChild(createMainMenuButton("Contratar Candidato", "contratar_candidato.html")); // Si tienes una página para esto
                    mainMenuOptionsDiv.appendChild(createMainMenuButton("Generar Nómina y Constancias", "nomina_constancias.html"));
                }
                nav.appendChild(createHeaderLink("Panel Hiring Group", "hiring_group_panel.html"));
                break;
            case "empresa":
                if (mainMenuOptionsDiv) {
                    mainMenuOptionsDiv.appendChild(createMainMenuButton("Publicar Oferta", "publicar_oferta.html"));
                    mainMenuOptionsDiv.appendChild(createMainMenuButton("Gestionar Postulaciones", "gestion_postulaciones.html"));
                    mainMenuOptionsDiv.appendChild(createMainMenuButton("Ver Perfiles de Candidatos", "buscar_candidatos.html"));
                    mainMenuOptionsDiv.appendChild(createMainMenuButton("Ver Mi Perfil de Empresa", "panel_empresa.html"));
                }
                nav.appendChild(createHeaderLink("Panel Empresa", "panel_empresa.html"));
                break;
            case "candidato":
                if (mainMenuOptionsDiv) {
                    mainMenuOptionsDiv.appendChild(createMainMenuButton("Actualizar Perfil", "perfil_candidato.html"));
                    mainMenuOptionsDiv.appendChild(createMainMenuButton("Mis Postulaciones", "mis_postulaciones.html"));
                    // Ya está en el header y en el main: mainMenuOptionsDiv.appendChild(createMainMenuButton("Ver Ofertas Laborales", "ofertas_laborales.html"));
                }
                nav.appendChild(createHeaderLink("Mi Perfil Candidato", "perfil_candidato.html"));
                break;
            case "contratado":
                if (mainMenuOptionsDiv) {
                    mainMenuOptionsDiv.appendChild(createMainMenuButton("Ver Recibos de Nómina", "recibos_nomina.html"));
                    mainMenuOptionsDiv.appendChild(createMainMenuButton("Solicitar Constancia", "solicitar_constancia.html"));
                    mainMenuOptionsDiv.appendChild(createMainMenuButton("Ver Mi Información", "perfil_contratado.html"));
                }
                nav.appendChild(createHeaderLink("Mi Área Contratado", "perfil_contratado.html"));
                break;
        }

    } else {
        // Opciones del HEADER para usuarios NO logueados (enlaces más pequeños)
        const liIniciarSesion = document.createElement("li");
        const aIniciarSesion = document.createElement("a");
        aIniciarSesion.href = "login.html";
        aIniciarSesion.textContent = "Acceder al Sistema"; // Cambiado de "Iniciar Sesión"
        aIniciarSesion.classList.add("boton-header");
        liIniciarSesion.appendChild(aIniciarSesion);
        nav.appendChild(liIniciarSesion);

        const liRegistrarse = document.createElement("li");
        const aRegistrarse = document.createElement("a");
        aRegistrarse.href = "registro_candidato.html"; // Cambiado a "registro_candidato.html"
        aRegistrarse.textContent = "Registrarse como Candidato"; // Texto cambiado
        aRegistrarse.classList.add("boton-header");
        liRegistrarse.appendChild(aRegistrarse);
        nav.appendChild(liRegistrarse);

        // Opción: Ver Ofertas Laborales (también para no logueados)
        const liVerOfertas = document.createElement("li");
        const aVerOfertas = document.createElement("a");
        aVerOfertas.href = "ofertas_laborales.html";
        aVerOfertas.textContent = "Ver Ofertas Laborales";
        aVerOfertas.classList.add("boton-header");
        liVerOfertas.appendChild(aVerOfertas);
        nav.appendChild(liVerOfertas);


        // MENÚ PRINCIPAL EN LA SECCIÓN DE CONTENIDO para usuarios NO logueados
        if (mainMenuOptionsDiv) {
            mainMenuOptionsDiv.innerHTML = '<p class="welcome-message">Accede o Regístrate para comenzar:</p>'; // Nuevo mensaje
            mainMenuOptionsDiv.appendChild(createMainMenuButton("Acceder al Sistema", "login.html"));
            mainMenuOptionsDiv.appendChild(createMainMenuButton("Registrarse como Candidato", "registro_candidato.html"));
            mainMenuOptionsDiv.appendChild(createMainMenuButton("Ver Ofertas Laborales", "ofertas_laborales.html"));
        }
    }
}

// Helper para crear enlaces de header (para no repetir código)
function createHeaderLink(text, href) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = href;
    a.textContent = text;
    a.classList.add("boton-header");
    li.appendChild(a);
    return li;
}

// Llamar a cargarInterfazUsuario() cuando el DOM esté completamente cargado.
// Esto asegurará que el menú se renderice correctamente en cada página que incluya este JS.
document.addEventListener("DOMContentLoaded", cargarInterfazUsuario);