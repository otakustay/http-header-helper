import {cacheNever} from '../index';

describe('cacheNever', () => {
    it('should return a valid Cache-Control header', () => {
        const headers = cacheNever();
        const cacheControl = headers['Cache-Control'];
        expect(typeof cacheControl).toBe('string');
        expect(cacheControl).toMatch('no-store');
        expect(cacheControl).toMatch('must-revalidate');
    });
});
