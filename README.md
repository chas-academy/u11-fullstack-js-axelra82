# U11 Twitter Clone | 2021

Live @ [u11-twitter-2021.web.app](https://u11-twitter-2021.web.app)

## Project description

A very simplified version of twitter.

## Design & Stories

-   Protoypes were made using figma and can be found [here](https://www.figma.com/file/vPz3qkh6oKAx41HkTn0p6S/u11-twitter-clone-wireframes?node-id=11%3A520)
-   Epics, stories and personas are available [here](https://drive.google.com/drive/folders/1wDMPzdWQu0eEedrXgMfpdVIEGkwGCsuL?usp=sharing)

## Stack

-   [ReactJS](https://reactjs.org)
-   [SCSS](https://sass-lang.com/documentation)

## Services

-   [Firebase](https://firebase.google.com)

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

After cloning project you will have to set up a firebase project online. Go to [firebase console](https://console.firebase.google.com/). Start a new project and name it what you want.

Once your project is up and running you will have to create a web app. Click the **"+ Add app"** and then select **"Web"** (shown as **</>**). Choose what ever name you want for the app and select **"Also set up Firebase Hosting for this app."**. Then register the app.

You will now be presented with the suggestion of adding firebase SDK. Make note of the values and create a new file in your local project root folder called `.env.local`, this will contain your local environment variables. Use the following as a template and replace the `[YOUR-VALUE]` with the ones for your registered app:

**NOTE** `CLOUD_FUNCTION_NAME` will be the name you choose durring firebase cloud function initialization in the following steps.

```
REACT_APP_API_KEY=[YOUR-VALUE]
REACT_APP_AUTH_DOMAIN=[YOUR-VALUE]
REACT_APP_PROJECT_ID=[YOUR-VALUE]
REACT_APP_STORAGE_BUCKET=[YOUR-VALUE]
REACT_APP_MESSAGING_SENDER_ID=[YOUR-VALUE]
REACT_APP_APP_ID=[YOUR-VALUE]
REACT_APP_WEB_API=https://us-central1-[REACT_APP_PROJECT_ID].cloudfunctions.net/[CLOUD_FUNCTION_NAME]
```

You will now need to initialize **"Firestore Database"** (which can also be done in the web console) and cloud functions (refered to as **Functions**).

To initialize cloud function on firebase you will need to go to **"Functions"** in the firebase console and activate it. This requires the **"Blaze"** plan, which is pay-as-you-go. As long as you don't have any faulty API calls going amok, you should'nt worry.

_I would however advice setting a spending limit alert when you activate this plan, that way you will be notified if it starts adding up. You will be suggested to set this up when activiating the Blaze plan_

Visit [Initialize your project](https://firebase.google.com/docs/functions/get-started#initialize-your-project) in firebase documentation for step-by-step instructions.

Once this is done you can run `npm i` from your project root folder followed by `npm run start` to view the project.

To create administrators

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
