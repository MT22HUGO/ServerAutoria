/**
 * Valida que una fecha sea válida y no sea futura
 * Útil para validar fechas de ingreso de animales al zoo
 * @param {string|Date} date - La fecha a validar
 * @returns {boolean} - true si la fecha es válida y no es futura
 */
const checkValidDate = (date) => {
    // Si no se proporciona fecha, retornar false
    if (!date) {
        return false;
    }

    // Intentar crear un objeto Date
    const dateObj = new Date(date);
    
    // Verificar que sea una fecha válida
    if (isNaN(dateObj.getTime())) {
        return false;
    }

    // Verificar que no sea una fecha futura
    const now = new Date();
    if (dateObj > now) {
        return false;
    }

    return true;
};

/**
 * Calcula la edad en años a partir de una fecha
 * @param {string|Date} birthDate - La fecha de nacimiento
 * @returns {number|null} - La edad en años o null si la fecha no es válida
 */
const calculateAge = (birthDate) => {
    if (!checkValidDate(birthDate)) {
        return null;
    }

    const birth = new Date(birthDate);
    const now = new Date();
    
    let age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    
    // Ajustar si aún no ha cumplido años este año
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
        age--;
    }

    return age;
};

module.exports = {
    checkValidDate,
    calculateAge
};
