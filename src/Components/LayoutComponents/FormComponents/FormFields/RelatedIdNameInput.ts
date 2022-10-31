import "./RelatedIdNameInput.scss";
import { BaseInput } from "./BaseInput";
import { InputSettings } from "./InputSettings";

export class RelatedIdNameInput extends BaseInput {
  private nameInputElement: HTMLElement;

  constructor(settings: InputSettings) {
    settings.tagname = "related-id-name-input";
    settings.inputTag = "input";
    settings.inputType = "text";
    super(settings);

    this.nameInputElement = document.createElement("input");
    (this.nameInputElement as HTMLInputElement).type = "text";
    this.nameInputElement.classList.add("name");
    this.getInputElement().classList.add("id");
    this.domElement.append(this.nameInputElement);

    Object.assign(settings, { columns: 12 });
    
  }
}
