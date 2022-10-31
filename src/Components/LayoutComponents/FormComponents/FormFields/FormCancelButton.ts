import { BaseButton } from "./BaseButton";
import "./FormCancelButton.scss";
import { InputSettings } from "./InputSettings";

export class FormCancelButton extends BaseButton {
  constructor(settings: InputSettings) {
    settings.tagname = "form-cancel-button";
    settings.label = "Cancel";
    super(settings);    
  }
}
