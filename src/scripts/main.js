const extractARNsFile = require("./extractARNs");
const generateHtmlTable = require("./generateHtmlTable");
const server = require("./server");

(() => {
  extractARNs();
  generateHtmlTable.ReadJsonResources();
  server.StartServer();
})();

const extractARNs = () => {
  extractARNsFile.TriggerARNsFileManipulation();
};
