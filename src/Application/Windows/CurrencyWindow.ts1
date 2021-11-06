import { WindowModuleLister } from "../components/DesktopComponents/WindowComponents/WindowModuleLister";
import {CurrencyService} from "../Services/CurrencyService.ts";
import { TextInput } from "../components/FormComponents/Fields/TextInput";

export class CurrencyWindow extends WindowModuleLister {
    constructor(parent) {
        super(parent);
        this.setWindowTitle('Currencies');
        this.loadData();        
        this.setWindowMode(0);
    }

    loadData() {
        console.log('CurrencyWindow laodData ');
        const currencyService = new CurrencyService();
        currencyService.loadData().then(data => {
            console.log('currencyService.loadData promice resolve:', data);
            const dataSet = currencyService.index();
            console.log('dataset in currencyWindow', dataSet);
            this.dataGrid.setData(dataSet);
            this.dataGrid.render();
        });
    }
    addFormFields() {
        this.formFields['code'] = new TextInput(this.form, { label: 'Code', col: 2 });
        this.formFields['name'] = new TextInput(this.form, { label: 'Currency name', col: 10 });
        this.formFields['decimal_digits'] = new TextInput(this.form, { label: 'Decimal digits' });

    }
    dataGridSettings() {
        return {
            columns: [
                { data: 'code', label: 'Code' , width:'80px' },
                { data: 'name', label: 'Name' , width:'100%'},
                { data: 'decimal_digits', label: 'Decimal digits' },
            ]
        }
    }
}

