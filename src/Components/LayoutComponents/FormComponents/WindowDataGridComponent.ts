import { BaseComponent } from "../../BaseComponents/BaseComponent";
import "./WindowDataGridComponent.scss";

export type DataGridDefinitionType = {
  width?: string;
  height?: string;
  columns: ColumnDefinitionType[];
};

export type ColumnDefinitionType = {
  label: string ;
  dataField?: string;
  defaultValue?: any;
  align?: string;
  evaluateFunction?: (row: Map<string, any>) => string;
  width?: string;
  type?: string;
};

export class WindowDataGrid extends BaseComponent {
  private dataSet: Array<Map<string, any>> = [];
  private currentRow: number = 0;
  private currentRowIndex: number = 0;
  private columns: Array<ColumnDefinitionType> = [];
  private options = {
    minheight: 200,
    columns: [],
  };

  constructor(options = {}) {
    super("window-data-grid");

    this.setOptions(options);
    this.render();
  }

  public setOptions(options: Object) {
    this.options = {
      minheight: 200,
      columns: [],
    };

    Object.assign(this.options, options);
    this.columns = this.options["columns"] ?? [];
  }

  public setData(data: Array<Map<string, any>>) {
    this.dataSet = data;
    // console.log("DataGRID --------------- setData ", data);
  }

  private handleKeyDown(e: KeyboardEvent) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Window #handleKeypress", e);
  }

  public render() {
    this.domElement.innerHTML = "";
    // adding header:
    const gridHeaderElement = document.createElement("window-data-grid-header");

    this.columns.forEach((column) => {
      const gridHeaderCellElement = document.createElement(
        "window-data-grid-header-cell"
      );
      gridHeaderCellElement.innerHTML = column.label;
      gridHeaderCellElement.style.width = column.width ?? "";
      gridHeaderElement.append(gridHeaderCellElement);
    });

    this.domElement.append(gridHeaderElement);

    // adding data rows - iterating #dataset:
    for (const dataRow of this.dataSet) {
      const gridRowElement = document.createElement("window-data-grid-row");

      this.domElement.append(gridRowElement);

      // console.log('dataGRID - row:',dataRow);

      for (const column of this.columns) {
        // console.log("datagrid column:", column);
        const gridCellElement = document.createElement(
          "window-data-grid-row-cell"
        );

        let cellValue = "";

        if (column.evaluateFunction) {
          cellValue = column.evaluateFunction(dataRow);
        } else if (column.dataField) {
          cellValue = dataRow.get(column.dataField);
        } else if (column.defaultValue) {
          cellValue = column.defaultValue;
        }

        // formatting vith type
        if (column.type) {
          cellValue = this.formatValue(cellValue, column.type);
        }

        gridCellElement.innerHTML = cellValue;

        gridRowElement.append(gridCellElement);
      }
    }
  }

  protected formatValue(value: any, type: string): string {
    let formattedValue = value;
    switch (type) {
      case "date":
        const dateValue = new Date(value);
        formattedValue = dateValue.toLocaleDateString();
        break;
      case "number":
        const numberValue = +value;
        formattedValue = numberValue.toLocaleString();
        break;
    }
    return formattedValue;
  }
}
