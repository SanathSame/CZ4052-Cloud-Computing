// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Label } = initSchema(schema);

export {
  Label
};