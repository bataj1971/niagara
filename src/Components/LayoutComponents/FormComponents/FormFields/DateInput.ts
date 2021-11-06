import "./DateInput.scss";
import { BaseInput } from "./BaseInput";


class DateInput extends BaseInput {
    
        constructor(settings : Object) {
            super('date-input', 'input', 'date');
            this.processSettings(settings);

        }

}
export { DateInput };