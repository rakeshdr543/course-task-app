const app = require("./app")
const connectDB = require('./db/mongoose')

const port = process.env.PORT || 3000

app.listen(port, () => {
    connectDB()
    console.log(`Listening on port ${port}`)
})