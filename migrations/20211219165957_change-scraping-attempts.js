
exports.up = function(knex) {
  return knex.schema.dropTable('ScrapingAttempts')
  .createTable('ScrapingAttempts', tbl => {
    tbl.increments('id')
      .primary()
      .notNullable();
    tbl.string('identifier1')
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
  return knex.schema.dropTable('ScrapingAttempts')
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
