class fileManipulationService {
  constructor(fileSystem) {
    this.fileSystem = fileSystem;
    this.awsResources = [];
  }

  ReadFile = async (filePath) => {
    try {
      const data = await this.fileSystem.readFile(filePath, "utf8");
      return data;
    } catch (err) {
      console.error("Error reading the file:", err);
      return null;
    }
  };

  extractContent = (data) => {
    const awsResources = data
      .split("\n")
      .filter((line) => line.includes("arn:aws"))
      .map((line) => {
        const [arnPrefix, partition, service, region, accountId, ...rest] = line
          .trim()
          .split(":");
        const functionName = rest.join(":").split(":")[1];

        return {
          Section: arnPrefix,
          Partition: partition,
          Service: service,
          Region: region,
          AccountId: accountId,
          ResourceId: functionName
        };
      });

    this.awsResources = awsResources;
    return awsResources;
  };

  ConvertToJson = async (extractedAwsResources, outputFilePath) => {
    try {
      await this.fileSystem.writeFile(
        outputFilePath,
        JSON.stringify(extractedAwsResources, null, 2)
      );
      console.log("JSON file has been saved.");
    } catch (err) {
      console.error("Error writing the JSON file:", err);
    }
  };

  FindVulnerabilities = async (data) => {
    const parsedProwlerFindings = JSON.parse(data);
    return parsedProwlerFindings.filter((finding) => {
      return finding.Status === "FAIL";
    });
  };

  AggregateData = (vulnerabilities, parsedResourcesJson) => {
    return parsedResourcesJson.map((resource) => {
      const relatedFindings = vulnerabilities.filter((vulnerability) => {
        vulnerability.ResourceId === resource.ResourceId;
      });
      return {
        ...resource,
        Findings: relatedFindings.map((finding) => finding.CheckTitle)
      };
    });
  };
}

module.exports = { fileManipulationService };
