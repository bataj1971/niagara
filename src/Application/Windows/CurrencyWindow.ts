import { DesktopComponent } from "../../Components/LayoutComponents/DesktopComponents/Desktop/DesktopComponent";
import { DateTimeInput } from "../../Components/LayoutComponents/FormComponents/FormFields/DateTimeInput";
import { IntegerInput } from "../../Components/LayoutComponents/FormComponents/FormFields/IntegerInput";
import { TextInput } from "../../Components/LayoutComponents/FormComponents/FormFields/TextInput";
import {
  VIEWMODE,
  WindowModuleLister,
} from "../../Components/LayoutComponents/WindowsComponents/WindowModuleLister";
import { CurrencyModel } from "../Models/CurrencyModel";
import { CurrencyService } from "../Services/CurrencyService";
import "./currencyWindow.scss";
export class CurrencyWindow extends WindowModuleLister<CurrencyModel,CurrencyService> {
  constructor(desktop: DesktopComponent) {
    super(desktop, "Currencies", "currencies");

    this.service = CurrencyService.getInstance();
    this.setWindowTitle("Currencies");
    this.setPos({ height: 500, width: 600 });
    this.loadListData();

    this.setViewMode(VIEWMODE.LIST);
  }

  protected loadListData(filter: string = "") {
    if (this.service) {
      this.service.getIndex({ basic: filter }).then((dataSet) => {
        console.log("CurrencyService getIndex", dataSet);

        const data = dataSet.map((item) => {
          return new Map(Object.entries(item));
        });
        this.dataGrid.setData(data);
        this.dataGrid.render();
      });
    }
  }

  protected addFormFields() {
    this.form.addField(
      new TextInput({
        fieldName: "id",
        label: "Code",
        col: 2,
        createOnly: true,
        required: true,
      })
    );

    this.form.addField(
      new TextInput({
        fieldName: "name",
        label: "Currency name",
        col: 6,
        required: true,
      })
    );
    this.form.addField(
      new IntegerInput({
        fieldName: "minor_unit",
        label: "Decimal digits",
        col: 4,
        defaultValue: 2,
        required: true,
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
