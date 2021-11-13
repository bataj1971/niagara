import { BaseService } from "../../Components/BaseServiceClasses/BaseService";
import { UserService } from "../Services/UserService";


/**
 * 
 */
export class ServiceFactory {
  static #modelInstances = new Map();
  constructor() {}

  /**   
   * @param {*} serviceName
   * @param {*} separator
   * @returns
   */
  static getService(serviceName = "", separator = "") {
    if (ServiceFactory.#modelInstances.has(serviceName)) {
      return ServiceFactory.#modelInstances.get(serviceName);
    }

    return this.createInstance(serviceName, separator);
  }

  /**
   *
   * @param {*} serviceName
   * @param {*} separator
   * @returns
   */
  static createInstance(serviceName :string , separator :string ) : BaseService {
    let modelInstance;
    switch (serviceName) {
      case "user":
        modelInstance = new UserService();
        break;

      default:
        throw Error("Model not found:" + serviceName + "/" + separator);
        break;
    }

    ServiceFactory.#modelInstances.set(serviceName, modelInstance);
    return modelInstance;
    
  }
}