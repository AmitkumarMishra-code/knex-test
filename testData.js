const lotRecordsLastUpdated = {'1111':'2021-12-31', '1112': '2021-12-31'}
const landRecordsLastUpdated = {'1111': '2021-09-01'}
const contactsLastUpdated = {'1111': '2021-12-12'}
const filesLastUpdated = {'1111': '2021-12-13'}
const lotRecordsScrapingStatus = {'1111': 'SUCCESS'}
const landRecordsScrapingStatus = {'1111': 'SUCCESS'}
const contactsScrapingStatus = {'1111': 'SUCCESS'}
const streetViewScrapingStatus = {'1111': 'ERROR'}
const satelliteViewScrapingStatus = {'1111': 'SUCCESS'}
const cadastralMapScrapingStatus = {'1111': 'SUCCESS'}

const comparisonData = [
  { data: lotRecordsLastUpdated, processName: "LotRecords" },
  { data: landRecordsLastUpdated, processName: "Land" },
  { data: contactsLastUpdated, processName: "Contacts" },
  { data: filesLastUpdated, processName: "Files" }
]

const processScrapingStatus = [
  { data: lotRecordsScrapingStatus, processName: "LotRecords" },
  { data: landRecordsScrapingStatus, processName: "Land" },
  { data: contactsScrapingStatus, processName: "Contacts" },
  { data: streetViewScrapingStatus, processName: "StreetView" },
  { data: satelliteViewScrapingStatus, processName: "SatelliteView" },
  { data: cadastralMapScrapingStatus, processName: "CadastralMap" }
]

const lotRecordsLastUpdated1 = {'11111':'2021-12-31', '11112': '2021-12-31', '11113': '2021-12-31'}
const landRecordsLastUpdated1 = {'11111':'2021-12-31', '11112': '2021-12-31', '11113': '2021-12-31'}
const contactsLastUpdated1 = {'11111':'2021-12-31', '11112': '2021-12-31', '11113': '2021-12-31'}
const filesLastUpdated1 = {'11111':'2021-12-31', '11112': '2021-12-31', '11113': '2021-12-31'}
const lotRecordsScrapingStatus1 = {'11111':'SUCCESS', '11112': 'SUCCESS', '11113': 'SUCCESS'}
const landRecordsScrapingStatus1 = {'11111':'SUCCESS', '11112': 'SUCCESS', '11113': 'SUCCESS'}
const contactsScrapingStatus1 = {'11111':'SUCCESS', '11112': 'SUCCESS', '11113': 'SUCCESS'}
const streetViewScrapingStatus1 = {'11111':'SUCCESS', '11112': 'SUCCESS', '11113': 'SUCCESS'}
const satelliteViewScrapingStatus1 = {'11111':'SUCCESS', '11112': 'SUCCESS', '11113': 'SUCCESS'}
const cadastralMapScrapingStatus1 = {'11111':'SUCCESS', '11112': 'SUCCESS', '11113': 'SUCCESS'}

const comparisonData1 = [
  { data: lotRecordsLastUpdated1, processName: "LotRecords" },
  { data: landRecordsLastUpdated1, processName: "Land" },
  { data: contactsLastUpdated1, processName: "Contacts" },
  { data: filesLastUpdated1, processName: "Files" }
]

const processScrapingStatus1 = [
  { data: lotRecordsScrapingStatus1, processName: "LotRecords" },
  { data: landRecordsScrapingStatus1, processName: "Land" },
  { data: contactsScrapingStatus1, processName: "Contacts" },
  { data: streetViewScrapingStatus1, processName: "StreetView" },
  { data: satelliteViewScrapingStatus1, processName: "SatelliteView" },
  { data: cadastralMapScrapingStatus1, processName: "CadastralMap" }
]

module.exports = {
  comparisonData,
  processScrapingStatus,
  comparisonData1,
  processScrapingStatus1
}
