import "./IntegerInput.scss";
import { BaseInput } from "./BaseInput";


export class IntegerInput extends BaseInput {

    constructor(settings : object) {
        super( 'integer-input', 'input', 'number',settings);
        
        // this.processSettings(settings);

    }

}
