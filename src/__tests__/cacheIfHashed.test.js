import {cacheIfHashed, cacheForever, cacheNever} from '../index';

describe('cacheIfHashed', () => {
    it('should cache forever if filename contains a hash sign', () => {
        expect(cacheIfHashed(`foo.${+new Date()}.js`)).toEqual(cacheForever());
        expect(cacheIfHashed('foo.86fd85f4cd.js')).toEqual(cacheForever());
    });

    it('should not cache if filename has no hash sign', () => {
        expect(cacheIfHashed('index.html')).toEqual(cacheNever());
    });
});
