// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Lesson, UserLesson } = initSchema(schema);

export {
  User,
  Lesson,
  UserLesson
};