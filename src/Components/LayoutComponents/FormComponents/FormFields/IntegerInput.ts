import "./IntegerInput.scss";
import { BaseInput } from "./BaseInput";


class IntegerInput extends BaseInput {

    constructor(settings : object) {
        super( 'integer-input', 'input', 'number',settings);
        
        // this.processSettings(settings);

    }

}
export { IntegerInput };