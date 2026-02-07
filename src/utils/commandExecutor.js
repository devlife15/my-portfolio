export const executeCommand = async (cmd) => {
  const args = cmd.split(" ");
  const command = args[0].toLowerCase();
  const params = args.slice(1);

  // Add command to history
  const cmdOutput = { text: `${currentDir} $ ${cmd}`, type: "command" };
  setCommandHistory((prev) => [...prev, cmdOutput]);

  // Empty command
  if (command === "") {
    return;
  }

  // Get the handler for this command
  const handler = commandHandlers[command];

  // Context object to pass to handlers that need state setters
  const context = {
    petVisible,
    setPetVisible,
    setPetMood,
    setLastFed,
    setPetMessage,
    setCommandHistory,
  };

  let output = [];

  if (handler) {
    // Execute the handler
    output = handler(params, context);
  } else {
    // Command not found
    output = [
      {
        text: `Command not found: ${command}. Type 'help' to see available commands.`,
        type: "error",
      },
    ];
  }

  // Render output if there is any
  if (output !== null) {
    await renderOutput(output);
  }
};
