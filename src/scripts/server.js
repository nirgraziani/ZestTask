const express = require("express");
const path = require("path");
const app = express();

const StartServer = () => {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "aws_resources_table.html"));
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

module.exports = {
  StartServer: StartServer
};
