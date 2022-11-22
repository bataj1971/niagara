
import { BaseModel } from "../../Components/BaseModelClasses/BaseModel";
import { User, UserModel } from "./UserModel";

/**
 * 
 */
export abstract class AppModel extends BaseModel {
    private userData : User ;
    
    constructor() {
        super();
        this.userData = new User({firstname:'Jozsef'});
    }
    
}