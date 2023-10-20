import { CaptionCommand } from "./type";
import { INTENTS, HOSTNAME, POST_MESSAGE_TYPE } from "../../constants";

export const sdxlCommand = {
  name: "sdxl",
  url: `${HOSTNAME}/api/sdxl`,
  responseHandler: (response: any): CaptionCommand => {
    return {
      type: POST_MESSAGE_TYPE.STRING,
      intent: INTENTS.DISPLAY_AS_STICKY,
      data: response.output,
    };
  },
  async execute(event: any) {
    const { widgetId, text } = event.data.pluginMessage;
    console.log(event.data.pluginMessage);
    await fetch(`${HOSTNAME}/api/sdxl`, {
      method: "POST",
      // Sent as a base64 encoding string
      body: text,
    })
      .then((res) => res.json())
      .then((res) => {
        parent.postMessage(
          {
            pluginMessage: {
              type: POST_MESSAGE_TYPE.OUTPUT_URL,
              url: res.output[0],
              widgetId,
            },
          },
          "*"
        );
      })
      .catch((err) => {
        throw err;
      });
  },

  postMessage: (data: CaptionCommand, widgetId: string) => {
    parent?.postMessage?.(
      {
        pluginMessage: {
          intent: data.intent,
          type: data.type,
          data: data.data,
          widgetId,
        },
      },
      "*"
    );
  },
};
