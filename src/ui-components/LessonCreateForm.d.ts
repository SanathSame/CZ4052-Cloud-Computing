/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LessonCreateFormInputValues = {
    level?: number;
    video?: string;
};
export declare type LessonCreateFormValidationValues = {
    level?: ValidationFunction<number>;
    video?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LessonCreateFormOverridesProps = {
    LessonCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    level?: PrimitiveOverrideProps<TextFieldProps>;
    video?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LessonCreateFormProps = React.PropsWithChildren<{
    overrides?: LessonCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LessonCreateFormInputValues) => LessonCreateFormInputValues;
    onSuccess?: (fields: LessonCreateFormInputValues) => void;
    onError?: (fields: LessonCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LessonCreateFormInputValues) => LessonCreateFormInputValues;
    onValidate?: LessonCreateFormValidationValues;
} & React.CSSProperties>;
export default function LessonCreateForm(props: LessonCreateFormProps): React.ReactElement;
