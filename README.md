# task-me
## Project Overview:
Task Me is a task management web application. The project consists of a frontend and a backend service and both are deployed to Google App Engine. Created tasks are stored in a Firestore NoSQL database and end users can perform basic CRUD operations (Create, Read, Update, Delete) through frontend-backend requests/responses.

### Application Screenshots:
![app](https://screenshots-bucket-38293.s3.amazonaws.com/app.png)
![create](https://screenshots-bucket-38293.s3.amazonaws.com/create.png)
![update_delete](https://screenshots-bucket-38293.s3.amazonaws.com/update_delete.png)
![update](https://screenshots-bucket-38293.s3.amazonaws.com/update.png)

### Database Screenshots:
![database](https://screenshots-bucket-38293.s3.amazonaws.com/database.png)

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

### Google App Engine (GAE):
The below steps describe how the two web services will be deploed to Google App Engine:
1. Login to your Google Cloud Platform account.
2. Create a new project for the backend service.
![create_project](https://screenshots-bucket-38293.s3.amazonaws.com/00001.png)
![enter_project_name](https://screenshots-bucket-38293.s3.amazonaws.com/00002.png)
3. Enable App Engine for the backend service project.
![enable_app_engine](https://screenshots-bucket-38293.s3.amazonaws.com/00005.png)
![select_region](https://screenshots-bucket-38293.s3.amazonaws.com/00006.png)
4. Open your Python web service project.
5. Create app.yaml file which contains the settings of your backend web service App Engine.
```
# Copyright 2021 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

runtime: python39

handlers:
  # This handler routes all requests not caught above to your main app. It is
  # required when static routes are defined, but can be omitted (along with
  # the entire handlers section) when there are no static files defined.
- url: /.*
  script: auto
```
6. Run the below two commands to deploy the backend web service to Google App Engine.
```
gcloud config set project backend-project-name
gcloud app deploy
```
7. Create a new project for the frontend service.
![create_project](https://screenshots-bucket-38293.s3.amazonaws.com/00001.png)
![enter_project_name](https://screenshots-bucket-38293.s3.amazonaws.com/00002.png)
8. Enable App Engine for the frontend service project.
![enable_app_engine](https://screenshots-bucket-38293.s3.amazonaws.com/00003.png)
![select_region](https://screenshots-bucket-38293.s3.amazonaws.com/00004.png)
9. Open your ReactJS project.
10. Create app.yaml file which contains the settings of your frontend App Engine.
```
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
