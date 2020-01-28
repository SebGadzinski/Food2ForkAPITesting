const express = require('express') //express framework
const http_request = require('request') //helpful npm module for easy http requests
const PORT = process.env.PORT || 3000 //allow environment variable to possible set PORT

let API_KEY = 'fa66ab03ca03469eccb8464fb0b7ec1c' //My food2fork API KEY

const app = express()

//Middleware
app.use(express.static(__dirname + '/public')) //static server

//Routes

//All routes are the same as they all need the same code

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get('/recipes.html', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')

})
app.get('/recipes', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')

})
app.get('/index.html', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

//This is the link which gets the correct foods depending on the ingredients
app.get('/getrecipes', (request, response) => {
  let ingredient = request.query.ingredient
  let url = ''
  //if no ingredient just send the normal home page foods
  if(!ingredient) {
    url = `https://food2fork.com/api/search?key=${API_KEY}`
  }
  //if there is send the foods containing the ingredient
  else {
    url = `https://food2fork.com/api/search?key=${API_KEY}&q=${ingredient}`
  }
  //get data
  http_request.get(url, (err, res, data) => {
    return response.contentType('application/json').json(JSON.parse(data))
  })
})
//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT}`)
    console.log(`To Test:`)
    console.log(`http://localhost:3000`)
    console.log(`http://localhost:3000/`)
    console.log(`http://localhost:3000/index.html`)
    console.log(`http://localhost:3000/recipes`)
    console.log(`http://localhost:3000/recipes.html`)
    console.log(`http://localhost:3000/recipes?ingredient=Basil,Cumin`);
  }
})
