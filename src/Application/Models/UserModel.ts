import { BaseModel } from "../../Components/BaseModelClasses/BaseModel";
import { DataField } from "../../Components/BaseModelClasses/DataField";
import { Address } from "./AddressModel";


export interface UserModel {
  id: number;
  name: string;
  loginname: string;
  birthdate:string;
  email: string;
  created_at: string;
  modified_at: string;
  usergroups: string[];
  userrights: string[];
  address_id?: number;
  address?: Address;
}
export class User extends BaseModel{

    constructor(data: object) {        
        super();
        this.addField(new DataField("id"));
        this.addField(new DataField("name"));
        this.addField(new DataField("usergroups"));
        this.addField(new DataField("userrights"));
        this.addField(new DataField("loginname"));
        this.addField(new DataField("email"));
        this.addField(new DataField("created_at"));
        this.addField(new DataField("modified_at"));

        this.setData(data);
        // console.log("Usermodel data:",data);
        
    }

    fieldMapping()  : Map<string,string> {
        return new Map([
            // ['id','uuid']
        ]);
        
            
    }
    
}

