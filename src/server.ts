import Fastify from 'fastify'
import formBody from '@fastify/formbody'
import fs from 'fs'
import path from 'path'

// https://www.gardeningaustraliamag.com.au/planting-guide/

const fastify = Fastify({
    logger: true
})

fastify.register(formBody)

fastify.get('/', function (request, reply) {
    // reply.send({ hello: 'world' })
  let html = fs.readFileSync(path.resolve(path.dirname(''), 'src/pages/climate-selection.html'), 'utf8')
  reply.header('Content-Type', 'text/html; charset=utf-8').send(html)
})

fastify.post('/plant-selection', function(request, reply) {
  let html = fs.readFileSync(path.resolve(path.dirname(''), 'src/pages/plant-selection.html'), 'utf8')
  reply.header('Content-Type', 'text/html; charset=utf-8').send(html)
})

fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})
