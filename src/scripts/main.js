const extractARNsFile = require("./extractARNs");
const generateHtmlTableFile = require("./generateHtmlTable");
const server = require("./server");

(async () => {
  try {
    await extractARNsFile.TriggerARNsFileManipulation();
    await generateHtmlTableFile.TriggerHtmlGeneration();
    server.StartServer();
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
