/**
 * Valida que la edad de un animal esté dentro del rango permitido
 * para diferentes categorías de animales en el zoo
 * @param {number} age - La edad del animal en años
 * @param {string} category - La categoría del animal (Mamífero, Ave, Reptil, etc.)
 * @returns {boolean} - true si la edad es válida para esa categoría
 */
const validateMaxAge = (age, category) => {
    // Verificar que la edad sea un número válido
    if (typeof age !== 'number' || isNaN(age) || age < 0) {
        return false;
    }

    // Edades máximas aproximadas por categoría (en años)
    const maxAgesByCategory = {
        'Mamífero': 80,      // Ej: elefantes pueden vivir hasta 70-80 años
        'Ave': 100,          // Ej: loros pueden vivir hasta 80-100 años
        'Reptil': 150,       // Ej: tortugas pueden vivir hasta 150+ años
        'Anfibio': 50,       // Ej: salamandras pueden vivir hasta 50 años
        'Pez': 100           // Ej: algunos peces koi pueden vivir 100+ años
    };

    // Si la categoría no existe, usar un máximo genérico de 100 años
    const maxAge = maxAgesByCategory[category] || 100;

    return age <= maxAge;
};

/**
 * Valida que la edad de un animal esté dentro de un rango mínimo y máximo
 * @param {number} age - La edad del animal en años
 * @param {number} minAge - Edad mínima permitida (por defecto 0)
 * @param {number} maxAge - Edad máxima permitida (por defecto 150)
 * @returns {boolean} - true si la edad está dentro del rango
 */
const validateAgeRange = (age, minAge = 0, maxAge = 150) => {
    if (typeof age !== 'number' || isNaN(age)) {
        return false;
    }

    return age >= minAge && age <= maxAge;
};

/**
 * Obtiene la edad máxima recomendada para una categoría de animal
 * @param {string} category - La categoría del animal
 * @returns {number} - La edad máxima para esa categoría
 */

const getMaxAgeByCategory = (category) => {
    const maxAgesByCategory = {
        'Mamífero': 80,
        'Ave': 100,
        'Reptil': 150,
        'Anfibio': 50,
        'Pez': 100
    };

    return maxAgesByCategory[category] || 100;
};

module.exports = {
    validateMaxAge,
    validateAgeRange,
    getMaxAgeByCategory
};
