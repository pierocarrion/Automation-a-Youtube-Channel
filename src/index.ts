import { server } from './services/server'
import 'dotenv/config'

server.listen(process.env.PORT, ()=>{
    console.log('%s listening at %s', server.name, server.url)
})