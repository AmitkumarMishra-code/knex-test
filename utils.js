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

let dataToProcessTime, dataToProcessStatus, lotRecordsLastUpdated, landRecordsLastUpdated, contactsLastUpdated, filesLastUpdated, triggerLotsLastUpdated, streetViewScrapingStatus, satelliteViewScrapingStatus, cadastralMapScrapingStatus, lotRecordsScrapingStatus, landRecordsScrapingStatus, contactsScrapingStatus;

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

    dataToProcessTime = [
        { data: lotRecordsLastUpdated, processName: "LotRecords" },
        { data: landRecordsLastUpdated, processName: "Land" },
        { data: contactsLastUpdated, processName: "Contacts" },
        { data: filesLastUpdated, processName: "Files" }
    ]

    dataToProcessStatus = [
        { data: lotRecordsScrapingStatus, processName: "LotRecords" },
        { data: landRecordsScrapingStatus, processName: "Land" },
        { data: contactsScrapingStatus, processName: "Contacts" },
        { data: streetViewScrapingStatus, processName: "StreetView" },
        { data: satelliteViewScrapingStatus, processName: "SatelliteView" },
        { data: cadastralMapScrapingStatus, processName: "CadastralMap" }
    ]

}



const checkForManualOverride = (lotNumber) => {
    for (let process of dataToProcessTime) {
        if (triggerLotsLastUpdated[lotNumber] >= process.data[lotNumber]) {
            return { status: true, process: process.processName, lotNumber: lotNumber }
        }
    }
    return { status: false }
}

const checkForOutdatedData = (lotNumber) => {
    for (let process of dataToProcessTime) {
        if (Date.parse(process.data[lotNumber]) <= NINETY_DAYS_AGO) {
            return { status: true, process: process.processName, lotNumber: lotNumber }
        }
    }
    return { status: false }
}

const checkPreviousAttemptForErrors = (lotNumber) => {
    for (let process of dataToProcessStatus) {
        if (process.data[lotNumber] === 'ERROR') {
            return { status: true, process: process.processName, lotNumber: lotNumber }
        }
    }
    return { status: false }
}


module.exports = {
    checkForManualOverride,
    fetchData,
    checkForOutdatedData,
    checkPreviousAttemptForErrors
}