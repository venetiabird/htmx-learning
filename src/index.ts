import Fastify from 'fastify'

// https://www.gardeningaustraliamag.com.au/planting-guide/
// TODO: Render the climate-selection html page
const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', async (_request, _reply) => {
  return { hello: 'world' }
})

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
