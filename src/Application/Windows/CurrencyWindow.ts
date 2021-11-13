import { DesktopComponent } from "../../Components/LayoutComponents/DesktopComponents/DesktopComponent";
import { TextInput } from "../../Components/LayoutComponents/FormComponents/FormFields/TextInput";
import { WindowModuleLister } from "../../Components/LayoutComponents/WindowsComponents/WindowModuleLister";
import { CurrencyService } from "../Services/CurrencyService";

export class CurrencyWindow extends WindowModuleLister {
  constructor(desktop: DesktopComponent) {
    super(desktop, "Currencies");

    this.setWindowTitle("Currencies");
    this.loadData();
    this.setWindowMode(0);
  }

  loadData() {
    console.log("CurrencyWindow laodData ");
    const currencyService = new CurrencyService();
    currencyService.loadData().then((data) => {
      console.log("currencyService.loadData promice resolve:", data);
      const dataSet = currencyService.index();
      console.log("dataset in currencyWindow", dataSet);
      this.dataGrid.setData(dataSet);
      this.dataGrid.render();
    });
  }
  addFormFields() {
    this.formFields.set(
      "code",
      this.form.addChild(new TextInput({ label: "Code", col: 2 }))
    );
    this.formFields.set(
      "name",
      this.form.addChild(new TextInput({ label: "Currency name", col: 10 }))
    );
    this.formFields.set(
      "decimal_digits",
      this.form.addChild(new TextInput({ label: "Decimal digits" }))
    );
  }
  dataGridSettings() {
    return {
      columns: [
        { dataField: "code", label: "Code", width: "80px" },
        { dataField: "name", label: "Name", width: "100%" },
        { dataField: "decimal_digits", label: "Decimal digits" },
      ],
    };
  }
}
