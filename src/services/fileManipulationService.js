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

  // extractContent = (data) => {
  //   const awsResources = [];
  //   const lines = data.split("\n");

  //   lines.forEach((line) => {
  //     if (line.includes("arn:aws:")) {
  //       const resourceDetails = line.trim().split(" ");
  //       const arn = resourceDetails[0];
  //       const resourceType = resourceDetails[1];
  //       awsResources.push({ ARN: arn, ResourceType: resourceType });
  //     }
  //   });
  //   this.awsResources = awsResources;
  //   return awsResources;
  // };

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
          "Account ID": accountId,
          "Function Name": functionName
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

  AggregateData = (vulnerabilities) => {
    debugger;
    return this.awsResources.map((resource) => {
      console.log("resource", resource);
      const relatedFindings = vulnerabilities.filter((vulnerability) => {
        console.log("vulnerability", vulnerability);
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
