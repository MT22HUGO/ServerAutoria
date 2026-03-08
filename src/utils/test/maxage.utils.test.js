// Tests unitarios para funciones de validación de edad

const { validateMaxAge, validateAgeRange, getMaxAgeByCategory } = require('../maxage.utils');

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
