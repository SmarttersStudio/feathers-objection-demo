// Initializes the `author` service on path `/author`
import { Author } from './author.class';

import createModel from '../../models/author.model';
import hooks from './author.hooks';

export default function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    whitelist:['$eager','$joinRelation'],
    allowedEager:'[books]',
    allowedUpsert: '[books]'
  };

  // Initialize our service with any options it requires
  app.use('/author', new Author(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('author');

  service.hooks(hooks);
};
