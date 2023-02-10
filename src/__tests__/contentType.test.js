import {test, expect} from 'vitest';
import {contentType} from '../index';

test('should return a valid content type from filename', () => {
    expect(contentType('index.html')).toEqual({'Content-Type': 'text/html; charset=utf-8'});
});

test('should return a valid content type from just a extension type', () => {
    expect(contentType('.js')).toEqual({'Content-Type': 'application/javascript; charset=utf-8'});
});

test('should parse filename with a starting dot', () => {
    expect(contentType('.js.html')).toEqual({'Content-Type': 'text/html; charset=utf-8'});
});

test('should return octstream on unknown type', () => {
    expect(contentType('.unknown')).toEqual({'Content-Type': 'application/octet-stream'});
});
