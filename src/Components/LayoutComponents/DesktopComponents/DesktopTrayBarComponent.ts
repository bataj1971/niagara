import { BaseComponent } from "../../BaseComponents/BaseComponent";
import { WindowConponent } from "../WindowsComponents/WindowConponent";
import { DesktopComponent } from "./DesktopComponent";
import "./DesktopTrayBarComponent.scss";
import { DesktopTrayBarItemComponent } from "./DesktopTrayBarItemComponent";

export class DesktopTrayBarComponent extends BaseComponent {
  private desktop: DesktopComponent;
  private windowList: Map<number, WindowConponent> ;
  private trayItems;

  constructor(desktop: DesktopComponent) {
    super("desktop-tray-bar-component");
    this.desktop = desktop;
    this.windowList = new Map(); // TODO  this.desktop.windowList;

    this.trayItems = new Map();
    this.domElement.addEventListener(
      "click",
      this.handleTrayBarItemClick.bind(this)
    );
  }
  addTrayBaritem(window: WindowConponent) {
    const windowId = window.getId();
    if (!this.trayItems.has(windowId)) {
      this.trayItems.set(windowId, new DesktopTrayBarItemComponent(window));
    }
  }

  removeTrayBarItem(windowId: number) {
    console.log("removeTrayBarItem", windowId);

    this.trayItems.get(windowId).remove();
    this.trayItems.delete(windowId);
  }

  handleTrayBarItemClick(e : MouseEvent) {
    const menuItem = (e.target as Element).closest("desktop-tray-bar-item");
    if (menuItem) {
      const id = menuItem.getAttribute("windowid");
      console.log("handleTrayBarItemClick", id);
      this.desktop.trigger({ cmd: "setwindowactive", id: id });
    }
  }
}
