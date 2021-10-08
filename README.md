# U11 Twitter Clone | 2021

Live @ [u11-twitter-2021.web.app](https://u11-twitter-2021.web.app)

## Project description

A very simplified version of twitter.

## Design & Stories

-   Protoypes were made using figma and can be found [here](https://www.figma.com/file/vPz3qkh6oKAx41HkTn0p6S/u11-twitter-clone-wireframes?node-id=11%3A520)
-   Epics, stories and personas are available [here](https://drive.google.com/drive/folders/1wDMPzdWQu0eEedrXgMfpdVIEGkwGCsuL?usp=sharing)

## Stack

-   [ReactJS](https://reactjs.org)
-   [NodeJS](https://nodejs.org)
-   [ExressJS](https://expressjs.com)
-   [SCSS](https://sass-lang.com/documentation)

## Services

-   [Firebase](https://firebase.google.com)
    -   Firestore: document based realtime database
    -   Functions: cloud based functions, a.k.a. serverless
    -   Authentication: User management, a.k.a IAM

### Prerequisites

-   npm
    ```
    npm i -g npm@latest
    ```
-   firebase CLI. [Documentation](https://firebase.google.com/docs/cli)
    ```
    npm i -g firebase-tools
    ```

### Installation

After cloning the project (using [SSH](git@github.com:chas-academy/u11-fullstack-js-axelra82.git), [HTTPS](https://github.com/chas-academy/u11-fullstack-js-axelra82.git) or with GitHub CLI: `gh repo clone chas-academy/u11-fullstack-js-axelra82`) you will have to set up a firebase project online:

-   Go to [firebase console](https://console.firebase.google.com/)
-   Start a new project and name it what you want

Once your project is up and running you will have to create a web app. Click the **"+ Add app"** and then select **"Web"** (shown as **</>**). Choose what ever name you want for the app and select **"Also set up Firebase Hosting for this app"**. Then register the app.

You will now be presented with the suggestion of adding firebase SDK. Make note of the values and create a new file in your local project root folder called `.env.local`, this will contain your local environment variables. Use the following as a template and replace the `[YOUR-VALUE]` with the ones for your registered app:

```
REACT_APP_API_KEY=[YOUR-VALUE]
REACT_APP_AUTH_DOMAIN=[YOUR-VALUE]
REACT_APP_PROJECT_ID=[YOUR-VALUE]
REACT_APP_STORAGE_BUCKET=[YOUR-VALUE]
REACT_APP_MESSAGING_SENDER_ID=[YOUR-VALUE]
REACT_APP_APP_ID=[YOUR-VALUE]
REACT_APP_WEB_API=https://us-central1-[REACT_APP_PROJECT_ID].cloudfunctions.net/[CLOUD_FUNCTION_NAME]
```

**NOTE** `CLOUD_FUNCTION_NAME` will be the name you choose durring firebase cloud function initialization in the following steps.

You will now need to initialize **"Firestore Database"** (which can also be done in the web console) and cloud functions (refered to as **Functions**).

To initialize functions on firebase you will need to go to **"Functions"** in the firebase console and activate it. This requires the **"Blaze"** plan, which is _pay-as-you-go_. As long as you don't have any faulty API calls going amok, you shouldn't have to worry.

_It is however advisable to set a spending limit alert when you activate this plan, that way you will be notified if it starts adding up. You will be suggested to set this up when activiating the Blaze plan. In the end you are always solely responsible for any charges that may occur!_

Visit [Initialize your project](https://firebase.google.com/docs/functions/get-started#initialize-your-project) firebase documentation for step-by-step instructions.

Once your project firestore database is activated you will need to create a root collection called `roles` with two documents (the id has to be named, i.e. do not use auto-id function):

1. `administrator`
2. `registered`

**Optional**

It is also recommended that you create a string field in each document called `description` with a short description of the roles.

**e.g**

**administrator**
_Admin users have CRUD access on all users, posts, mentions and messages_

**registered**
_Registered users have CRUD access on their own content and account_

**NOTE** To assign a user admin privileges change the `role` field in that user document to `roles/administrator`.

Run `npm i` from your project root folder to install all dependencies and then `npm run start` to initiate the project on localhost:3000

## API

This project comes with an API powered by Node and express in the firebase functions. All cloud functions are located in the `functions` at the project root level.

### Routes

The root path is: https://us-central1-[REACT_APP_PROJECT_ID].cloudfunctions.net/[YOUR-FUNCTION-NAME]

| Path               | Type   | Body/Parameter                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/user/create`     | POST   | **Required:** `dob` (string), `firstName` (string), `lastName` (string), `email` (string), `username` (string), `password` (string). **Optional:** `bio` (string), `profilePicture` (string, _i.e. image url_), `website` (string). **Example body:** `{"dob":"1980-01-01", "firstName":"John", "lastName":"Matrix", "email":"some@email.tld", "username":"jomatrix", "password":"atleast6characterslong"}` |
| `/user/:username`  | GET    | **Example** `rootPath/user/someusername`                                                                                                                                                                                                                                                                                                                                                                    |
| `/user/update`     | POST   | **Expects:** `uid` (string, unique user ID to update) and `data` (object). The data object must conform to the `UserDoc` model (found in `functions/src/index.ts LINE:51`)                                                                                                                                                                                                                                  |
| `/user/delete/:id` | DELETE | **Example** `rootPath/user/someRandomLongUserIdString`                                                                                                                                                                                                                                                                                                                                                      |
| `/users/list`      | GET    | Takes no argument or data. Returns an object with all users.                                                                                                                                                                                                                                                                                                                                                |
| `/post/create`     | POST   | **Expects:** `uid` (string, unique user ID to creating post) and `content` (string) in body. Created posts conform to the `PostDoc` model (found in `functions/src/index.ts LINE:66`)                                                                                                                                                                                                                       |
| `/post/delete/:id` | DELETE | **Example** `rootPath/post/someRandomLongPostString`                                                                                                                                                                                                                                                                                                                                                        |
| `/posts/list`      | GET    | Takes no argument or data. Returns an object with all posts.                                                                                                                                                                                                                                                                                                                                                |

## Naming Conventions

| Name        | Example          | Usage                             |
| ----------- | ---------------- | --------------------------------- |
| kebab case  | is-not-a-dish    | filenames, style classes, ids etc |
| pascal case | AllInOneCapitals | components, jsx classes etc       |
| camel case  | goesDownThenUp   | jsx variables                     |

## Code Formating

As per requirements using [provided guide](https://vicvijayakumar.com/blog/eslint-airbnb-style-guide-prettier).

## License

Distributed under the MIT License. See [LICENSE](LICENSE.txt) for more information.
