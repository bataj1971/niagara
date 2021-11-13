import { BaseModel } from "../../Components/BaseModelClasses/BaseModel";
import { DataField } from "../../Components/BaseModelClasses/DataField";

export class CurrencyModel extends BaseModel {
  constructor(data: object) {
    super();
    this.addField(new DataField("code"));
    this.addField(new DataField("name"));
    this.addField(new DataField("symbol_native"));
    this.addField(new DataField("decimal_digits"));
    this.setData(data);
  }

 

  //   fieldMapping(): Map<string, string> {
  //     return new Map([["id", "uuid"]]);
  //   }
}