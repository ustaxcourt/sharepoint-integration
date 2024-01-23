# Sharepoint Integration

## Features

- Human friendly function names to perform various actions with Sharepoint
- Create your own Microsoft Graph Client and perform more involved queries

## Install

### npm

```
npm i @ustaxcourt/sharepoint-integration
```

### pnpm

```
pnpm add @ustaxcourt/sharepoint-integration
```

## Usage

In order to use the client and the helper functions, you will need to ascertain secrets that are unique for your Azure AD tenancy.

### Environment Variables

These environment are required to create a Graph Client. They are used to ensure the graph client can securely connect to the correct Azure AD Tenancy.

| Variable                 | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `MS_GRAPH_TENANT_ID`     | The unique identifier of the Microsoft Azure AD Tenancy |
| `MS_GRAPH_CLIENT_ID`     | The unique identifier of the Enterprise Application     |
| `MS_GRAPH_CLIENT_SECRET` | A secret created in Enterprise Applications             |

Your system administrator can supply you with these variables. If you are the system administrator, here is how to determine them.

#### Create an Application Secret

1. Log into Azure AD
2. Navigate to Enterprise Applications
3. Create a new application or work with an existing one.
4. Navigate to the App Registration Overview for the Application. At the top you should see:

   - "Directory (tenant) ID". This is the `MS_GRAPH_TENANT_ID`, and
   - "Application (client) ID". This is the `MS_GRAPH_CLIENT_ID`

5. Click "Certificates & Secrets"
6. Click "New client secret"
7. Give the secret a name and specify the expiration and copy the Secret value you have just created. This is the `MS_GRAPH_CLIENT_SECRET`.

### Example

Here we are using `dotenv` to specify the environment variables in a typescript project. These are automatically picked up when we create a new graphClient.

```typescript
import {
  createFolder,
  createGraphClient,
} from "@ustaxcourt/sharepoint-integration";
import "dotenv/config";

const doSomething = async () => {
  const myClient = createGraphClient({
    debugLogging: true,
  });

  const result = await createFolder({
    client: myClient,
    folderName: "Jim is my friend",
    siteId: "a-unique-identifier-of-a-sharepoint-site",
  });
};

doSomething().then(() => {
  console.log("we created a folder");
});
```

## Testing

Populate your `.env` file with the required [Environment Variables](#environment-variables) and also be sure to include the following:

| Name         | Value                                                                    |
| ------------ | ------------------------------------------------------------------------ |
| TEST_SITE_ID | Unique identifier of a Sharepoint Site to use for testing                |
| TEST_LIST_ID | Unique identifier of a Sharepoint List to use for testing List Functions |

Run `npm run test`

## Publishing

This package is published on `npm` so that we can use it in other libraries. To help manage this, we are using [changesets cli](https://www.npmjs.com/package/@changesets/cli) to specify changes that are locked into semantic versions.

To begin a new changeset, commit your work into your feature branch. Then type in the following command:

```
npx changeset add
```

Follow the guided prompts to begin a new changeset version.

Then push the changes to Github for review. Once they are merged into the `main` branch, a subsequent PR will be made in order to begin the process of releasing.
