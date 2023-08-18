const fsPromises = require("fs").promises;
const resourcesPath = require("path");
const fileManipulationService = require("./fileManipulationService");

const ARNsPath = resourcesPath.join(
  __dirname,
  "../project_data/ARNs/resources"
);
const outputFilePath = resourcesPath.join(
  "./json_results",
  "aws_resources.json"
);

const service = new fileManipulationService(fsPromises);

const TriggerARNsFileManipulation = () => {
  service.ReadResourceFile(ARNsPath).then((data) => {
    if (data) {
      const extractedData = service.extractContent(data);
      service.ConvertToJson(extractedData, outputFilePath);
    }
  });
};

export default TriggerARNsFileManipulation;
