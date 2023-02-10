import {test, expect} from 'vitest';
import {cacheIfHashed, cacheForever, cacheNever} from '../index';

test('should cache forever if filename contains a hash sign', () => {
    expect(cacheIfHashed(`foo.${+new Date()}.js`)).toEqual(cacheForever());
    expect(cacheIfHashed('foo.86fd85f4cd.js')).toEqual(cacheForever());
});

test('should not cache if filename has no hash sign', () => {
    expect(cacheIfHashed('index.html')).toEqual(cacheNever());
});
