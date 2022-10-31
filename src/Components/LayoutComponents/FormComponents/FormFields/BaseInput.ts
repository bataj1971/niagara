import { BaseComponent } from "../../../BaseComponents/BaseComponent";
import { InputSettings } from "./InputSettings";

export abstract class BaseInput extends BaseComponent {
  protected inputElement: HTMLElement;
  protected labelElement?: HTMLElement;
  protected errorMessageElement?: HTMLElement;
  protected valid: boolean = true;
  protected enabled: boolean = true;
  protected settings: InputSettings;
  protected value: any;
  protected fieldName: string = "";
  protected errorMessage: string = "";

  protected customValidationFx?: Function;
  protected changeTriggerFunction: Function = function (
    fieldName: string,
    oldValue: any,
    newValue: any
  ) {
    console.log(
      "changefunction not implemented",
      fieldName,
      oldValue,
      newValue
    );
  };

  constructor(settings: InputSettings) {
    super(settings.tagname ?? "dummy-tag-name");

    this.fieldName = settings.fieldName;
    this.enabled = settings.enabled ?? true;
    this.domElement.setAttribute("formField", this.fieldName);

    this.settings = Object.assign({}, settings);

    this.processSettings(settings);
    this.inputElement = this.createInputElement();

    this.render();
    this.domElement.append(this.inputElement); 
    this.createErrorMessageElement();
  }
  public getFieldName() {
    return this.fieldName;
  }

  public setChangeFunction(fx: Function) {
    this.changeTriggerFunction = fx;
  }

  protected processSettings(settings: InputSettings) {
    Object.assign(this.settings, settings as InputSettings);
  }

  public setBlocks(colspan = 6, rowspan = 1) {
    this.domElement.style.gridColumn = "span " + colspan;
    this.domElement.style.gridRow = "span " + rowspan;
  }

  protected createInputElement(): HTMLElement {
    const inputElement = document.createElement(
      this.settings.inputTag ?? "input"
    );
    this.inputElement = inputElement;

    if (this.settings.inputType) {
      (<HTMLInputElement>inputElement).type = this.settings.inputType;
    }
    return inputElement;
  }

  protected createLabelElement() {
    this.labelElement = document.createElement("label");
    this.domElement.append(this.labelElement);
    this.setLabel();
  }

  protected createErrorMessageElement() {
    this.errorMessageElement = document.createElement("error-message");
    this.domElement.append(this.errorMessageElement);
    this.errorMessageElement.innerHTML = this.errorMessage ?? "??";
  }

  protected render() {
    this.createLabelElement();    
    // this.createErrorMessageElement();

    this.domElement.style.gridColumn = this.settings.col
      ? "span " + this.settings.col
      : "";
    //  this.createInputElement();
  }

  public getValue(): any {
    this.value = (this.inputElement as HTMLInputElement).value;
    return this.value;
  }

  /**
   * This should be implemented for each childclass separately
   * @param value
   */
  public setValue(value?: any) {
    // console.log("BaseInput setValue", value);
    value = value === undefined ? this.getInputElementValue() : value;
    if (value != undefined) {
      this.changeTriggerFunction(this.fieldName, this.value, value);
      this.value = value;
    }
    this.setInputElementValue(value);
  }

  public handleChange(value: any) {
    if (this.value != value) {
      this.changeTriggerFunction(this.fieldName, this.value, value);
    }
  }

  public setInputElementValue(value: any) {
    (this.inputElement as HTMLInputElement).value = value;
  }
  public getInputElementValue(): any {
    return (this.inputElement as HTMLInputElement).value;
  }

  public getInputElement(): HTMLElement {
    return this.inputElement;
  }

  protected setInputElement(element: HTMLElement) {
    this.inputElement = element;
  }

  public getLabel(): string {
    return this.settings.label ?? "";
  }

  public setLabel(label?: string) {
    if (label !== undefined) this.settings.label = label;

    if (this.labelElement) {
      this.labelElement.innerHTML = this.settings.label
        ? this.settings.label
        : "&nbps;";
    }
  }

  public setErrorMessage(errorMessage?: string) {
    if (errorMessage !== undefined) this.settings.label = errorMessage;
    if (this.errorMessageElement) {
      this.errorMessageElement.innerHTML = this.errorMessage;
    }
  }

  public isRequired(): boolean {
    return this.settings.required ?? false;
  }

  public setRequired(required = false) {
    this.settings.required = required;
  }

  public handleKeyDown(e: KeyboardEvent) {
    // e.preventDefault();
    // console.log("BaseInputComponent #handleKeyDown", this, e);
  }

  public setFocus(focus: boolean = true) {
    // console.log("SetFoccus", this);
    if (focus) {
      this.inputElement.focus();
    } else {
      this.inputElement.blur();
    }
  }

  /**
   * In case of formField name does not match with the datasource fieldname
   * this is the way to crete afield-mapping
   * @returns name of field in the datasource
   */
  public getDataFieldName(): string {
    return this.settings.dataFieldName ?? this.settings.fieldName;
  }

  validate(): boolean {
    this.valid = true;
    this.errorMessage = "";

    if (this.customValidationFx) {
      this.customValidationFx().bind(this);
    } else {
      if (this.settings.required) {
        this.valid = false === this.isEmpty();
        this.errorMessage = "required";
      }
    }
    return this.valid;
  }

  displayValidStatus() {
    if (this.valid) {
      this.domElement.classList.add("valid");
      this.domElement.classList.remove("error");
    } else {
      this.domElement.classList.add("error");
      this.domElement.classList.remove("valid");
    }
    this.setErrorMessage();
  }

  isEmpty(): boolean {
    const empty = this.value ? false : true;
    return empty;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  isCreateOnly(): boolean {
    return this.settings.createOnly ?? false;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    console.log("  setEnabled", this.fieldName, enabled);
    if (enabled && !this.isReadOnly()) {
      this.inputElement.removeAttribute("DISABLED");
    } else {
      this.inputElement.setAttribute("DISABLED", "DISABLED");
    }
  }

  isReadOnly(): boolean { 
    return this.settings.readonly ?? false;
  }

  getDefaultValue(): any {
    return this.settings.defaultValue ?? '';
   }
}
