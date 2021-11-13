// import { UserWindow } from "./UserWindow";
// import { ArticleWindow } from "./ArticleWindow";
// import { CustomerWindow } from "./CustomerWindow";

import { DesktopComponent } from "../../Components/LayoutComponents/DesktopComponents/DesktopComponent";
import { WindowConponent } from "../../Components/LayoutComponents/WindowsComponents/WindowConponent";
import { ArticleWindow } from "../Windows/ArticleWindow";
import { CurrencyWindow } from "../Windows/CurrencyWindow";
import { CustomerWindow } from "../Windows/CustomerWindow";
import { UserWindow } from "../Windows/UserWindow";

// import { CurrencyWindow } from "./CurrencyWindow";
class WindowFactory {

    createWindow(type = '*',desktop :DesktopComponent) : WindowConponent {
        let window: WindowConponent;

        switch (type) {
            case 'user':
                window = new UserWindow(desktop);
                break;
            case 'article':
                window = new ArticleWindow(desktop);
                break;
            case 'customer':
                window = new CustomerWindow(desktop);
                break;
            case 'currency':
                window = new CurrencyWindow(desktop);
                break;

            default:
                window = new WindowConponent(desktop);
                alert('invalid window type:'+type);
                break;
        }
        
        return window;
    }
    
}
 
export { WindowFactory };