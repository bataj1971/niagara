import "./RelatedIdNameInput.scss";
import { BaseInput } from "./BaseInput";
import { InputSettings } from "./InputSettings";

export class RelatedIdNameInput extends BaseInput {
  private nameInputElement?: HTMLInputElement;

  constructor(settings: InputSettings) {
    settings.tagname = "related-id-name-input";
    settings.inputTag = "input";
    settings.inputType = "text";    
    super(settings);
  }

  createInputElement(): HTMLElement {
    const inputElement = super.createInputElement();
    inputElement.classList.add("id");

    this.nameInputElement = document.createElement("input");
    this.nameInputElement.type = "text";
    this.nameInputElement.classList.add('name');
    this.domElement.append(this.nameInputElement);
    return inputElement;
  }
}
