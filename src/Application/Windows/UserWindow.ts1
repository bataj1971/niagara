import { TextInput } from "../components/FormComponents/Fields/TextInput";
import { UserService } from "../Services/UserService.ts";
import { WindowModuleLister } from "../components/DesktopComponents/WindowComponents/WindowModuleLister";

export class UserWindow extends WindowModuleLister {

    #windowContent;
    #dataGrid;
    #form;
    #formFields = {};
    constructor(parent) {
        super(parent);
        this.setWindowTitle('User');

        this.loadData();
        this.renderContent();
        this.setWindowMode(0);


    }
    dataGridSettings() {
        const dataGridSettings = {
            columns: [
                { data: 'username', label: "Username", },
                { data: 'firstname', label: "Fist Name", width: '50%' },
                { data: 'lastname', label: "Last Name", width: '50%' },
                { data: 'email', label: "E-mail", width: '200px' },
            ]
        };
        return dataGridSettings;
    }

    addFormFields() {
        this.formFields['firstName'] = new TextInput(this.form, { label: 'First name', col: 8 });
        this.formFields['lastName'] = new TextInput(this.form, { label: 'Last name', col: 8 });
        this.formFields['eMail'] = new TextInput(this.form, { label: 'E-mail' });

    }

    loadData() {
        
        console.log('UserWindow laodData ');
        const userService = new UserService();
        userService.loadData().then(data => {
            console.log('userService.loadData promis resolve:', data);
            const userlist = userService.index();
            console.log('userlist in userWindow', userlist);
            this.dataGrid.setData(userlist);
            this.dataGrid.render();
        });
    }

    renderContent() {

    }

}
