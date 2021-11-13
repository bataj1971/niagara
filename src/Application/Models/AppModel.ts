
import { BaseModel } from "../../Components/BaseModelClasses/BaseModel";
import { UserModel } from "./UserModel";

/**
 * 
 */
export class AppModel extends BaseModel {
    private userData : UserModel ;
    
    constructor() {
        super();
        this.userData = new UserModel({firstname:'Jozsef'});
    }
    
}