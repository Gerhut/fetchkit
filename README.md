# fetchkit

Fetch toolkits.

## `import { json } from 'fetchkit'`

Build a POST request with JSON payload.

```JavaScript
import { json } from 'fetchkit'

fetch('https://httpbin.org/anything', json({ foo: 'bar' }))

// ... is same as ...

fetch('https://httpbin.org/anything', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ foo: 'bar' })
})


// The default method is POST, but you can still overwrite it using `json.call`.

fetch('https://httpbin.org/anything', json.call({ method: 'PUT' }, { foo: 'bar' }))

// ... which is same as ...

fetch('https://httpbin.org/anything', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ foo: 'bar' })
})


// `json.call` can also be used in providing other parameters, including headers.

fetch('https://httpbin.org/anything', json.call({
    headers: {
        authorization: 'Bearer token'
    },
    credentials: "omit"
}, { foo: 'bar' }))

// ... which is same as ...

fetch('https://httpbin.org/anything', {
    method: 'POST',
    headers: {
        'authorization': 'Bearer token',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ foo: 'bar' }),
    credentials: "omit"
})


// Not only methods, the content-type header is also able to be overwritten

fetch('https://httpbin.org/anything', json.call({
    headers: {
        'Content-Type': 'application/vnd.github+json'
    }
}, { foo: 'bar' }))

// ... is same as ...

fetch('https://httpbin.org/anything', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/vnd.github+json'
    },
    body: JSON.stringify({ foo: 'bar' }),
})
```

## `import { assert } from 'fetchkit'`

`response.ok` assertion

```JavaScript
import { assert } from 'fetchkit'

try {
    const response = await fetch('https://httpbin.org/status/400')
    assert(response)
} catch (e) {
    console.log(e.message) // "HTTP 400"
    console.log(e.response.status) // 400
    console.log(await e.response.text()) // ""
}
```

## `import { authorize } from 'fetchkit'`

Basic / bearer / token authorization factory

```JavaScript
import { authorize } from 'fetchkit'

// Basic auth
const authorized = authorize({ username: 'foo', password: 'bar' })
// Now use `authorized` as general fetch
authorized('https://httpbin.org/basic-auth/foo/bar')

// Bearer auth
const authorized = authorize({ bearer: 'foo' })
// Token auth
const authorized = authorize({ token: 'foo' })

// Of course, the authorization header could be overwritten
authorized('https://httpbin.org/anything', {
    headers: {
        authorization: 'Bearer bar'
    }
})
```

## License

[MIT License](LICENSE)
