# Learn Docker - DevOps with Node.js & Express
Reference: [freecodecamp.com on Youtube](https://www.youtube.com/watch?v=9zUHg7xjIqQ&t=7539s)

### Questions :question:

- What is Docker :whale::question:

- What are layer :cake::question:

- Why are layer important:question:
    - Optimization -- caching the results, so if nothing changes than it should rebuild the container faster.

__To create custom image to run an Express/Node server:__

#### Create a dockerfile `Dockerfile`
- To get the Base Image is the command `FROM` followed by `node`.
    <br />

    __Example__
    
    ```docker
    FROM node:version_number
    ```
    - [Optional] Add the `WORKDIR` command. This sets the working directory of the container.
    <br />
    __Example__
    ```docker
    WORKDIR /directory_name
    ```
    - Use the `COPY` command to duplicate the __package.json__ file into the container.
    <br />
    __Example__
    ```docker
    COPY from_current_dir .
    ```
    __Note:__ It is read as, copy the package.json from the current directory into the docker container. With the dot `.` symboliziing the current directory in the container.
    - Install the dependencies found in the package.json by using the `RUN` command. __RUNTIME__ 
    <br />
    __Example__
    ```docker
    RUN yarn install
    ```
    - Duplicate the remaining files in the current directory into the containers directory using the command `COPY`
    <br />
    __Example__
    ```docker
    COPY . .
    ```
    - Use the command `EXPOSE` just a reminder to the user which __port__ the container will running on.
    <br />
    __Example__
    ```docker
    EXPOSE 3000
    ```
    - Use the command `CMD` run the same command to start the server outside of the container. In this case, we are using ``` node index.js ``` __BUILDTIME__.
    <br />
    __Example__
    ```docker
    CMD ["node" "index.js"]
    ```
## Docker Terminal Commands
<hr />

### __Build an Image__
#### `Build a docker_image without a name`:


Using the command below, build the image using the set of instructions in the Dockerfile. Let's read the command as "Hey Docker `docker` can you build `build` a image using the instructions found in the Dockerfile `.`"

```bash
docker build .
```
:hourglass: Wait for the image to build

#### Build a docker_image with a name:

Follow the instructions above, but this add a `-t` flag for `tag` followed by the name of your choosing.

```bash
docker build -t your_container_name .
```
<br />

__Output__

```bash

REPOSITORY       TAG       IMAGE ID       CREATED          SIZE
node-app-image   latest    65e2e7045e69   16 seconds ago   943MB

```

#### Get the list of docker_images
```bash
docker image ls
```
<br />

__Output__
```bash
REPOSITORY  TAG     IMAGE ID      SIZE          CREATED
<none>      <none>  c79ddaf6e19d  9 minutes ago   943MB
```

<br />

### __Build an Container__
#### Create a docker container with a name from an image

```bash
docker run -d --name your_docker_container_name docker_image_name
```
__Note__ :page_with_curl: The flag `-d` meanings please `detach` the container from the terminal.

#### View all Containers
```bash
docker ps
```

#### Create a docker container with open port

```bash
docker run -d -p client_port_number:container_port_number --name your_docker_container_name docker_image_name
```
__Example__
```docker
docker run -d -p 5000:3000 docker_image_name
```
<hr />

#### __View Container files__
```docker
docker exec -it your_container_name bash
```

__Output__ :point_down:

```bash
Dockerfile  README.md  index.js  node_modules  package.json  yarn.lock
```
<hr />

### __Destroy an Container__
```bash
docker rm container_name -f
```
### __Delete an Image__
```bash
docker image rm IMAGE_ID -f
```
<hr />

### __Docker Ignore File__ `.dockerignore`

⚠️ Do not add these files ⚠️
- node_modules
- .dockerignore
- Dockerfile
- .git
- .gitignore

<hr />

### __Automagically sync Local Machine changes to Docker Container using `Volumes`__

We can this by using `volumes` (or bind mount) by adding the `-v` flag to the building of the docker container.

```docker
docker run -d -p 3000:3000 -v path_to_file_on_local_machine:path_to_file_on_container --name your_container_name your_image_name
```

__Example__:
```docker
docker run -d -p 3000:3000 -v /Users/brooklynn2497/Desktop/GitHub/Learning/DockerNodeExpress\:/app your_image_name
```
___or___

```docker
docker run -d -p 3000:3000 -v $(pwd):/app your_image_name
```

### __Prevent overriding specific files using volumes__

In this case, when using volumes to prevent from overriding certain files we want to use `anonomyous volumes` 

__Syntex__:
```docker
docker run -d -p 3000:3000 -v $(pwd):/app -v path_to_container_file your_image_name
```

__Example__:
```docker
docker run -d -p 3000:3000 -v $(pwd):/app -v /app/node_modules example_image
```

<hr />

### __Docker Container logs__

```docker
docker logs your_container_name
```
<hr />

### __Make Docker Container Read-only__
Use the `:ro` or Read-only command to prevent the container making changes to the local machine files.

__Syntex__:
```docker
docker run -d -p 3000:3000 -v $(pwd):/app:ro -v /app/node_modules example_image
```
<hr />

### __Envirnoment Variables__
