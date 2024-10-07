// Code generated by op-codegen - DO NOT EDIT MANUALLY

import { InnerClient } from "./core.js";
import { SecretsApi, Secrets } from "./secrets.js";
import { ItemsApi, Items } from "./items.js";
import { VaultsApi, Vaults } from "./vaults.js";

export class Client {
  public secrets: SecretsApi;
  public items: ItemsApi;
  public vaults: VaultsApi;

  public constructor(innerClient: InnerClient) {
    this.secrets = new Secrets(innerClient);
    this.items = new Items(innerClient);
    this.vaults = new Vaults(innerClient);
  }
}
