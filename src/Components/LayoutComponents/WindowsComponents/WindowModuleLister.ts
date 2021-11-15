
import { DesktopComponent } from "../DesktopComponents/DesktopComponent";
import {
  WindowDataGrid,
  ColumnDefinitionType,
  DataGridDefinitionType,
} from "../FormComponents/WindowDataGridComponent";
import { WindowFormComponent } from "../FormComponents/WindowFormComponent";
import { WindowConponent } from "./WindowConponent";

enum VIEWMODE {
  LIST,
  EDIT,
  DETAIL,
}
enum EDITMODE {
  NEW,
  MOD,
}

export class WindowModuleLister extends WindowConponent {
  protected dataGrid: WindowDataGrid;
  protected form;
  protected formFields: Map<string, any>;
  protected windowMode = 0;

  constructor(desktop: DesktopComponent, title: string) {
    super(desktop);

    const dataGridSettings = this.dataGridSettings();
    this.dataGrid = new WindowDataGrid(dataGridSettings);
    this.windowContent.addChild(this.dataGrid);

    this.formFields = new Map();
    this.form = new WindowFormComponent();
    this.windowContent.addChild(this.form);
    this.addFormFields();
  }

  protected addFormFields() {
    console.error(
      "WindowModuleLister addFormFields() should be implemented",
      this
    );
  }

  protected setWindowMode(mode: VIEWMODE) {
    // TODO some checksHere
    this.windowMode = mode;
    switch (this.windowMode) {
      case VIEWMODE.LIST: // list mode
        this.dataGrid.show();
        this.form.hide();

        break;
      case VIEWMODE.DETAIL: // detailed record view mode
        this.dataGrid.show();
        this.form.hide();

        break;
      case VIEWMODE.EDIT: // edit record mode
        this.dataGrid.hide();
        this.form.show();

        break;

      default:
        break;
    }
  }

  protected dataGridSettings(): DataGridDefinitionType {
    console.error(
      "WindowModuleLister dataGridSettings() should be implemented",
      this
    );
    return {
      columns: [
        { dataField: "error", label: "Error - no grid columns defined" },
      ],
    };
  }
}
