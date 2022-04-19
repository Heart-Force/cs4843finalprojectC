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
3. Enable App Engine for the backend service project.
4. Open your Python web service project.
5. Create app.yaml file which contains the settings of your backend web service App Engine.
6. Run the below two commands to deploy the backend web service to Google App Engine.
```
gcloud config set project backend-project-name
gcloud app deploy
```
7. Create a new project for the frontend service.
8. Enable App Engine for the frontend service project.
9. Open your ReactJS project.
10. Create app.yaml file which contains the settings of your frontend App Engine.
11. Run the below two commands to deploy the frontend service to Google App Engine.
```
npm run build
gcloud config set project frontend-project-name
gcloud app deploy
```
