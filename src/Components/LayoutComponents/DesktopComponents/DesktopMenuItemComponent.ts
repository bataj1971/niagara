import { BaseComponent } from "../../BaseComponents/BaseComponent";


export class DesktopMenuItemComponent extends BaseComponent {
    constructor(id :string = 'default', label :string  = 'menu item') {
        super('menu-item');
        this.domElement.setAttribute("id", id);
        const menuItemLabelElement = document.createElement("menu-item-label");
        menuItemLabelElement.innerHTML = label;
        this.domElement.append(menuItemLabelElement);                
        
    }
}