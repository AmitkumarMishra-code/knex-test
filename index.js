const { getTriggerLotsLastUpdated } = require("./db_calls")
const { fetchData, calculateScrapingStatus } = require("./utils")


async function checkLotRecordsLastUpdated() {

  await fetchData()

    const triggerLotsLastUpdated = (await getTriggerLotsLastUpdated())
        .reduce((map, lot) => {
            map[lot.lotNumber] = lot.lastUpdated
            return map
        }, {})

    return calculateScrapingStatus(triggerLotsLastUpdated)

}

async function main() {
    const lotToScrape = await checkLotRecordsLastUpdated()
    console.log(lotToScrape)
}

main()
