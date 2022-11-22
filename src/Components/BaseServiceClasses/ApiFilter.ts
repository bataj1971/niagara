export interface HttpHeaders {
  [key: string]: string;
}
export enum HttpMethod {
  "GET" = "GET",
  "POST" = "POST",
  "PUT" = "PUT",
  "PATCH" = "PATCH",
  "DELETE" = "DELETE",
}

export interface HttpFetchSettings {
  headers?: HttpHeaders;
  credentials?: string;
  method?: HttpMethod;
  mode?: string;
  cache?: string;
  redirect?: string;
  referrerPolicy?: string;
  body?: string;
  "same-origin"?: string;
}

export interface ApiFilter { 
    limit?: number;
    offset?: number;
    basic?: string;
    filter?: {
        [key: string]: AdvancedFilterEntry;
    }

}
export interface AdvancedFilterEntry {
  fieldName?: string;
  value?: string;
}