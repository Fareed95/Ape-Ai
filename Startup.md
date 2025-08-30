
## Getting Started

To set up and run all the backend services locally, follow these steps:

### Prerequisites : 

##### - WINDOWS USERS

1. **Install Docker Desktop:**
   Ensure that Docker Desktop is installed on your system. You can download it [here](https://www.docker.com/products/docker-desktop/).


##### -LINUX USERS
1. **Install Docker Desktop:**
   ```CMD 
   sudo apt update
   sudo apt install docker.io -y
   ```
   and use sudo additional command to run the Docker commands.

##### - MAC USERS

1. **Install Docker Desktop:**
   - Download Docker Desktop for macOS from the [official website](https://www.docker.com/products/docker-desktop/).
   - Open the downloaded `.dmg` file and drag the Docker icon to the Applications folder.

### Verification 
1. **Verify Installation:**
   - Open the terminal and run the following command:
     ```bash
     docker --version
     ```
     This should display the installed Docker version.

2. **Test Docker Installation:**
   - Run the following command to verify that Docker is working:
     ```bash
     docker run hello-world
     ```
     This will pull and run a test container.

3. **Additional Notes:**
   - Docker Desktop for macOS automatically manages permissions, so you don't need to add any special commands for `sudo`. but for linux before every command you need to write sudo for eg `sudo docker run hello-world`


### Running the project

SImply use the followinf command to run the project

##### FOR MAC AND WINDOWS USERS
   ```bash
   docker compose up --build
   ```
##### FOR LINUX USERS 
```bash 
sudo docker compose up --build
```
### List of backends and their ports

| Backend Name       | Framework    | Port  | Description                                                      |
|--------------------|--------------|-------|------------------------------------------------------------------|
| Primary Backend    | Django       | 8000  | Primary backend of the project, handles authentication          |
| Secondary Backend  | Express.js   | 8080  | Secondary backend for small APIs                                |


