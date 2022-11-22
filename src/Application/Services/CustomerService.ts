import { BaseService } from "../../Components/BaseServiceClasses/BaseService";
import { CustomerModel } from "../Models/CustomerModel";

export class CustomerService extends BaseService<CustomerModel> {
  protected static instance: CustomerService;

  private constructor() {
    super();
    this.endPointPath = "customers";
  }

  public static getInstance(): CustomerService {
    if (!CustomerService.instance) {
      CustomerService.instance = new CustomerService();
    }
    return CustomerService.instance;
  }
}