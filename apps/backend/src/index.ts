import express from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import { StartGraphQLServer } from './graphql'
async function StartServer() {

    const app = express()
    app.use(express.json())
    const graphqlServer = await StartGraphQLServer()
    app.get('/', (req, res) => {
        res.send('Hello World!')
    })


    app.use('/graphql', expressMiddleware(graphqlServer))
    
    app.listen(8000, () => {
        console.log('Server is running on http://localhost:8000')
    }
    )
}

StartServer()