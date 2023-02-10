import mimeTypes from 'mime-types';

interface HttpHeaders {
    'Cache-Control'?: string;
    'Content-Type'?: string;
}

const CACHE_FOREVER = 'public, max-age=31536000, s-maxage=31536000, immutable';
const CACHE_NEVER = 'no-store, must-revalidate';

const hasHash = (filename: string): boolean => /(.|-|^)[0-9a-f]{10,}[.-]/.test(filename);

export class HttpHeaderHelper {
    private readonly headers: HttpHeaders = {};

    constructor(private readonly file: string) {}

    contentType() {
        const mime = mimeTypes.lookup(this.file) || '';
        const contentType = mimeTypes.contentType(mime) || 'application/octet-stream';
        this.headers['Content-Type'] = contentType;
        return this;
    }

    cacheForever() {
        this.headers['Cache-Control'] = CACHE_FOREVER;
        return this;
    }

    cacheNever() {
        this.headers['Cache-Control'] = CACHE_NEVER;
        return this;
    }

    cacheIfHashed() {
        if (hasHash(this.file)) {
            this.cacheForever();
        }
        else {
            this.cacheNever();
        }
        return this;
    }

    getHttpHeaders() {
        return {...this.headers};
    }
}
