const inputFilePath = path.join("./json_results", "aws_resources.json");
const templateFilePath = path.join("./src", "tableDisplayTemplate.html");

const ReadJsonResources = () => {
  fs.readFile(inputFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the JSON file:", err);
      return;
    }

    const awsResources = JSON.parse(data);
    GenerateTableRows(awsResources);
  });
};

const GenerateTableRows = (awsResources) => {
  let tableRows = "";

  awsResources.forEach((resource) => {
    tableRows += `<tr><td>${resource.ARN}</td><td>${resource.ResourceType}</td></tr>\n`;
  });
  UpdateHtmlTemplate(tableRows);
};

const UpdateHtmlTemplate = (tableRows) => {
  fs.readFile(templateFilePath, "utf8", (err, tableDisplayTemplate) => {
    if (err) {
      console.error("Error reading the HTML template file:", err);
      return;
    }

    const htmlContent = tableDisplayTemplate.replace(
      "<!-- Table rows will be inserted here -->",
      tableRows
    );
    CreateHtmlFile(htmlContent);
  });
};

const CreateHtmlFile = (htmlContent) => {
  const outputHtmlPath = path.join("./src", "aws_resources.html");
  fs.writeFile(outputHtmlPath, htmlContent, (err) => {
    if (err) {
      console.error("Error writing the HTML file:", err);
    } else {
      console.log("HTML file has been saved.");
    }
  });
};
