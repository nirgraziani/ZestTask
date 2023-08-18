const extractARNsFile = require("./extractARNs");
const generateHtmlTable = require("./generateHtmlTable");
const server = require("./server");

(() => {
  extractARNsFile.ReadResourceFile();
  generateHtmlTable.ReadJsonResources();
  server.StartServer();
})();
