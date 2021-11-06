import "./TextInput.scss";
import { BaseInput } from "./BaseInput";


class TextInput extends BaseInput {

    constructor(settings : Object) {
        super('text-input', 'input', 'text');
        this.processSettings(settings);
        
    }

}
export { TextInput };