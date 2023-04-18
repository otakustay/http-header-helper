import {test, expect} from 'vitest';
import {HttpHeaderHelper} from '../index';

test('should return a valid Cache-Control header', () => {
    const helper = new HttpHeaderHelper('');
    const headers = helper.cacheNever().getHttpHeaders();
    const cacheControl = headers['Cache-Control'];
    expect(cacheControl).toMatch('no-cache');
    expect(cacheControl).toMatch('must-revalidate');
});
