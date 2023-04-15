import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerLabel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Label, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly S3_path?: string | null;
  readonly labels?: (boolean | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLabel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Label, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly S3_path?: string | null;
  readonly labels?: (boolean | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Label = LazyLoading extends LazyLoadingDisabled ? EagerLabel : LazyLabel

export declare const Label: (new (init: ModelInit<Label>) => Label) & {
  copyOf(source: Label, mutator: (draft: MutableModel<Label>) => MutableModel<Label> | void): Label;
}