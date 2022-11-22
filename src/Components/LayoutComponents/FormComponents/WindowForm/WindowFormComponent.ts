import "./WindowFormComponent.scss";

import { WindowFormButtonBar } from "./WindowFormButtonBar";

import { FormSaveButton } from "../FormFields/FormSaveButton";
import { FormCancelButton } from "./../FormFields/FormCancelButton";
import { BaseComponent } from "../../../BaseComponents/BaseComponent";
import { BaseInput } from "../FormFields/BaseInput";
import { EDITMODE } from "../../WindowsComponents/WindowModuleLister";

export class WindowFormComponent extends BaseComponent {
  private buttonBar: WindowFormButtonBar;
  private formSaveButton: FormSaveButton;
  private formCancelButton: FormCancelButton;
  protected formFields: Map<string, BaseInput> = new Map();
  private callBackFunction: any;
  private data: any;
  private editMode: EDITMODE = EDITMODE.NEW;

  private saveCallbackFunction: Function;
  private cancelCallbackFunction: Function;

  private loadRecordCallbackFuncion: Function = function (data: any) {};

  constructor(
    saveCallbackFunction: Function,
    cancelCallbackFunction: Function
  ) {
    super("window-form");
    this.saveCallbackFunction = saveCallbackFunction;
    this.cancelCallbackFunction = cancelCallbackFunction;

    this.setDisplayMode("grid");
    this.buttonBar = new WindowFormButtonBar();
    this.addChild(this.buttonBar);
    this.formSaveButton = new FormSaveButton({ fieldName: "save" });
    this.buttonBar.addChild(this.formSaveButton);

    this.formCancelButton = new FormCancelButton({ fieldName: "cancel" });
    this.buttonBar.addChild(this.formCancelButton);

    this.formSaveButton
      .getDomElement()
      .addEventListener("click", this.handleSaveButtonClick.bind(this));
    this.formCancelButton
      .getDomElement()
      .addEventListener("click", this.handleCancelButtonClick.bind(this));
  }

  protected fieldChanged(fieldName: string, oldValue: any, newValue: any) {
    console.log("fieldChanged:", fieldName, oldValue, newValue);
  }

  public setloadRecordFuncion(fx: Function) {
    this.loadRecordCallbackFuncion = fx;
  }

  private handleCancelButtonClick(e: MouseEvent) {
    e.stopPropagation();
    this.cancelForm();
  }

  private handleSaveButtonClick(e: MouseEvent) {
    e.stopPropagation();
    this.saveForm();
  }

  saveForm() {
    if (this.validateForm()) {
      const data = new Map<string, any>();
      this.formFields.forEach((formField) => {
        data.set(formField.getFieldName(), formField.getValue());
      });
      this.saveCallbackFunction(data);
    }
  }

  cancelForm() {
    this.cancelCallbackFunction();
  }

  validateForm(): boolean {
    let formIsValid = true;

    this.formFields.forEach((formField) => {
      console.log("validation",formField.getFieldName());
      
      const valid = formField.validate();
      if (false == valid) {
        console.log(
          "formValidation, formField not valid:",
          formField.getFieldName(),
          formField.getErrorMessage()
        );
        formField.setErrorMessage();

        formIsValid = false;
      }
    });
    return formIsValid;
  }
  onSubmit() {}
  submit() {
    this.saveForm();
  }

  loadRecordData(recordData: any, editMode: EDITMODE) {
    
    this.setEditMode(editMode);
    this.data = recordData;

    if (this.loadRecordCallbackFuncion) {
      this.loadRecordCallbackFuncion(this.data,editMode);
    }
    console.log("form:loadData  ", recordData);
  }

  private dummyCallbackFunction() {
    console.error(
      "Callback function not set for WindowForm: ",
      this.getParentType()
    );
  }

  public onFocus() {
    console.log("Form onfocus", this);
    this.setFocus();
  }

  public addField(inputField: BaseInput) {
    this.formFields.set(inputField.getFieldName(), inputField);
    this.addChild(inputField);
  }

  public setFocus() {
    let success = false;
    this.formFields.forEach((formField) => {
      if (!success && formField.isEnabled()) {
        formField.setFocus(true);
        success = true;       
      }
    });
  }
  public handleKeyDown(e: KeyboardEvent) {
    const keyCode =
      (e.ctrlKey ? "ctrl_" : "") +
      (e.shiftKey ? "shift_" : "") +
      (e.altKey ? "alt_" : "") +
      e.code;

    // console.log(" WindowFormComponent", keyCode);
    switch (keyCode) {
      case "ctrl_Enter":
        this.saveForm();
        break;
      case "Escape":
        this.cancelForm();
        break;

      default:
        break;
    }
  }

  public setEditMode(editMode: EDITMODE) {
    this.editMode = editMode;
    this.formFields.forEach((formField) => {
      const enabled = !formField.isCreateOnly() || editMode == EDITMODE.NEW;
      formField.setEnabled(enabled);
    });    
  }
}
