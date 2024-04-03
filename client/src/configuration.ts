/**
     Module defining configuration options for the 1Password SDK.
    @module
 */
import * as os from "os";
import { ClientAuthConfig } from "./core.js";

const LANGUAGE = "JS";
const VERSION = "0010001"; // v0.1.0

/**
  Defines all parameters that can be used to configure the 1Password SDK Client.
 */
export interface ClientConfiguration {
  // Auth currently only accepts a service account token. Read more about how to get started with service accounts: https://developer.1password.com/docs/service-accounts/get-started/#create-a-service-account
  auth: Auth;
  integrationName: string;
  integrationVersion: string;
}

/**
  Sets the authentication method. Supply a `string` to authenticate with a service account token.
 */
type Auth = string;

/**
 * Creates a default client configuration.
 * @returns The client configuration to instantiate the client with.
 */
export const clientAuthConfig = (
  userConfig: ClientConfiguration,
): ClientAuthConfig => {
  // TODO: Add logic for computing the correct sanitized version value for each platform
  const defaultOsVersion = "0.0.0";
  return {
    serviceAccountToken: userConfig.auth,
    programmingLanguage: LANGUAGE,
    sdkVersion: VERSION,
    integrationName: userConfig.integrationName,
    integrationVersion: userConfig.integrationVersion,
    requestLibraryName: "Fetch API",
    requestLibraryVersion: "Fetch API",
    // Only supported on Node.js
    os: os.type().toLowerCase(),
    osVersion: defaultOsVersion,
    architecture: os.arch(),
  };
};
