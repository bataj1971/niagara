import "./DesktopHeaderComponent.scss";
import { BaseComponent } from "../../BaseComponents/BaseComponent";
import { APPCONFIG } from "../../../APPCONFIG";

export class DesktopHeaderComponent extends BaseComponent {
  private desktopHambrgerIconElement: HTMLElement;
  private desktopTitleElement: HTMLElement;

  constructor() {
    super("desktop-header-component");

    this.desktopTitleElement = document.createElement("desktop-header-title");

    this.desktopTitleElement.innerHTML =
      APPCONFIG.application.name ?? "Application name";

    this.domElement.append(this.desktopTitleElement);

    // hamburger.-menu icon
    this.desktopHambrgerIconElement = document.createElement(
      "desktop-header-hamburger-icon"
    );

    this.desktopHambrgerIconElement.innerHTML = "&#x2630;&#xFE0E;";

    this.desktopHambrgerIconElement.addEventListener(
      "click",
      this.toggleHamburgerMenu.bind(this)
    );

    this.domElement.append(this.desktopHambrgerIconElement);
  }

  private toggleHamburgerMenu() {
    console.log("toggleHamburgerMenu");
  }
}
