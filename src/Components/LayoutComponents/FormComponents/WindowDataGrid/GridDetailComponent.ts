import { BaseComponent } from "../../../BaseComponents/BaseComponent";
import { DataGridOptions, GridDataRow } from "./DataGridOptions";

export class GridDetailComponent extends BaseComponent {
  private dataGridOptions: DataGridOptions;
  constructor(options: DataGridOptions) {
    super("window-data-grid-detail");
    this.dataGridOptions = options;
        
  }

  public render(dataRow: GridDataRow) {
    if (this.dataGridOptions.renderGridDetail) {
      this.dataGridOptions.renderGridDetail(dataRow);
    } else {
      this.renderGridDetail(dataRow);
    }
  }

  renderGridDetail(dataRow: GridDataRow) {
    // preparing data-columns to create row
    this.domElement.innerHTML = "";

    for (const column of this.dataGridOptions.columns) {  
      const gridDetailFieldElement = document.createElement(
        "window-data-grid-detail-field"
      );
      
      
      gridDetailFieldElement.setAttribute('formField',column.dataField ?? 'nonamefield')
      const labelElement = document.createElement("label");
      const valueElement = document.createElement("detail-field-value");
      gridDetailFieldElement.append(labelElement);
      gridDetailFieldElement.append(valueElement);

      let value = "";

      if (column.evaluateFunction) {
        value = column.evaluateFunction(dataRow);
      } else if (column.dataField) {
        value = dataRow.get(column.dataField);
      } else if (column.defaultValue) {
        value = column.defaultValue;
      }

      labelElement.innerHTML = column.label;
      valueElement.innerHTML = (value ? value : "&nbsp;");

      // formatting vith type
      if (column.type) {
        // cellValue = this.parentComponent.formatValue(cellValue, column.type);
      }

      this.domElement.append(gridDetailFieldElement);
    }
  }
}
