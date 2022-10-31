import { DesktopComponent } from "../../Components/LayoutComponents/DesktopComponents/Desktop/DesktopComponent";
import { DateTimeInput } from "../../Components/LayoutComponents/FormComponents/FormFields/DateTimeInput";
import { IntegerInput } from "../../Components/LayoutComponents/FormComponents/FormFields/IntegerInput";
import { TextInput } from "../../Components/LayoutComponents/FormComponents/FormFields/TextInput";
import {
  VIEWMODE,
  WindowModuleLister,
} from "../../Components/LayoutComponents/WindowsComponents/WindowModuleLister";
import { CurrencyService } from "../Services/CurrencyService";
import "./currencyWindow.scss";
export class CurrencyWindow extends WindowModuleLister {
  constructor(desktop: DesktopComponent) {
    super(desktop, "Currencies", "currencies");

    this.setWindowTitle("Currencies");
    this.setPos({ height: 500, width: 600 });
    this.loadData();

    this.setViewMode(VIEWMODE.LIST);
  }

  protected loadData() {
    const currencyService = new CurrencyService();

    currencyService.loadData().then((data) => {
      // console.log("currencyService.loadData promise resolve:", data);
      const dataSet = currencyService.index();
      // console.log("dataset in currencyWindow", dataSet);
      this.dataGrid.setData(dataSet);
      this.dataGrid.render();
    });
  }

  protected addFormFields() {
    this.form.addField(
      new TextInput({ fieldName: "id", label: "Code", col: 3 ,createOnly:true,required:true})
    );

    this.form.addField(
      new TextInput({
        fieldName: "name",
        label: "Currency name",
        col: 10,
        required: true,
      })
    );
    this.form.addField(
      new IntegerInput({
        fieldName: "minor_unit",
        label: "Decimal digits",
        col: 3,
        defaultValue: 2,
        required: true,
      })
    );
    this.form.addField(
      new DateTimeInput({
        fieldName: "created_at",
        label: "Created",
        col: 8,
        readonly: true,
      })
    );
    this.form.addField(
      new DateTimeInput({
        fieldName: "modified_at",
        label: "Modified",
        col: 8,
        readonly: true,
      })
    );    
  }

  protected dataGridSettings() {
    return {
      columns: [
        { dataField: "id", label: "Code", width: "80px" },
        { dataField: "name", label: "Name", width: "100%" },
        { dataField: "minor_unit", label: "Minor Unit" },
      ],
    };
  }

  // protected loadRecordDataToForm(data: any) {
  //   this.formFields.get("code").setv;
  //   console.log("loadRecordDataToForm", data);
  // }
}
