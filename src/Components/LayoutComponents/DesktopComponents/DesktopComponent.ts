import "./DesktopComponent.scss";

import { RootComponent } from "../../BaseComponents/RootComponent";
import { DesktopHeaderComponent } from "./DesktopHeaderComponent";

import { DesktopMenuBarComponent } from "./DesktopMenuBarComponent";
import { DesktopFooterComponent } from "./DesktopFooterComponent";
import { DesktopTrayBarComponent } from "./DesktopTrayBarComponent";
import { WindowFactory } from "../../../Application/SystemSettings/WindowFactory";
import { WindowConponent } from "../WindowsComponents/WindowConponent";
import { DesktopWindowContainer } from "./DesktopWindowContainer";
import { DesktopMessagesComponent } from "./DesktopMessagesComponent";
import { APPCONFIG } from "../../../APPCONFIG";


export class DesktopComponent extends RootComponent {
  // private desktopTitle;

  private desktopElement;
  // private desktopTitleElement ;
  // private desktopwindowContainerElement : DesktopWindowContainer;
  // private dekstopMenuBarElement : DesktopMenuBarComponent;
  // private desktopTrayBarElement : DesktopTrayBarComponent;
  private windowList: Map<number, WindowConponent>;
  private windowOrder: Array<number> = [];

  private windowFactory: WindowFactory;

  private menubar: DesktopMenuBarComponent;
  private traybar: DesktopTrayBarComponent;
  private header: DesktopHeaderComponent;
  private windowContainer: DesktopWindowContainer;
  private footer: DesktopFooterComponent;
  private desktopmessages: DesktopMessagesComponent;
  private activeWindowId: number = 0;

  constructor() {
    super("desktop-component");
    this.desktopElement = this.domElement;
    // building desktop from elements:
    this.header = new DesktopHeaderComponent();
    this.menubar = new DesktopMenuBarComponent(this);
    this.footer = new DesktopFooterComponent();
    this.traybar = new DesktopTrayBarComponent(this);
    this.windowContainer = new DesktopWindowContainer();
    this.desktopmessages = new DesktopMessagesComponent();

    this.addChild(this.header);
    this.addChild(this.menubar);
    this.addChild(this.windowContainer);
    this.addChild(this.footer);
    this.addChild(this.traybar);
    this.addChild(this.desktopmessages);

    // preparing windows handling
    this.windowList = new Map();
    this.windowFactory = new WindowFactory();

    window.addEventListener("resize", this.handleDesktoResize.bind(this));
    this.domElement.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  private handleKeyDown(e : KeyboardEvent) {
    e.preventDefault();
    console.log("DEsktop - handleKeyDown ", e);
  }

  public closeWindow(windowId: number) {
    const window: WindowConponent = this.windowList.get(windowId)!;
    window.close();
    this.traybar.removeTrayBarItem(windowId);
    this.windowList.delete(windowId);

    const winpos = this.windowOrder.indexOf(windowId);
    this.windowOrder.splice(winpos, 1);
    const newActiveWindwoId = this.windowOrder.at(-1);
    if (newActiveWindwoId) {
      this.setChildWindowActive(newActiveWindwoId);
    }
    console.log(
      "Desktop: window deleted",
      windowId,
      "new active",
      newActiveWindwoId
    );
  }

  public setChildWindowActive(newActiveWindowId: number) {
    // console.log(' desktop setChildWindowActive: ', newActiveWindowId);
    // newActiveWindowId = parseInt(newActiveWindowId);
    if (!this.windowList.has(newActiveWindowId)) {
      console.error(
        " desktop setChildWindowActive window id does not exists: ",
        newActiveWindowId
      );
      return;
    }
    const activeWindow = this.windowList.get(newActiveWindowId);
    this.activeWindowId = newActiveWindowId;

    // putting active window on the end of windowOrder array, others shift back:
    const winpos = this.windowOrder.indexOf(newActiveWindowId);
    this.windowOrder.splice(winpos, 1);
    this.windowOrder.push(newActiveWindowId);

    this.refreshAllWindowActiveStatus();
  }

  public setChildWindowInActive(oldActiveWindowId: number) {
    if (!this.windowList.has(oldActiveWindowId)) {
      console.error(
        " desktop setChildWindowActive window id not exists: ",
        oldActiveWindowId
      );
      return;
    }

    const activeWindow = this.windowList.get(oldActiveWindowId);
    this.activeWindowId = oldActiveWindowId;

    // putting active window on the beginning  of windowOrder array, others shift forward:
    const winpos = this.windowOrder.indexOf(oldActiveWindowId);
    this.windowOrder.splice(winpos, 1);
    this.windowOrder.unshift(oldActiveWindowId);
    // set the new last window as active

    const newActiveWindowId = this.windowOrder.at(-1);

    if (newActiveWindowId) this.activeWindowId = newActiveWindowId;

    this.refreshAllWindowActiveStatus();
  }

  private refreshAllWindowActiveStatus() {
    // set isActive status to all windows, set zIndex
    this.windowOrder.forEach((windowId, index) => {
      const windowProcessed = this.windowList.get(windowId);
      if (!windowProcessed) return;

      const active = this.activeWindowId === windowId;
      windowProcessed.setZ(index + 100);
      windowProcessed.setActiveStatus(active);
    });
  }

  public trigger(triggerMessageData: Object) {
    let triggerMessage = {
      cmd: "",
      id: "",
      windowtype: "",
    };
    Object.assign(triggerMessage, triggerMessageData);

    console.log("desktop triggered:", triggerMessage);
    const cmd = triggerMessage["cmd"] ?? "nomessage";
    switch (cmd) {
      case "setwindowactive":
        const id = Number.parseInt(triggerMessage["id"] ?? "0");
        this.setChildWindowActive(id);
        break;
      case "openWindow":
        const windowTpye = triggerMessage["windowtype"] ?? "notype";
        this.addWindow(windowTpye);
        break;
      case "nomessage":
        console.error("desktop trigger - message error:", triggerMessage);
        break;
      default:
        console.error("desktop trigger - message error:", triggerMessage);
    }
  }

  public addWindow(type = "") {
    // const newWindow = new Window(this.#windowContainer, 'Window');
    // let windowId : number;
    const newWindow = this.windowFactory.createWindow(type, this);
    if (!newWindow) return;
    this.windowContainer.addChild(newWindow);
    const windowId = newWindow.getId();
    this.windowList.set(windowId, newWindow);
    this.windowOrder.push(windowId);
    this.traybar.addTrayBaritem(newWindow);
    this.setChildWindowActive(windowId);

    console.log("this.windowList", this.windowList);
  }

  private handleDesktoResize() {
    const breakpoints = APPCONFIG.settings.responsivity.breakpoints ?? {
      mobile: 576,
      tablet: 678,
      screen: 992,
    };
    const desktopRect = this.domElement.getBoundingClientRect();
    const size = desktopRect.width;

    if (size <= breakpoints.mobile) {
      this.domElement.className = "mobile";
    } else if (size <= breakpoints.tablet) {
      this.domElement.className = "tablet";
    } else if (size <= breakpoints.screen) {
      this.domElement.className = "screen";
    } else {
      this.domElement.className = "screen bigsrceen";
    }
    console.log("handleDesktoResize size:", size, this.domElement.className);
    this.windowOrder.forEach((windowId, index) => {
      const windowProcessed: WindowConponent = this.windowList.get(windowId)!;

      windowProcessed.setPos();
    });
  }
}
