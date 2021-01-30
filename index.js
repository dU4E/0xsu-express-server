const fs = require('fs')
const bodyParser = require('body-parser')
const express = require('express')
const Web3 = require('web3')
const path = require('path')
const dotenv = require('dotenv').config({ path: path.resolve('.env')})
const app = express()
const port = 3001
const abi = JSON.parse(fs.readFileSync(process.env.ABI_PATH))
const contractAddr = process.env.CONTRACT_ADDRESS
const web3 = new Web3(Web3.givenProvider || process.env.PROVIDER_URL)

app.set('view engine', 'ejs')

app.get('/:short', async function (req, res) {
	const contract = new web3.eth.Contract(abi, contractAddr)
  let slug = req.params.short
  // grab the url and if it's been paid or not
  let destination = await contract.methods.getURL(slug).call()
  res.redirect(destination !== '"FAIL' ? destination : "/")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))