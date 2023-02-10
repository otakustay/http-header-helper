import {test, expect} from 'vitest';
import {HttpHeaderHelper} from '../index';

test('should return a valid content type from filename', () => {
    const helper = new HttpHeaderHelper('index.html');
    const headers = helper.contentType().getHttpHeaders();
    expect(headers).toEqual({'Content-Type': 'text/html; charset=utf-8'});
});

test('should return a valid content type from just a extension type', () => {
    const helper = new HttpHeaderHelper('.js');
    const headers = helper.contentType().getHttpHeaders();
    expect(headers).toEqual({'Content-Type': 'application/javascript; charset=utf-8'});
});

test('should parse filename with a starting dot', () => {
    const helper = new HttpHeaderHelper('.js.html');
    const headers = helper.contentType().getHttpHeaders();
    expect(headers).toEqual({'Content-Type': 'text/html; charset=utf-8'});
});

test('should return octstream on unknown type', () => {
    const helper = new HttpHeaderHelper('.unknown');
    const headers = helper.contentType().getHttpHeaders();
    expect(headers).toEqual({'Content-Type': 'application/octet-stream'});
});
