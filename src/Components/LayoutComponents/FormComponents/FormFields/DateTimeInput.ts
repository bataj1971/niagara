import "./DateTimeInput.scss";
import { BaseInput } from "./BaseInput";


export class DateTimeInput extends BaseInput {

    constructor(settings : object) {
        super( 'date-time-input', 'input', 'datetime-local', settings);
    }

}
