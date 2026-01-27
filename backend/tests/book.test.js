import supertest from 'supertest'
const request = supertest(app)
import app from '../app.js'

describe(("Book ApI"), () => {
    
    describe(("Create Book"), () => {

        describe(("given all required fields"), () => {
            it(("should return 201"), () => {
             
                const data = request.send({
                    title: 'Atomic habits',
                    author: 'James Bruce',
                    
                })
            })
        })
    })
})