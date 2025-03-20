import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import { StartGraphQLServer } from './graphql';
import cors from 'cors';

async function StartServer() {
    const app = express();
    app.use(express.json());

    app.use(
        cors({
            origin: 'http://localhost:3000', // Your frontend URL
            credentials: true, // Allow credentials (cookies, tokens, etc.)
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
            allowedHeaders: [
                'Content-Type',
                'Authorization',
                'x-csrf-token',
                'communityid',
                'userid',
                'postid'
            ], // Allowed headers
        })
    );

    const graphqlServer = await StartGraphQLServer();

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.use('/graphql', expressMiddleware(graphqlServer));

    app.listen(8000, () => {
        console.log('Server is running on http://localhost:8000');
    });
}

StartServer();
