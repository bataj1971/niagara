
import { BaseComponent } from "../../../BaseComponents/BaseComponent";

export class BaseInput extends BaseComponent {
  private inputElement: HTMLElement;
  private labelElement: HTMLElement;
  private label: string;
  private required = false;
  private inputType: string;
  private inputTag :string ;

  constructor(type:string, inputTag :string  = "input", inputType : string  = "text") {
      super(type);
      this.label = '';
      this.inputElement = this.createInputElement();
      this.labelElement = this.createLabelElement();
    this.inputTag = inputTag;
    this.inputType = inputType;
    this.render();
  }

    processSettings(settings: Object) {
        const labelSetting = { label: '' };
        Object.assign(labelSetting,settings);
    this.setLabel(labelSetting.label);
  }

  setBlocks(colspan = 6, rowspan = 1) {
    this.domElement.style.gridColumn = "span " + colspan;
    this.domElement.style.gridRow = "span " + rowspan;
  }

  createInputElement() : HTMLElement {
    const inputElement = document.createElement(this.inputTag);

    if (this.inputType) {
      (this.inputElement as HTMLInputElement).type = this.inputType;
    }
    return inputElement;
    
  }

  createLabelElement() : HTMLElement  {
      const labelElement = document.createElement("label");
      return labelElement;
  }

  render() {
    this.createLabelElement();
    this.createInputElement();
  }

  getValue() {
    return (this.inputElement as HTMLInputElement).value;  
  }

  setValue(value :any) {}

  getInputElement() :HTMLElement {
    return this.inputElement;
  }

  setInputElement(element : HTMLElement) {
    this.inputElement = element;
  }

  getLabel() :string  {
    return this.label;
  }

  setLabel(label = "") {
    if (this.labelElement) {
      this.label = label ? label + ":" : "";
      this.labelElement.innerHTML = this.label;
    }
  }

  isRequired() :boolean {
    return this.required;
  }
  setRequired(required = false) {
    this.required = required;
  }
}

