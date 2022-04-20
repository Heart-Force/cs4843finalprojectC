# task-me
## Project Overview:
Task Me is a task management web application. The project consists of a frontend and a backend service and both are deployed to Google App Engine. Created tasks are stored in a Firestore NoSQL database and end users can perform basic CRUD operations (Create, Read, Update, Delete) through frontend-backend requests/responses.
To start using the applciation, visit this [link](https://task-me-frontend-1232.uc.r.appspot.com) and create an account if you do not have one. Otherwise, enter your username and password and click on Sign In. Afterward, you can view, create, update, and delete your own tasks.

## Deployed Services URLs:
### Frontend: https://task-me-frontend-1232.uc.r.appspot.com
### Backend API URL: https://task-me-backend-347600.uc.r.appspot.com
To use the backend API directly without going through the frontend, you will need to create an account first and then send requests to the API with the needed authentication JWT token.

### Application Screenshots:
![app](https://screenshots-bucket-38293.s3.amazonaws.com/app_001.png)
![create](https://screenshots-bucket-38293.s3.amazonaws.com/app_002.png)
![update_delete](https://screenshots-bucket-38293.s3.amazonaws.com/app_003.png)
![update1](https://screenshots-bucket-38293.s3.amazonaws.com/app_004.png)
![update2](https://screenshots-bucket-38293.s3.amazonaws.com/app_005.png)
![update3](https://screenshots-bucket-38293.s3.amazonaws.com/app_006.png)

### Database Screenshots:
![database](https://screenshots-bucket-38293.s3.amazonaws.com/db_001.png)

## Project Goals: 
Deploy the frontend and backend services to Google App Engine (GAE):
1. Python web service
2. ReactJS frontend

Two separete deployments to Google App Engine will be carried out in this project, one for the backend web service and another for the frontend.

The frontend will be sending HTTP requests to the backend. The backend will be processing the frontend HTTP requests and connect to the Firestore database to perform basic CRUD operations. Backend web service will return repsonses to the frontend and frontend in its turn will be displaying the response data.

## Project Diagram:
![project_diagram](https://screenshots-bucket-38293.s3.amazonaws.com/diagram.png)

### Why Google App Engine (GAE)?
* Google App Engine (GAE) provides access to other Google Cloud Platform services.
* GAE is a Platform as a Service (PaaS) which can be used to build and deploy scalable applications.
* Faster time to market.
* All time availability.
* Easy to use platform.

## Project Details:
Project compoenents consist of the below:
### Frontend:
1. ReactJS: JavaScript Framework.
2. Axios: Establish connection with the backend web service (sends requests and receives responses).
3. React-Bootstrap: CSS framework to build React-like HTML components.

### Backend:
1. Python
2. Flask: A web framework, it is a Python module that lets you develop web applications
3. Google Cloud Firestore: SDK for Google Cloud Firestore.
4. Firebase Admin: The Admin SDK is a set of server libraries that lets you interact with Firebase from privileged environments and perform CRUD operations.

### Database:
Firestore: Google Cloud Firestore is a NoSQL document database built for automatic scaling, high performance, and ease of application development.
To create a Firestore DB and use it in your project, follow the below steps:
1. Login to your Firestore account.
2. Click on add project.
![database_2](https://screenshots-bucket-38293.s3.amazonaws.com/db_002.png)
3. Enter project name.
![database_3](https://screenshots-bucket-38293.s3.amazonaws.com/db_003.png)
4. Click on project settings.
![database_4](https://screenshots-bucket-38293.s3.amazonaws.com/db_004.png)
5. Click on Service Accounts.
![database_5](https://screenshots-bucket-38293.s3.amazonaws.com/db_005.png)
6. Select Python and then click on Generate New Key Pair. Place the downloaded JSON file in the project api folder and change its name to key.json
![database_6](https://screenshots-bucket-38293.s3.amazonaws.com/db_006.png)

### Google App Engine (GAE):
The below steps describe how the two web services will be deploed to Google App Engine:
1. Login to your Google Cloud Platform account.
2. Create a new project for the backend service.
* Go to Resource Manager and click on Create Project.
![create_project](https://screenshots-bucket-38293.s3.amazonaws.com/00001.png)
* Enter a name for your project.
![enter_project_name](https://screenshots-bucket-38293.s3.amazonaws.com/00002.png)
3. Enable App Engine for the backend service project.
* Go to App Engine and click on Dashboard then click on Create Application.
![enable_app_engine](https://screenshots-bucket-38293.s3.amazonaws.com/00005.png)
* Select App Engine region.
![select_region](https://screenshots-bucket-38293.s3.amazonaws.com/00006.png)
4. Open your Python web service project.
5. Create app.yaml file which contains the settings of your backend web service App Engine.
```
# runtime: The name of the runtime environment that is used by your app. To use python 3.9 type python39
runtime: python39

handlers:
  # The handlers element is a required element in the app.yaml configuration file. 
  # The element provides a list of URL patterns and descriptions of how they should 
  # be handled. App Engine can handle URLs by executing application code, or 
  # by serving static files uploaded with the code, such as images, CSS, or JavaScript.
  # url: required. The URL pattern, as a regular expression.
  # script: optional. Specifies the path to the script from the application root directory.
- url: /.*
  script: auto
```
6. Run the below two commands to deploy the backend web service to Google App Engine.
```
gcloud config set project backend-project-name
gcloud app deploy
```
The above command will ask you to confirm the project details, press y and enter, otherwise press n to cancel.
7. Create a new project for the frontend service.
* Go to Resource Manager and click on Create Project.
![create_project](https://screenshots-bucket-38293.s3.amazonaws.com/00001.png)
* Enter a name for your project.
![enter_project_name](https://screenshots-bucket-38293.s3.amazonaws.com/00002.png)
8. Enable App Engine for the frontend service project.  
* Go to App Engine and click on Dashboard then click on Create Application.
![enable_app_engine](https://screenshots-bucket-38293.s3.amazonaws.com/00003.png)
* Select App Engine region.
![select_region](https://screenshots-bucket-38293.s3.amazonaws.com/00004.png)
9. Open your ReactJS project.
10. Create app.yaml file which contains the settings of your frontend App Engine.
```
# runtime: The name of the runtime environment that is used by your app.
runtime: nodejs16
handlers:
  # Serve all static files with url ending with a file extension
  - url: /(.*\..+)$
    static_files: build/\1
    upload: build/(.*\..+)$
  # Catch all handler to index.html
  - url: /.*
    static_files: build/index.html
    upload: build/index.html
```
11. Run the below two commands to deploy the frontend service to Google App Engine.
```
npm run build
gcloud config set project frontend-project-name
gcloud app deploy
```
The above command will ask you to confirm the project details, press y and enter, otherwise press n to cancel.

## To run the project locally on your machine:
1. Clone the project to your machine.
2. Change the URLs in the frontend constants JS file to connect to the local server.
3. Move to the frontend folder and run the commands:
```
npm install
npm start
```
4. Move to the backend folder and install python dependencies then start python project.
