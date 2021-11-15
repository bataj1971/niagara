export class DataField {
  id: string;
  fieldType: string;
  required = false;
  value: any;
  defaultValue: any;

  constructor(
    id: string,
    fieldType: string = "text",
    required: boolean = false,
    value: any = "",
    defaultValue: any = ""
  ) {
    this.id = id;
    this.fieldType = fieldType;
    this.required = required;
    this.value = value;
    this.defaultValue = defaultValue;
  }

  public validate(): boolean {
    if (this.required) return true;
    if (!this.value) return false;
    return true;
  }

  public setValue(value: string | number | boolean) {
    this.value = value;
  }

  public setDefaultValue() {
    this.value = this.defaultValue;
  }
}
