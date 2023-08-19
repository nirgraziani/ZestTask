const fsPromises = require("fs").promises;
const prowlerPath = require("path");
const fileManipulationServiceFile = require("../services/fileManipulationService");

const prowlerFilePath = prowlerPath.join(
  __dirname,
  "../../project_data/prowler_output/prowler-output-1234567890-20230814122946.json"
);

const fileManipulationService =
  new fileManipulationServiceFile.fileManipulationService(fsPromises);

const TriggerVulnerabilitiesDetection = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await fileManipulationService
        .ReadFile(prowlerFilePath)
        .then(async (data) => {
          const vulnerabilities =
            await fileManipulationService.FindVulnerabilities(data);

          const aggregatedData =
            fileManipulationService.AggregateData(vulnerabilities);
          console.log(aggregatedData);
        });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { TriggerVulnerabilitiesDetection };
