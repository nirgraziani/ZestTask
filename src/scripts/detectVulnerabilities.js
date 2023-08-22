const fsPromises = require("fs").promises;
const prowlerPath = require("path");
const fileManipulationServiceFile = require("../services/fileManipulationService");
const htmlManipulationServiceFile = require("../services/HtmlManipulationService");

const prowlerFilePath = prowlerPath.join(
  __dirname,
  "../../project_data/prowler_output/prowler-output-1234567890-20230814122946.json"
);
const resourcesJsonPath = prowlerPath.join(
  "./json_results",
  "aws_resources.json"
);

const templateFilePath = prowlerPath.join(
  "./src/html_templates",
  "prowlerTableTemplate.html"
);

const outputHtmlPath = prowlerPath.join("./src", "prowler_results_table.html");

const _fileManipulationService =
  new fileManipulationServiceFile.fileManipulationService(fsPromises);

const _htmlManipulationService =
  new htmlManipulationServiceFile.HtmlManipulationService();

const TriggerVulnerabilitiesDetection = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await _fileManipulationService
        .ReadFile(prowlerFilePath)
        .then(async (data) => {
          const vulnerabilities =
            await _fileManipulationService.FindVulnerabilities(data);
          const parsedResourcesJson =
            await _htmlManipulationService.ReadJsonResources(resourcesJsonPath);

          const aggregatedData = await _fileManipulationService.AggregateData(
            vulnerabilities,
            parsedResourcesJson
          );

          const tableRows =
            _htmlManipulationService.GenerateTableRows(aggregatedData);

          const htmlContent = await _htmlManipulationService.UpdateHtmlTemplate(
            templateFilePath,
            tableRows
          );

          await _htmlManipulationService.CreateHtmlFile(
            outputHtmlPath,
            htmlContent
          );
        });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { TriggerVulnerabilitiesDetection };
