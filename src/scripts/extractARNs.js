const fsPromises = require("fs").promises;
const resourcesPath = require("path");
const fileManipulationServiceFile = require("../services/fileManipulationService");

const ARNsPath = resourcesPath.join(
  __dirname,
  "../../project_data/ARNs/resources"
);

const outputFilePath = resourcesPath.join(
  "./json_results",
  "aws_resources.json"
);

const service = new fileManipulationServiceFile.fileManipulationService(
  fsPromises
);

const TriggerARNsFileManipulation = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await service.ReadResourceFile(ARNsPath).then(async (data) => {
        if (data) {
          const extractedData = service.extractContent(data);
          await service.ConvertToJson(extractedData, outputFilePath);
        }
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { TriggerARNsFileManipulation };