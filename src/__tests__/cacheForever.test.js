import {test, expect} from 'vitest';
import {cacheForever} from '../index';

test('should return a valid Cache-Control header', () => {
    const headers = cacheForever();
    const cacheControl = headers['Cache-Control'];
    expect(typeof cacheControl).toBe('string');
    expect(cacheControl).toMatch('max-age');
    expect(cacheControl).toMatch('s-maxage');
    expect(cacheControl).toMatch('immutable');
});
