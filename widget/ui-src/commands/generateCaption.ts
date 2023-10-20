import type { CaptionCommand } from "./type";
import { uploadImage } from "../uploadImage";
import { INTENTS, HOSTNAME, POST_MESSAGE_TYPE } from "../../constants";

export const generateCaptionCommand = {
  name: "generate-caption",
  url: `${HOSTNAME}/api/caption`,
  responseHandler: (response: any): CaptionCommand => {
    return {
      type: POST_MESSAGE_TYPE.STRING,
      intent: INTENTS.DISPLAY_AS_STICKY,
      data: response.output,
    };
  },
  async execute(event: any) {
    const url = await uploadImage(event.data.pluginMessage.bytes);
    await fetch(generateCaptionCommand.url, {
      method: "POST",
      body: url,
    })
      .then((res) => res.json())
      .then((res) => {
        const data = generateCaptionCommand.responseHandler(res);
        generateCaptionCommand.postMessage(
          data,
          event.data.pluginMessage.widgetId
        );
      })
      .catch((err) => console.log(err));
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
