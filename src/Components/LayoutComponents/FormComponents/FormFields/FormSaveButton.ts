import { BaseButton } from "./BaseButton";
import "./FormSaveButton.scss";
import { InputSettings } from "./InputSettings";

export class FormSaveButton extends BaseButton {
    constructor(settings: InputSettings) {
        settings.tagname = "form-save-button";
        settings.label = 'Save';
        super(settings);
    }
    
}

