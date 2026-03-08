// Tests unitarios para las funciones de utilidad

const { checkValidDate, calculateAge } = require('../checkvaliddate.utils');
const { isValidAnimalName, sanitizeAnimalName, isValidScientificName } = require('../animalname.utils');
const { validateMaxAge, validateAgeRange, getMaxAgeByCategory } = require('../maxage.utils');

describe('Tests de Utilidades - checkvaliddate.utils', () => {
    
    describe('checkValidDate', () => {
        test('Debe retornar true para una fecha válida en el pasado', () => {
            const pastDate = '2020-01-01';
            expect(checkValidDate(pastDate)).toBe(true);
        });

        test('Debe retornar false para una fecha futura', () => {
            const futureDate = new Date();
            futureDate.setFullYear(futureDate.getFullYear() + 1);
            expect(checkValidDate(futureDate)).toBe(false);
        });

        test('Debe retornar false para una fecha inválida', () => {
            expect(checkValidDate('fecha-invalida')).toBe(false);
        });

        test('Debe retornar false para null o undefined', () => {
            expect(checkValidDate(null)).toBe(false);
            expect(checkValidDate(undefined)).toBe(false);
        });

        test('Debe retornar true para la fecha de hoy', () => {
            const today = new Date();
            expect(checkValidDate(today)).toBe(true);
        });
    });

    describe('calculateAge', () => {
        test('Debe calcular correctamente la edad', () => {
            const birthDate = new Date();
            birthDate.setFullYear(birthDate.getFullYear() - 5);
            expect(calculateAge(birthDate)).toBe(5);
        });

        test('Debe retornar null para fechas inválidas', () => {
            expect(calculateAge('fecha-invalida')).toBe(null);
        });

        test('Debe retornar null para fechas futuras', () => {
            const futureDate = new Date();
            futureDate.setFullYear(futureDate.getFullYear() + 1);
            expect(calculateAge(futureDate)).toBe(null);
        });
    });
});

describe('Tests de Utilidades - animalname.utils (Validación de Nombres)', () => {
    
    describe('isValidAnimalName', () => {
        test('Debe retornar true para nombres válidos de animales', () => {
            expect(isValidAnimalName('León')).toBe(true);
            expect(isValidAnimalName('Tigre de Bengala')).toBe(true);
            expect(isValidAnimalName('Oso-pardo')).toBe(true);
        });

        test('Debe retornar false para nombres con números', () => {
            expect(isValidAnimalName('León123')).toBe(false);
            expect(isValidAnimalName('Tigre2')).toBe(false);
        });

        test('Debe retornar false para nombres con caracteres especiales no permitidos', () => {
            expect(isValidAnimalName('León@')).toBe(false);
            expect(isValidAnimalName('Tigre#Bengala')).toBe(false);
            expect(isValidAnimalName('Oso_pardo')).toBe(false);
        });

        test('Debe retornar false para nombres muy cortos o muy largos', () => {
            expect(isValidAnimalName('L')).toBe(false);
            expect(isValidAnimalName('a'.repeat(101))).toBe(false);
        });

        test('Debe retornar false para null, undefined o string vacío', () => {
            expect(isValidAnimalName(null)).toBe(false);
            expect(isValidAnimalName(undefined)).toBe(false);
            expect(isValidAnimalName('')).toBe(false);
            expect(isValidAnimalName('   ')).toBe(false);
        });

        test('Debe aceptar nombres con tildes y caracteres especiales del español', () => {
            expect(isValidAnimalName('Águila')).toBe(true);
            expect(isValidAnimalName('Ñandú')).toBe(true);
            expect(isValidAnimalName('Colibrí')).toBe(true);
        });
    });

    describe('sanitizeAnimalName', () => {
        test('Debe capitalizar correctamente nombres de animales', () => {
            expect(sanitizeAnimalName('león')).toBe('León');
            expect(sanitizeAnimalName('TIGRE')).toBe('Tigre');
            expect(sanitizeAnimalName('oso pardo')).toBe('Oso Pardo');
        });

        test('Debe eliminar espacios múltiples', () => {
            expect(sanitizeAnimalName('León    Africano')).toBe('León Africano');
            expect(sanitizeAnimalName('  Tigre  ')).toBe('Tigre');
        });

        test('Debe retornar null para nombres inválidos', () => {
            expect(sanitizeAnimalName('León123')).toBe(null);
            expect(sanitizeAnimalName('Tigre@')).toBe(null);
            expect(sanitizeAnimalName('L')).toBe(null);
        });

        test('Debe retornar null para null o undefined', () => {
            expect(sanitizeAnimalName(null)).toBe(null);
            expect(sanitizeAnimalName(undefined)).toBe(null);
        });
    });

    describe('isValidScientificName', () => {
        test('Debe retornar true para nombres científicos válidos', () => {
            expect(isValidScientificName('Panthera leo')).toBe(true);
            expect(isValidScientificName('Ursus arctos')).toBe(true);
            expect(isValidScientificName('Aquila chrysaetos')).toBe(true);
        });

        test('Debe retornar false si no tiene dos palabras', () => {
            expect(isValidScientificName('Panthera')).toBe(false);
            expect(isValidScientificName('leon')).toBe(false);
        });

        test('Debe retornar false si el género no empieza con mayúscula', () => {
            expect(isValidScientificName('panthera leo')).toBe(false);
            expect(isValidScientificName('pAnthera leo')).toBe(false);
        });

        test('Debe retornar false si la especie no está en minúsculas', () => {
            expect(isValidScientificName('Panthera Leo')).toBe(false);
            expect(isValidScientificName('Panthera LEO')).toBe(false);
        });

        test('Debe retornar false para nombres con números o caracteres especiales', () => {
            expect(isValidScientificName('Panthera leo123')).toBe(false);
            expect(isValidScientificName('Panthera-leo')).toBe(false);
        });

        test('Debe retornar false para null, undefined o vacío', () => {
            expect(isValidScientificName(null)).toBe(false);
            expect(isValidScientificName(undefined)).toBe(false);
            expect(isValidScientificName('')).toBe(false);
        });
    });
});

describe('Tests de Utilidades - maxage.utils', () => {
    
    describe('validateMaxAge', () => {
        test('Debe retornar true para edades válidas en Mamíferos', () => {
            expect(validateMaxAge(50, 'Mamífero')).toBe(true);
            expect(validateMaxAge(80, 'Mamífero')).toBe(true);
        });

        test('Debe retornar false para edades que exceden el máximo', () => {
            expect(validateMaxAge(85, 'Mamífero')).toBe(false);
            expect(validateMaxAge(200, 'Reptil')).toBe(false);
        });

        test('Debe retornar false para edades negativas', () => {
            expect(validateMaxAge(-5, 'Mamífero')).toBe(false);
        });

        test('Debe retornar false para valores no numéricos', () => {
            expect(validateMaxAge('diez', 'Mamífero')).toBe(false);
            expect(validateMaxAge(NaN, 'Mamífero')).toBe(false);
        });

        test('Debe usar edad máxima por defecto para categorías desconocidas', () => {
            expect(validateMaxAge(90, 'Categoría Inexistente')).toBe(true);
            expect(validateMaxAge(110, 'Categoría Inexistente')).toBe(false);
        });
    });

    describe('validateAgeRange', () => {
        test('Debe validar correctamente rangos de edad', () => {
            expect(validateAgeRange(50, 0, 100)).toBe(true);
            expect(validateAgeRange(0, 0, 100)).toBe(true);
            expect(validateAgeRange(100, 0, 100)).toBe(true);
        });

        test('Debe retornar false para edades fuera del rango', () => {
            expect(validateAgeRange(150, 0, 100)).toBe(false);
            expect(validateAgeRange(-1, 0, 100)).toBe(false);
        });

        test('Debe usar valores por defecto si no se especifican', () => {
            expect(validateAgeRange(50)).toBe(true);
            expect(validateAgeRange(200)).toBe(false);
        });
    });

    describe('getMaxAgeByCategory', () => {
        test('Debe retornar las edades máximas correctas por categoría', () => {
            expect(getMaxAgeByCategory('Mamífero')).toBe(80);
            expect(getMaxAgeByCategory('Ave')).toBe(100);
            expect(getMaxAgeByCategory('Reptil')).toBe(150);
            expect(getMaxAgeByCategory('Anfibio')).toBe(50);
            expect(getMaxAgeByCategory('Pez')).toBe(100);
        });

        test('Debe retornar valor por defecto para categorías desconocidas', () => {
            expect(getMaxAgeByCategory('Desconocida')).toBe(100);
        });
    });
});
