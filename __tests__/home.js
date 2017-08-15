const axios = require('axios')
const app = require('../index.js')
const URL = 'http://localhost:3000'
let server
let id
beforeAll((done)=>{
  server = app.listen(3000, done)
})
describe('home page', ()=>{
  it('responds with 200', (done)=>{
      axios({url: URL, 
      method: 'get', 
      adapter: require('axios/lib/adapters/http')})
      .then((response)=>{
        // console.log(response)
        expect(response.status).toEqual(200)
        done()
      })
      .catch(error=>console.error(error))
  })
})
describe('books resource', ()=>{
  it('responds with 200', (done)=>{
      axios({url: `${URL}/books`, 
      method: 'get', 
      adapter: require('axios/lib/adapters/http')})
      .then((response)=>{
        // console.log(response.data)
        expect(response.status).toEqual(200)
        expect(response.data.length).toBeGreaterThan(-1)
        done()
      })
      .catch(error=>console.error(error))
  })
  // it('create a new entity', (done)=>{
  //   axios({url: `${URL}/books`, 
  //   method: 'post', 
  //   adapter: require('axios/lib/adapters/http'),
  //   data: {
  //     authorName: 'Douglas Crockford',
  //     bookName: 'JavaScript: The Good Parts'
  //   }
  // })
  //   .then((response)=>{
  //     // console.log(response)
  //     expect(response.status).toEqual(201)
  //     expect(response.data.id).toBeTruthy()
  //     id = response.data.id
  //     done()
  //   })
  //   .catch(error=>console.error(error))
  // }) 
  // it('update an entity', (done)=>{
  //   axios({url: `${URL}/books/${id}`, 
  //   method: 'put', 
  //   adapter: require('axios/lib/adapters/http'),
  //   data: {
  //     authorName: 'Azat Mardan',
  //     bookName: 'React Quickly'
  //   }
  // })
  //   .then((response)=>{
  //     // console.log(response)
  //     expect(response.status).toEqual(200)
  //     expect(response.data.authorName).toEqual('Azat Mardan')
  //     done()
  //   })
  //   .catch(error=>console.error(error))
  // })  
  // it('delete an entity', (done)=>{
  //   axios({url: `${URL}/books/${id}`, 
  //   method: 'delete', 
  //   adapter: require('axios/lib/adapters/http'),
  // })
  //   .then((response)=>{
  //     // console.log(response)
  //     expect(response.status).toEqual(204)
  //     done()
  //   })
  //   .catch(error=>console.error(error))
  // })    
})
afterAll((done)=>{
  server.close()
})