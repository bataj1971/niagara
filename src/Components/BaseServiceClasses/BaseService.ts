import { APPCONFIG } from "../../APPCONFIG";
import { GridDataRow } from "../LayoutComponents/FormComponents/WindowDataGrid/DataGridOptions";
// import { BaseModel } from "../BaseModelClasses/BaseModel";
import {
  ApiFilter,
  HttpFetchSettings,
  HttpMethod,
  HttpHeaders,
} from "./ApiFilter";

export abstract class BaseService<T> {
  protected state: Array<T> = [];
  protected endPointPath = "";
  protected record: T = {} as T;

  protected authToken: string = "";

  public handleError(error: any) {
    console.error("BaseService api error:" + error);
  }

  public async getRecord<T>(id: string): Promise<T> {
    const url = APPCONFIG.apiUrl + this.endPointPath + "/" + id;
    const settings = {};
    const response = await fetch(url, settings);

    const rawDataRecord: T = (await response.json()) as T;

    if (response.ok) {
      const record = this.handleGetRecordResponse(rawDataRecord) as T;
      return record;
    } else {
      const error = new Error("api error:" + response.status);
      this.handleError(error);
      return Promise.reject(error);
    }
  }

  public async createRecord<T>(data: GridDataRow): Promise<T> {
    const url = APPCONFIG.apiUrl + this.endPointPath;
    const settings = this.getSettings();
    settings.method = HttpMethod.POST;
    settings.body = JSON.stringify(data);
    const response = await fetch(url, settings);
    const rawDataRecord: T = (await response.json()) as T;

    if (response.ok) {
      const record = this.handleGetRecordResponse(rawDataRecord) as T;
      return record;
    } else {
      const error = new Error("api error:" + response.status);
      this.handleError(error);
      return Promise.reject(error);
    }
  }

  public async modifyRecord<T>(data: GridDataRow,id:string): Promise<T> {
    const url = APPCONFIG.apiUrl + this.endPointPath+'/'+id;
    const settings = this.getSettings();
    settings.method = HttpMethod.PUT;
    settings.body = JSON.stringify(data);
    const response = await fetch(url, settings);
    const rawDataRecord: T = (await response.json()) as T;

    if (response.ok) {
      const record = this.handleGetRecordResponse(rawDataRecord) as T;
      return record;
    } else {
      const error = new Error("api error:" + response.status);
      this.handleError(error);
      return Promise.reject(error);
    }
  }


  public handleGetRecordResponse<T>(rawDataRecord: T): T {
    const data = rawDataRecord ?? ({} as T);
    return data;
  }

  public async getIndex(filter: ApiFilter): Promise<T[]> {
    const url =
      APPCONFIG.apiUrl +
      this.endPointPath +
      (filter.basic ? "?name=%" + filter.basic + "%" : "");

    const settings = {};
    const response = await fetch(url, settings);
    const rawDataSet: T[] = (await response.json()) as T[];

    const dataSet = this.handleIndexResponse(rawDataSet);

    return dataSet;
  }

  public handleIndexResponse(dataSet: T[]): T[] {
    return dataSet ?? ([] as T[]);
  }

  // public index(filter: any = {}, limit: number = 0) {
  //   let resultSet: Array<Map<string, any>> = [];

  //   for (let c = 0; c < this.state.length; c++) {
  //     if (true) {
  //       // TODO: process filter condition
  //       // resultSet.push(this.state[c].getFieldValues());
  //     }

  //     if (limit > 0 && limit <= resultSet.length) {
  //       break;
  //     }
  //   }
  //   return resultSet;
  // }

  protected getSettings(method?: HttpMethod): RequestInit {
    const headers: HeadersInit = new Headers();
    const settings: RequestInit = {};

    settings.method = method ?? HttpMethod.GET;
    settings.redirect = "follow";
    settings.credentials = "same-origin";
    settings.mode = "cors";
    settings.cache = "no-cache";

    headers.set("Content-Type", "application/json");
    if (this.authToken) {
      headers.set("token", this.authToken);
    }

    if (headers.entries.length) {
      settings.headers = headers;
    }
    return settings;
  }
}