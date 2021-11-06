import { ResizableMovableComponent } from "../../BaseComponents/ResizableMovableComponent";
import { DesktopComponent } from "../DesktopComponents/DesktopComponent";
import "./WindowConponent.scss";
import { WindowContent } from "./WindowContent";

enum WINDOWMODE {
  MAXIMIZED,
  FLOATING,
  MINIMIZED,
}

export class WindowConponent extends ResizableMovableComponent {
  static ID_COUNTER = 0;
  private id: number = 0;
  private title = "Untitled";
  private desktopComponent: DesktopComponent;

  private footermessage = "";
  private windowVisible = false;
  private windowElement;
  private windowHeaderElement: HTMLElement;
  private windowHeaderTitleElement: HTMLElement;
  // private windowContainerElement: HTMLElement;
  // private windowBodyElement: HTMLElement;
  private windowFooterElement: HTMLElement;

  private windowButtonClose: HTMLElement;
  private windowButtonsMinimize: HTMLElement;
  private windowButtonsRestore: HTMLElement;
  private windowButtonMaximize: HTMLElement;

  private windowIsAcive: boolean = false;
  private windowStatus: WINDOWMODE = WINDOWMODE.FLOATING;
  private windowMinimized = false;

  // private trayBarItem;
  protected windowContent: WindowContent;

  constructor(desktop: DesktopComponent) {
    super("window-component");
    this.desktopComponent = desktop;
    this.id = ++WindowConponent.ID_COUNTER;
    console.log("Window creating with id:", this.id, this);

    this.windowElement = this.domElement;
    const winPosShift = this.id % 10;
    this.setPos({ x: winPosShift * 60, y: winPosShift * 50 });

    // **********************************************************************************
    // header
    this.windowHeaderElement = document.createElement("window-header");
    this.windowHeaderTitleElement = document.createElement(
      "window-header-title"
    );
    this.windowHeaderTitleElement.innerHTML = this.title;
    this.windowHeaderElement.append(this.windowHeaderTitleElement);

    this.setMoveGrabElement(this.windowHeaderElement);

    // header buttons
    const windowButtons = document.createElement("window-buttons");

    // close button
    this.windowButtonClose = document.createElement("window-button-close");
    this.windowButtonClose.innerHTML = "&#128473;&#xFE0E;"; // '&#10799;';
    this.windowButtonClose.addEventListener(
      "click",
      this.windowClose.bind(this)
    );

    // minimizebutton
    this.windowButtonsMinimize = document.createElement(
      "window-button-minimize"
    );
    this.windowButtonsMinimize.innerHTML = "&#128469;&#xFE0E;";
    this.windowButtonsMinimize.addEventListener(
      "click",
      this.windowMinimize.bind(this)
    );

    // restorebutton
    this.windowButtonsRestore = document.createElement("window-button-restore");
    this.windowButtonsRestore.innerHTML = " &#128471;&#xFE0E; "; // '&#10697;';
    this.windowButtonsRestore.addEventListener(
      "click",
      this.windowRestore.bind(this)
    );

    //maximizebutton
    this.windowButtonMaximize = document.createElement(
      "window-button-maximize"
    );
    this.windowButtonMaximize.innerHTML = "&#128470;&#xFE0E;"; // '&#9109;';
    this.windowButtonMaximize.addEventListener(
      "click",
      this.windowMaximize.bind(this)
    );

    windowButtons.append(this.windowButtonsMinimize);
    windowButtons.append(this.windowButtonMaximize);
    windowButtons.append(this.windowButtonsRestore);
    windowButtons.append(this.windowButtonClose);

    this.windowHeaderElement.append(windowButtons);
    this.windowElement.append(this.windowHeaderElement);

    // body
    // this.#windowBodyElement = document.createElement("window-body");
    // this.#windowElement.append(this.#windowBodyElement);
    this.windowContent = new WindowContent();
    this.addChild(this.windowContent);

    // footer
    this.windowFooterElement = document.createElement("window-footer");
    this.windowElement.append(this.windowFooterElement);

    // resizeelement
    const resizeElement = document.createElement("window-footer-resize-action");
    this.windowElement.append(resizeElement);
    this.setResizeGrabElement(resizeElement);

    this.setWindowFootermessage("window initializing...");
    this.setPos();

    // ***********************************************************************************
    this.render();
    this.setWindowTitle("Noname");
  }

  private render() {
    this.windowElement.addEventListener(
      "mousedown",
      this.windowSetActive.bind(this)
    );
    this.windowElement.addEventListener(
      "keydown",
      this.handleKeyDown.bind(this)
    );
  }

  setWindowTitle(title = "Untitled window") {
    this.title = `${title} (${this.id})`;
    if (this.windowHeaderTitleElement) {
      this.windowHeaderTitleElement.innerHTML = this.title;
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    // e.preventDefault();
    // e.stopPropagation();
    console.log("Window #handleKeypress", e);
  }

  private windowSetActive() {
    this.desktopComponent.setChildWindowActive(this.id);

    console.log("windowSetActive");
  }
  windowClose(e: Event) {
    if (e) e.stopPropagation();
    console.log("windowClose");
    // delete this.#trayBarItem ;
    this.desktopComponent.closeWindow(this.id);
  }

  windowMinimize(e: Event) {
    if (e) e.stopPropagation();
    this.windowStatus = WINDOWMODE.MINIMIZED;
    console.log("windowMinimize");
    this.windowMinimized = true;
    this.windowElement.classList.add("minimized");
    this.desktopComponent.setChildWindowInActive(this.id);
    //this.#windowElement.classList.remove('maximized');
  }

  setWindowFootermessage(message = "...") {
    this.footermessage = message;
    this.windowFooterElement.innerHTML = message;
  }

  windowMaximize(e: Event) {
    if (e) e.stopPropagation();
    console.log("windowMaximize");
    this.windowStatus = WINDOWMODE.MAXIMIZED;
    this.windowMinimized = false;
    this.windowElement.classList.remove("minimized");
    this.windowElement.classList.add("maximized");
  }
  windowRestore(e: Event) {
    if (e) e.stopPropagation();
    this.windowStatus = WINDOWMODE.FLOATING;
    this.windowMinimized = false;
    console.log("windowRestore");
    this.windowElement.classList.remove("minimized");
    this.windowElement.classList.remove("maximized");
  }

  windowRewoke() {
    this.windowElement.classList.remove("minimized");
  }

  setActiveStatus(active = false) {
    // console.log('setActiveStatus', this.#id, active);
    if (active) {
      this.windowElement.classList.add("active");
      this.windowIsAcive = true;
      if (this.windowStatus === WINDOWMODE.MINIMIZED) {
        this.windowRewoke();
      }
    } else {
      this.windowElement.classList.remove("active");
      this.windowIsAcive = true;
    }

    // sync trybar active status
    // if (this.trayBarItem) {
    //   this.trayBarItem.setActiveStatus(active);
    // }
  }
  getId() {
    return this.id;
  }
  getTitle() {
    return this.title;
  }
  isActive() {
    return this.windowIsAcive;
  }
}
