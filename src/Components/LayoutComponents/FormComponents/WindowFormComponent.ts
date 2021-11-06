import './WindowFormComponent.scss';

import { WindowFormButtonBar } from './WindowFormButtonBar';
import { FormSaveButton } from './FormFields/FormSaveButton';
import { FormCancelButton } from './FormFields/FormCancelButton';
import { BaseComponent } from '../../BaseComponents/BaseComponent';


export class WindowFormComponent extends BaseComponent {
  private buttonBar: WindowFormButtonBar;
  private formSaveButton: FormSaveButton;
  private formCancelButton: FormCancelButton;

  private callBackFunction: any;

  constructor() {
    super("window-form");
    this.buttonBar = new WindowFormButtonBar();
    // this.buttonBar = new WindowFormButtonBar(this.parent);
    this.formSaveButton = new FormSaveButton();
    this.buttonBar.addChild(this.formSaveButton);

    this.formCancelButton = new FormCancelButton();
    this.buttonBar.addChild(this.formCancelButton);

    this.formSaveButton
      .getDomElement()
      .addEventListener("click", this.handleSaveButtonClick.bind(this));
    this.formCancelButton
      .getDomElement()
      .addEventListener("click", this.handleCancelButtonClick.bind(this));
  }

  handleCancelButtonClick(e: MouseEvent) {
    e.stopPropagation();
    console.log("handleCanceluttonClick");
  }

  handleSaveButtonClick(e: MouseEvent) {
    e.stopPropagation();
    console.log("handleSaveButtonClick");
  }

  onSubmit() {}
  submit() {}

//   addEventListener(callBackFunction : f) {
//     this.callBackFunction = callBackFunction;
//   }

  dummyCallbackFunction() {
    console.error("Callback function not set for WindowForm: ", this.getParentType());
  }
}


