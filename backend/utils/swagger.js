import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import { version } from '../package.json' assert { type: 'json'}


const options = {

    definition: {
        openApi: "3.0.0",
    info: {
        title: "Library Managemen REST API",
        version,
        description: "API documentation for your library management system"
    },
    components: {
         securitySchemes: {
            cookieAuth: {
                type: 'apiKey',
                in: 'cookie',
                name: 'accessToken'
            }
         }
    },

    security: [
        {
            cookieAuth: []
        }
    ]
},
apis:  [
    '../routes/auth.routes.js', 
    '../routes/book.routes.js', 
    '../routes/user.routes.js'
]
          
}

const swaggerSpec = swaggerJSDoc(options)

function swaggerDocs (app, port) {
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })

    console.log(`docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs