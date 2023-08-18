const fs = require("fs").promises;

class HtmlGeneratorService {
  async ReadJsonResources(inputFilePath) {
    try {
      const data = await fs.readFile(inputFilePath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading the JSON file:", err);
      return null;
    }
  }

  GenerateTableRows(awsResources) {
    let tableRows = "";
    awsResources.forEach((resource) => {
      tableRows += `<tr><td>${resource.ARN}</td><td>${resource.ResourceType}</td></tr>\n`;
    });
    return tableRows;
  }

  async UpdateHtmlTemplate(templateFilePath, tableRows) {
    try {
      const tableDisplayTemplate = await fs.readFile(templateFilePath, "utf8");
      return tableDisplayTemplate.replace(
        "<!-- Table rows will be inserted here -->",
        tableRows
      );
    } catch (err) {
      console.error("Error reading the HTML template file:", err);
      return null;
    }
  }

  async CreateHtmlFile(outputHtmlPath, htmlContent) {
    try {
      await fs.writeFile(outputHtmlPath, htmlContent);
      console.log("HTML file has been saved.");
    } catch (err) {
      console.error("Error writing the HTML file:", err);
    }
  }
}

module.exports = { HtmlGeneratorService };
