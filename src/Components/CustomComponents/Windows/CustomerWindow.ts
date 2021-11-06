import { DesktopComponent } from "../../LayoutComponents/DesktopComponents/DesktopComponent";
import { WindowConponent } from "../../LayoutComponents/WindowsComponents/WindowConponent";



class CustomerWindow extends WindowConponent {
    constructor(desktop: DesktopComponent ) {
        super(desktop);
        this.setWindowTitle('Customer');       
     
    }

}

export {CustomerWindow}