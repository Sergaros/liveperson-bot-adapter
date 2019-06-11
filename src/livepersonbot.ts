import {
  ActivityTypes,
  ActionTypes,
  TurnContext,
  ConversationState,
  CardFactory
} from "botbuilder";
import { LivePersonBotAdapter } from "./liveperson/livepersonbotadapter";

import { default as cardContent } from "./adaptiveCard";
const TURN_COUNTER_PROPERTY: string = "turnCounterProperty";

export class LivePersonBot {
  private conversationState: ConversationState;
  private countProperty;

  /**
   *
   * @param {ConversationState} conversation state object
   */
  constructor(conversationState) {
    // Creates a new state accessor property.
    // See https://aka.ms/about-bot-state-accessors to learn more about the bot state and state accessors
    this.countProperty = conversationState.createProperty(
      TURN_COUNTER_PROPERTY
    );
    this.conversationState = conversationState;
  }

  /**
   *
   * Use onTurn to handle an incoming activity, received from a user, process it, and reply as needed
   *
   * @param {TurnContext} on turn context object.
   */
  public async onTurn(turnContext: TurnContext) {
    try {
      const isViaLivePerson: boolean =
        turnContext.adapter instanceof LivePersonBotAdapter;
      const viaString: string = isViaLivePerson
        ? "via LivePerson"
        : "via Bot Framework connector";

      console.log(
        "turnContext.activity - ",
        JSON.stringify(turnContext.activity)
      );

      if (turnContext.activity.type === ActivityTypes.Message) {
        // let reply: any = `${count}: You said ${viaString}: "${
        //   turnContext.activity.text
        // }"`;

        const index = "My choise is:";
        if (turnContext.activity.text.startsWith(index)) {
          const result = turnContext.activity.text
            .slice(index.length)
            .trim()
            .split(",");

          console.log("result - ", result);
          let text: any = `Your choise is:
            ${result}
           `;

          await turnContext.sendActivity({
            type: ActivityTypes.Message,
            text: text
          });
        }

        if (turnContext.activity.text === "card") {
          // const buttons = [
          //   {
          //     type: ActionTypes.ImBack,
          //     title: "1. Inline Attachment",
          //     value: "1",
          //     id: "button_id_1"
          //   },
          //   {
          //     type: ActionTypes.ImBack,
          //     title: "2. Internet Attachment",
          //     value: "2",
          //     id: "button_id_2"
          //   },
          //   {
          //     type: ActionTypes.ImBack,
          //     title: "3. Uploaded Attachment",
          //     value: "3",
          //     id: "button_id_3"
          //   },
          // ];

          // const card = CardFactory.heroCard("checkbox_group", "", undefined, buttons);

          // let reply = { type: ActivityTypes.Message, attachments: [card] };
          // await turnContext.sendActivity(reply);

          // // submit
          // const submit = [
          //   {
          //     type: ActionTypes.ImBack,
          //     title: "Submit  ",
          //     value: "Submit",
          //     id: "submit_id_1"
          //   }
          // ];

          // const cardSubmit = CardFactory.heroCard("Submit", undefined, submit);

          // reply = { type: ActivityTypes.Message, attachments: [cardSubmit] };
          // await turnContext.sendActivity(reply);

          const card = CardFactory.adaptiveCard(cardContent);

          const reply = { type: ActivityTypes.Message, attachments: [card] };
          await turnContext.sendActivity(reply);
        }
      } else {
        // Generic handler for all other activity types.
        await turnContext.sendActivity(
          `[${turnContext.activity.type} event detected ${viaString}]`
        );
      }
      // Save state changes
      await this.conversationState.saveChanges(turnContext);
    } catch (e) {
      console.log("error - ", e);
    }
  }
}
