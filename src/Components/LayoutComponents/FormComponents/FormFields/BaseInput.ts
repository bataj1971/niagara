import { BaseComponent } from "../../../BaseComponents/BaseComponent";

export class BaseInput extends BaseComponent {
  private inputElement: HTMLElement;
  private labelElement?: HTMLElement;
  private label: string;
  private required = false;
  private inputType: string;
  private inputTag: string;
  protected settings: Map<string, any>;

  constructor(
    tagname: string,
    inputTag: string = "input",
    inputType: string = "text",
    settings: object = {}
  ) {
    super(tagname);
    this.label = "";
    this.inputTag = inputTag;
    this.inputType = inputType;
    this.settings = new Map(Object.entries(settings));
    this.processSettings(settings);
    if (this.label) {
      this.labelElement = this.createLabelElement();
      this.domElement.append(this.labelElement);
      this.setLabel(this.label);
    }
    
    

    this.inputElement = this.createInputElement();
    this.domElement.append(this.inputElement);

    // this.render();
  }

  processSettings(settings: object = {}) {
    const newSettings = new Map(Object.entries(settings));
    // todo merge new entries into settings map

    // const labelSetting = { label: "" };
    // Object.assign(labelSetting, settings);

    // label
    if (this.settings.has('label')) this.setLabel(this.settings.get("label"));
    
  }

  setBlocks(colspan = 6, rowspan = 1) {
    this.domElement.style.gridColumn = "span " + colspan;
    this.domElement.style.gridRow = "span " + rowspan;
  }

  createInputElement(): HTMLElement {
    const inputElement = document.createElement(this.inputTag);
    console.log("BaseInput:", this.inputTag, this.inputType, inputElement);

    if (this.inputType) {
      (<HTMLInputElement>inputElement).type = this.inputType;
    }
    return inputElement;
  }

  createLabelElement(): HTMLElement {
    const labelElement = document.createElement("label");
    return labelElement;
  }

  // render() {
  //   this.createLabelElement();
  //   this.createInputElement();
  // }

  getValue() {
    return (this.inputElement as HTMLInputElement).value;
  }

  setValue(value: any) {}

  getInputElement(): HTMLElement {
    return this.inputElement;
  }

  setInputElement(element: HTMLElement) {
    this.inputElement = element;
  }

  getLabel(): string {
    return this.label;
  }

  setLabel(label = "") {
      this.label = label ? label + ":" : "";
    
    if (this.labelElement) {    
      this.labelElement.innerHTML = this.label;
    }
  }

  isRequired(): boolean {
    return this.required;
  }
  setRequired(required = false) {
    this.required = required;
  }
}
