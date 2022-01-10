const { fetchData, calculateScrapingStatus, calculateScrapingStatusAll } = require("./utils")


async function getFirstProcessToScrape() {
  await fetchData()
  return calculateScrapingStatus()
}

async function listAllProcessStatus() {
  await fetchData()
  return calculateScrapingStatusAll()
}

module.exports = {
  getFirstProcessToScrape,
  listAllProcessStatus
}
