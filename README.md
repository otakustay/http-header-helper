# http-header-helper

A collection of simple helpers to generate frequently used http headers

This package is mostly private used, however I would be pleasant to receive community requests.

## Functions

All functions returns an object containing some http headers in upper cased format like `Cache-Control`.

- `cacheNever()`: returns http headers indicating a resource should never be cached and should be revalidated on every request.
- `cacheForever()`: returns https headers indicating a resource should be cached a very long time, this cache is also [immutable](https://hacks.mozilla.org/2017/01/using-immutable-caching-to-speed-up-the-web/).
- `cacheIfHashed(filename)`: by providing a filename, this function automatically detects whether a hash sign is in the name, a hash sign is a string containing 8 or more hex characters surrounded by `.` or `-`, when filename contains a hash sign, it returns a long term cache header, otherwise the cache is disabled.
- `contentType(filename)`: returns http headers containing `Content-Type` looked up from given filename, `application/octstream` is used as a fallback.
