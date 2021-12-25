const knex = require('knex')
const config = require('./knexfile')
const db = knex(config.development)

const getLotRecordsLastUpdated = async() => {
  return await db('TriggerLotsRaw')
      .leftJoin('LotRecords', 'TriggerLotsRaw.lotNumber', 'LotRecords.lotNumber')
      .select(
          'TriggerLotsRaw.lotNumber as lotNumber',
          'LotRecords.lastUpdated as lastUpdated',
      )
}

const getLandRecordsLastUpdated = async() => {
  return await db('TriggerLotsRaw')
      .leftJoin('Land', 'TriggerLotsRaw.lotNumber', 'Land.lotNumber')
      .select(
          'TriggerLotsRaw.lotNumber as lotNumber',
          'Land.lastUpdated as lastUpdated',
      )
}

const getContactsLastUpdated = async() => {
  return await db('TriggerLotsRaw')
      .leftJoin('Contacts', 'TriggerLotsRaw.lotNumber', 'Contacts.lotNumber')
      .select(
          'TriggerLotsRaw.lotNumber as lotNumber',
          'Contacts.lastUpdated as lastUpdated',
      )
}

const getFilesLastUpdated = async() => {
  return await db('TriggerLotsRaw')
      .leftJoin('Files', 'TriggerLotsRaw.lotNumber', 'Files.lotNumber')
      .select(
          'TriggerLotsRaw.lotNumber as lotNumber',
          'Files.lastUpdated as lastUpdated',
      )
}

const getTriggerLotsLastUpdated = async() => {
  return await db('TriggerLotsRaw')
      .select(
          'lotNumber',
          'lastUpdated as lastUpdated',
      )
}

const getStreetViewScrapingStatus = async() => {
  return await db('TriggerLotsRaw')
      .leftJoin('ScrapingAttempts', 'TriggerLotsRaw.lotNumber', 'ScrapingAttempts.identifier1')
      .select(
          'TriggerLotsRaw.lotNumber as lotNumber',
          'ScrapingAttempts.result as result'
      )
      .where({
          source: 'streetView'
      })
}

const getSatelliteViewScrapingStatus = async() => {
  return await db('TriggerLotsRaw')
      .leftJoin('ScrapingAttempts', 'TriggerLotsRaw.lotNumber', 'ScrapingAttempts.identifier1')
      .select(
          'TriggerLotsRaw.lotNumber as lotNumber',
          'ScrapingAttempts.result as result'
      )
      .where({
          source: 'satelliteView'
      })
}

const getCadastralMapScrapingStatus = async() => {
  return await db('TriggerLotsRaw')
      .leftJoin('ScrapingAttempts', 'TriggerLotsRaw.lotNumber', 'ScrapingAttempts.identifier1')
      .select(
          'TriggerLotsRaw.lotNumber as lotNumber',
          'ScrapingAttempts.result as result'
      )
      .where({
          source: 'cadastralMap'
      })
}

const getLotRecordsScrapingStatus = async() => {
  return await db('TriggerLotsRaw')
      .leftJoin('ScrapingAttempts', 'TriggerLotsRaw.lotNumber', 'ScrapingAttempts.identifier1')
      .select(
          'TriggerLotsRaw.lotNumber as lotNumber',
          'ScrapingAttempts.result as result'
      )
      .where({
          source: 'lot_register'
      })
}

const getLandRecordsScrapingStatus = async() => {
  return await db('TriggerLotsRaw')
      .leftJoin('ScrapingAttempts', 'TriggerLotsRaw.lotNumber', 'ScrapingAttempts.identifier1')
      .select(
          'TriggerLotsRaw.lotNumber as lotNumber',
          'ScrapingAttempts.result as result'
      )
      .where({
          source: 'land_register'
      })
}

const getContactsScrapingStatus = async() => {
  return await db('TriggerLotsRaw')
      .leftJoin('ScrapingAttempts', 'TriggerLotsRaw.lotNumber', 'ScrapingAttempts.identifier1')
      .select(
          'TriggerLotsRaw.lotNumber as lotNumber',
          'ScrapingAttempts.result as result'
      )
      .where({
          source: 'business_register'
      })
}

module.exports = {
  getStreetViewScrapingStatus,
  getTriggerLotsLastUpdated,
  getLotRecordsLastUpdated,
  getLandRecordsLastUpdated,
  getContactsLastUpdated,
  getFilesLastUpdated,
  getSatelliteViewScrapingStatus,
  getCadastralMapScrapingStatus,
  getLotRecordsScrapingStatus,
  getLandRecordsScrapingStatus,
  getContactsScrapingStatus
}