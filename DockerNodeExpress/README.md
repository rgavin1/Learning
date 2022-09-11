# Learn Docker - DevOps with Node.js & Express
Reference: [freecodecamp.com on Youtube](https://www.youtube.com/watch?v=9zUHg7xjIqQ&t=7539s)

## Questions :question:

### What is Docker :whale::question:

#### What are layer :cake::question:

#### Why are layer important:question:
- Optimization -- caching the results, so if nothing changes than it should rebuild the container faster.

## To create custom image to run an Express/Node server:
1. Create a dockerfile `Dockerfile`
    - To get the Base Image is the command `FROM` followed by `node`.
    <br />
    __Ex:__
    ```docker
    FROM node:version_number
    ```
    - [Optional] Add the `WORKDIR` command. This sets the working directory of the container.
    <br />
    __Ex:__
    ```docker
    WORKDIR /directory_name
    ```
    - Use the `COPY` command to duplicate the __package.json__ file into the container.
    <br />
    __Ex:__
    ```docker
    COPY from_current_dir .
    ```
    __Note:__ It is read as, copy the package.json from the current directory into the docker container. With the dot `.` symboliziing the current directory in the container.
    - Install the dependencies found in the package.json by using the `RUN` command. __RUNTIME__ 
    <br />
    __Ex:__
    ```docker
    RUN yarn install
    ```
    - Duplicate the remaining files in the current directory into the containers directory using the command `COPY`
    <br />
    __Ex:__
    ```docker
    COPY . .
    ```
    - Use the command `EXPOSE` just a reminder to the user which __port__ the container will running on.
    <br />
    __Ex:__
    ```docker
    EXPOSE 3000
    ```
    - Use the command `CMD` run the same command to start the server outside of the container. In this case, we are using ``` node index.js ``` __BUILDTIME__.
    <br />
    __Ex:__
    ```docker
    CMD ["node" "index.js"]
    ```
## Docker Terminal Commands
<hr />

#### Build a docker_image without a name:
    
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

#### Create a docker container with a name from an image

```bash
docker run -d --name your_docker_container_name docker_image_name
```
:page_with_curl: __Note__: The flag `-d` meanings please `detach` the container from the terminal.

#### Force Delete a docker image
```bash
docker image IMAGE_ID -f
```