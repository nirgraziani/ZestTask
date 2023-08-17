const fs = require("fs");
const path = require("path");

interface IAwsResources {
  ARN: string;
  ResourceType: string;
}

const ARNsPath = path.join(__dirname, "../ARNs/resources");
const outputFilePath = path.join("./json_results", "aws_resources.json");

fs.readFile(ARNsPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }
  const extarcetedData = extractContent(data);
  ConvertToJson(extarcetedData);
});

const extractContent = (data: string) => {
  const awsResources: IAwsResources[] = [];
  const lines = data.split("\n");

  lines.forEach((line) => {
    if (line.includes("arn:aws:")) {
      const resourceDetails = line.trim().split(" "); // Modify based on the actual format
      const arn = resourceDetails[0];
      const resourceType = resourceDetails[1];
      awsResources.push({ ARN: arn, ResourceType: resourceType });
    }
  });
  return awsResources;
};

const ConvertToJson = (extarcetedData: IAwsResources[]) => {
  fs.writeFile(
    outputFilePath,
    JSON.stringify(extarcetedData, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing the JSON file:", err);
      } else {
        console.log("JSON file has been saved.");
      }
    }
  );
};
