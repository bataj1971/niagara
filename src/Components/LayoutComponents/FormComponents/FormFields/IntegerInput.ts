import "./IntegerInput.scss";
import { BaseInput } from "./BaseInput";


class IntegerInput extends BaseInput {

    constructor(settings : Object) {
        super( 'integer-input', 'input', 'number');
        
        this.processSettings(settings);

    }

}
export { IntegerInput };