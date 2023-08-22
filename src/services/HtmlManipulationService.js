const fs = require("fs").promises;

class HtmlManipulationService {
  async ReadJsonResources(inputFilePath) {
    try {
      const data = await fs.readFile(inputFilePath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      console.error("Error reading the JSON file:", err);
      return null;
    }
  }

  GenerateTableRows(data) {
    let tableRows = "";
    if (data[0].AccountId) {
      data.forEach((resource) => {
        tableRows += `<tr>
        <td>${resource.Section}</td>
        <td>${resource.Partition}</td>
        <td>${resource.Service}</td>
        <td>${resource.Region}</td>
        <td>${resource.AccountId}</td>
        <td>${resource.ResourceId}</td>
      </tr>\n`;
      });
    } else if (data[0].Findings) {
      data.forEach((resource) => {
        tableRows += `<tr>
        <td>${resource.ResourceId}</td>
        <td>${resource.Status.length}</td>
        <td>${resource.Findings}</td>
      </tr>\n`;
      });
    }

    return tableRows;
  }

  async UpdateHtmlTemplate(templateFilePath, tableRows) {
    try {
      const tableDisplayTemplate = await fs.readFile(templateFilePath, "utf8");
      return tableDisplayTemplate.replace("<!-- Table rows -->", tableRows);
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

module.exports = { HtmlManipulationService };
