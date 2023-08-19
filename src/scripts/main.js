const extractARNsFile = require("./extractARNs");
const generateHtmlTableFile = require("./generateHtmlTable");
const detectVulnerabilitiesFile = require("./detectVulnerabilities");
const server = require("./server");

(async () => {
  try {
    await extractARNsFile.TriggerARNsFileManipulation();
    await generateHtmlTableFile.TriggerHtmlGeneration();
    await detectVulnerabilitiesFile.TriggerVulnerabilitiesDetection();
    server.StartServer();
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
