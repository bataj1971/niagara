import { BaseInput } from "./BaseInput";
import "./DropDownInput.scss";
import { DropDownOptions, InputSettings } from "./InputSettings";

export class DropDownInput extends BaseInput {
  constructor(settings: InputSettings) {
    settings.tagname = "dropdown-input";
    settings.inputTag = "select";
    settings.inputType = "";
    super(settings);
  }

  protected render() {
    this.createLabelElement();
    if (this.settings.options) {
      const options: Map<string, string> = new Map(
        Object.entries(this.settings.options as DropDownOptions)
      );

      options.forEach((value: string, key: string) => {
        const optionElement = document.createElement(
          "option"
        ) as HTMLOptionElement;
        optionElement.innerHTML = value;
        optionElement.setAttribute("value", key);
        this.getInputElement().append(optionElement);
      });
    } else {
      console.error("no oprions defined for dropdown", this);
    } 
    this.createErrorMessageElement();
  }
  

  // processSettings(settings: InputSettings) {
  //   super.processSettings(settings);
  // }
}
