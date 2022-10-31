import "./DateInput.scss";
import { BaseInput } from "./BaseInput";
import { InputSettings } from "./InputSettings";

export class DateInput extends BaseInput {
  constructor(settings: InputSettings) {
    settings.tagname = "date-input";
    settings.inputTag = "input";
    settings.inputType = "date";
    super(settings);

    // this.processSettings(settings);
  }
}
