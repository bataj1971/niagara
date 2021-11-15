import { BaseButton } from "./BaseButton";
import "./FormSaveButton.scss";

export class FormSaveButton extends BaseButton {
    constructor(settings = {}) {
        super('form-save-button');

        Object.assign(settings, { label: 'Save' });
        
        this.processSettings(settings);

    }
    
}

