import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Video Upload API',
            version: '1.0.0',
            description: 'A simple Express Video Upload API',
        },
        servers: [
            {
                url: 'https://ubong-inyang.onrender.com',
            },
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./src/controllers/*'],
}

export const swaggerSpec = swaggerJsdoc(options)