import "./DesktopMenuBarComponent.scss";
import { BaseComponent } from "../../BaseComponents/BaseComponent";
import { DesktopComponent } from "./DesktopComponent";
import { DesktopMenuItemComponent } from "./DesktopMenuItemComponent";


export class DesktopMenuBarComponent extends BaseComponent {
    private desktop: DesktopComponent;
  constructor(desktop : DesktopComponent) {
      super("desktop-menu-bar-component");
      this.desktop = desktop;
      const menuStructure = this.getMenuStructure();
      
        menuStructure.forEach((menu) => {
          this.addmenuItem(
            new DesktopMenuItemComponent(              
              menu.id ?? "noid",
              menu.label ?? "no label"
            ),
            this.domElement,
            menu.submenuitems ?? {}
          );
        });


      this.domElement.addEventListener(
        "click",
        this.handleMenuItemClick.bind(this)
      );
  }

  private addmenuItem(menuItem : DesktopMenuItemComponent, parentElement :HTMLElement, subMenuItems : Array<Object>) {
      parentElement.append(menuItem.getDomElement());
      let menuData = {
          id: '',
          label: '',
          submenuitems:[]
      };

    if (subMenuItems.length) {
      const menuSubmenuElement = document.createElement("menu-submenu");
      menuItem.getDomElement().append(menuSubmenuElement);
        
        subMenuItems.forEach((menu) => {
            Object.assign(
              menuData,
              { id: "", label: "", submenuitems: [] },
              menu
            );
        this.addmenuItem(
          new DesktopMenuItemComponent(
            menuData.id ?? "noid",
            menuData.label ?? "no label"
          ),
          menuSubmenuElement,
          menuData.submenuitems ?? {}
        );
      });
    }
  }

  private handleMenuItemClick(e: Event ) {
        if (!e.target) return;
        

    const menuItem = (e.target as Element).closest("menu-item");
    if (menuItem) {
      const id = menuItem.getAttribute("id");
      console.log("handleMenuItemClick", id);
      this.desktop.trigger({ cmd: "openWindow", windowtype: id });
    }
  }

  private getMenuStructure() {
    return [
      {
        id: "",
        label: "Main",
        submenuitems: [
          { id: "article", label: "Articles" },
          { id: "currency", label: "Currencies" },
          { id: "customer", label: "Customers" },
        ],
      },
      { id: "", label: "Transactions", submenuitems: [] },
      {
        id: "admin",
        label: "Admin",
        submenuitems: [
          { id: "user", label: "Users" },
          { id: "userrights", label: "User-rights" },
          { id: "usergroups", label: "User-groups" },
          { id: "userroles", label: "User-Roles" },
          { id: "userrights", label: "User-rights" },
        ],
      },
      {
        id: "profile",
        label: "User-profile",
        submenuitems: [
          { id: "usermessages", label: "Messages" },
          { id: "usersettings", label: "Settings" },
        ],
      },
    ];
  }
}