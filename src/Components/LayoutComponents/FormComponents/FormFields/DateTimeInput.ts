import "./DateTimeInput.scss";
import { BaseInput } from "./BaseInput";


class DateTimeInput extends BaseInput {

    constructor(settings : object) {
        super( 'date-time-input', 'input', 'datetime-local', settings);
        // this.processSettings(settings);
    }

}
export { DateTimeInput };