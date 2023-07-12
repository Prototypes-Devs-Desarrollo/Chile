export const ValidoRegistro = ({ correo, clave, rclave }) => {
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const e = {};
    let valido = true;

    if (correo.toString().trim().length === 0) {
        e.correo = 'El Correo esta Vacio';
        valido = false;
    } else if (correo.length > 40) {
        e.correo = 'El Correo no puede tener mas de 40 Caracteres';
        valido = false;
    } else if (!regexEmail.test(correo)) {
        e.correo = 'El Correo ingresado no es Valido';
        valido = false;
    }

    if (clave.toString().trim().length === 0) {
        e.clave = 'La Contraseña esta Vacia';
        valido = false;
    } else if (clave.length < 6 || clave.length > 40) {
        e.clave = 'La Contraseña solo tiene que tener entre 6 a 40 caracteres';
        valido = false;
    } else if (clave !== rclave) {
        e.clave = 'Las Conctraseñas no coinsiden';
        valido = false;
    }

    if (rclave.toString().trim().length === 0) {
        e.rclave = 'Repetir Contraseña esta Vacia';
        valido = false;
    } else if (rclave.length < 6 || rclave.length > 40) {
        e.rclave = 'Repetir Contraseña solo tiene que tener entre 6 a 40 caracteres';
        valido = false;
    } else if (rclave !== clave) {
        e.rclave = 'Las Contraseñas no coinsiden';
        valido = false;
    }

    return { ...e, valido };
};

export const ValidoLogin = ({ correo, clave, rclave }) => {
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const e = {};
    let valido = true;

    if (correo.toString().trim().length === 0) {
        e.correo = 'El Correo esta Vacio';
        valido = false;
    } else if (correo.length > 40) {
        e.correo = 'El Correo no puede tener mas de 40 Caracteres';
        valido = false;
    } else if (!regexEmail.test(correo)) {
        e.correo = 'El Correo ingresado no es Valido';
        valido = false;
    }

    if (clave.toString().trim().length === 0) {
        e.clave = 'La Contraseña esta Vacia';
        valido = false;
    } else if (clave.length < 6 || clave.length > 40) {
        e.clave = 'La Contraseña solo tiene que tener entre 6 a 40 caracteres';
        valido = false;
    }

    return { ...e, valido };
};

export const ValidoUploadPdf = ({ pdf }) => {
    const e = {};
    let valido = true;

    console.error(pdf)
    if (!pdf) {
        e.pdf = 'No se a seleccionado un archivo PDF';
        valido = false;
    }

    return { ...e, valido };
};