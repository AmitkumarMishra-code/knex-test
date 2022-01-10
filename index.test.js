const { comparisonData, processScrapingStatus, comparisonData1, processScrapingStatus1 } = require("./testData");
const { checkForManualOverride, checkForOutdatedData, checkPreviousAttemptForErrors, fetchData, calculateScrapingStatus } = require("./utils")

describe("Determine scraping statuses", () => {

  beforeAll(() => jest.useFakeTimers())

  it("finds manual override", () => {

    const lotDetails = {lotNumber: '1111', lastUpdated: '2022-01-06'}

    const status = checkForManualOverride(lotDetails, comparisonData)

    expect(status).toEqual({
        status: true,
        process: 'LotRecords'
      })
  })
  
  it("finds outdated data", () => {

    const lotDetails = {lotNumber: '1111', lastUpdated: '2022-01-06'}

    const status = checkForOutdatedData(lotDetails.lotNumber, comparisonData)

    expect(status).toEqual({
      status: true,
      process: 'Land'
    })

  })

  it("finds error in last scraping attempt", () => {

    const lotNumber = '1111'

    const status = checkPreviousAttemptForErrors(lotNumber, processScrapingStatus)

    expect(status).toEqual({
      status: true,
      process: 'StreetView'
    })
  })

  it("finds first process where lotNumber has not been scraped", () => {

    const lotDetails = {lotNumber: '1112', lastUpdated: '2021-12-31'}

    const status = checkForManualOverride(lotDetails, comparisonData)

    expect(status).toEqual({
        status: true,
        process: 'Land'
      })
  })

  it("returns null when nothing has to be scraped", () => {

    const triggerLots = {
      '11111':'2021-12-31',
      '11112':'2021-12-31',
      '11113':'2021-12-31'
    }

    const result = calculateScrapingStatus(triggerLots, {recordsLastUpdated: comparisonData1, processScrapingStatus: processScrapingStatus1})

    expect(result).toEqual(null)
  })

  
  it("finds first process where lotNumber has not been scraped from database data", async() => {
    
    await fetchData()
    const lotDetails = {lotNumber: '11112', lastUpdated: '2021-12-31'}

    const status = checkForManualOverride(lotDetails)

    expect(status).toEqual({
        status: true,
        process: 'LotRecords'
      })
  })

  afterAll(() => jest.useRealTimers())

})  