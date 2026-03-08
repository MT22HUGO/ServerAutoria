// Tests unitarios para funciones de validación de descripciones

const { validateDescriptionLength, truncateDescription, sanitizeDescription } = require('../description.utils');

describe('Tests de Utilidades - Validación de Descripciones', () => {
    
    describe('validateDescriptionLength', () => {
        test('Debe retornar true para descripciones válidas dentro del límite', () => {
            const shortDescription = 'Esta es una descripción corta';
            expect(validateDescriptionLength(shortDescription)).toBe(true);
        });

        test('Debe retornar true para descripciones de exactamente 350 caracteres', () => {
            const exactDescription = 'a'.repeat(350);
            expect(validateDescriptionLength(exactDescription)).toBe(true);
        });

        test('Debe retornar false para descripciones que exceden 350 caracteres', () => {
            const longDescription = 'a'.repeat(351);
            expect(validateDescriptionLength(longDescription)).toBe(false);
        });

        test('Debe retornar false para valores no string', () => {
            expect(validateDescriptionLength(123)).toBe(false);
            expect(validateDescriptionLength(null)).toBe(false);
            expect(validateDescriptionLength(undefined)).toBe(false);
        });

        test('Debe retornar false para strings vacíos o solo espacios', () => {
            expect(validateDescriptionLength('')).toBe(false);
            expect(validateDescriptionLength('   ')).toBe(false);
        });

        test('Debe permitir límites personalizados', () => {
            expect(validateDescriptionLength('corto', 10)).toBe(true);
            expect(validateDescriptionLength('texto muy largo', 5)).toBe(false);
        });
    });

    describe('truncateDescription', () => {
        test('Debe retornar la descripción completa si está dentro del límite', () => {
            const shortDescription = 'Descripción corta';
            expect(truncateDescription(shortDescription)).toBe('Descripción corta');
        });

        test('Debe truncar y añadir puntos suspensivos para descripciones largas', () => {
            const longDescription = 'a'.repeat(400);
            const result = truncateDescription(longDescription);
            expect(result).toHaveLength(350);
            expect(result.endsWith('...')).toBe(true);
        });

        test('Debe retornar null para valores no string', () => {
            expect(truncateDescription(123)).toBe(null);
            expect(truncateDescription(null)).toBe(null);
            expect(truncateDescription(undefined)).toBe(null);
        });

        test('Debe retornar null para strings vacíos', () => {
            expect(truncateDescription('')).toBe(null);
            expect(truncateDescription('   ')).toBe(null);
        });

        test('Debe respetar límites personalizados', () => {
            const text = 'Este es un texto largo';
            const result = truncateDescription(text, 10);
            expect(result).toHaveLength(10);
            expect(result.endsWith('...')).toBe(true);
        });
    });

    describe('sanitizeDescription', () => {
        test('Debe eliminar espacios múltiples', () => {
            expect(sanitizeDescription('texto  con   espacios')).toBe('texto con espacios');
        });

        test('Debe eliminar espacios al inicio y final', () => {
            expect(sanitizeDescription('  texto con espacios  ')).toBe('texto con espacios');
        });

        test('Debe retornar null para valores no string', () => {
            expect(sanitizeDescription(123)).toBe(null);
            expect(sanitizeDescription(null)).toBe(null);
            expect(sanitizeDescription(undefined)).toBe(null);
        });

        test('Debe retornar null para strings vacíos o solo espacios', () => {
            expect(sanitizeDescription('')).toBe(null);
            expect(sanitizeDescription('   ')).toBe(null);
        });

        test('Debe mantener saltos de línea como espacios simples', () => {
            expect(sanitizeDescription('línea1\n\nlínea2')).toBe('línea1 línea2');
        });
    });
});
