import "./scss/main.scss";
console.log("index.ts started");

import { DesktopComponent } from "./Components/LayoutComponents/DesktopComponents/Desktop/DesktopComponent";
import { WindowConponent } from "./Components/LayoutComponents/WindowsComponents/WindowConponent";


const desktop = new DesktopComponent();

// const testComponent = desktop.addChild(new WindowConponent(desktop));
desktop.addWindow("customer");

desktop.addWindow("article");
desktop.addWindow("user");
desktop.addWindow("currency");
console.log("index.ts ended");