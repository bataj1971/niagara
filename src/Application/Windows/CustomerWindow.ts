import { DesktopComponent } from "../../Components/LayoutComponents/DesktopComponents/Desktop/DesktopComponent";
import { DateTimeInput } from "../../Components/LayoutComponents/FormComponents/FormFields/DateTimeInput";
import { DropDownInput } from "../../Components/LayoutComponents/FormComponents/FormFields/DropDownInput";
import { TextInput } from "../../Components/LayoutComponents/FormComponents/FormFields/TextInput";
import { WindowModuleLister } from "../../Components/LayoutComponents/WindowsComponents/WindowModuleLister";
import { CustomerModel } from "../Models/CustomerModel";
import { CustomerService } from "../Services/CustomerService";



export class CustomerWindow extends WindowModuleLister<CustomerModel,CustomerService> {
  constructor(desktop: DesktopComponent) {
    super(desktop, "Customer", "customer");
    this.setWindowTitle("Customer");
    this.setPos({ height: 1000, width: 1000 });
    this.loadListData();

    this.service = CustomerService.getInstance();
  }

  addFormFields() {

    this.form.addField(
      new TextInput({
        fieldName: "name",
        label: "Name",
        required: true,
        col: 12,
      })
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
        readonly: true,
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
  dataGridSettings() {
    return {
      columns: [
        { dataField: "id", label: "Id", width: "80px" },
        { dataField: "name", label: "Name", width: "100%" },
        { dataField: "email", label: "Email", width: "80px" },        
      ],
    };
  }
}
