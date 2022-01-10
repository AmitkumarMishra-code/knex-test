require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const { getFirstProcessToScrape, listAllProcessStatus } = require('.')

const app = express()

app.use(cors())
app.use(authchecker)

app.get('/next', async(req, res) => {
  try{
    const lotToScrape = await getFirstProcessToScrape()
    if(lotToScrape){
      res.status(200).json(lotToScrape)
    }
    else{
      res.status(201).json({message: 'All lots up-to-date!'})
    }
  }
  catch(err){
    res.status(400).json({message: err.message})
  }
})

app.get('/all', async(req, res) => {
  try{
    const list = await listAllProcessStatus()
    res.status(200).json(list)
  }
  catch(err){
    res.status(400).json({message: err.message})
  }
})

app.all(/.*/, (req, res) => {
  res.status(404).json({ message: 'Invalid endpoint.' })
})

async function authchecker(req, res, next){
  try{
    const encryptedPassword = req.headers['authorization'].split(' ')[1]
    if(await bcrypt.compare(process.env.SERVER_PASSWORD, encryptedPassword)){
      next()
    }
    else{
      res.status(401).json({ message: 'Unauthorized!' })
    }
  }
  catch(err){
    res.status(401).json({ message: 'Unauthorized!' })
  }
}


const PORT = process.env.PORT || 4000
app.listen(PORT, async() => {
  console.log(`Server is running on http://localhost:${PORT}`)
})