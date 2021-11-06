import "./scss/main.scss";


import { DesktopComponent } from "./Components/LayoutComponents/DesktopComponents/DesktopComponent";
import { WindowConponent } from "./Components/LayoutComponents/WindowsComponents/WindowConponent";
console.log("index.ts");

const desktop = new DesktopComponent();

// const testComponent = desktop.addChild(new WindowConponent(desktop));
desktop.addWindow("customer");
