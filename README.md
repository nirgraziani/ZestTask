# ZestTask

Zest Assignment - Resource Table & Aggregation

### Using the following libraries:

API Communication: Express

This project uses NodeJs mainly for the reason that it is the environment I'm most comfortable with.

As you can see I chose not to use a NestJs because in my opinion that would be an overkill for this type of project, instead I decided to use Vanilla JS with DI.

### The project contains the following scripts:

`main.js` script - Triggers the application process.

`server.js` script - Builds the local server.

`extractARNs.js` script - Responsible for the extraction of the data from the resource file provided.

`generateHtmlTable.js` script - Responsible for generating Html tables.

`detectVulnerabilities.js` script - Responsible for detection of vulnerabilities and aggregation of data as well as generating "prowler-results" Html file.

### In addition to these scripts the project contains two services:

`fileManipulationService.js` service - Responsible for reading, writing, converting and generally manipulating data files, as the name implies.

`HtmlManipulationService.js` service - Responsible for generating Html files.

The project is written using the concept of Dependency Injection; each script imports a service and uses it accordingly.

`extractARNs.js` script uses the `fileManipulationService`

`generateHtmlTable` script uses the `HtmlManipulationService`

`detectVulnerabilities` script uses both `HtmlManipulationService` & `fileManipulationService`

### Known issues:

1. Some parts can be more scalable.

### Prerequisites:

* Node.js
* Docker Desktop

### How to run:

##### Using Docker:

1. Clone this repo
2. Run `npm install`
3. Start Docker Desktop
4. Run `npm run docker-build`
5. Run `npm run docker-start`
6. Go to `http://localhost:3000/`

##### Not using Docker:

1. Clone this repo
2. Run `npm install`
3. Run `npm run start`
4. Go to `http://localhost:3000/`
