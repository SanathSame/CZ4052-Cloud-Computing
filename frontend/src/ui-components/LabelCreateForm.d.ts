/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LabelCreateFormInputValues = {
    S3_path?: string;
    labels?: boolean[];
};
export declare type LabelCreateFormValidationValues = {
    S3_path?: ValidationFunction<string>;
    labels?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LabelCreateFormOverridesProps = {
    LabelCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    S3_path?: PrimitiveOverrideProps<TextFieldProps>;
    labels?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type LabelCreateFormProps = React.PropsWithChildren<{
    overrides?: LabelCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LabelCreateFormInputValues) => LabelCreateFormInputValues;
    onSuccess?: (fields: LabelCreateFormInputValues) => void;
    onError?: (fields: LabelCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LabelCreateFormInputValues) => LabelCreateFormInputValues;
    onValidate?: LabelCreateFormValidationValues;
} & React.CSSProperties>;
export default function LabelCreateForm(props: LabelCreateFormProps): React.ReactElement;
