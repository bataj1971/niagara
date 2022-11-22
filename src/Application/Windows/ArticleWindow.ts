import { DesktopComponent } from "../../Components/LayoutComponents/DesktopComponents/Desktop/DesktopComponent";
import { DateInput } from "../../Components/LayoutComponents/FormComponents/FormFields/DateInput";
import { DateTimeInput } from "../../Components/LayoutComponents/FormComponents/FormFields/DateTimeInput";
import { IntegerInput } from "../../Components/LayoutComponents/FormComponents/FormFields/IntegerInput";
import { RelatedIdNameInput } from "../../Components/LayoutComponents/FormComponents/FormFields/RelatedIdNameInput";
import { TextInput } from "../../Components/LayoutComponents/FormComponents/FormFields/TextInput";
import { VIEWMODE, WindowModuleLister } from "../../Components/LayoutComponents/WindowsComponents/WindowModuleLister";
import { ArticleModel } from "../Models/ArticleModel";
import { ArticleService } from "../Services/ArticleService";

export class ArticleWindow extends WindowModuleLister<ArticleModel, ArticleService> {
  constructor(desktop: DesktopComponent) {
    super(desktop, "Article");
    this.setViewMode(VIEWMODE.EDIT);
    this.renderContent();
  }

  renderContent() {
    // const windowContent = this.getWindowContent();
    // const form = new WindowForm(windowContent);
    // const i1 = new TextInput(form, { label: 'Name' });
  }

  addFormFields() {
    this.form.addField(
      new TextInput({
        fieldName: "ean",
        label: "Code",
        col: 6,
        createOnly: true,
        required: true,
      })
    );
    this.form.addField(
      new TextInput({
        fieldName: "unit",
        label: "Unit",
        col: 6,
        createOnly: true,
        required: true,
      })
    );

    this.form.addField(
      new TextInput({
        fieldName: "name",
        label: "Currency name",
        col: 12,
        required: true,
      })
    );

  }
  dataGridSettings() {
    return {
      columns: [        
        { dataField: "ean", label: "Code", width: "80px" },
        { dataField: "name", label: "Name", width: "100%" },
        { dataField: "price", label: "Price" },
        { dataField: "unit", label: "Unit" },
      ],
    };
  }
}
