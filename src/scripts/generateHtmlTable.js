const path = require("path");
const HtmlGeneratorServiceFile = require("../services/HtmlGeneratorService");

const inputFilePath = path.join("./json_results", "aws_resources.json");
const templateFilePath = path.join(
  "./src/html_templates",
  "resourcesTableTemplate.html"
);
const outputHtmlPath = path.join("./src", "aws_resources_table.html");

const service = new HtmlGeneratorServiceFile.HtmlGeneratorService();

const TriggerHtmlGeneration = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const awsResources = await service.ReadJsonResources(inputFilePath);

      if (awsResources) {
        const tableRows = service.GenerateTableRows(awsResources);
        const htmlContent = await service.UpdateHtmlTemplate(
          templateFilePath,
          tableRows
        );

        if (htmlContent) {
          await service.CreateHtmlFile(outputHtmlPath, htmlContent);
        }
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { TriggerHtmlGeneration };
