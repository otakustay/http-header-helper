import mimeTypes from 'mime-types';

interface HttpHeaders {
    'Cache-Control'?: string;
    'Content-Type'?: string;
}

const CACHE_FOREVER = 'public, max-age=31536000, s-maxage=31536000, immutable';
const CACHE_NEVER = 'no-store, must-revalidate';

export interface Options {
    minHashLength?: number;
}

export class HttpHeaderHelper {
    private readonly headers: HttpHeaders = {};
    private readonly hashRegExp: RegExp;

    constructor(private readonly file: string, options?: Options) {
        this.hashRegExp = new RegExp(`(.|-|^)[0-9a-f]{${options?.minHashLength ?? 10},}[.-]`);
    }

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
        if (this.hasHash()) {
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

    private hasHash() {
        return this.hashRegExp.test(this.file);
    }
}
