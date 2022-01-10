const {
    getLotRecordsLastUpdated,
    getLandRecordsLastUpdated,
    getContactsLastUpdated,
    getFilesLastUpdated,
    getTriggerLotsLastUpdated,
    getStreetViewScrapingStatus,
    getSatelliteViewScrapingStatus,
    getCadastralMapScrapingStatus,
    getLotRecordsScrapingStatus,
    getLandRecordsScrapingStatus,
    getContactsScrapingStatus
} = require("./db_calls")

const NINETY_DAYS_AGO = Date.now() - (90 * 86400000)

let recordsLastUpdated, processScrapingStatus, lotRecordsLastUpdated, landRecordsLastUpdated, contactsLastUpdated, filesLastUpdated, triggerLotsLastUpdated, streetViewScrapingStatus, satelliteViewScrapingStatus, cadastralMapScrapingStatus, lotRecordsScrapingStatus, landRecordsScrapingStatus, contactsScrapingStatus;

const createMap = (data, field) => {
    return data.reduce((map, lot) => {
        map[lot.lotNumber] = lot[field]
        return map
    }, {})
}

const fetchData = async() => {
    lotRecordsLastUpdated = createMap(await getLotRecordsLastUpdated(), 'lastUpdated')

    landRecordsLastUpdated = createMap(await getLandRecordsLastUpdated(), 'lastUpdated')

    contactsLastUpdated = createMap(await getContactsLastUpdated(), 'lastUpdated')

    filesLastUpdated = createMap(await getFilesLastUpdated(), 'lastUpdated')

    triggerLotsLastUpdated = createMap(await getTriggerLotsLastUpdated(), 'lastUpdated')

    streetViewScrapingStatus = createMap(await getStreetViewScrapingStatus(), 'result')

    satelliteViewScrapingStatus = createMap(await getSatelliteViewScrapingStatus(), 'result')

    cadastralMapScrapingStatus = createMap(await getCadastralMapScrapingStatus(), 'result')

    lotRecordsScrapingStatus = createMap(await getLotRecordsScrapingStatus(), 'result')

    landRecordsScrapingStatus = createMap(await getLandRecordsScrapingStatus(), 'result')

    contactsScrapingStatus = createMap(await getContactsScrapingStatus(), 'result')

    recordsLastUpdated = [
        { data: lotRecordsLastUpdated, processName: "LotRecords" },
        { data: landRecordsLastUpdated, processName: "Land" },
        { data: contactsLastUpdated, processName: "Contacts" },
        { data: filesLastUpdated, processName: "Files" }
    ]

    processScrapingStatus = [
        { data: lotRecordsScrapingStatus, processName: "LotRecords" },
        { data: landRecordsScrapingStatus, processName: "Land" },
        { data: contactsScrapingStatus, processName: "Contacts" },
        { data: streetViewScrapingStatus, processName: "StreetView" },
        { data: satelliteViewScrapingStatus, processName: "SatelliteView" },
        { data: cadastralMapScrapingStatus, processName: "CadastralMap" }
    ]

}



const checkForManualOverride = (lotDetails, comparisonData = recordsLastUpdated) => {
    for (let process of comparisonData) {
        if (!process.data[lotDetails.lotNumber] || lotDetails.lastUpdated > process.data[lotDetails.lotNumber]) {
            return { status: true, process: process.processName }
        }
    }
    return { status: false }
}

const checkForOutdatedData = (lotNumber, comparisonData = recordsLastUpdated) => {
    for (let process of comparisonData) {
        if (!process.data[lotNumber] || Date.parse(process.data[lotNumber]) <= NINETY_DAYS_AGO) {
            return { status: true, process: process.processName }
        }
    }
    return { status: false }
}

const checkPreviousAttemptForErrors = (lotNumber, comparisonData = processScrapingStatus) => {
    for (let process of comparisonData) {
        if (!process.data[lotNumber] || process.data[lotNumber] === 'ERROR') {
            return { status: true, process: process.processName }
        }
    }
    return { status: false }
}


function calculateScrapingStatus(triggerLotsLastUpdated, comparisonData){
    console.log(triggerLotsLastUpdated)
    
    for (lot in triggerLotsLastUpdated) {
  
      const manualOverrideCheck = checkForManualOverride(
        {lastUpdated : triggerLotsLastUpdated[lot], lotNumber: lot}, 
        comparisonData ? comparisonData.recordsLastUpdated : undefined
        )
      if (manualOverrideCheck.status) {
          return { processName: manualOverrideCheck.process, lotNumber:lot, type: "Manual Override" }
      }
  
      const outdatedDataCheck = checkForOutdatedData(
        lot, 
        comparisonData ? comparisonData.recordsLastUpdated : undefined
        )
      if(outdatedDataCheck.status){
        return { processName: outdatedDataCheck.process, lotNumber: lot, type: "Outdated Data" }
      }
  
      const previousAttemptErrorCheck = checkPreviousAttemptForErrors(
        lot, 
        comparisonData ? comparisonData.processScrapingStatus : undefined
        )
      if(previousAttemptErrorCheck.status){
        return { processName: previousAttemptErrorCheck.process, lotNumber: lot, type: "Error" }
      }
  
    }
    return null
  }

module.exports = {
    checkForManualOverride,
    fetchData,
    checkForOutdatedData,
    checkPreviousAttemptForErrors,
    calculateScrapingStatus
}