import { DesktopComponent } from "../../Components/LayoutComponents/DesktopComponents/Desktop/DesktopComponent";
import { DateTimeInput } from "../../Components/LayoutComponents/FormComponents/FormFields/DateTimeInput";
import { DropDownInput } from "../../Components/LayoutComponents/FormComponents/FormFields/DropDownInput";
import { TextInput } from "../../Components/LayoutComponents/FormComponents/FormFields/TextInput";
import {
  DataGridOptions,
  GridDataRow,
} from "../../Components/LayoutComponents/FormComponents/WindowDataGrid/DataGridOptions";
import {
  VIEWMODE,
  WindowModuleLister,
} from "../../Components/LayoutComponents/WindowsComponents/WindowModuleLister";
import { UserModel } from "../Models/UserModel";
import { UserService } from "../Services/UserService";
import "./userWindows.scss";
export class UserWindow extends WindowModuleLister<UserModel,UserService> {
  constructor(desktop: DesktopComponent) {
    super(desktop, "User", "user");
    this.setWindowTitle("Users");
    this.setPos({ height: 1000, width: 1000 });
    this.loadListData();

    this.service = UserService.getInstance();
    

    // test remov it:
    const record = this.service.getRecord("1").then((response) => {
      console.log("userService getRecord", response);
    });    
  }

  protected dataGridSettings() {
    const dataGridSettings: DataGridOptions = {
      // newRecordFunction: this.newRecord.bind(this),
      // modRecordFunction: this.modRecord.bind(this),
      // delRecordFunction: this.delRecord.bind(this),
      columns: [
        { dataField: "loginname", label: "loginname" },
        { dataField: "name", label: "Name", width: "60%" },

        { dataField: "email", label: "E-mail", width: "200px" },

        {
          label: "Number",
          width: "100px",
          defaultValue: 1234.56,
          type: "number",
        },
        {
          label: "Groups",
          evaluateFunction: (row: GridDataRow) => {
            const groupList = row.get("usergroups").join(",");
            return groupList ?? "&nbsp;";
          },
          // width: "200px",
          detailOnly: true,
          detailWidth: "300px",
        },
        {
          label: "Rights",
          evaluateFunction: (row: GridDataRow) => {
            const rightList = row.get("userrights").join(",");
            return rightList ?? "&nbsp;";
          },
          detailOnly: true,
          detailWidth: "300px",
        },
      ],
    };
    return dataGridSettings;
  }

  protected addFormFields() {
    this.form.addField(
      new TextInput({
        fieldName: "loginname",
        label: "Login",
        col: 7,
        createOnly: true,
      })
    );
    
    this.form.addField(
      new DropDownInput({
        fieldName: "status",
        label: "User-status",
        options: { a: "Active", b: "Temporary inactive", c: "Inactive" },
        col: 5,
        required: true,
      })
    );    
    this.form.addField(
      new TextInput({ fieldName: "name", label: "Name",required:true, col: 12 })
    );

    this.form.addField(
      new TextInput({
        fieldName: "email",
        label: "E-mail",
        required: true,
        inputType: "email",
        col: 12,
      })
    );

    this.form.addField(
      new DateTimeInput({
        fieldName: "created_at",
        label: "Created",        
        col: 6,
        readonly:true,
      })
    );
    this.form.addField(
      new DateTimeInput({
        fieldName: "modified_at",
        label: "Modified",
        col: 6,
        readonly: true,
      })
    );

  }

  protected loadRecord(data: any) {

    console.log("UserWineos: loadRecord", data);
    // this.formFields.get(firstName).
  }

  protected loadListData(filter: string = "") {
    const userService = UserService.getInstance();
    userService.getIndex({ basic: filter }).then((dataSet) => {
      // const userlist = userService.index();
      const data = dataSet.map((item) => {
        return new Map(Object.entries(item));
      });
      this.dataGrid.setData(data);
      this.dataGrid.render();
    });
  }

  protected renderContent() {}
}
