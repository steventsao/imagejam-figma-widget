import GenerateCaptionButton from "./generateCaptionButton";
import GenerateImageWithTextButton from "./generateImageWithTextButton";

const { widget } = figma;
const { AutoLayout, useWidgetId, useSyncedState } = widget;

const positionOutput = (widgetId: string, output: any) => {
  const widget = figma.getNodeById(widgetId) as BaseNode;
  // @ts-ignore
  output.x = widget!.x + 500;
  // @ts-ignore
  output.y = widget!.y;
};
figma.showUI(__html__, { themeColors: true, height: 300 });
figma.ui.onmessage = async (msg) => {
  if (msg === "close") {
    figma.closePlugin();
  }
  if (msg.type === "output-url") {
    const { url, widgetId } = msg;
    const image = await figma.createImageAsync(url);
    const node = figma.createRectangle();

    node.resize(500, 500);
    node.fills = [
      {
        type: "IMAGE",
        imageHash: image.hash,
        scaleMode: "FILL",
      },
    ];

    positionOutput(widgetId, node);
    figma.currentPage.appendChild(node);
    const connector = figma.createConnector();
    connector.connectorStart = {
      endpointNodeId: widgetId,
      magnet: "AUTO",
    };
    connector.connectorEnd = {
      endpointNodeId: node.id,
      magnet: "AUTO",
    };
    figma.closePlugin();
  } else if (msg.type === "string") {
    const { widgetId } = msg;
    if (!widgetId) {
      throw new Error("No widget id");
    }
    // https://www.figma.com/plugin-docs/api/properties/figma-createsticky/
    const sticky = figma.createSticky();
    // @ts-ignore
    await figma.loadFontAsync(sticky.text.fontName);

    positionOutput(widgetId, sticky);

    sticky.text.characters = msg.data;
    const connector = figma.createConnector();
    connector.connectorStart = {
      endpointNodeId: widgetId,
      magnet: "AUTO",
    };

    connector.connectorEnd = {
      endpointNodeId: sticky.id,
      magnet: "AUTO",
    };
    figma.closePlugin();
  } else {
    throw new Error("Unknown message type");
  }
};
// TODO Handle if inputs are null

function Widget() {
  const widgetId = useWidgetId();
  const [selectedIndex, setSelectedIndex] = useSyncedState("selectedIndex", -1);
  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <AutoLayout direction="vertical" spacing={3}>
      <GenerateImageWithTextButton
        onSelect={() => handleSelect(0)}
        widgetId={widgetId}
        selected={selectedIndex === 0}
      />
      {/* <GenerateCaptionButton onSelect={() => handleSelect(1)} widgetId={widgetId} selected={selectedIndex === 1} /> */}
    </AutoLayout>
  );
}
widget.register(Widget);
