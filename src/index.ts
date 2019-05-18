import * as path from 'path';
import mimeTypes from 'mime-types';

interface HttpHeaders {
    'Cache-Control'?: string;
    'Content-Type'?: string;
}

const CACHE_FOREVER = 'public, max-age=31536000, s-maxage=31536000, immutable';
const CACHE_NEVER = 'no-store, must-revalidate';

const hasHash = (filename: string): boolean => /[.-][0-9a-f]{8,}[.-]/.test(filename);

export const contentType = (filename: string): HttpHeaders => {
    const mime = mimeTypes.lookup(filename) || '';
    const contentType = mimeTypes.contentType(mime) || 'application/octet-stream';
    return {'Content-Type': contentType};
};

export const cacheForever = (): HttpHeaders => ({'Cache-Control': CACHE_FOREVER});

export const cacheNever = (): HttpHeaders => ({'Cache-Control': CACHE_NEVER});

export const cacheIfHashed = (filename: string): HttpHeaders => (hasHash(filename) ? cacheForever() : cacheNever());
