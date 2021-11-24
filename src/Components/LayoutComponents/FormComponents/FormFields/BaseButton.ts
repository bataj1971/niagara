// import { BaseInput } from "../BaseInput";
import { BaseInput } from "./BaseInput";

export abstract class BaseButton extends BaseInput {
    constructor(type :string) {        
        super(type, 'button', '');
        this.render();
    }

    render() {
        
         this.setLabel();
    }

    processSettings(settings: Object) {
        super.processSettings(settings);        
    }
    
    setLabel() {
        this.getInputElement().innerHTML =
          this.settings.get("label") ?? "Noname button";    
        
    }
}


