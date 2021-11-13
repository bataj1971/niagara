import { BaseService } from "../../Components/BaseServiceClasses/BaseService";
import { UserModel } from "../Models/UserModel";

export class UserService extends BaseService {
  constructor() {
    super();
  }

  loadData(): Promise<void> {
    const searchUrl =
      "https://fakerapi.it/api/v1/users?_quantity=105&_locale=hu_HU";

    const request = fetch(searchUrl) // request-> Promise
      .then((response) => response.json())
      .then(this.handleResponseData.bind(this))
      .catch(this.handleError);
    return request;
  }

  handleResponseData(response: any) {
    const data = response.data ?? [];
    // console.log("UserService / handleResponseData ", data);

    data.forEach((element : object) => {
      this.state.push(new UserModel(element));
    });
    // console.log("UserService / users ", this.state);
  }

  get(id: string = "") {}

  set(id: string, data: any) {}
}
