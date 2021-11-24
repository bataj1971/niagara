import "./DesktopFooterComponent.scss";
import { BaseComponent } from "../../../BaseComponents/BaseComponent";

export class DesktopFooterComponent extends BaseComponent {
  private footerMessageElement: HTMLElement;
  constructor() {
    super("desktop-footer-component");

    this.footerMessageElement = document.createElement(
      "desktop-footer-message"
    );

    this.footerMessageElement.innerHTML = "Some default message";

    this.domElement.append(this.footerMessageElement);
  }
}
