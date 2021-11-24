import { BaseComponent } from "../../../BaseComponents/BaseComponent";
import { WindowConponent } from "../../WindowsComponents/WindowConponent";
import { DesktopComponent } from "./../Desktop/DesktopComponent";
import "./DesktopTrayBarComponent.scss";
import { DesktopTrayBarItemComponent } from "./DesktopTrayBarItemComponent";

export class DesktopTrayBarComponent extends BaseComponent {
  private desktop: DesktopComponent;
  private windowList: Map<number, WindowConponent>;
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
  public addTrayBaritem(window: WindowConponent) {
    console.log("DesktopTrayBarComponent::addTrayBaritem", window);

    const windowId = window.getId();
    if (!this.trayItems.has(windowId)) {
      const newTrayBarItem = new DesktopTrayBarItemComponent(window);

      this.addChild(newTrayBarItem);
      this.trayItems.set(windowId, newTrayBarItem);
      window.addTrayBarItem(newTrayBarItem);
    }
  }

  public removeTrayBarItem(windowId: number) {
    console.log("removeTrayBarItem", windowId);

    this.trayItems.get(windowId).remove();
    this.trayItems.delete(windowId);
  }

  private handleTrayBarItemClick(e: MouseEvent) {
    const trayBarItem = (e.target as Element).closest("desktop-tray-bar-item");
    if (trayBarItem) {
      const id = trayBarItem.getAttribute("windowid");
      console.log("handleTrayBarItemClick", id);
      this.desktop.trigger({ cmd: "setwindowactive", id: id });
    }
  }
}
