import "./DateTimeInput.scss";
import { BaseInput } from "./BaseInput";


class DateTimeInput extends BaseInput {

    constructor(settings : Object) {
        super( 'date-time-input', 'input', 'datetime-local');
        this.processSettings(settings);
    }

}
export { DateTimeInput };