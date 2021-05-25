import { Model } from 'objection';

export default function (app) {
  const { client, connection } = app.get('mysql');
  const knex = require('knex')({ client, connection, useNullAsDefault: false });

  Model.knex(knex);

  app.set('knex', knex);
};
