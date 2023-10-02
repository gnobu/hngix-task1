import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Video Upload API',
            version: '1.0.0',
            description: 'A simple Express Video Upload API',
        },
        // servers: [
        //     {
        //         url: 'https://upload-video-api.onrender.com/',
        //     },
        // ],
    },
    apis: ['./src/controllers/*'],
}

export const swaggerSpec = swaggerJsdoc(options)