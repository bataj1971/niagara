export abstract class BaseComponent {
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

  public getDomElement(): HTMLElement {
    return this.domElement;
  }
  public getParentDomElement(): HTMLElement | undefined {
    return this.parentDomElement;
  }
  public getType() {
    const typeNme = this.constructor.name;
    return typeNme;
  }
  public getParentType(): string {
    let typeNme = "**no parent component**";
    if (this.parentComponent) this.parentComponent.constructor.name;
    return typeNme;
  }

  public addChild(childComponent: BaseComponent): BaseComponent {
    childComponent.setParentComponent(this);
    return childComponent;
  }

  protected setParentComponent(parentComponent: BaseComponent) {
    this.parentComponent = parentComponent;
    this.parentDomElement = this.parentComponent?.getDomElement();
    this.parentDomElement.append(this.domElement);
  }

  public getParentComponent(): BaseComponent | any | undefined {
    return this.parentComponent;
  }

  public show() {
    this.domElement.style.display = this.displayMode;
    this.visible = true;
  }

  public hide() {
    this.domElement.style.display = "none";
    this.visible = false;
  }

  public isVisible(): boolean {
    return this.visible;
  }

  public setDisplayMode(newDisplayMode: string) {
    this.displayMode = newDisplayMode;
  }
}
