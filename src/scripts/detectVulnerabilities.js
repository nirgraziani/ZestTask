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
          const parsedProwlerFindings = JSON.parse(data);
          return (vulnerabilities = findings.filter(
            (finding) => finding.Status === "FAIL"
          ));
        });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { TriggerVulnerabilitiesDetection };
