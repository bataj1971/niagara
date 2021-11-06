import { BaseButton } from "./BaseButton";
import "./FormCancelButton.scss";

class FormCancelButton extends BaseButton {
    constructor( settings = {}) {
        super('form-cancel-button');

        Object.assign(settings, { label : "Cancel" });
        
        this.processSettings(settings);

    }

}

export { FormCancelButton };