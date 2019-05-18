import {cacheForever} from '../index';

describe('cacheForever', () => {
    it('should return a valid Cache-Control header', () => {
        const headers = cacheForever();
        const cacheControl = headers['Cache-Control'];
        expect(typeof cacheControl).toBe('string');
        expect(cacheControl).toMatch('max-age');
        expect(cacheControl).toMatch('s-maxage');
        expect(cacheControl).toMatch('immutable');
    });
});
