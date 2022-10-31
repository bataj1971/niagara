import "./TextInput.scss";
import { BaseInput } from "./BaseInput";
import { InputSettings } from "./InputSettings";

export class TextInput extends BaseInput {
  constructor(settings: InputSettings) {    
    settings.tagname = "text-input";
    settings.inputTag = "input";
    settings.inputType = settings.inputType ?? "text";
    super(settings);

    this.domElement.addEventListener("change", () => {
      this.setValue();
    });

    this.inputElement.setAttribute('spellcheck','false');
  }

  public handleKeyDown(e: KeyboardEvent) {
    console.log("Textinput handleKeyDown ", e);
  }

  public setInputElementValue(value: any): void {    
    (this.getInputElement() as HTMLInputElement).value = value;
  }
  
  public getValue(): any {
    return (this.getInputElement() as HTMLInputElement).value;
  }
}
