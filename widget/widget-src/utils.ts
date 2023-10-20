import { POST_MESSAGE_TYPE } from "../constants";

const DEFAULT_CAPTION_IMAGE =
  "https://pbxt.replicate.delivery/q333GTebk00fN0WhQxuFRjtUEgPuDevRz4MoYUFVJxuS2HVjA/out-0.png";
export const createConnector = async (widgetId: string, command: any) => {
  const node = figma.getNodeById(widgetId);
  let sourceNode = figma.getNodeById(
    // @ts-ignore
    node.attachedConnectors[0]?.connectorStart.endpointNodeId
  );
  if (!sourceNode) {
    if (command === "sdxl" || command === "refine-image") {
      // create a default sticky and connect it to the widget node
      const sticky = figma.createSticky();
      // @ts-ignore
      await figma.loadFontAsync(sticky.text.fontName);
      // @ts-ignore
      sticky.x = node!.x - 500;
      // @ts-ignore
      sticky.y = node!.y;
      sticky.text.characters = "an ice cream shop on the beach";

      const connector = figma.createConnector();
      connector.connectorStart = {
        endpointNodeId: sticky.id,
        magnet: "AUTO",
      };
      connector.connectorEnd = {
        endpointNodeId: widgetId,
        magnet: "AUTO",
      };
      sourceNode = sticky;
    }
    if (command === "refine-image" || command === "generate-caption") {
      // Get an image from a URL.
      const image = await figma.createImageAsync(DEFAULT_CAPTION_IMAGE);
      // Create a rectangle that's the same dimensions as the image.
      const node = figma.createRectangle();

      const { width, height } = await image.getSizeAsync();
      node.resize(width, height);

      // Render the image by filling the rectangle.
      node.fills = [
        {
          type: "IMAGE",
          imageHash: image.hash,
          scaleMode: "FILL",
        },
      ];
      const connector = figma.createConnector();
      connector.connectorStart = {
        endpointNodeId: node.id,
        magnet: "AUTO",
      };
      connector.connectorEnd = {
        endpointNodeId: widgetId,
        magnet: "AUTO",
      };
      sourceNode = node;
    }
    if (!sourceNode) {
      throw new Error("No source node found");
    }
  }

  if (sourceNode.type === "STICKY") {
    figma.ui.postMessage({
      type: command,
      widgetId,
      text: sourceNode.text.characters,
      command,
    });
  } else {
    // @ts-ignore
    const sourceImageHash = sourceNode.fills[0];
    const image = figma.getImageByHash(sourceImageHash.imageHash);
    const bytes = await image?.getBytesAsync();
    figma.ui.postMessage({
      type: POST_MESSAGE_TYPE.PIC_DATA,
      bytes,
      widgetId,
      command,
    });
  }
};

export type ButtonProps = {
  widgetId: string;
  selected: boolean;
  onSelect: () => void;
};
