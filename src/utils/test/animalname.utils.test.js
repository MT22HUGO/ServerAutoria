// Tests unitarios para funciones de validación de nombres de animales

const { isValidAnimalName, sanitizeAnimalName, isValidScientificName } = require('../animalname.utils');

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
