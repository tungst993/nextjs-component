# CRM WEB UI

Technologies React, NextJS, Redux... 

**Setup**

1. Clone the repo:
```
``` 

2. `cd` in and run:
```
yarn
    Install all dependencies.

yarn dev
    Starts the development server.

yarn build
    Builds the app for production
```

3. Folder Structure in `src`
    1.  `authorization`: Handle token between different domain
    2.  `config`: This is where you put endpoint for different environment
    3.  `core`: Place for base component, http service, ...
    4.  `domain`: Place for actual business component
    5.  `lib`: Helper file for `eui` and enable `cors` for development
    6.  `pages`: Hold container component, api for `next` backend server, connect with `redux` store on CSR
    7.  `rootRedux`: Reducer, Saga, Store for the main app
    8.  `utils`: Helper function which can be use across the application

`TBU`
