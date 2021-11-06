import { BaseComponent } from "../../BaseComponents/BaseComponent";
import { WindowConponent } from "../WindowsComponents/WindowConponent";

export class DesktopTrayBarItemComponent extends BaseComponent {
  private window: WindowConponent;
  constructor(window: WindowConponent) {
    super("desktop-tray-bar-item");
    this.window = window;
    // TODO indow.addTrayBarItemAsChild(this);
    const windowId = window.getId();
    const title = window.getTitle();
    const isActive = window.isActive();

    const trayBarItemLabelElement = document.createElement(
      "desktop-tray-bar-item-label"
    );

    trayBarItemLabelElement.innerHTML = title;
    this.domElement.append(trayBarItemLabelElement);
    this.domElement.setAttribute("windowid", windowId + "");
  }

  remove() {
    this.domElement.remove();
  }

  setActiveStatus(active = false) {
    // console.log('DesktopTrayBarItem setActiveStatus', this.#window.getId(), active);
    if (active) {
      this.domElement.classList.add("active");
    } else {
      this.domElement.classList.remove("active");
    }
  }
}
