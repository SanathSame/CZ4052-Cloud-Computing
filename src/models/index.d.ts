import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly UserToLesson?: (UserLesson | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly UserToLesson: AsyncCollection<UserLesson>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerLesson = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Lesson, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly level?: number | null;
  readonly video?: string | null;
  readonly users?: (UserLesson | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLesson = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Lesson, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly level?: number | null;
  readonly video?: string | null;
  readonly users: AsyncCollection<UserLesson>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Lesson = LazyLoading extends LazyLoadingDisabled ? EagerLesson : LazyLesson

export declare const Lesson: (new (init: ModelInit<Lesson>) => Lesson) & {
  copyOf(source: Lesson, mutator: (draft: MutableModel<Lesson>) => MutableModel<Lesson> | void): Lesson;
}

type EagerUserLesson = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserLesson, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly lessonId?: string | null;
  readonly user: User;
  readonly lesson: Lesson;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserLesson = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserLesson, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly lessonId?: string | null;
  readonly user: AsyncItem<User>;
  readonly lesson: AsyncItem<Lesson>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserLesson = LazyLoading extends LazyLoadingDisabled ? EagerUserLesson : LazyUserLesson

export declare const UserLesson: (new (init: ModelInit<UserLesson>) => UserLesson) & {
  copyOf(source: UserLesson, mutator: (draft: MutableModel<UserLesson>) => MutableModel<UserLesson> | void): UserLesson;
}