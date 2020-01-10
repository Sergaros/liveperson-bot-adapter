/**
 * @member elements rich content, text, images, buttons
 * @member type - vertical or horizontal
 * @member quickReplies - suggested actions
 */
export class RichContent {
  elements: Array<any> | undefined;
  quickReplies?: QuickReplies;
  type: string;
}

export class CardContent extends RichContent {
  constructor() {
    super();
    this.type = "vertical";
  }
}

export class CarouselContent extends RichContent {
  padding: number;

  constructor(elements: Array<RichContent>) {
    super();
    this.elements = elements;
    this.type = "carousel";
    this.padding = 10;
  }
}

/**
 * Base class for rich elements
 *
 * @member type text, image, button
 */
export class Element {
  protected type: string;
}

/**
 * Base class for elements containing tooltip
 */
export class ElementWithTooltip extends Element {
  protected tooltip: string;
}

/**
 * Button element class
 *
 * @member click determines behaviour of button
 */
export class Button extends ElementWithTooltip {
  readonly title: string;
  readonly metadata: any;
  readonly click: any;

  constructor(
    tooltip: string,
    title: string,
    buttonActions: Array<ButtonActions>,
    metadata: any = null
  ) {
    super();
    this.type = "button";
    this.tooltip = tooltip;
    this.title = title;
    this.click = { actions: buttonActions };

    if (metadata) {
      this.click.metadata = metadata;
    }
  }
}

/**
 * List Submit Button element class
 *
 * @member click determines behaviour of button
 */
export class SubmitButton extends Button {
  readonly disabled: boolean;

  constructor(
    tooltip: string,
    title: string,
    buttonActions: Array<ButtonActions>,
    metadata: any = null,
    disabled: boolean = false
  ) {
    super(tooltip, title, buttonActions, metadata);
    this.type = "submitButton";
    this.disabled = disabled;
  }
}

/**
 * Base ButtonActions class
 */
export class ButtonActions {
  protected type: string;
}

/**
 * SubmitButtonAction - submit button button action
 */
export class SubmitButtonAction extends ButtonActions {
  submit: boolean;

  constructor() {
    super();
    this.type = "submitAsText"
    this.submit = true;
  }
}

/**
 * LinkButtonAction - open URL button action
 */
export class LinkButtonAction extends ButtonActions {
  readonly name: string;
  readonly uri: string;

  constructor(name: string, uri: string) {
    super();
    this.name = name;
    this.uri = uri;
    this.type = "link";
  }
}

/**
 * Send text button action
 */
export class PostBackButtonAction extends ButtonActions {
  readonly text: string;

  constructor(text: string) {
    super();
    this.text = text;
    this.type = "publishText";
  }
}

/**
 * Text element style
 * @TODO update for all posible text style properties
 */
export interface ITextElementStyle {
  size?: string;
  color?: string;
  "background-color"?: string;
  bold?: boolean;
  italic?: boolean;
}

/**
 * Simple Text element
 *
 */
export class SimpleTextElement extends Element {
  readonly text: string;

  constructor(text: string) {
    super();
    this.type = "text";
    this.text = text;
  }
}

/**
 * Text element
 *
 */
export class TextElement extends ElementWithTooltip {
  readonly text: string;
  readonly style: ITextElementStyle;

  constructor(text: string, tooltip: string, style: ITextElementStyle = {}) {
    super();
    this.type = "text";
    this.text = text;
    this.tooltip = tooltip;
    const keys = Object.keys(style);
    if (keys.length) {
      this.style = style;
    }
  }
}

/**
 * Image element
 *
 * Note that the URL must be whitelisted in the LivePerson service
 */
export class Image extends ElementWithTooltip {
  readonly url: string;

  constructor(url: string, tooltip: string) {
    super();
    this.type = "image";
    this.tooltip = tooltip;
    this.url = url;
  }
}

/**
 * Suggested action button
 */
export class QuickReply {
  readonly type: string;
  readonly tooltip: string;
  readonly title: string;
  readonly click: any;

  constructor(value: string, title: string) {
    this.type = "button";
    this.tooltip = title;
    this.title = title;
    this.click = {
      actions: [new PostBackButtonAction(value)],
      metadata: [{ type: "ExternalId", id: "ExternalIdValue" }]
    };
  }
  TextElement;
}
TextElement;
/**
 * Suggested actions
 */
export class QuickReplies extends Element {
  replies: Array<QuickReply>;
  readonly itemsPerRow: number;

  constructor(itemsPerRow: number) {
    super();
    this.itemsPerRow = itemsPerRow;
    this.type = "quickReplies";
    this.replies = new Array<QuickReply>();
  }
}

export class Container extends Element {
  elements: Array<Element>;

  constructor(containerType: "vertical" | "horizontal" | "list" | "sectionList" | "buttonList" | "section" | "checklist") {
    super();
    this.type = containerType;
    this.elements = new Array<Element>();
  }
}

export class Section extends Container {
  elements: Array<Element>;
  sectionID: string;

  constructor(sectionID) {
    super("section");
    this.sectionID = sectionID;
  }
}

export class CheckBox extends Element{
  readonly type: string;
  readonly text: string;
  readonly click: any;

  constructor(text: string, value: string){
    super();
    this.type = "checkbox";
    this.text = text;

    this.click = {
      actions: [{type: "checked", "publishText": text}],
      metadata: [{ type: "ExternalId", id: value }]
    };
  }
}

export enum ElementTypes {
  Container = "Container",
  ColumnSet = "ColumnSet",
  Column = "Column",
  FactSet = "FactSet",
  TextBlock = "TextBlock",
  ImageSet = "ImageSet",
  Image = "Image",
  Media = "Media",
  MultiSelect = "Input.ChoiceSet",
}
