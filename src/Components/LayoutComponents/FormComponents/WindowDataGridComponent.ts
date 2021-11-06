import { BaseComponent } from "../../BaseComponents/BaseComponent";
import "./WindowDataGridComponent.scss";

export type ColumnType = {
  label: string;
  dataField?: string;
  defaultValue: string;
  evaluateFunction?: (row: any) => string;
  width?: string;
  type?: string;
};

export class WindowDataGrid extends BaseComponent {
  private dataSet: Array<Map<string, any>> = [];
  private currentRow: number = 0;
  private currentRowIndex: number = 0;
  private columns: Array<ColumnType> = [];
  private options = {
    minheight: 200,
    columns: [],
  };

  constructor(options = {}) {
    super("window-data-grid");

    this.setOptions(options);
    this.render();
  }

  setOptions(options: Object) {
    this.options = {
      minheight: 200,
      columns: [],
    };

    Object.assign(this.options, options);
    this.columns = this.options["columns"] ?? [];
  }

  setData(data: Array<Map<string, any>>) {
    this.dataSet = data;
    console.log("DataGRID --------------- setData ", data);
  }

  handleKeyDown(e: KeyboardEvent) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Window #handleKeypress", e);
  }

  render() {
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

      for (const column of this.columns) {
        const gridCellElement = document.createElement(
          "window-data-grid-row-cell"
        );

        if (column.dataField) {
          gridCellElement.innerHTML = dataRow.get(column.dataField);
        } else if (column.evaluateFunction) {
            gridCellElement.innerHTML = column.evaluateFunction(dataRow);
        }
        gridRowElement.append(gridCellElement);
      }
    }
  }
}
