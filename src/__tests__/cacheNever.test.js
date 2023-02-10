import {test, expect} from 'vitest';
import {cacheNever} from '../index';

test('should return a valid Cache-Control header', () => {
    const headers = cacheNever();
    const cacheControl = headers['Cache-Control'];
    expect(typeof cacheControl).toBe('string');
    expect(cacheControl).toMatch('no-store');
    expect(cacheControl).toMatch('must-revalidate');
});
