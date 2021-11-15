import "./TextInput.scss";
import { BaseInput } from "./BaseInput";


export class TextInput extends BaseInput {

    constructor(settings : object) {
        super('text-input', 'input', 'text', settings);
        // this.processSettings(settings);        
    }

}
