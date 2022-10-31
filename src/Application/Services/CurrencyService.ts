import { BaseService } from "../../Components/BaseServiceClasses/BaseService";
import { CurrencyModel } from "../Models/CurrencyModel";

export class CurrencyService extends BaseService {
  constructor() {
    super();
  }

  public loadData(): Promise<void> {
    const searchUrl =
      //"https://gist.githubusercontent.com/etienne-martin/887b5da33565e5fddf9acd0712884085/raw/4142b910b1fe9c282ff1cb7ba20b37fb8a3e5750/Common-Currency.json";
      "http://localhost/niagaraServer/currencies";;

    const request = fetch(searchUrl) // request-> Promise
      .then((response) => response.json())
      .then(this.handleResponseData.bind(this))
      .catch(this.handleError);
    return request;
  }

  protected handleResponseData(response: any) {
    const data: object = response ?? {};
    // console.log("CurrencyService / handleResponseData ", data);

    Object.values(data).forEach((element: object) => {
      this.state.push(new CurrencyModel(element));
    });

   //  console.log("CurrencyService / dataset ", this.state);
  }

  protected getData() {
    return;
  }
}
