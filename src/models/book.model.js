// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { Model } from 'objection';

export class book extends Model {

  static get tableName() {
    return 'book';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name','authorId'],

      properties: {
        name: { type: 'string' } ,
        authorId: { type: 'integer' }
      }
    };
  }


  $beforeInsert() {
    const date = new Date();
    const dateFormat = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    this.createdAt = this.updatedAt = dateFormat;
  }

  $beforeUpdate() {
    const date = new Date();
    const dateFormat = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    this.updatedAt = dateFormat;
  }
}

export default function (app) {
  const db = app.get('knex');

  db.schema.hasTable('book').then(exists => {
    if (!exists) {
      db.schema.createTable('book', table => {
        table.increments('id');
        table.string('name');
        table.integer('authorId');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created book table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating book table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating book table', e)); // eslint-disable-line no-console

  return book;
};
