// import { BaseInput } from "../BaseInput";
import { BaseInput } from "./BaseInput";
import "./BaseButton.scss";
import { InputSettings } from "./InputSettings";

export abstract class BaseButton extends BaseInput {
  constructor(settings: InputSettings) {
    settings.inputTag = "button";
    settings.label = settings.label ?? "Button";
    super(settings);
    // this.render();

    const onClick = settings.onClick ?? this.onClickFunction.bind(this);
    this.domElement.addEventListener("click", onClick);
  }

   render() {
     this.setLabel();
   }


  protected createLabelElement() {
    // this.labelElement = this.domElement;
  }

  setLabel() {
    // get the button element, set label as content
    this.getInputElement().innerHTML = this.getLabel();
  }

  onClickFunction() {
    console.log("Button clicked:" + this.settings.label);
  }
}


