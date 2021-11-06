// import { BaseInput } from "../BaseInput";
import { BaseInput } from "./BaseInput";

class BaseButton extends BaseInput {
    constructor(type :string) {        
            super(type, 'button', '');        
    }

    render() {
        this.createInputElement();
        
    }

    processSettings(settings: Object) {
        const labelSettings = { label: '' };
        Object.assign(labelSettings, settings);
        this.getInputElement().innerHTML = labelSettings.label ?? 'Noname button';
        Object.assign(settings, {label:''});
        super.processSettings(settings);
    }
}
export { BaseButton };

