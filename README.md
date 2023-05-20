See [Live Demo](https://auction.firstpersoncode.dev/)

# Architecure

### Overview

The web app is an online auction system where users can create and bid on items, it also includes a deposit feature.

### Client-side:

- HTML and CSS: Responsible for presenting the user interface (UI) and handling user interactions.

- React.js and Javascript: Facilitates UI development and provides a structured approach to manage client-side logic.

### Server-side:

- Next.js: Handles back-end, consume database, renders the front-end, request handling, and routing.

- MongoDB: Stores and retrieves items, bids, user information, and balance.

### Communication:

- RESTful APIs: Enable communication between the client-side and server-side components, allowing data retrieval and submission.

- JSON (JavaScript Object Notation): Used for data serialization and exchange between the client and server.

### Security:

- Secure Socket Layer (SSL)/Transport Layer Security (TLS): Encrypts data transmission to protect sensitive information.

- Input validation and sanitization: Prevents common security vulnerabilities, such as cross-site scripting (XSS).

- Normalize response: Helps mitigate security risks and ensures that the response does not contain any potentially harmful content that could be exploited by attackers.

### Infrastructure:

- DigitalOcean:

  - Services that run the client-side and server-side components.

  - Serve static files.

  - Provide the pipeline between the repositories and the services.

  - Provide logs of the deployment process and status of the services for monitoring.

- Atlas: Cloud Database that hosts the MongoDB clusters.

- NameCheap: Domain provider used for hosting the web app domain.

- Github: Repository of the web app source code.

---

### ERD:

![ERD](https://lh3.googleusercontent.com/fife/APg5EOa3lWBbHfa4qkyPwH1ZbWVgHBELocqLmfM1p4s95lTucF1P57Dgrn70RXeWAixcyLQK1OqEWfwVM9GIs_0gGlBN_NpCuxir6592p0_EsnnfWKx2Ru7rqx5zEYhohpc7XhY6S8okY6WG9DGAosxsxFDdxrudz9vnvG_xwMp8mzDdKTFU8SWAuj0XnpSs4PQPyCncwuUpwV8PHCXXqdyFmYUN6bZB7Sx5Y98MjatsnUuqPlvur8XrUeKNO4ZHuAOOTxUBF9m_cX8Wu3jiIhT0tB0NKMpdO-oyASOeXryCV5BI1ZjETbtjbc0OQVqpBfDQAfGZSnp4IF8rMF1ydbMfAwvMcGIuDv1Mp-pmh1UySptrjVKDss4_J9ISNU9kh8VqAxjIohdVuo313Gl8JYc-1VJ16dpesCFEp9VdaPMfFpzJqzMk_ehEJ_XB3WiU8dJTx3KQHZB5fN6MFn5tt-yqkJjeNy7onJsNULwwCWASie67OjtkR9heWO8CtiLZZYP5F8avy2QuJV7u_AXol1XJMr1Q7mbZ_LAWJnsJ6ZSVXUokLavVNgeJnDvrhuhWet1h8WhQ7kN9e7Pmfd-l7m4jLTpR2-jPU4hyxPk2-WXjYUP5skB0kC-Zk6TYejpMwz_sLtTumCFxxf35lk66iF0RNVIemdtAPXFIBXNLDpDylMOO8EP-PJqaSJlCAWwAN0Mjy00v-VlJ4m_78VVqEyiT3HHuMed3MQiU1Y644bCNSNfBUy1fQfGXKZ9QCtAF5EQs9NSJ6j7rNe5qLW4PfLR1gMMQo8c_t8gPE8tP-3hf7A_jKIhCbgPBLbH-TRS3Zal4Gn97LgTKC5BpkYyGHjeJ06p77s7B4WQdzIevwr8D24kPzXnyw32tyEnYPcEZ-uM1tt8XXQEkqY2bXXlU4SsUANf-5IKsbWDWGR-3y-AXx8r8ouG0KQImIedXCWs6kLOLn0_H6En9z8JUh93gerUEOSYIcMkmaicjJyZhVXd3aM1vdAo1Mhlmgpn7ZWXIZkdWHFdHfzzWlJj_IW77hiVNyF2KYatgi7u7fyWqc8W4gOgzRtOpcBh42UgLkbG00f124SWWXC8HL38lug3URm4iU3pA-7wcr-p7cgDfokXCcwNSgexns4qal19xvgIVGzWsQTCi87JwTuctBg4F-6gza1OPLBfAr804zWGJforLs6owVofMFIbIigB71hOLgEsP2-QbTzFxttYnzDiXIlHBr7bFVt9Cu64wgHXQHbljnbP_rF8TUXZKTRmokxbb12OWhhKaGdxlFOOLvbdmonWrzlFKuAVKNugltuWyAp9Q0_sqlLOtKAdfNaZK31Vff7e-jzhN_5Ia3wobFnHYo_blrjA-7H4rdcburiLTbDJBAMVQtQ5mbpsPtNw6P8B5mTvG1X403-XE3ALtF6PjPkylS3KQDA5og8sanb4BmN7kKiHlfY6zFOVH3L1jm7nYSC9xhkZKpDWYnYEkmHxpaSoM1YAAl84DLu_KK8PwRKA3od0X5IF9t_gc3xcr16lpsfwEJi4yoQ4czYc6_AbZK6hK-Qa1ynO8aDrQls-bGlJVMy1M06nJkiWAXQGIlxLIO9CbYMbedlTkWLANppOkeS4dwCpBvoSynMP3JhKSu9t2xLdm1-lVCR-XLdVgwO0Litkcln_7fROviBt_aBBH=w1920-h880)

---

### Wireframe:

![Wireframe](https://iruuzainc.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ffbefb7fc-8011-448c-8f05-a37b687d8ef0%2FUntitled.png?id=7676818c-4824-4e1f-98f4-9ac40aebf5bd&table=block&spaceId=be6005d7-8302-4c8e-93fe-03d0d3d71970&width=2000&userId=&cache=v2)

---

# Getting Started

First, install dependencies:

```bash

yarn  install

# or

npm  install

# or

pnpm  install

```

then, run the development server:

```bash

npm  run  dev

# or

yarn  dev

# or

pnpm  dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

#### The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

---

## Project Structure

This documentation provides an overview of the project structure within a Next.js app, following the MVVM (Model-View-ViewModel) paradigm. The project structure emphasizes a clear separation of concerns and a modular approach to organizing code.

### Folder Structure

The project structure is organized as follows:

```
`root
|-- models
|   |-- (all entity files)
|   |-- connect.ts (database connection file)
|-- pages
|   |-- api
|   |   |-- (all the API handlers)
|   |-- _app.tsx
|   |-- index.tsx (the frontend page)
|-- components
|   |-- (all component files here)
|-- context
|   |-- global.tsx`
```

### `models` Folder

The `models` folder contains entity files and a database connection file. It is responsible for defining the data models, interacting with the database, and managing database connections.

### `pages` Folder

The `pages` folder contains the routing configuration for the app, including API routes and frontend pages. It follows the convention of Next.js for creating pages and routing.

- `api` subfolder: This subfolder contains all the API handler files responsible for handling incoming API requests. These handlers act as connectors and controllers between the models and views, executing the necessary logic and returning appropriate responses.
- `_app.tsx`: This file represents the Next.js `_app` component, which serves as a wrapper for all pages and provides a common layout or global configurations. It can be used to set up context providers or add global styles and scripts.
- `index.tsx`: This file represents the main frontend page of the app. It serves as the entry point for the app's UI, rendering the necessary components and interacting with the ViewModel or global state.

### `components` Folder

The `components` folder contains all the React components used in the app. These components act as the "View" layer in the MVVM paradigm and are responsible for rendering UI elements and handling user interactions. They may also make requests to the API and call handlers provided by the global context to update the global state.

### `context` Folder

The `context` folder includes files related to the global context, which controls the global state of the app. It follows the ViewModel pattern in the MVVM paradigm.

- `global.tsx`: This file represents the global context file, which defines the context provider and manages the global state of the app. It can include state variables, actions, and handlers that update the state. The components within the `components` folder can access and interact with this global context to maintain a consistent state across the app.

### MVVM Paradigm

The project structure described above follows the MVVM (Model-View-ViewModel) paradigm, which separates concerns and promotes a modular approach to development.

- **Model**: The "Model" layer represents the data and business logic of the app. It typically includes data models, database interactions, and other business-related operations. In the provided structure, models are not explicitly defined, but they can be incorporated within the API handlers located in the `pages/api` folder.
- **View**: The "View" layer is responsible for rendering the UI elements and handling user interactions. It includes the components located in the `components` folder, which are purely focused on the presentation logic and do not contain complex business logic.
- **ViewModel**: In this project structure, the "ViewModel" layer is represented by the global context defined in the `context/global.tsx` file. The ViewModel acts as an intermediary between the Model and View layers, providing access to the global state and handling state updates. Components in the `components` folder can interact with the ViewModel to read and update the global state.

#### The separation of concerns in this project structure adheres to the MVVM paradigm, allowing for maintainable, testable, and scalable code. The components in the "View" layer are decoupled from the business logic and can easily be reused or modified independently. The global context serves as the central point

## API Unit Test

This unit test file tests all the APIs within the Next.js app using Jest framework.

### Test Execution

To run the unit test, follow these steps:

1.  Ensure that you have the project dependencies installed by running the command `npm install` or `yarn install`.
2.  Ensure that you have the `.env.test` file that contains:

```bash
DB_URI=mongodb+srv://<user>:<password>@<your cluster domain>/test
JWT_KEY=secret
TOKEN_NAME=__test-session__
```

3.  Open a terminal or command prompt and navigate to the project's root directory.
4.  Execute the following command to run the unit tests:

    ```bash
    yarn test

    #or

    npm run test
    ```

    This command will execute all the unit tests defined in the `__test__/api.ts` file.

### Test File Location

The unit test file `api.ts` is located in the `__test__` directory at the root of the project.

```
`project-root
├── __tests__
│   └── api.ts
├── ...`
```

### Test Cases

The unit test file `api.ts` includes the following test cases:

1.  `should fail to register a new user if email already exists`

- Description: Tests the behavior when trying to register a new user with an email that already exists in the database.
- Expected outcome: The registration should fail with a status code of 403.

2.  `should successfully register a new user`

- Description: Tests the successful registration of a new user.
- Expected outcome: The registration should succeed with a status code of 200, and the user's email should match the provided email.

3.  `should fail to login without email`

- Description: Tests the behavior when trying to log in without providing an email.
- Expected outcome: The login should fail with a status code of 403.

4.  `should fail to login with an invalid email`

- Description: Tests the behavior when trying to log in with an invalid email format.
- Expected outcome: The login should fail with a status code of 403.

5.  `should fail to login with an invalid password`

- Description: Tests the behavior when trying to log in with an invalid password.
- Expected outcome: The login should fail with a status code of 403.

6.  `should successfully log in`

- Description: Tests the successful login of a user.
- Expected outcome: The login should succeed with a status code of 200, and the user's email should match the provided email.

7.  `should fail to deposit if the user or token is not found`

- Description: Tests the behavior when trying to deposit funds without a valid user or token.
- Expected outcome: The deposit should fail with a status code of 404, and the user's balance should remain unchanged.

8.  `should successfully deposit to the user's balance`

- Description: Tests the successful deposit of funds to the user's balance.
- Expected outcome: The deposit should succeed with a status code of 200, and the user's total balance should match the deposited amount.

9.  `should fail to create an item if the user or token is not found`

- Description: Tests the behavior when trying to create an item without a valid user or token.
- Expected outcome: The item creation should fail with a status code of 404.

10. `should fail to create an item without a name`

- Description: Tests the behavior when trying to create an item without providing a name.
- Expected outcome: The item creation should fail with a status code of 403.

11. `should fail to create an item without a price`

- Description: Tests the behavior when trying to create an item without providing a price.
- Expected outcome: The item creation should fail with a status code of 403.

12. `should fail to create an item without a duration`

- Description: Tests the behavior when trying to create an item without providing a duration.
- Expected outcome: The item creation should fail with a status code of 403.

13. `should fail to create an item with an invalid duration`

- Description: Tests the behavior when trying to create an item with an invalid duration (end time earlier than start time).
- Expected outcome: The item creation should fail with a status code of 403.

14. `should successfully create an item`

- Description: Tests the successful creation of an item.
- Expected outcome: The item creation should succeed with a status code of 200, and the item should be stored in the database with the provided name.

> Note: Each test case includes a description, expected outcome, and any relevant parameters or inputs used.

---

## APIs:

#### User:

- **Database**: Stores user information including the credential to access the system.

- **Server-side APIs**: Handles user registration, login, and session management, ensuring secure access to user-specific data and retrieving current balance.

- **Endpoints**:

  - Register

    - path: /auth/signup

    - method: POST

    - body:

      - name: _string,_ user’s name
      - email: _string,_ credential used for login
      - password: _string_ credential used for login

    - response:

      - balance: _number_, user’s balance
      - name: _string,_ user’s name
      - email: _string_, credential used for login

    - header response:

      - \_\_session\_\_: token for retrieving current session

  - Login

    - path: /auth/signin

    - method: POST

    - body:

      - email: _string,_ credential used for login
      - password: _string_ credential used for login

    - response:

      - balance: _number_, user’s balance
      - name: _string,_ user’s name
      - email: _string_, credential used for login

    - header response:

      - \_\_session\_\_: token for retrieving current session

  - Logout

    - path: /auth/signout

    - method: GET

    - header request:

      - \_\_session\_\_: token for retrieving current session

    - header response:

      - \_\_session\_\_: token removed

  - Session

    - path: /auth/session

    - method: GET

    - header request:

      - \_\_session\_\_: token for retrieving current session

    - response:

      - name: _string,_ user’s name
      - balance: _number,_ user’s balance
      - email: _string_, credential used for login

---

#### Item:

- **Database**: Stores item information, such as name, description, and duration.

- **Server-side APIs**: Create, retrieve and provide item data to the client-side, and calculate the highest bid of an item. it also enables search, filtering, and sorting functionalities.

- **Endpoints**:

  - List

    - path: /item/list

    - method: GET

    - search:

      - filter: filter items by duration status (ongoing or completed)

    - response:

      - _array\[]:_

        - name: _string_, item’s name
        - duration*start: \_date*, item’s duration start for bid
        - duration*end: \_date*, item’s duration end for bid
        - start*price: \_number,* starting price of the item for bidding.
        - current*price: \_number*, the current highest bid

  - Create

    - path: /item/create

    - method: POST

    - header request:

      - \_\_session\_\_: token for retrieving current session

    - body:

      - name: _string_, item’s name
      - duration*start: \_date*, item’s duration start for bid
      - duration*end: \_date*, item’s duration end for bid
      - start*price: \_number,* starting price of the item for bidding.

    - response:

      - name: _string_, item’s name
      - duration*start: \_date*, item’s duration start for bid
      - duration*end: \_date*, item’s duration end for bid
      - start*price: \_number,* starting price of the item for bidding.
      - current*price: \_number*, the current highest bid

---

#### Bid:

- **Database**: Stores bid information related to an item (many-to-one relationship).

- **Server-side APIs**: Manage bid state, handle creating bid price related to an item, validates the highest bid, and also validates the user’s timestamp on creating a bid with a boundary every 5s.

- **Endpoints**:

  - Create

    - path: /bid/create

    - method: POST

    - header request:

      - \_\_session\_\_: token for retrieving current session

    - body:

      - itemRef: _string_, id of the selected item
      - price: _number,_ price bid for the selected item

    - response:

      - price: _number,_ price bid for the selected item

---

#### Balance:

- **Database**: Stores balance information related to an user (one-to-one relationship).

- **Server-side APIs**: Update and validate user balance

- **Endpoints**:

  - Deposite

    - path: /balance/deposite

    - method: POST

    - header request:

      - \_\_session\_\_: token for retrieving current session

    - body:

      - balance: _number,_ amount to be deposit into user balance

    - response:

      - totalBalance: _number,_ user’s total balance

---
