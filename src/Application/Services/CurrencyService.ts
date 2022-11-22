import { APPCONFIG } from "../../APPCONFIG";
import { BaseService } from "../../Components/BaseServiceClasses/BaseService";
import { CurrencyModel } from "../Models/CurrencyModel";

export class CurrencyService extends BaseService<CurrencyModel> {
  protected static instance: CurrencyService;

  private constructor() {
    super();
    this.endPointPath = "currencies";
  }

  public static getInstance(): CurrencyService {
    if (!CurrencyService.instance) {
      CurrencyService.instance = new CurrencyService();
    }
    return CurrencyService.instance;
  }

}
