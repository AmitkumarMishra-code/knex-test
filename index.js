const { getTriggerLotsLastUpdated } = require("./db_calls")
const { checkForManualOverride, fetchData, checkForOutdatedData, checkPreviousAttemptForErrors } = require("./utils")


async function checkLotRecordsLastUpdated() {

  await fetchData()

    const triggerLotsLastUpdated = (await getTriggerLotsLastUpdated())
        .reduce((map, lot) => {
            map[lot.lotNumber] = lot.triggerLotsLastUpdated
            return map
        }, {})

    for (lot in triggerLotsLastUpdated) {

        const manualOverrideCheck = checkForManualOverride(lot)
        if (manualOverrideCheck.status) {
            return { processName: manualOverrideCheck.process, lotNumber: manualOverrideCheck.lotNumber, type: "Manual Override" }
        }

        const outdatedDataCheck = checkForOutdatedData(lot)
        if(outdatedDataCheck.status){
          return { processName: outdatedDataCheck.process, lotNumber: outdatedDataCheck.lotNumber, type: "Outdated Data" }
        }

        const previousAttemptErrorCheck = checkPreviousAttemptForErrors(lot)
        if(previousAttemptErrorCheck.status){
          return { processName: previousAttemptErrorCheck.process, lotNumber: previousAttemptErrorCheck.lotNumber, type: "Error" }
        }
    }
}




async function main() {
    const lotToScrape = await checkLotRecordsLastUpdated()
    console.log(lotToScrape)
}

main()