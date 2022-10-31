import { BaseComponent } from "../../../BaseComponents/BaseComponent";
import { EDITMODE, VIEWMODE, WindowModuleLister } from "../../WindowsComponents/WindowModuleLister";
import { SimpleButton } from "../FormFields/SimpleButton";
import { TextInput } from "../FormFields/TextInput";
import { ColumnDefinitionType, DataGridOptions, GridDataRow } from "./DataGridOptions";
import { GridDetailComponent } from "./GridDetailComponent";
import { GridHeadComponent } from "./GridHeadComponent";
import { GridListComponent } from "./GridListComponent";
import "./WindowDataGridComponent.scss";


export class WindowDataGrid extends BaseComponent {
  private dataSet: Array<GridDataRow> = [];
  // private dataSet: Array<Map<string, any>> = [];
  private currentRow: number = 0;
  private currentRowIndex: number = 0;
  private rowCount = 0;
  private firstRowInView = 0; // first visible row
  private pageRowCount: number = 10;
  private searchInputVisible = false;

  public searchEnabled: boolean = true;
  public newEnabled: boolean = true;
  public modEnabled: boolean = true;

  private searchInput: TextInput;
  private newRecordButton: SimpleButton;
  private modRecordButton: SimpleButton;
  private delRecordButton: SimpleButton;
  private searchButton: SimpleButton;
  private detailRecordButton: SimpleButton;

  private gridList: GridListComponent;
  private dataGridHead: GridHeadComponent;
  private dataGridDetail: GridDetailComponent;

  private dataGridScrollbarElement: HTMLElement;

  private columns: Array<ColumnDefinitionType> = [];
  protected callBack: Function;
  // private windowModuleLister: WindowModuleLister;

  private dataGridOptions: DataGridOptions = {
    minheight: 200,
    columns: [],
  };

  constructor(options: DataGridOptions, callBack: Function) {
    super("window-data-grid");
    this.callBack = callBack;
    // this.windowModuleLister = windowModuleLister;
    this.setOptions(options);
    this.dataGridHead = new GridHeadComponent();
    this.addChild(this.dataGridHead);

    this.newRecordButton = new SimpleButton({
      fieldName: "add",
      label: "add",
      onClick: this.newRecord.bind(this),
    });
    this.dataGridHead.addChild(this.newRecordButton);

    this.modRecordButton = new SimpleButton({
      fieldName: "mod",
      label: "modify",
      onClick: this.modRecord.bind(this),
    });
    this.dataGridHead.addChild(this.modRecordButton);

    this.delRecordButton = new SimpleButton({
      fieldName: "del",
      label: "delete",
      onClick: this.delRecord.bind(this),
    });
    this.dataGridHead.addChild(this.delRecordButton);

    this.detailRecordButton = new SimpleButton({
      fieldName: "details",
      label: "details",
      onClick: this.detailRecord.bind(this),
    });
    this.dataGridHead.addChild(this.detailRecordButton);

    this.searchButton = new SimpleButton({
      fieldName: "search",
      label: "search",
      onClick: this.toggleSearchInput.bind(this),
    });
    this.dataGridHead.addChild(this.searchButton);

    this.searchInput = new TextInput({
      fieldName: "searchpattern",
      label: "search",
    });
    this.searchInput.hide();
    this.dataGridHead.addChild(this.searchInput);

    this.gridList = new GridListComponent();
    this.gridList.getDomElement().onmousedown =  this.handleGridListComponentClick;
    
    this.addChild(this.gridList);

    this.dataGridScrollbarElement = document.createElement(
      "window-data-grid-scrollbar"
    );
    this.dataGridScrollbarElement.innerHTML = "&nbsp;a";
    this.domElement.append(this.dataGridScrollbarElement);
    this.dataGridDetail = new GridDetailComponent(this.dataGridOptions);
    this.addChild(this.dataGridDetail);

    this.render();
  }

  protected handleGridListComponentClick(e: MouseEvent) {
    console.log("handleGridListComponentClick",e.target);
  }
  
  public setOptions(options: DataGridOptions) {
    this.dataGridOptions = {
      minheight: 200,
      columns: [],
    };

    Object.assign(this.dataGridOptions, options);
    this.columns = this.dataGridOptions.columns ?? [];
  }

  public setData(data: Array<Map<string, any>>) {
    this.dataSet = data;
    this.rowCount = data.length;
  }

  public render() {
    this.renderGridList();
  }

  protected renderGridList() {
    const gridListDomElement = this.gridList.getDomElement();
    gridListDomElement.innerHTML = "";

    // adding header:
    const gridHeaderElement = document.createElement("window-data-grid-header");

    this.columns.forEach((column) => {
      if (column.detailOnly ?? false) return;

      const gridHeaderCellElement = document.createElement(
        "window-data-grid-header-cell"
      );
      gridHeaderCellElement.innerHTML = column.label ?? "- - -";
      gridHeaderCellElement.style.width = column.width ?? "";
      gridHeaderCellElement.style.maxWidth = column.width ?? "";
      gridHeaderElement.append(gridHeaderCellElement);
    });

    gridListDomElement.append(gridHeaderElement);

    for (let rowInGrid = 0; rowInGrid < this.pageRowCount; rowInGrid++) {
      const renderedRow = this.firstRowInView + rowInGrid;
      if (renderedRow < this.dataSet.length) {
        const data = this.dataSet[renderedRow];
        const gridRowElement = this.renderDataRow(data, gridListDomElement);

        if (rowInGrid == this.currentRow) {
          gridRowElement.classList.add("activeRow");
          this.dataGridDetail.render(data);
        }
      }
    }
  }

  protected renderDataRow(
    dataRow: GridDataRow,
    gridListDomElement: HTMLElement
  ): HTMLElement {
    const gridRowElement = document.createElement("window-data-grid-row");

    gridListDomElement.append(gridRowElement);

    // preparing data-columns to create row
    for (const column of this.columns) {
      if (column.detailOnly ?? false) continue;

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

    return gridRowElement;
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

  public onFocus() {
    console.log("DataGrid onfocus", this);
  }

  public handleKeyDown(e: KeyboardEvent) {
    const oldCurentRow = this.currentRow;

    let forceRender = false;
    const keyCode =
      (e.ctrlKey ? "ctrl_" : "") +
      (e.shiftKey ? "shift_" : "") +
      (e.altKey ? "alt_" : "") +
      e.code;

    console.log("keycode", keyCode);
    switch (keyCode) {
      case "alt_ArrowDown":
        this.pageRowCount += this.pageRowCount < 30 ? 1 : 0;
        forceRender = true;
        break;
      case "alt_ArrowUp":
        this.pageRowCount -= this.pageRowCount > 1 ? 1 : 0;
        forceRender = true;
        break;
      case "ArrowDown":
        this.currentRow++;
        break;
      case "ArrowUp":
        this.currentRow--;
        break;
      case "PageUp":
        this.currentRow -= this.pageRowCount;
        break;
      case "PageDown":
        this.currentRow += this.pageRowCount;
        break;

      case "Home":
        this.currentRow = 0;
        this.firstRowInView = 0;
        forceRender = true;
        break;

      case "End":
        this.currentRow = this.rowCount - 1;
        this.firstRowInView = this.rowCount - this.pageRowCount - 1;
        forceRender = true;
        break;
      case "F8":
        this.toggleSearchInput();

        break;
      case "Insert":
        this.callBack(VIEWMODE.EDIT, EDITMODE.NEW);
        break;
      case "F9":
        this.callBack(VIEWMODE.EDIT, EDITMODE.MOD, this.currentRow);
        break;
      case "Del":
        this.callBack(VIEWMODE.DETAIL, EDITMODE.DEL, this.currentRow);
        break;
      case "Space":
        this.callBack(VIEWMODE.DETAIL, 0);

        break;

      default:
        break;
    }

    if (this.currentRow < 0 && this.firstRowInView == 0) this.currentRow = 0;
    if (this.currentRow > this.rowCount - 1)
      this.currentRow = this.rowCount - 1;

    if (oldCurentRow != this.currentRow || forceRender) {
      if (this.currentRow < 0) {
        this.firstRowInView--;
        this.currentRow;
        this.currentRow = 0;
      }

      if (this.currentRow > this.pageRowCount - 1) {
        this.firstRowInView++;
        this.currentRow;
        this.currentRow = this.pageRowCount - 1;
      }
      this.render();
    }
    // console.log("Window datagrid #handleKeypress", e);

    // e.preventDefault();
    // e.stopPropagation();
  }

  public newRecord() {
    console.log("newRecord");
    if (this.dataGridOptions.newRecordFunction)
      this.dataGridOptions.newRecordFunction();
  }
  public modRecord() {
    console.log("mod record");
    if (this.dataGridOptions.modRecordFunction)
      this.dataGridOptions.modRecordFunction();
  }
  public delRecord() {
    console.log("del record");
    if (this.dataGridOptions.delRecordFunction)
      this.dataGridOptions.delRecordFunction();
  }

  public getCurrentRecord(): any {
    const data = this.dataSet[this.currentRow];
    return data;
  }

  public detailRecord() {
    console.log("detailRecord");
  }

  public toggleSearchInput() {
    if (this.searchInputVisible) {
      this.searchInputVisible = false;
      this.searchInput.hide(0);
      this.searchInput.setFocus(false);
    } else {
      this.searchInputVisible = true;
      this.searchInput.show(true, 1);
      this.searchInput.setFocus(true);
    }
  }
}
