## Black-circle. Backend

### How to run for development

1. In the root directory create .env and paste there the contents of the .env.example file.
1. Install dependencies: **`npm install`**.
2. Create docker image: **`docker compose up`**
3. Run all migrations: **`npm run migration:run`**
4. Start the server: **`npm run start:dev`**

### How to contribute

1. Clone the develop branch (pull if already cloned) **`git pull develop`**
2. Create a new feature branch **`git checkout -b feature/your_feature`** and make your changes
2. Commit your changes **`git commit -m"commit message"`**
2. Move to develop branch and pull again **`git checkout develop`** + **`git pull`**
2. Go back to the feature branch **`git checkout feature/your_feature`**
2. Update the feature branch with the last pulled changes from the remote develop branch **`git merge develop`**
2. Push the changes to your remote feature branch **`git push --set-upstream origin feature/your_feature`**
2. Go to github.com and make a PR from your feature branch to develop branch.

### Technologies

- [Nest.js](https://nestjs.com/) - a backend framework.
- [MySQL](https://www.mysql.com/) - relational DB
- [Docker](https://docs.docker.com/get-started/overview/) - containerization software
- [TypeOrm](https://typeorm.io/) - an ORM.
- [Swagger.js](https://swagger.io/) - autogenerating API documentation