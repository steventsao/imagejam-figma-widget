import React, { useEffect } from "react";
import { sdxlCommand } from "./commands/sdxl";
import { generateCaptionCommand } from "./commands/generateCaption";
import "./App.css";

const commands = [generateCaptionCommand, sdxlCommand];

function getCommand(command: string) {
  for (const c of commands) {
    if (c.name === command) {
      return c;
    }
  }
  throw new Error("Unknown command");
}

function App() {
  const [error, setError] = React.useState<string | null>(null);
  useEffect(() => {
    if (parent) {
      window.onmessage = async (event) => {
        const command = getCommand(event.data.pluginMessage.command);
        try {
          await command.execute(event);
        } catch (err) {
          setError("network error");
        }
      };
    }
  }, []);

  return (
    <div className="App">
      <h1>
        {error
          ? "Network error, please close the window and try again."
          : "Generating output...this can take up to 10 seconds."}
      </h1>
      <button
        onClick={() => {
          parent?.postMessage?.({ pluginMessage: "close" }, "*");
        }}
      >
        {error ? "Close" : "Stop current task"}
      </button>
    </div>
  );
}

export default App;
