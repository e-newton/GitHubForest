const app = require('app')
console.log("Hello world!")
app.get('/', (req, res) => {
    res.send('Hello World!')
})