# http-header-helper

A collection of simple helpers to generate frequently used http headers

This package is mostly private used, however I would be pleasant to receive community requests.

## Usage

To create a helper instance, pass file name to it:

```ts
import {HttpHeaderHelper} from 'http-header-helper';

const helper = new HttpHeaderHelper(filename);
```

All helper generation methods return `this` so you can chain them.

- `helper.cacheNever()`: add http headers indicating a resource should never be cached and should be revalidated on every request.
- `helper.cacheForever()`: add https headers indicating a resource should be cached a very long time, this cache is also [immutable](https://hacks.mozilla.org/2017/01/using-immutable-caching-to-speed-up-the-web/).
- `helper.cacheIfHashed(filename)`: by providing a filename, this function automatically detects whether a hash sign is in the name, a hash sign is a string containing 8 or more hex characters surrounded by `.` or `-`, when filename contains a hash sign, it returns a long term cache header, otherwise the cache is disabled.
- `helper.contentType(filename)`: add http headers containing `Content-Type` looked up from given filename, `application/octstream` is used as a fallback.

After all, use `helper.getHttpHeaders()` to dump a headers object.

## Example

```ts
import {HttpHeaderHelper} from 'http-header-helper';

const helper = new HttpHeaderHelper(request.url);
const headers = helper.contentType().cacheIfHashed().getHttpHeaders();
response.writeHeader(200, headers);
```
