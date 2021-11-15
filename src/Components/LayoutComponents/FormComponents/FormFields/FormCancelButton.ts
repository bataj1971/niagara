import { BaseButton } from "./BaseButton";
import "./FormCancelButton.scss";

export class FormCancelButton extends BaseButton {
    constructor( settings = {}) {
        super('form-cancel-button');

        Object.assign(settings, { label : "Cancel" });
        
        this.processSettings(settings);

    }

}
