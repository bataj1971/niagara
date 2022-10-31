import { BaseButton } from "./BaseButton";
import { InputSettings } from "./InputSettings";
import "./SearchButton.scss";

export class SearchButton extends BaseButton {
  constructor(settings: InputSettings) {
    settings.class = "search-button";
    super(settings);

    Object.assign(settings, { label: "Search" });

    this.processSettings(settings);
  }
}
