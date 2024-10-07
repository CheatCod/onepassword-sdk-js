// Code generated by op-codegen - DO NOT EDIT MANUALLY

import { InvokeConfig, InnerClient, SharedCore } from "./core.js";
import * as types from "./types.js";
import { SdkIterable } from "./iterator.js";

/**
 * The Secrets API includes all operations the SDK client can perform on secrets.
 * Use secret reference URIs to securely load secrets from 1Password: op://<vault-name>/<item-name>[/<section-name>]/<field-name>
 */
export interface SecretsApi {
  /**
   * Resolve returns the secret the provided secret reference points to.
   */
  resolve(secretReference: string): Promise<string>;
}

export class Secrets implements SecretsApi {
  #inner: InnerClient;

  public constructor(inner: InnerClient) {
    this.#inner = inner;
  }

  /**
   * Resolve returns the secret the provided secret reference points to.
   */
  public async resolve(secretReference: string): Promise<string> {
    const invocationConfig: InvokeConfig = {
      invocation: {
        clientId: this.#inner.id,
        parameters: {
          name: "SecretsResolve",
          parameters: {
            secret_reference: secretReference,
          },
        },
      },
    };
    return JSON.parse(
      await this.#inner.core.invoke(invocationConfig),
    ) as Promise<string>;
  }

  /**
   * Validate the secret reference to ensure there are no syntax errors.
   */
  public static async validateSecretReference(
    secretReference: string,
  ): Promise<void> {
    const sharedCore = new SharedCore();
    const invocationConfig: InvokeConfig = {
      invocation: {
        parameters: {
          name: "ValidateSecretReference",
          parameters: {
            secret_reference: secretReference,
          },
        },
      },
    };
    await sharedCore.invoke(invocationConfig);
  }
}
