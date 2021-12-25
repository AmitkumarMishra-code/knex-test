

exports.up = function(knex) {
  return knex.schema.createTable('LotRecords', tbl => {
    tbl.string('lotNumber')
      .primary()
      .notNullable();
    tbl.date('lastUpdated')
      .notNullable();
  })
  .createTable('Land', tbl => {
    tbl.string('lotNumber')
      .primary()
      .notNullable();
    tbl.date('lastUpdated')
      .notNullable();
  })
  .createTable('Contacts', tbl => {
    tbl.string('lotNumber')
      .primary()
      .notNullable();
    tbl.date('lastUpdated')
      .notNullable();
  })
  .createTable('Files', tbl => {
    tbl.string('lotNumber')
      .primary()
      .notNullable();
    tbl.date('lastUpdated')
      .notNullable();
  })
  .createTable('TriggerLotsRaw', tbl => {
    tbl.string('lotNumber')
      .primary()
      .notNullable();
    tbl.date('lastUpdated')
      .notNullable();
  })
  .createTable('ScrapingAttempts', tbl => {
    tbl.string('identifier1')
      .primary()
      .notNullable();
    tbl.string('identifierType1')
      .notNullable();
    tbl.string('source')
      .notNullable();
    tbl.string('result')
      .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('LotRecords')
             .dropTableIfExists('Land')
             .dropTableIfExists('Contacts')
             .dropTableIfExists('Files')
             .dropTableIfExists('TriggerLotsRaw')
             .dropTableIfExists('ScrapingAttempts');
};

