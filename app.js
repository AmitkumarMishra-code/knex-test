require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const { checkLotRecordsLastUpdated } = require('.')

const app = express()

app.use(cors())
app.use(authchecker)

app.get('/', async(req, res) => {
  try{
    const lotToScrape = await checkLotRecordsLastUpdated()
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