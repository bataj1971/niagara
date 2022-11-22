
import { BaseService } from "../../BaseServiceClasses/BaseService";
import { DesktopComponent } from "../DesktopComponents/Desktop/DesktopComponent";
import { BaseInput } from "../FormComponents/FormFields/BaseInput";
import { DataGridOptions, GridDataRow } from "../FormComponents/WindowDataGrid/DataGridOptions";
import { WindowDataGrid } from "../FormComponents/WindowDataGrid/WindowDataGridComponent";
import { WindowFormComponent } from "../FormComponents/WindowForm/WindowFormComponent";
import { WindowConponent } from "./WindowConponent";

export enum VIEWMODE {
  LIST,
  EDIT,
  DETAIL,
}
export enum EDITMODE {
  NEW,
  MOD,
  DEL
}

export abstract class WindowModuleLister<Model, Service> extends WindowConponent {
  protected dataGrid: WindowDataGrid;
  protected form: WindowFormComponent;
  protected formFields: Map<string, any>;
  protected viewMode: VIEWMODE = VIEWMODE.LIST;
  protected editMode: EDITMODE = EDITMODE.NEW;
  protected contentTypeName: string;
  protected service?: BaseService<Model>;
  protected idFieldName = 'id';
  protected currentid = '';

  constructor(
    desktop: DesktopComponent,
    title: string,
    contentTypeName: string = "window"
  ) {
    super(desktop);
    this.setWindowTitle(title);
    this.contentTypeName = contentTypeName;

    const defaultDataGridSettings = this.defaultDataGridSettings();
    const dataGridSettings = Object.assign(
      defaultDataGridSettings,
      this.dataGridSettings()
    );

    this.dataGrid = new WindowDataGrid(
      dataGridSettings,
      this.setViewMode.bind(this),
      this.reloadListData.bind(this)
    );
    this.dataGrid
      .getDomElement()
      .setAttribute("gridName", this.contentTypeName);
    this.windowContent.addChild(this.dataGrid);

    this.formFields = new Map();
    this.form = new WindowFormComponent(
      this.saveForm.bind(this),
      this.cancelForm.bind(this)
    );
    this.form.getDomElement().setAttribute("formName", this.contentTypeName);
    this.form.setloadRecordFuncion(this.loadRecordDataToForm);
    this.windowContent.addChild(this.form);
    this.addFormFields();
    this.setViewMode(VIEWMODE.LIST, EDITMODE.NEW);
  }

  protected addFormFields() {
    console.error(
      "WindowModuleLister addFormFields() should be implemented",
      this
    );
  }

  protected setViewMode(viewMode: VIEWMODE, editMode: EDITMODE = EDITMODE.NEW) {
    // TODO some checksHere
    console.log("setViewMode", this);

    const changed = !(this.viewMode === viewMode);
    this.viewMode = viewMode;
    this.editMode = editMode;

    switch (this.viewMode) {
      case VIEWMODE.LIST: // list mode
        this.dataGrid.show();
        this.form.hide();
        if (changed) this.dataGrid.onFocus();

        break;
      case VIEWMODE.DETAIL: // detailed record view mode
        this.dataGrid.show();
        this.form.hide();

        break;
      case VIEWMODE.EDIT: // edit record mode
        this.dataGrid.hide();
        const curentRowData = this.dataGrid.getCurrentRecord();
        this.form.loadRecordData(curentRowData, editMode); // will call injected fx:
        this.form.show();
        // alert("edit"+this.dataGrid.g);
        this.editMode = editMode;
        if (changed) this.form.setFocus();
        break;

      default:
        break;
    }
  }

  public onFocus() {
    switch (this.viewMode) {
      case VIEWMODE.LIST: // list mode
        this.dataGrid.onFocus();
        break;
      case VIEWMODE.DETAIL: // detailed record view mode
        break;
      case VIEWMODE.EDIT: // edit record mode
        this.form.onFocus();
        break;
      default:
        break;
    }
  }

  protected dataGridSettings(): DataGridOptions {
    console.error(
      "WindowModuleLister dataGridSettings() should be implemented",
      this
    );
    return {
      modRecordFunction: this.modRecord.bind(this),
      columns: [
        { dataField: "error", label: "Error - no grid columns defined" },
      ],
    };
  }

  protected defaultDataGridSettings(): DataGridOptions {
    return {
      newRecordFunction: this.newRecord.bind(this),
      modRecordFunction: this.modRecord.bind(this),
      delRecordFunction: this.delRecord.bind(this),
      columns: [],
    };
  }
  public handleKeyDown(e: KeyboardEvent) {
    switch (this.viewMode) {
      case VIEWMODE.LIST: // list mode
        this.dataGrid.handleKeyDown(e);
        break;

      case VIEWMODE.DETAIL: // detailed record view mode
        this.dataGrid.show();
        break;

      case VIEWMODE.EDIT: // edit record mode
        this.form.handleKeyDown(e);
        break;

      default:
        break;
    }
  }

  // functions supposed to be overwritten for some custom business logic.
  // These are only foe some very basic
  public newRecord() {
    this.setViewMode(VIEWMODE.EDIT, EDITMODE.NEW);
    console.log("newRecord*");
  }
  public modRecord() {
    this.setViewMode(VIEWMODE.EDIT, EDITMODE.MOD);
    console.log("mod record*", this);
  }
  public delRecord() {
    this.setViewMode(VIEWMODE.EDIT);
    console.log("del record*");
  }

  public detailRecord() {
    this.setViewMode(VIEWMODE.DETAIL, EDITMODE.DEL);
    console.log("detailRecord*");
  }

  public getFormFields(): Map<string, BaseInput> {
    return this.formFields;
  }

  protected loadRecordDataToForm(dataRow: GridDataRow, editMode: EDITMODE) {
    console.log("loadRecordDataToForm, data:", dataRow);
    console.log("formFields:", this.formFields);
    if (!dataRow) {
      return;
    }
    this.formFields.forEach((formField: BaseInput, fieldName) => {
      const dataFieldName = formField.getDataFieldName();

      if (dataRow.has(dataFieldName)) {
        if (editMode === EDITMODE.MOD) {
          formField.setValue(dataRow.get(dataFieldName));
        } else {
          // make form empty
          // todo handle default values here..
          formField.setValue(formField.getDefaultValue());
        }
      }
    });
  }

  protected saveForm(data: GridDataRow) {
    let message = "";
    data.forEach((value, key) => {
      message += "\n" + key + ":" + value;
    });
    alert("Record ready to save:" + message);

    console.log("WindwosModuleLister: save", data);
    if (this.service) {
      if (this.editMode == EDITMODE.NEW) {
        this.service.createRecord(data).then((response) => {
          console.log("saveForm response", response);
          alert("Save report:");
        });
      } else {
        if (data.has(this.idFieldName)) {
          const id = data.get(this.idFieldName);

          this.service.modifyRecord(data, id).then((response) => {
            console.log("saveForm response", response);
            alert("Save report:");
          });
        } else { 
          alert("no idfield:" + this.idFieldName);
          console.log("saveForm modifyRecord",this.idFieldName,data);
          
        }
      }
    }

    this.setViewMode(VIEWMODE.LIST, EDITMODE.NEW);
  }
  protected cancelForm() {
    console.log("WindwosModuleLister: cancel");
    this.setViewMode(VIEWMODE.LIST, EDITMODE.NEW);
  }

  protected reloadListData(filter: string = "") {
    this.loadListData(filter);
  }

  protected loadListData(filter: string = "") {
    console.log("loadListData - NOT IMPLEMENTED");

    if (this.service) {
      this.service.getIndex({ basic: filter }).then((dataSet) => {
        console.log("generic getIndex", dataSet);

        const data = dataSet.map((item) => {
          return new Map(Object.entries(item as Object));
        });
        this.dataGrid.setData(data);
        this.dataGrid.render();
      });
    }
  }
}
