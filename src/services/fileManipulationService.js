class fileManipulationService {
  constructor(fileSystem) {
    this.fileSystem = fileSystem;
  }

  async ReadResourceFile(filePath) {
    try {
      const data = await this.fileSystem.readFile(filePath, "utf8");
      return data;
    } catch (err) {
      console.error("Error reading the file:", err);
      return null;
    }
  }

  extractContent(data) {
    const awsResources = [];
    const lines = data.split("\n");

    lines.forEach((line) => {
      if (line.includes("arn:aws:")) {
        const resourceDetails = line.trim().split(" ");
        const arn = resourceDetails[0];
        const resourceType = resourceDetails[1];
        awsResources.push({ ARN: arn, ResourceType: resourceType });
      }
    });

    return awsResources;
  }

  async ConvertToJson(extractedData, outputFilePath) {
    try {
      await this.fileSystem.writeFile(
        outputFilePath,
        JSON.stringify(extractedData, null, 2)
      );
      console.log("JSON file has been saved.");
    } catch (err) {
      console.error("Error writing the JSON file:", err);
    }
  }
}

export default fileManipulationService;
