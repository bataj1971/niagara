import { IntegerInput } from "./IntegerInput";

export interface InputSettings {
  fieldName: string;
  dataFieldName?: string;
  class?: string;
  classes?: string[];
  label?: string;
  tagname?: string;
  inputTag?: string;
  inputType?: string;
  options?: DropDownOptions;
  initalValue?: any;
  required?: boolean;
  col?: number;
  row?: number;
  enabled?: boolean;
  createOnly?: boolean;
  defaultValue?: any;
  readonly?: boolean;
  onClick?: EventListener;
  
}


export interface DropDownOptions { 
    [key:string] : string
}