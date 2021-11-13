import { BaseInput } from "./BaseInput";
import "./DropDownInput.scss";

export class DropDownInput extends BaseInput {
  constructor(settings: object) {
    super("dropdown-input", "select", "", settings);
    //     this.processSettings(settings);
    this.render();
  }

  render() {
    if (this.settings.has("options")) {
        const options: Map<string, string> = new Map(
        Object.entries(this.settings.get("options") as Object)
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
  }
  processSettings(settings: object) {
    super.processSettings(settings);    
  }
}
