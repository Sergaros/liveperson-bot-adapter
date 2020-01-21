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

      // Handle message activity type. User's responses via text or speech or card interactions flow back to the bot as Message activity.
      // Message activities may contain text, speech, interactive cards, and binary or unknown attachments.
      // see https://aka.ms/about-bot-activity-message to learn more about the message and other activity types
      if (turnContext.activity.type === ActivityTypes.Message) {
        // read from state.
        let count = await this.countProperty.get(turnContext);
        count = count === undefined ? 1 : ++count;




        if (turnContext.activity.text === "card") {

          const card = CardFactory.adaptiveCard({
                "type": "AdaptiveCard",
                "body": [
                  {
                    "type": "Container",
                    "items": [
                      {
                        "type": "TextBlock",
                        "size": "Medium",
                        "weight": "Bolder",
                        "text": "Surface Dial"
                      }
                    ]
                  },
                  {
                    "type": "Container",
                    "items": [
                      {
                        "type": "Image",
                        "url": "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Jq0G?ver=c215&q=90&m=6&h=270&w=270&b=%23FFFFFFFF&f=jpg&o=f&aim=true"
                      },
                      {
                        "type": "TextBlock",
                        "text": "• Easy access to shortcuts, controls, drawing tools, and more\n• Adjust volume on your favorite tracks in Spotify, Groove, and Pandora\n• Compatible with all Windows 10 devices\n• Edit, rotate, and manipulate your creations in a single turn",
                        "wrap": true
                      },
                      {
                        "type": "FactSet",
                        "facts": [
                          { "title": "Starting at:", "value": "$99.99" },
                          { "title": "Colors:", "value": "Single" }
                        ]
                      }
                    ]
                  }
                ],
                "actions": [
                  {
                    "type": "Action.OpenUrl",
                    "title": "Learn more",
                    "url": "https://www.microsoft.com/en-us/p/surface-dial/925R551SKTGN"
                  }
                ],
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "version": "1.0"
              }

          );
          console.log('CARD =>>>', card);
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
