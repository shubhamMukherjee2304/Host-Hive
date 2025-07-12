
# HostHive – Cloud-Based Code Hosting Platform

## 🌐 Overview

**HostHive** is a cloud-native code hosting and deployment platform designed to streamline the process of uploading, building, and hosting code—offering a seamless experience similar to GitHub. It supports real-time build feedback, automatic deployments, and persistent storage through a robust and scalable backend architecture.

---

## 🔧 Tech Stack

* **Node.js** – Backend development and deployment workflows
* **Docker** – Code containerization
* **Kafka** – Real-time build log streaming
* **ClickHouse** – High-performance log analytics
* **PostgreSQL** – User/project metadata and hosted URL management
* **Redis** – Caching and background job queue
* **AWS ECS & ECR** – Container orchestration and image storage
* **AWS S3** – File and artifact storage

---

## 🚀 Features

* 🧑‍💻 **User Authentication & Project Management**
* 📦 **Code Upload & Containerized Deployment**
* 🖥️ **Live Build Logs via Kafka Streams**
* 📊 **Fast Log Analytics with ClickHouse**
* ☁️ **Fully Managed AWS Deployment (ECS, ECR, S3)**
* 🔁 **Background Tasks with Redis Queues**

---

## 🧱 Architecture Overview

### Backend (Node.js)

* Handles authentication, project uploads, and build triggers.
* Manages interaction with Docker, Kafka, Redis, and AWS services.

### Build & Deployment

* Uploaded code is containerized using Docker.
* Docker images are pushed to AWS ECR.
* Deployed and managed via AWS ECS.
* Build artifacts and static files stored on S3.

### Real-Time Logs

* Kafka streams logs from the build agents.
* Logs are processed and stored in ClickHouse for instant retrieval and analytics.
* Users can view live logs during builds via a WebSocket/streaming interface.

---

## 📁 Directory Structure

```
/hosthive
│
├── backend/                 # Node.js backend server
├── deployment/              # Dockerfiles, ECS config
├── services/                # Kafka consumers, log processors
├── database/                # PostgreSQL and ClickHouse schema
├── scripts/                 # Utility scripts for deployment and automation
├── .env.example             # Environment variables template
└── README.md
```

---

## 📦 Getting Started

### Prerequisites

* Docker & Docker Compose
* Node.js v18+
* PostgreSQL & ClickHouse
* Redis
* AWS credentials with ECS, ECR, and S3 permissions

### Clone the Repository

```bash
git clone https://github.com/shubhamMukherjee2304/hosthive.git
cd hosthive
```

### Set Up Environment

```bash
cp .env.example .env
# Fill in your environment variables like DB credentials, AWS keys, Kafka brokers, etc.
```

### Start Services

```bash
docker-compose up --build
```

> This will start the backend server, Redis, PostgreSQL, and ClickHouse locally for development/testing.

---

## 🧪 API Highlights

### Upload Project

```http
POST /api/projects/upload
```

Upload a zip or folder containing the user's code.

### View Logs

```http
GET /api/projects/:id/logs
```

Retrieve real-time or historical build logs.

### Trigger Deployment

```http
POST /api/projects/:id/deploy
```

Start the deployment pipeline for a project.

---

## 📊 Monitoring and Analytics

* Kafka and Redis dashboards (can integrate Prometheus + Grafana)
* ClickHouse used for analyzing log volume, build success rates, and latency

---

## 📌 Impact

Built a GitHub-like code hosting platform that:

* Provides users with **fast and transparent deployments**
* Delivers **real-time log feedback** with analytics
* Integrates seamlessly with **AWS and containerized infrastructure**

---

## 🙋 Author

**Shubham Mukherjee**
[LinkedIn](https://www.linkedin.com/in/shubham-mukherjee-a851a420a) • [GitHub](https://github.com/shubhamMukherjee2304)



