// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
import { Model } from 'objection';
import {book} from './book.model';

export class author extends Model {

  static get tableName() {
    return 'author';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name','email'],

      properties: {
        name: { type: 'string'  }, // Name of the author
        email: { type: 'string'  }, // Email of the author
      }
    };
  }
  static get relationMappings() {

    return {
      books: {
        relation: Model.HasManyRelation,
        modelClass: book,
        join: {
          from: 'author.id',
          to: 'book.authorId'
        }
      }
    } ;
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

  db.schema.hasTable('author').then(exists => {
    if (!exists) {
      db.schema.createTable('author', table => {
        table.increments('id');
        table.string('name');
        table.string('email');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created author table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating author table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating author table', e)); // eslint-disable-line no-console

  return author;
};
