HostHive
Scalable website hosting platform


Must have
Node.JS
Redis
Docker
Kafka
Clickhouse
PostgreSQL DB



What my project contains:

api-server: HTTP API Server for REST APIs
build-server: Docker Image code that clones, builds, and pushes the build to S3
s3-reverse-proxy: Reverse Proxy the subdomains and domains to s3 bucket static assets

Set up locally
Run npm install in api-server, build-server, and s3-reverse-proxy respectively.
Use Docker to build the build-server and push the generated image to AWS ECR.
Set up a Postgres DB.
Setup the api-server by providing all the required config such as TASK ARN and CLUSTER ARN and all required configurations for Postgres, Kafka, and Clickhouse as well.
Run node index.js in api-server and s3-reverse-proxy
