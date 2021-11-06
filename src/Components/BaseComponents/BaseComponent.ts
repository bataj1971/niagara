export class BaseComponent {
  private elementTagName: string;

  private parentDomElement?: HTMLElement;

  private displayMode: string = "block";
  private visible: boolean = true;

  protected domElement: HTMLElement;
  protected parentComponent?: BaseComponent;

  constructor(elementTagName = "dummy-element") {
    this.elementTagName = elementTagName;
    this.domElement = document.createElement(this.elementTagName);
  }

  getDomElement(): HTMLElement {
    return this.domElement;
  }
  getParentDomElement(): HTMLElement | undefined {
    return this.parentDomElement;
  }

  addChild(childComponent: BaseComponent): BaseComponent {
    childComponent.setParentComponent(this);
    return childComponent;
  }

  setParentComponent(parentComponent: BaseComponent) {
    this.parentComponent = parentComponent;
    this.parentDomElement = this.parentComponent?.getDomElement();
    this.parentDomElement.append(this.domElement);
  }

  show() {
    this.domElement.style.display = this.displayMode;
    this.visible = true;
  }

  hide() {
    this.domElement.style.display = "none";
    this.visible = false;
  }

  getVisible(): boolean {
    return this.visible;
  }
}
