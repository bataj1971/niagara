import './RelatedIdNameInput.scss';
import { BaseInput } from "./BaseInput";

class RelatedIdNameInput extends BaseInput {
    
    private nameInputElement : HTMLElement;

    constructor( settings :Object) {
        super('related-id-name-input', 'input', 'text', settings);

        this.nameInputElement = document.createElement('input');
        (this.nameInputElement as HTMLInputElement) .type = 'text';
        this.nameInputElement.classList.add('name');
        this.getInputElement().classList.add('id');
        this.domElement.append(this.nameInputElement);
        
        
        Object.assign(settings, { columns :12});
        // this.processSettings(settings);
    }

}

export { RelatedIdNameInput };