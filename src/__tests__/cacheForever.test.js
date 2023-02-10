import {test, expect} from 'vitest';
import {HttpHeaderHelper} from '../index';

test('should return a valid Cache-Control header', () => {
    const helper = new HttpHeaderHelper('');
    const headers = helper.cacheForever().getHttpHeaders();
    const cacheControl = headers['Cache-Control'];
    expect(cacheControl).toMatch('max-age');
    expect(cacheControl).toMatch('s-maxage');
    expect(cacheControl).toMatch('immutable');
});
