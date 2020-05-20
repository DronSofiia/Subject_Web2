const path = require('path')

// встановлюємо express
const express = require('express')
const app = express()

// встановлюємо директорію для віддачі статичного контенту (каталог проекту)
app.use(express.static(__dirname))

// налаштовуємо роботу із шаблонізаотором
app.set('views', path.join(__dirname, '/static/views'))
app.set('view engine', 'pug')

// налаштовуємо маршрутизацію
app.get('/', function (request, response) {
  response.render('pages/index', { title: 'Home' })
})
app.get('/shipinpiers', function (request, response) {
  response.render('pages/shipinpiers', { title: 'shipsInPiers' })
})
app.get('/port', function (request, response) {
  response.render('pages/port', { title: 'Port' })
})
app.get('/ship', function (request, response) {
  response.render('pages/ship', { title: 'ship' })
})
app.get('/piers', function (request, response) {
  response.render('pages/piers', { title: 'piers' })
})

// запускаємо аплікацію
app.listen(process.env.PORT || 8080)
