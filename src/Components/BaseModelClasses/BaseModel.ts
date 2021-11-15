import { DataField } from "./DataField";


export class BaseModel {
  private fieldList: Array<DataField> = [];
  private fieldMap: Map<string, string>;

  constructor() {
    this.fieldMap = this.fieldMapping();
  }

  public addField(dataField: DataField) {
    this.fieldList.push(dataField);
  }

  public setData(data: object) {
    const mappedData = new Map(Object.entries(data));

    this.fieldList.forEach((field: DataField) => {
      const sourceFieldName: string = this.fieldMap.get(field.id) ?? field.id;
      if (mappedData.has(sourceFieldName)) {
        const fieldValue: any = mappedData.get(sourceFieldName);
        field.setValue(fieldValue);
      } else {
        field.setDefaultValue();
        // todo: set default value from field
      }
      // if (sourceFieldName in data) {
      //   const fieldValue: any = (data[sourceFieldName] as string) ?? "";
      //   field.set(fieldValue);
      // }
    });
  }

  public fieldMapping(): Map<string, string> {
    return new Map<string, string>();
  }

  public validate(): boolean {
    let validated = true;
    this.fieldList.forEach((field) => {
      validated = validated && field.validate();
    });
    return validated;
  }

  public getFieldValues(): Map<string, any> {
    // values.set( field.id,field.value);
    // const result = Object.fromEntries(map);
    const values = new Map();
    this.fieldList.forEach((field) => {
      // values[field.id] = field.value;
      values.set(field.id, field.value);
    });
    return values;
  }
}


