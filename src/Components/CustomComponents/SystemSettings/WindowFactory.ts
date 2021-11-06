// import { UserWindow } from "./UserWindow";
// import { ArticleWindow } from "./ArticleWindow";
// import { CustomerWindow } from "./CustomerWindow";

import { DesktopComponent } from "../../LayoutComponents/DesktopComponents/DesktopComponent";
import { WindowConponent } from "../../LayoutComponents/WindowsComponents/WindowConponent";
import { CustomerWindow } from "../Windows/CustomerWindow";

// import { CurrencyWindow } from "./CurrencyWindow";
class WindowFactory {

    createWindow(type = '*',desktop :DesktopComponent) : WindowConponent {
        let window: WindowConponent;

        switch (type) {
            case 'user':
                //window = new UserWindow();
                break;
            case 'article':
                // window = new ArticleWindow();
                break;
            case 'customer':
                // window = new CustomerWindow(desktop);
                break;
            case 'currency':
                // window = new CurrencyWindow();
                break;

            default:
                
                // alert('invalid window type:'+type);
                break;
        }
        window = new CustomerWindow(desktop);
        return window;
    }
    
}
 
export { WindowFactory };