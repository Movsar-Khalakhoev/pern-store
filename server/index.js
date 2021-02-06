const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const error = require('./middlewares/error.middleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', require('./routes'))

// Обработка ошибок
app.use(error)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT)
  } catch (e) {
    console.log(e)
  }
}

start().then(() => console.log(`Server started on port ${PORT}`))
