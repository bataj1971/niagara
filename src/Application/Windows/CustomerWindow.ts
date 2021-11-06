import { DesktopComponent } from "../../Components/LayoutComponents/DesktopComponents/DesktopComponent";
import { WindowConponent } from "../../Components/LayoutComponents/WindowsComponents/WindowConponent";



class CustomerWindow extends WindowConponent {
    constructor(desktop: DesktopComponent ) {
        super(desktop);
        this.setWindowTitle('Customer');       
     
    }

}

export {CustomerWindow}