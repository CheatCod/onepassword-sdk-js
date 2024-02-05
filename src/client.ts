import { SecretsAPI, SecretsSource } from "./secrets";
import { ClientAuthConfig, Core, SharedCore } from "./core";
import { ClientConfiguration, InnerClient } from "./configuration";
import * as os from "os";

export const DEFAULT_INTEGRATION_NAME = "Unknown";
export const DEFAULT_INTEGRATION_VERSION = "Unknown";

const LANGUAGE = "JS";
const VERSION = "0010001"; // v0.1.0

const finalizationRegistry = new FinalizationRegistry(
  (heldClientId: number) => {
    const sharedCore = new SharedCore();
    sharedCore.releaseClient(heldClientId);
  },
);

export async function createClient(
  config: ClientConfiguration,
): Promise<Client> {
  return createClientWithCore(config, new SharedCore());
}

export async function createClientWithCore(
  config: ClientConfiguration,
  core: Core,
): Promise<Client> {
  const authConfig = createClientAuthConfig(config);
  const clientID = await core.initClient(authConfig);
  const inner: InnerClient = {
    id: parseInt(clientID),
    core: core,
  };
  const client = new Client(inner);
  // Cleans up associated memory from core when client instance goes out of scope.
  finalizationRegistry.register(client, inner.id);
  return client;
}

// Client represents a client instance of the SDK.
export class Client {
  public secrets: SecretsAPI;

  constructor(innerClient: InnerClient) {
    this.secrets = new SecretsSource(innerClient);
  }
}

export function createClientAuthConfig(
  userConfig: ClientConfiguration,
): ClientAuthConfig {
  return {
    serviceAccountToken: userConfig.auth,
    programmingLanguage: LANGUAGE,
    sdkVersion: VERSION,
    integrationName: userConfig.integrationName,
    integrationVersion: userConfig.integrationVersion,
    requestLibraryName: "TBD",
    requestLibraryVersion: "TBD",
    // Only supported on Node.js
    os: os.type(),
    osVersion: os.version(),
    architecture: os.arch(),
  };
}
