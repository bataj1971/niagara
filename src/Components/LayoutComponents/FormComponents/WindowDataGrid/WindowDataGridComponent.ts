import { BaseComponent } from "../../../BaseComponents/BaseComponent";

import {
  EDITMODE,
  VIEWMODE,
  WindowModuleLister,
} from "../../WindowsComponents/WindowModuleLister";

import { SimpleButton } from "../FormFields/SimpleButton";
import { TextInput } from "../FormFields/TextInput";
import {
  ColumnDefinitionType,
  DataGridOptions,
  GridDataRow,
} from "./DataGridOptions";

import { GridDetailComponent } from "./GridDetailComponent";
import { GridHeadComponent } from "./GridHeadComponent";
import { GridListComponent } from "./GridListComponent";
import { GridListContainerComponent } from "./GridListContainerComponent";
import "./WindowDataGridComponent.scss";

export class WindowDataGrid extends BaseComponent {
  private dataSet: Array<GridDataRow> = [];
  // private dataSet: Array<Map<string, any>> = [];
  private currentRow: number = 0;
  private currentRowInView: number = 0;
  private rowCount = 0;
  private firstRowInView = 0; // first visible row
  private pageRowCount: number = 10;

  public newEnabled: boolean = true;
  public modEnabled: boolean = true;

  private searchInput: TextInput;
  public searchEnabled: boolean = true;
  private searchInputVisible = false;
  private searchInputTimer?: ReturnType<typeof setTimeout>;
  private searhFilter: string = "";

  private newRecordButton: SimpleButton;
  private modRecordButton: SimpleButton;
  private delRecordButton: SimpleButton;
  private searchButton: SimpleButton;
  private detailRecordButton: SimpleButton;

  private gridList: GridListComponent;
  private dataGridHead: GridHeadComponent;
  private dataGridDetail: GridDetailComponent;

  private dataGridListContainer: GridListContainerComponent;
  private dataGridScrollbarElement: HTMLElement;
  private dataGridScrollbarElementContent: HTMLElement;

  private columns: Array<ColumnDefinitionType> = [];
  protected callBack: Function;
  protected reloadListData: Function;

  private dataGridOptions: DataGridOptions = {
    minheight: 200,
    columns: [],
  };

  constructor(
    options: DataGridOptions,
    callBack: Function,
    reloadListData: Function
  ) {
    super("window-data-grid");
    this.callBack = callBack;
    this.reloadListData = reloadListData;
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
    this.searchInput
      .getDomElement()
      .addEventListener("keyup", this.handleSearchInputChange.bind(this));

    this.dataGridListContainer = new GridListContainerComponent();
    this.addChild(this.dataGridListContainer);

    this.dataGridScrollbarElement = document.createElement(
      "window-data-grid-scrollbar"
    );
    this.dataGridScrollbarElement.addEventListener(
      "scroll",
      this.handleScrollbarChange.bind(this)
    );
    this.dataGridScrollbarElementContent =
      document.createElement("scroll-content");
    this.dataGridScrollbarElementContent.innerHTML = "&nbsp;";
    this.dataGridScrollbarElement.append(this.dataGridScrollbarElementContent);

    this.gridList = new GridListComponent();

    this.gridList.getDomElement().onmousedown =
      this.handleGridListComponentClick.bind(this);

    this.gridList
      .getDomElement()
      .addEventListener("wheel", this.handleMouseWheel.bind(this));

    // this.addChild(this.gridList);
    this.dataGridListContainer.addChild(this.gridList);

    this.dataGridListContainer
      .getDomElement()
      .append(this.dataGridScrollbarElement);

    this.dataGridDetail = new GridDetailComponent(this.dataGridOptions);
    this.addChild(this.dataGridDetail);

    this.render();
  }

  protected handleGridListComponentClick(e: MouseEvent) {
    const clickedElement = e.target as HTMLElement;
    if (clickedElement.parentElement) {
      const rowInView = parseInt(
        clickedElement.parentElement.getAttribute("rowinview") ?? ""
      );
      if (this.currentRowInView != rowInView) {
        this.currentRowInView = rowInView;
        this.setRow(true);
      }
    }
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
    this.setScrollBar();
  }

  protected renderGridList() {
    const gridListDomElement = this.gridList.getDomElement();
    gridListDomElement.innerHTML = "";

    // adding header ----------------------------------------------------------------:
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

    // creating datagrid ----------------------------------------------------------------
    for (let rowInGrid = 0; rowInGrid < this.pageRowCount; rowInGrid++) {
      const renderedRow = this.firstRowInView + rowInGrid;
      if (renderedRow < this.dataSet.length) {
        // render lines with data
        const data = this.dataSet[renderedRow];
        const gridRowElement = this.renderDataRow(
          data,
          gridListDomElement,
          rowInGrid
        );

        if (rowInGrid == this.currentRowInView) {
          gridRowElement.classList.add("activeRow");
          this.dataGridDetail.render(data);
        }
      } else {
        // render empty lines:
        const data = new Map<string, any>(); // this.dataSet[renderedRow];
        const gridRowElement = this.renderDataRow(
          data,
          gridListDomElement,
          rowInGrid
        );
      }
    }
  }

  protected renderDataRow(
    dataRow: GridDataRow,
    gridListDomElement: HTMLElement,
    rowInGrid: number
  ): HTMLElement {
    const gridRowElement = document.createElement("window-data-grid-row");
    const emptyRow = dataRow.size == 0;
    if (emptyRow) gridRowElement.classList.add("empty-grid-row");

    gridRowElement.setAttribute("rowInView", rowInGrid.toString());
    gridListDomElement.append(gridRowElement);

    // preparing data-columns to create row
    for (const column of this.columns) {
      if (column.detailOnly ?? false) continue;

      const gridCellElement = document.createElement(
        "window-data-grid-row-cell"
      );

      let cellValue = "";

      if (emptyRow) {
        cellValue = "&nbsp;";
      } else if (column.evaluateFunction) {
        cellValue = column.evaluateFunction(dataRow);
      } else if (column.dataField) {
        cellValue = dataRow.get(column.dataField);
      } else if (column.defaultValue) {
        cellValue = column.defaultValue;
      }

      // formatting vith type
      if (column.type && !emptyRow) {
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
    let forceRender = false;
    const keyCode =
      (e.ctrlKey ? "ctrl_" : "") +
      (e.shiftKey ? "shift_" : "") +
      (e.altKey ? "alt_" : "") +
      e.code;

    const oldCurentRow = this.currentRowInView;
    // console.log("keycode", keyCode);
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
        this.currentRowInView++;
        break;
      case "ArrowUp":
        this.currentRowInView--;
        break;
      case "PageUp":
        this.currentRowInView -= this.pageRowCount;
        break;
      case "PageDown":
        this.currentRowInView += this.pageRowCount;
        break;

      case "Home":
        this.currentRowInView = 0;
        this.firstRowInView = 0;
        forceRender = true;
        break;

      case "End":
        this.currentRowInView = Math.min(this.pageRowCount, this.rowCount - 1);
        this.firstRowInView =
          this.rowCount - 1 - Math.min(this.pageRowCount, this.rowCount - 1);
        forceRender = true;
        break;
      case "F8":
        this.toggleSearchInput();

        break;
      case "Insert":
        this.callBack(VIEWMODE.EDIT, EDITMODE.NEW);
        break;
      case "F9":
        this.callBack(VIEWMODE.EDIT, EDITMODE.MOD, this.currentRowInView);
        break;
      case "Del":
        this.callBack(VIEWMODE.DETAIL, EDITMODE.DEL, this.currentRowInView);
        break;
      case "Space":
        this.callBack(VIEWMODE.DETAIL, 0);

        break;

      default:
        break;
    }

    forceRender = forceRender || oldCurentRow != this.currentRowInView;
    this.setRow(forceRender);

    // console.log("Window datagrid #handleKeypress", e);

    // e.preventDefault();
    // e.stopPropagation();
  }

  setRow(forceRender: boolean = true) {
    // const oldCurentRow = this.currentRow;

    if (this.currentRowInView < 0 && this.firstRowInView == 0) {
      this.currentRowInView = 0;
    }

    if (this.currentRowInView + this.firstRowInView > this.rowCount - 1) {
      this.currentRowInView = this.rowCount - 1 - this.firstRowInView;
    }

    if (forceRender) {
      if (this.currentRowInView < 0) {
        this.firstRowInView--;
        this.currentRowInView;
        this.currentRowInView = 0;
      }

      if (this.currentRowInView > this.pageRowCount - 1) {
        this.firstRowInView++;
        this.currentRowInView;
        this.currentRowInView = this.pageRowCount - 1;
      }
    }

    this.currentRow = this.firstRowInView + this.currentRowInView;

    // console.log(
    //   "grid:  setrow",
    //   this.rowCount,
    //   this.currentRow,
    //   this.currentRowInView,
    //   this.firstRowInView,
    //   this.pageRowCount
    // );
    
    this.render();1
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

  /**
   * Getting current record data from datagrids dataset.
   *
   * @returns
   */
  public getCurrentRecord(): any {
    const data = this.dataSet[this.currentRow];
    return data;
  }

  /**
   *
   */
  public detailRecord() {
    console.log("detailRecord");
  }

  /**
   * Show/hide search input
   */
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

  /**
   * Handling typeing of input via delayed action
   */
  protected handleSearchInputChange() {
    if (this.searchInputTimer) {
      clearTimeout(this.searchInputTimer);
    }
    this.searchInputTimer = setTimeout(() => {
      const newSearchFilter = this.searchInput.getValue();
      if (this.searhFilter != newSearchFilter) {
        this.searhFilter = newSearchFilter;
        console.log("searchfilter", this.searhFilter);
        this.currentRowInView = 0;
        this.firstRowInView = 0;
        this.reloadListData(this.searhFilter);
        this.setScrollBar();
      }
    }, 500);
  }

  /**
   * Handling mouse wheel event, scrolling list up/down
   * @param event
   */
  protected handleMouseWheel(event: WheelEvent) {
    const treshold = 10;
    const yDirection = event.deltaY as number;
    if (Math.abs(yDirection) > treshold) {
      this.currentRowInView += Math.sign(yDirection);

      const forceRender = true;
      this.setRow(forceRender);
    }
  }

  protected setScrollBar() {
    const dataLength = this.dataSet.length ?? 1;
    const h = (dataLength / this.pageRowCount) * 100;    

    this.dataGridScrollbarElementContent.style.height = h.toString() + "%";

    const heightInPixels = this.dataGridScrollbarElementContent.offsetHeight;
    const scrollPos = (this.firstRowInView / dataLength) * heightInPixels;
    this.dataGridScrollbarElement.scrollTo(0, scrollPos);
  }

  protected handleScrollbarChange(e: Event) {
    const heightInPixels = this.dataGridScrollbarElementContent.offsetHeight;
    const dataLength = this.dataSet.length ?? 1;
    const scrollpos = this.dataGridScrollbarElement.scrollTop;    
    const newFirstLine = Math.round((dataLength * scrollpos) / heightInPixels);
    this.firstRowInView = newFirstLine;
    this.setRow();
  }
}
