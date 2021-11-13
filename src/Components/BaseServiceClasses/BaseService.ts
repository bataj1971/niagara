import { BaseModel } from "../BaseModelClasses/BaseModel";

export class BaseService {
  
  protected state: Array<BaseModel> = [];

  handleError(error: any) {
    // alert("error");
    console.error(error);
  }

  index(filter: any = {}, limit: number = 0) {
    let resultSet: Array<Map<string, any>> = [];

    for (let c = 0; c < this.state.length; c++) {
      if (true) {
        // TODO: process filter condition
        resultSet.push(this.state[c].getFieldValues());
      }

      if (limit > 0 && limit <= resultSet.length) {
        break;
      }
    }
    return resultSet;
  }
}