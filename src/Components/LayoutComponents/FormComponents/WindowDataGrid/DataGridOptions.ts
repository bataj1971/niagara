export interface DataGridOptions {
  width?: string;
  height?: string;
  minheight? :number ;
  columns: ColumnDefinitionType[];
  toggleSearchFunction?: Function;
  newRecordFunction?: Function;
  modRecordFunction?: Function;
  delRecordFunction?: Function;
  detailRecordFunction?: Function;
  renderGridDetail?: Function;
}


export type ColumnDefinitionType = {
  label: string;
  dataField?: string;
  defaultValue?: any;
  align?: string;
  evaluateFunction?: (row: Map<string, any>) => string;
  width?: string;
  type?: string;
  detailOnly?: boolean;
  detailWidth?:string;
};


export type GridDataRow = Map<string, any>;