import { BaseModel } from "../../Components/BaseModelClasses/BaseModel";
import { DataField } from "../../Components/BaseModelClasses/DataField";

export class CurrencyModel extends BaseModel {
  constructor(data: object) {
    super();
    this.addField(new DataField("id"));
    this.addField(new DataField("name"));
    this.addField(new DataField("minor_unit"));
    this.addField(new DataField("created_at"));
    this.addField(new DataField("modified_at"));


    this.setData(data);
  }

 

  fieldMapping(): Map<string, string> {
    return new Map([["decimals", "decimal_digits"]]);
  }
}