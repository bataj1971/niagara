import { DesktopComponent } from "../../Components/LayoutComponents/DesktopComponents/Desktop/DesktopComponent";
import { WindowConponent } from "../../Components/LayoutComponents/WindowsComponents/WindowConponent";



export class CustomerWindow extends WindowConponent {
    constructor(desktop: DesktopComponent ) {
        super(desktop);
        this.setWindowTitle('Customer');       
     
    }

}
