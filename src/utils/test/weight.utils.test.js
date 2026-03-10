const { validateWeight, validateWeightRange, getMaxWeightByCategory } = require('../weight.utils');

describe('Tests de Utilidades - weight.utils', () => {
    
    describe('validateWeight', () => {
        test('Debe retornar true para pesos válidos mayores a 0', () => {
            expect(validateWeight(0.1)).toBe(true);
            expect(validateWeight(25)).toBe(true);
            expect(validateWeight(1200.5)).toBe(true);
        });

        test('Debe retornar false para pesos menores o iguales a 0', () => {
            expect(validateWeight(0)).toBe(false);
            expect(validateWeight(-5)).toBe(false);
        });

        test('Debe retornar false para valores no numéricos', () => {
            expect(validateWeight('10')).toBe(false);
            expect(validateWeight(null)).toBe(false);
            expect(validateWeight(undefined)).toBe(false);
            expect(validateWeight(NaN)).toBe(false);
        });
    });

    describe('validateWeightRange', () => {
        test('Debe validar correctamente pesos dentro del rango', () => {
            expect(validateWeightRange(10, 1, 100)).toBe(true);
            expect(validateWeightRange(1, 1, 100)).toBe(true);
            expect(validateWeightRange(100, 1, 100)).toBe(true);
        });

        test('Debe retornar false para pesos fuera del rango', () => {
            expect(validateWeightRange(0.5, 1, 100)).toBe(false);
            expect(validateWeightRange(101, 1, 100)).toBe(false);
        });

        test('Debe usar valores por defecto si no se especifican', () => {
            expect(validateWeightRange(0.1)).toBe(true);
            expect(validateWeightRange(10001)).toBe(false);
        });

        test('Debe retornar false para valores no numéricos', () => {
            expect(validateWeightRange('10')).toBe(false);
            expect(validateWeightRange(null)).toBe(false);
            expect(validateWeightRange(undefined)).toBe(false);
            expect(validateWeightRange(NaN)).toBe(false);
        });
    });

    describe('getMaxWeightByCategory', () => {
        test('Debe retornar el peso máximo correcto por categoría', () => {
            expect(getMaxWeightByCategory('Mamífero')).toBe(6000);
            expect(getMaxWeightByCategory('Ave')).toBe(150);
            expect(getMaxWeightByCategory('Reptil')).toBe(1000);
            expect(getMaxWeightByCategory('Anfibio')).toBe(10);
            expect(getMaxWeightByCategory('Pez')).toBe(2000);
        });

        test('Debe retornar valor por defecto para categorías desconocidas', () => {
            expect(getMaxWeightByCategory('Desconocida')).toBe(1000);
        });
    });
});