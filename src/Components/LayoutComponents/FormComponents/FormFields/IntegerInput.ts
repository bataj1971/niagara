import "./IntegerInput.scss";
import { BaseInput } from "./BaseInput";
import { InputSettings } from "./InputSettings";


export class IntegerInput extends BaseInput {
  constructor(settings: InputSettings) {
    settings.tagname = "integer-input";
    settings.inputTag = "input";
    settings.inputType = "number";
    super(settings);
  }
  public setInputElementValue(value: any): void {
    (this.getInputElement() as HTMLInputElement).value = value;
  }
}
