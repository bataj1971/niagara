import { DesktopComponent } from "../../Components/LayoutComponents/DesktopComponents/Desktop/DesktopComponent";
import { DropDownInput } from "../../Components/LayoutComponents/FormComponents/FormFields/DropDownInput";
import { TextInput } from "../../Components/LayoutComponents/FormComponents/FormFields/TextInput";
import { WindowModuleLister } from "../../Components/LayoutComponents/WindowsComponents/WindowModuleLister";
import { UserService } from "../Services/UserService";

export class UserWindow extends WindowModuleLister {
  // #windowContent;
  // dataGrid;
  // #form;
  // #formFields = {};
  constructor(desktop: DesktopComponent) {
    super(desktop, "User");
    this.setWindowTitle("User");

    this.loadData();
    this.renderContent();
    this.setWindowMode(0);
  }

  protected dataGridSettings() {
    const dataGridSettings = {
      columns: [
        { dataField: "username", label: "Username" },
        { dataField: "firstname", label: "Fist Name", width: "30%" },
        { dataField: "lastname", label: "Last Name", width: "30%" },
        { dataField: "email", label: "E-mail", width: "200px" },
        {
          label: "Number",
          width: "100px",
          defaultValue: 1234.56,
          type: "number",
        },
        {
          label: "Long name",
          evaluateFunction: (row: Map<string, any>) => {
            return row.get("firstname") + " " + row.get("lastname");
          },
          width: "200px",
        },
      ],
    };
    return dataGridSettings;
  }

  protected addFormFields() {
    this.formFields.set(
      "firstName",
      this.form.addChild(new TextInput({ label: "First name", col: 8 }))
    );
    this.formFields.set(
      "lastName",
      this.form.addChild(new TextInput({ label: "Last name", col: 8 }))
    );
    this.formFields.set(
      "eMail",
      this.form.addChild(new TextInput({ label: "E-mail" }))
      );
    this.formFields.set(
      "eMail",
        this.form.addChild(new DropDownInput({ label: "User-status", options: {a:'Active',b:'Temporary inactive',c:'Inactive'}}))
    );
      
  }

  protected loadData() {
    // console.log('UserWindow laodData ');
    const userService = new UserService();
    userService.loadData().then((data) => {
      // console.log('userService.loadData promis resolve:', data);
      const userlist = userService.index();
      console.log("userlist in userWindow", userlist);
      this.dataGrid.setData(userlist);
      this.dataGrid.render();
    });
  }

  protected renderContent() {}
}
