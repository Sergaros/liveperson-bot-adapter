import {
  ActivityTypes,
  ActionTypes,
  TurnContext,
  ConversationState,
  CardFactory
} from "botbuilder";
import { LivePersonBotAdapter } from "./liveperson/livepersonbotadapter";

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
      // Handle message activity type. User's responses via text or speech or card interactions flow back to the bot as Message activity.
      // Message activities may contain text, speech, interactive cards, and binary or unknown attachments.
      // see https://aka.ms/about-bot-activity-message to learn more about the message and other activity types
      if (turnContext.activity.type === ActivityTypes.Message) {
        // read from state.
        let count = await this.countProperty.get(turnContext);
        count = count === undefined ? 1 : ++count;

        let reply: any = `${count}: You said ${viaString}: "${turnContext.activity.text}"`;

        if (turnContext.activity.text === "card") {


          const card = CardFactory.adaptiveCard({
            $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
            type: "AdaptiveCard",
            version: "1.0",
            body: [
              {
                type: "TextBlock",
                text:
                  "What color do you want? *(isMultiSelect:false, style:compact)*"
              },
              {
                type: "Input.ChoiceSet",
                id: "myColor",
                style: "compact",
                isMultiSelect: false,
                value: "1",
                choices: [
                  {
                    title: "Red",
                    value: "1"
                  },
                  {
                    title: "Green",
                    value: "2"
                  },
                  {
                    title: "Blue",
                    value: "3"
                  }
                ]
              },
              {
                type: "TextBlock",
                text:
                  "What color do you want? *(isMultiSelect:false, style:expanded)*"
              },
              {
                type: "Input.ChoiceSet",
                id: "myColor2",
                style: "expanded",
                isMultiSelect: false,
                value: "1",
                choices: [
                  {
                    title: "Red",
                    value: "1"
                  },
                  {
                    title: "Green",
                    value: "2"
                  },
                  {
                    title: "Blue",
                    value: "3"
                  }
                ]
              },
              {
                type: "TextBlock",
                text:
                  "What colors do you want? *(isMultiSelect:true, style:compact)*"
              },
              {
                type: "Input.ChoiceSet",
                id: "myColor3",
                isMultiSelect: true,
                value: "1,3",
                style: "compact",
                choices: [
                  {
                    title: "Red",
                    value: "1"
                  },
                  {
                    title: "Green",
                    value: "2"
                  },
                  {
                    title: "Blue",
                    value: "3"
                  }
                ]
              },
              {
                type: "TextBlock",
                text:
                  "What colors do you want? *(isMultiSelect:true, style:expanded)*"
              },
              {
                type: "Input.ChoiceSet",
                id: "myColor4",
                isMultiSelect: true,
                value: "1",
                style: "expanded",
                choices: [
                  {
                    title: "Red",
                    value: "1"
                  },
                  {
                    title: "Green",
                    value: "2"
                  },
                  {
                    title: "Blue",
                    value: "3"
                  }
                ]
              }
            ],
            actions: [
              {
                type: "Action.Submit",
                title: "OK",
                id: "submit id"
              }
            ]
          });

          reply = { type: ActivityTypes.Message, attachments: [card] };
        }

        await turnContext.sendActivity(reply);

        // await turnContext.sendActivity(JSON.stringify(reply));

        // Increment and set turn counter.
        // await this.countProperty.set(turnContext, count);
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
