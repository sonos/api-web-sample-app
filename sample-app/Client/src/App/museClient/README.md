# Requirements

You must have at least v12.x of Node.js to run the OAS generator.

# Open API Specification Generator
1. Open a new terminal/command prompt window and run the command 'brew install swagger-codegen'
2. navigate to the path where you want to generate the code. In this project we have saved the files in the path 'museClient'. e.g. cd /museClient
3. paste the command 'swagger-codegen generate -i SonosControlApi.json -l javascript -o /tmp/api --additional-properties useEs6=true'.
4. paste the command 'cp /tmp/api/{api.js,configuration.js} .'. This will copy the files generated from the precious command.