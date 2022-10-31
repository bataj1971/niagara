import { BaseService } from "../../Components/BaseServiceClasses/BaseService";
import { UserModel } from "../Models/UserModel";

export class UserService extends BaseService {
  constructor() {
    super();
  }

  public loadData(): Promise<void> {
    const searchUrl ="http://localhost/niagaraServer/users";

    const request = fetch(searchUrl) // request-> Promise
      .then((response) => response.json())
      .then(this.handleResponseData.bind(this))
      .catch(this.handleError);
    return request;
  }

  public handleResponseData(response: any) {
    // const data = response.data ?? [];
    const data = response ?? [];
    // console.log("UserService / handleResponseData ", data);

    data.forEach((element : object) => {
      this.state.push(new UserModel(element));
    });
    // console.log("UserService / users ", this.state);
  }

  get(id: string = "") {}

  set(id: string, data: any) {}
}
