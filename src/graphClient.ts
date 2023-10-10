/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */

import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import { ClientSecretCredential } from "@azure/identity";
import "isomorphic-fetch";

export type CreateGraphClientParameters = {
  tenantId?: string;
  graphClientId?: string;
  graphClientSecret?: string;
};

export type CreateGraphClientFunction = ({
  tenantId,
  graphClientId,
  graphClientSecret,
}: CreateGraphClientParameters) => Client;

export const createGraphClient: CreateGraphClientFunction = ({
  tenantId,
  graphClientId,
  graphClientSecret,
}) => {
  tenantId = tenantId || process.env.MS_GRAPH_TENANT_ID;
  graphClientId = graphClientId || process.env.MS_GRAPH_CLIENT_ID;
  graphClientSecret = graphClientSecret || process.env.MS_GRAPH_CLIENT_SECRET;

  if (!tenantId) {
    throw new Error("Missing required variable: tenantId");
  }

  if (!graphClientId) {
    throw new Error("Missing required variable: graphClientId");
  }

  if (!graphClientSecret) {
    throw new Error("Missing required variable: graphClientSecret");
  }

  const credential = new ClientSecretCredential(
    tenantId,
    graphClientId,
    graphClientSecret
  );

  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: ["https://graph.microsoft.com/.default"],
  });

  return Client.initWithMiddleware({
    debugLogging: true,
    authProvider,
  });
};
