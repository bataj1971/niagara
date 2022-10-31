import { BaseButton } from "./BaseButton";
import { InputSettings } from "./InputSettings";
import "./SimpleButton.scss";

export class SimpleButton extends BaseButton {
  constructor(settings: InputSettings) {
    settings.tagname = "simple-button";
    super(settings);
    // this.processSettings(settings);
  }
}
