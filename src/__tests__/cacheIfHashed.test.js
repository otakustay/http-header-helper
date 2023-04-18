import {test, expect} from 'vitest';
import {HttpHeaderHelper} from '../index';

test('should cache forever if filename contains a timestamp', () => {
    const helper = new HttpHeaderHelper(`foo.${+new Date()}.js`);
    const headers = helper.cacheIfHashed().getHttpHeaders();
    expect(headers['Cache-Control']).toMatch('max-age=');
});

test('should cache forever if filename contains a hash sign', () => {
    const helper = new HttpHeaderHelper('foo.86fd85f4cd.js');
    const headers = helper.cacheIfHashed().getHttpHeaders();
    expect(headers['Cache-Control']).toMatch('max-age=');
});

test('should cache forever if filename starts with a hash sign', () => {
    const helper = new HttpHeaderHelper('86fd85f4cd.js');
    const headers = helper.cacheIfHashed().getHttpHeaders();
    expect(headers['Cache-Control']).toMatch('max-age=');
});

test('should not cache if filename has no hash sign', () => {
    const helper = new HttpHeaderHelper('index.html');
    const headers = helper.cacheIfHashed().getHttpHeaders();
    expect(headers['Cache-Control']).toMatch('no-store');
});

test('min hash length match', () => {
    const helper = new HttpHeaderHelper('index.12345.js', {minHashLength: 4});
    const headers = helper.cacheIfHashed().getHttpHeaders();
    const cacheControl = headers['Cache-Control'];
    expect(cacheControl).toMatch('max-age');
    expect(cacheControl).toMatch('s-maxage');
    expect(cacheControl).toMatch('immutable');
});

test('min hash length unmatch', () => {
    const helper = new HttpHeaderHelper('index.12345.js', {minHashLength: 6});
    const headers = helper.cacheIfHashed().getHttpHeaders();
    const cacheControl = headers['Cache-Control'];
    expect(cacheControl).not.toMatch('max-age');
    expect(cacheControl).not.toMatch('s-maxage');
    expect(cacheControl).not.toMatch('immutable');
});
