import { BaseModel } from "../../Components/BaseModelClasses/BaseModel";
import { DataField } from "../../Components/BaseModelClasses/DataField";



export class UserModel extends BaseModel{

    constructor(data: object) {        
        super();
        this.addField(new DataField("id"));
        this.addField(new DataField("firstname"));
        this.addField(new DataField("lastname"));
        this.addField(new DataField("username"));
        this.addField(new DataField("email"));
        this.setData(data);
    }

    fieldMapping()  : Map<string,string> {
        return new Map([
            ['id','uuid']
        ]);
        
            
    }
    
}

