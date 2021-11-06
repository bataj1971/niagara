import { BaseComponent } from "./BaseComponent";

export class RootComponent extends BaseComponent {
  constructor(elementTagName: string) {
      super(elementTagName);
      
      document.body.append( this.getDomElement()) ;
  }

   /**
    * Just
    * @param parentComponent 
    */ 
  setParentComponent(parentComponent?: BaseComponent) {}
}
