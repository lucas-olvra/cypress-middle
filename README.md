# Setting up the _Cypress e2e_ environment with _GitLab_

# _Prerequisites_
:one: -👇
- [Docker](https://www.docker.com/) (I'm using version `24.0.2` while writting this doc)
- [git](https://git-scm.com/) (I'm using version `2.39.2` while writting this doc)
- [Node.js](https://nodejs.org/en/) (I'm using version `v18.29.3` while writting this doc)
- npm (estou usando a versão `9.5.0` while writting this doc)
- [Visual Studio Code](https://code.visualstudio.com/) (most updated version) or any other IDE of your choice

> **Obs.:** I recommend using the same or more recent versions of the systems listed above. :point_up_2:
>
> **Obs. 2:** Ao instalar o Node.js o npm é instalado junto. 🎉
>
> **Obs. 3:** To check the versions of Docker, git, Node.js, and npm installed on your computer, run the command `docker --version && git --version && node --version && npm --version` in your command line terminal.
>
> **Obs. 4:** I've left links to the installers in the requirements list above if you don't have them installed yet.

The prerequisites are ready. ☑️

:two: - 👇
# Knowing the application under test

A complex application is being tested in this repository. This application is an [_open-source_ version of GitLab, running in a _container_](https://hub.docker.com/r/wlsf82/gitlab-ce) in your local environment.

## Application features

GitLab has several features, however, during this repository I will test the following:

- _Login_
- _Logout_
- Project creation
- Creation of _issue_
- Adding a label (_label_) to an _issue_
- Adding a milestone (_milestone_) to an _issue_
- Git clone

3️⃣ -👇
# Local environment #_setup_ with Docker

> :grey_exclamation: First of all, I recommend running the docker commands in the Docker Desktop that you installed. Especially for you who are not familiar with docker commands via terminal. This is because if there is some type of error, manipulating the image through Docker Desktop, changing your password, username, etc. is much easier. :grey_exclamation:
>

With docker running on your computer, run the command `docker run --publish 80:80 --publish 22:22 --hostname localhost wlsf82/gitlab-ce` and wait for the environment to boot.

> **Obs.:** This command is useful for Windows and macOs *intel* (Linux I don't know, but test it and leave me feedback :smile:)
>
> **Obs.:2** ❗If you have a computer with an M1 processor, use the following image `yrzr/gitlab-ce-arm64v8`, instead of the image `wlsf82/gitlab-ce`.
>
> ⚠️ **It is worth remembering that this image (`wlsf82/gitlab-ce`) is maintained by Talking About Testing.
>
> ⚠️ **Also it is worth remembering that this image (`yrzr/gitlab-ce-arm64v8`) is not maintained by Talking About Testing.
>
After a few minutes, access the URL http://localhost to set the password for the `root` user.

## Setting the password for the `root` user

When accessing the URL http://localhost, you should see a page to change the password for the `root` user (for Windows and macOS Intel users).

Enter a password, confirm it and click the _Change your password_ button.

> The password you set here will be used for your tests in the future, so use a password you will remember (or make a note of).
>
> ❗If you have a computer with an M1 processor and used the yrzr/gitlab-ce-arm64v8 image, the root user password will already be set and you will need to reset it. To do this, follow the following steps, described by one of the course students:

> First of all, you need to have downloaded the Docker interface for Mac.

1. In Docker Desktop, go to the terminal of the image you are using (the image needs to be running)

2. In the terminal, use the command gitlab-rake gitlab:password:reset

3. After a few seconds, the terminal will ask which user you want to change the password for, which in this case will be root

4. The terminal will ask you to enter the new password and confirm. Soon after, you will be informed that the password has been changed successfully!

> Credits to Jhuan Magno Pisa Neves and Walmyr of Talk About Test. Thanks!

4️⃣ - 👇
## Creating an Access Token

1. Log in with the user `root` with the password defined in the previous section
2. Click on the user's avatar in the top right corner of the screen; click on the _Settings_ link, and then; click on the _Access Tokens_ option (on the left side menu)
3. In the name field, enter the value `cypress-intermediario-v2`; in the _Scopes_ section, select the option **api**; and then click on the _Create personal access token_ button.

> A message that the _token_ was created successfully should be displayed, in addition to the _token_ itself. **Copy the _token_ by clicking the button to the right of the field and save it to use in your tests**.

5️⃣ - 👇
## Adding an SSH key

1. In the command line terminal, type the following command and press ENTER `ssh-keygen -t ed25519 -C "root@example.com"`
2. You will be prompted for a path to save the key. Press ENTER to accept the default path
3. You will be asked for a password. Press ENTER so the password is not required
4. You will be asked to repeat the password. Press ENTER again so the password is not required
5. Again in the command line terminal, type the following command and press ENTER to copy the newly created public key to the clipboard `pbcopy < ~/.ssh/id_ed25519.pub`
6. Logged into the application with the user `root`, click on the user's avatar in the upper right corner of the screen; click on the _Settings_ link; and then click on the _SSH Keys_ option (in the left side menu)
7. Paste your public SSH key into the key field. The _Title_ field must be automatically filled in
8. Finally, click on the _Add key_ button.

> You will also find instructions on how to generate the SSH key in the Windows operating system in the application under test (running in your local environment with Docker) from the following URL http://localhost/help/ssh/README#generating-a- new-ssh-key-pair (**instructions in English**).

The local environment is ready!

6️⃣ - 👇 
# _Setup_ of the testing project with Cypress

In this class, we will clone the project, in addition to installing and configuring [Cypress](https://cypress.io).

## Cloning the project

1. Access my repository and clone the code
2. Click on the _Clone_ button
3. Choose one of the options (_Clone with SSH_ or _Clone with HTTPS_) and then click on the _Copy URL_ button next to the chosen option field
>
> For details on how to create and configure an SSH key on GitHub, read the [official documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh).
>
4. In the command line terminal, in the directory where you store your software projects, type `git clone [URL copied in previous step]` and press ENTER
5. Finally, access the newly cloned project directory (`cd cypress-middle/`).

7️⃣ - 👇
## Initializing Cypress

In the command line terminal, at the root of the project, run the command `npx cypress open` (this command will open a Cypress App, which will guide you in creating the _end-to-end_ (_E2E_) testing project.

1. Click the button to create an _end-to-end_ (_E2E Testing_) testing project
2. Accept the configuration files by clicking the _Continue_ button
3. Select the Electron browser and click the _Start E2E Testing in Electron_ button
4. Create a first test file by clicking on the _Create new emtpy spec_ option
5. Name the file `login.cy.js`; click on the _Create spec_ button; and then confirm by clicking the _Ok, run specification_ button
6. After executing the newly created file, close the Electron browser.

8️⃣ - 👇
### Configuring the automated testing project

1. Close the Cypress App
2. Open the `cypress.config.js` file created in the project root and change its contents by the following:

```js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost',
  },
  fixturesFolder: false,
  video:false,
})

```

> Here we are configuring the base URL of the application under test, in addition to not using _fixtures_ and not generating videos after running the tests in _headless_ mode.

3. Still at the root of the project, create a file called `cypress.env.json` with the following data:

```json
{
    "user_name": "root",
    "user_password": "previously-set-root-user-password",
    "gitlab_access_token": "previously-created-access-token"
}

```

4. Inside the `cypress/` folder, create a subfolder called `downloads/`.

>Your final structure should be `cypress/downloads/`.
>
> This folder will be used later for project clone testing.

5. Finally, delete the `cypress/fixtures/` folder.

## Official Cypress Documentation

During the course, if you have questions about any Cypress command, I recommend the [official documentation](https://docs.cypress.io) as your first source of reference.

___

Ready! We already have everything needed to start testing GitLab (the application under test).

  
