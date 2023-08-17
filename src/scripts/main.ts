const extractARNsFile = require("./extractARNs");
const generateHtmlTable = require("./generateHtmlTable");

const Main = () => {
  extractARNsFile.ReadResourceFile();
  generateHtmlTable.ReadJsonResources();
};
Main();
