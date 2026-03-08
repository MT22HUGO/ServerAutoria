/**
 * Valida que un nombre de animal sea válido
 * - No permite caracteres especiales excepto espacios, guiones y apóstrofes
 * - Longitud entre 2 y 100 caracteres
 * - No permite números
 * @param {string} nombre - El nombre a validar
 * @returns {boolean} - true si el nombre es válido
 */
const isValidAnimalName = (nombre) => {
    if (!nombre || typeof nombre !== 'string') {
        return false;
    }

    // Eliminar espacios al inicio y final
    const nombreTrimmed = nombre.trim();

    // Verificar longitud mínima y máxima
    if (nombreTrimmed.length < 2 || nombreTrimmed.length > 100) {
        return false;
    }

    // Verificar que no contenga números
    if (/\d/.test(nombreTrimmed)) {
        return false;
    }

    // Permitir solo letras, espacios, guiones, apóstrofes y tildes
    // Esto permite nombres como "León", "Oso-pardo", "L'águila"
    const validNamePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'\-]+$/;
    if (!validNamePattern.test(nombreTrimmed)) {
        return false;
    }

    return true;
};

/**
 * Sanitiza y formatea un nombre de animal
 * - Elimina espacios extras
 * - Capitaliza la primera letra de cada palabra
 * - Elimina caracteres no permitidos
 * @param {string} nombre - El nombre a sanitizar
 * @returns {string|null} - El nombre sanitizado o null si no es válido
 */
const sanitizeAnimalName = (nombre) => {
    if (!nombre || typeof nombre !== 'string') {
        return null;
    }

    // Eliminar espacios múltiples y trimear
    let sanitized = nombre.trim().replace(/\s+/g, ' ');

    // Capitalizar primera letra de cada palabra
    sanitized = sanitized
        .split(' ')
        .map(word => {
            if (word.length === 0) return word;
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');

    // Verificar que el resultado sea válido
    if (!isValidAnimalName(sanitized)) {
        return null;
    }

    return sanitized;
};

/**
 * Valida que un nombre científico (especie) sea válido
 * Formato: Género especie (ej: "Panthera leo")
 * @param {string} especie - El nombre científico a validar
 * @returns {boolean} - true si el formato es válido
 */
const isValidScientificName = (especie) => {
    if (!especie || typeof especie !== 'string') {
        return false;
    }

    const especieTrimmed = especie.trim();

    // Un nombre científico básico debe tener al menos dos palabras (género y especie)
    const palabras = especieTrimmed.split(/\s+/);
    if (palabras.length < 2) {
        return false;
    }

    // Verificar que contenga solo letras y espacios
    if (!/^[a-zA-Z\s]+$/.test(especieTrimmed)) {
        return false;
    }

    // El género debe empezar con mayúscula, la especie con minúscula
    const [genero, especies] = palabras;
    if (!/^[A-Z][a-z]+$/.test(genero)) {
        return false;
    }

    if (!/^[a-z]+$/.test(especies)) {
        return false;
    }

    return true;
};

module.exports = {
    isValidAnimalName,
    sanitizeAnimalName,
    isValidScientificName
};
