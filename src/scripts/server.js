const express = require("express");
const path = require("path");
const app = express();

const StartServer = () => {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../src/aws_resources_table.html"));
  });

  app.get("/prowler-results", (req, res) => {
    res.sendFile(path.join(__dirname, "../../src/prowler_results_table.html"));
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

module.exports = {
  StartServer: StartServer
};
