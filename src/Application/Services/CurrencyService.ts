import { BaseService } from "../../Components/BaseServiceClasses/BaseService";
import { CurrencyModel } from "../Models/CurrencyModel";

export class CurrencyService extends BaseService {
  constructor() {
    super();
  }

  public loadData(): Promise<void> {
    const searchUrl =
      "https://gist.githubusercontent.com/Fluidbyte/2973986/raw/5fda5e87189b066e11c1bf80bbfbecb556cf2cc1/Common-Currency.json";

    const request = fetch(searchUrl) // request-> Promise
      .then((response) => response.json())
      .then(this.handleResponseData.bind(this))
      .catch(this.handleError);
    return request;
  }

  protected handleResponseData(response: any) {
    const data: object = response ?? {};
    console.log("CurrencyService / handleResponseData ", data);

    Object.values(data).forEach((element: object) => {
      this.state.push(new CurrencyModel(element));
    });

    console.log("CurrencyService / dataset ", this.state);
  }

  protected getData() {
    return;
  }
}
