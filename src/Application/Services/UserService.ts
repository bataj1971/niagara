import { APPCONFIG } from "../../APPCONFIG";
import { BaseService } from "../../Components/BaseServiceClasses/BaseService";
import { UserModel } from "../Models/UserModel";

export class UserService extends BaseService<UserModel> {
  
  protected static instance: UserService;

  private constructor() {
    super();
    this.endPointPath = "users";
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }
}
