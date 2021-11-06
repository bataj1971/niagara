import { APPCONFIG } from "../../APPCONFIG";
import { BaseComponent } from "./BaseComponent";

enum DRAGSTATUS {
  OFF,
  RESIZE,
  MOVE,
  SETACTIVE,
}

interface mouseClickType {
  mousex: number;
  mousey: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface currentMousePosType {
  x: number;
  y: number;
}

export class ResizableMovableComponent extends BaseComponent {
  private moveGrabElement?: HTMLElement;
  private resizeGrabElement?: HTMLElement;

  private dragStatus = 0;
  private windowMode = 1;
  private currentMousePos = {
    mousex: 0,
    mousey: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  private mouseClick = {
    mousex: 0,
    mousey: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  private thisWindowMouseMove;
  private pos = {
    x: 35,
    y: 40,
    width: 600,
    height: 400,
    zindex: 100,
  };

  private minHeight = 200;
  private minWidth = 300;

  constructor(elementTagName: string) {
    super(elementTagName);
    this.thisWindowMouseMove = this.windowMouseMove.bind(this);
    window.addEventListener("mouseup", this.windowMouseUp.bind(this));
  }

  setMoveGrabElement(element: HTMLElement) {
    this.moveGrabElement = element;
    this.moveGrabElement.addEventListener(
      "mousedown",
      this.windowMouseDown.bind(this, DRAGSTATUS.MOVE)
    );
  }

  setResizeGrabElement(element: HTMLElement) {
    this.resizeGrabElement = element;
    this.resizeGrabElement.addEventListener(
      "mousedown",
      this.windowMouseDown.bind(this, DRAGSTATUS.RESIZE)
    );
  }

  windowMouseUp() {
    this.setDragStatus(DRAGSTATUS.OFF);
  }

  windowMouseDown(newDragStatus: DRAGSTATUS, e: MouseEvent) {
    // e.stopPropagation();
    const pos = this.getPos();
    Object.assign(this.mouseClick, {
      mousex: e.clientX,
      mousey: e.clientY,
      x: pos.x,
      y: pos.y,
      width: pos.width,
      height: pos.height,
    });

    this.setDragStatus(newDragStatus);
  }

  windowMouseMove(event: MouseEvent) {
    event.stopPropagation();

    this.currentMousePos.x = event.clientX;
    this.currentMousePos.y = event.clientY;

    if (this.dragStatus === DRAGSTATUS.RESIZE) {
      this.windowResize();
    } else if (this.dragStatus === DRAGSTATUS.MOVE) {
      this.windowMove();
    }
  }

  windowMove() {
    const x =
      this.mouseClick.x + (this.currentMousePos.x - this.mouseClick.mousex);
    const y =
      this.mouseClick.y + (this.currentMousePos.y - this.mouseClick.mousey);
    // console.log('window move', this.mouseClick.height, this.#currentMousePos.y, this.mouseClick.mousey);
    this.setPos({ x, y });
  }

  windowResize() {
    const thisDomElement = this.getDomElement();
    const width =
      this.mouseClick.width + (this.currentMousePos.x - this.mouseClick.mousex);

    const height =
      this.mouseClick.height +
      (this.currentMousePos.y - this.mouseClick.mousey);

    const breakpoints = APPCONFIG.settings.responsivity.breakpoints ?? {
      mobile: 576,
      tablet: 678,
      screen: 992,
    };
    const desktopRect = thisDomElement.getBoundingClientRect();
    const size = desktopRect.width;

    thisDomElement.classList.remove("mobile");
    thisDomElement.classList.remove("tablet");
    thisDomElement.classList.remove("screen");
    thisDomElement.classList.remove("bigsrceen");
    if (size <= breakpoints.mobile) {
      thisDomElement.classList.add("mobile");
    } else if (size <= breakpoints.tablet) {
      thisDomElement.classList.add("tablet");
    } else if (size <= breakpoints.screen) {
      thisDomElement.classList.add("screen");
    } else {
      thisDomElement.classList.add("screen");
      thisDomElement.classList.add("bigsrceen");
    }
    console.log(
      "Resizable element Resize size:",
      size,
      thisDomElement.className
    );

    this.setPos({ width, height });
  }

  setDragStatus(status: DRAGSTATUS) {
    this.dragStatus = status;

    if (this.dragStatus !== DRAGSTATUS.OFF) {
      // turn mouse move on
      // console.log('setDragStatus: windowMouseMove added');
      window.addEventListener("mousemove", this.thisWindowMouseMove);
    } else {
      // turn mosue moove off
      // console.log('setDragStatus: windowMouseMove removed');
      window.removeEventListener("mousemove", this.thisWindowMouseMove);
    }
  }

  setZ(z = 0) {
    this.pos.zindex = z;
    this.setPos();
  }

  getPos() {
    const pos = Object.assign({}, this.pos);
    return pos;
  }

  setPos(settings: Object = {}) {
    Object.assign(this.pos, settings);

    const parentDomElement = this.getParentDomElement();
      if (!parentDomElement) return;
      
    const parentClientRect = parentDomElement.getBoundingClientRect();

    this.pos.height = Math.max(this.pos.height, this.minHeight);

    this.pos.width = Math.max(this.pos.width, this.minWidth);
    this.pos.height = Math.min(this.pos.height, parentClientRect.height);
    this.pos.width = Math.min(this.pos.width, parentClientRect.width);

    this.pos.y = Math.max(this.pos.y, parentClientRect.y);
    this.pos.x = Math.max(this.pos.x, parentClientRect.x);

    this.pos.y = Math.min(
      this.pos.y,
      parentClientRect.height - this.pos.height
    );
    this.pos.x = Math.min(this.pos.x, parentClientRect.width - this.pos.width);

    const thisDomElement = this.getDomElement();
    thisDomElement.style.top = this.pos.y + "px";
    thisDomElement.style.left = this.pos.x + "px";
    thisDomElement.style.height = this.pos.height + "px";
    thisDomElement.style.width = this.pos.width + "px";
    thisDomElement.style.zIndex = this.pos.zindex+"";
  }
}
