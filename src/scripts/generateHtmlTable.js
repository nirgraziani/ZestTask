const path = require("path");
const HtmlManipulationServiceFile = require("../services/HtmlManipulationService");

const inputFilePath = path.join("./json_results", "aws_resources.json");
const templateFilePath = path.join(
  "./src/html_templates",
  "resourcesTableTemplate.html"
);
const outputHtmlPath = path.join("./src", "aws_resources_table.html");

const HtmlManipulationService =
  new HtmlManipulationServiceFile.HtmlManipulationService();

const TriggerHtmlGeneration = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const awsResources = await HtmlManipulationService.ReadJsonResources(
        inputFilePath
      );

      if (awsResources) {
        const tableRows =
          HtmlManipulationService.GenerateTableRows(awsResources);
        const htmlContent = await HtmlManipulationService.UpdateHtmlTemplate(
          templateFilePath,
          tableRows
        );

        if (htmlContent) {
          await HtmlManipulationService.CreateHtmlFile(
            outputHtmlPath,
            htmlContent
          );
        }
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { TriggerHtmlGeneration };
