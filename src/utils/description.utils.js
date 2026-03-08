/**
 * Valida que una descripción no exceda el límite de caracteres permitido
 * @param {string} description - La descripción a validar
 * @param {number} maxLength - Longitud máxima permitida (por defecto 350)
 * @returns {boolean} - true si la descripción es válida
 */
const validateDescriptionLength = (description, maxLength = 350) => {
    // Verificar que sea un string
    if (typeof description !== 'string') {
        return false;
    }

    // Verificar que no esté vacío
    const trimmedDescription = description.trim();
    if (trimmedDescription.length === 0) {
        return false;
    }

    // Verificar que no exceda el límite
    return trimmedDescription.length <= maxLength;
};

/**
 * Trunca una descripción al límite de caracteres especificado
 * Añade puntos suspensivos si se trunca
 * @param {string} description - La descripción a truncar
 * @param {number} maxLength - Longitud máxima (por defecto 350)
 * @returns {string|null} - La descripción truncada o null si no es válida
 */
const truncateDescription = (description, maxLength = 350) => {
    if (typeof description !== 'string') {
        return null;
    }

    const trimmedDescription = description.trim();
    
    if (trimmedDescription.length === 0) {
        return null;
    }

    if (trimmedDescription.length <= maxLength) {
        return trimmedDescription;
    }

    // Truncar y añadir puntos suspensivos
    return trimmedDescription.substring(0, maxLength - 3) + '...';
};

/**
 * Sanitiza una descripción eliminando espacios múltiples y normalizando
 * @param {string} description - La descripción a sanitizar
 * @returns {string|null} - La descripción sanitizada o null si no es válida
 */
const sanitizeDescription = (description) => {
    if (typeof description !== 'string') {
        return null;
    }

    // Eliminar espacios múltiples y trimear
    const sanitized = description.trim().replace(/\s+/g, ' ');
    
    if (sanitized.length === 0) {
        return null;
    }

    return sanitized;
};

module.exports = {
    validateDescriptionLength,
    truncateDescription,
    sanitizeDescription
};
