const http = require('http')
const _ = require('lodash')

const server = http.createServer((req, res) => {
    console.log('halo cok')
    // console.log(req.url, req.method)
    res.setHeader('Content-Type', 'text/plain')

    let random = _.random(0, 99)
    res.write('Hello bray ' + random)
    res.end()
})

server.listen(3000, 'localhost', () => {
    console.log('Server now listening on port 3000...')
})

