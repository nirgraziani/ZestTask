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

const fileManipulationService =
  new fileManipulationServiceFile.fileManipulationService(fsPromises);

const htmlManipulationService =
  new htmlManipulationServiceFile.HtmlManipulationService();

const TriggerVulnerabilitiesDetection = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await fileManipulationService
        .ReadFile(prowlerFilePath)
        .then(async (data) => {
          const vulnerabilities =
            await fileManipulationService.FindVulnerabilities(data);
          const parsedResourcesJson =
            await htmlManipulationService.ReadJsonResources(resourcesJsonPath);

          const aggregatedData = await fileManipulationService.AggregateData(
            vulnerabilities,
            parsedResourcesJson
          );
          console.log("aggregatedData", aggregatedData);
        });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { TriggerVulnerabilitiesDetection };
