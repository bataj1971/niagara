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
  getType() {
    const typeNme = this.constructor.name;
    return typeNme;    
  }
  getParentType(): string {
    let typeNme = '**no parent component**'
    if (this.parentComponent) this.parentComponent.constructor.name;
    return typeNme;
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
  
  getParentComponent(): BaseComponent | any | undefined {
    return this.parentComponent;
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
  setDisplayMode(newDisplayMode : string) {
    this.displayMode = newDisplayMode;
  }
}
