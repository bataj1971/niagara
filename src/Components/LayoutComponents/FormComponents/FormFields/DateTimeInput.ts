import "./DateTimeInput.scss";
import { BaseInput } from "./BaseInput";
import { InputSettings } from "./InputSettings";

export class DateTimeInput extends BaseInput {
  constructor(settings: InputSettings) {
    settings.tagname = "date-time-input";
    settings.inputTag = "input";
    settings.inputType = "datetime-local";
    super(settings);
  }
}
