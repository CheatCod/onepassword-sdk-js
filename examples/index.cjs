const sdk = require("@1password/sdk");

async function fetchSecret() {
  // Creates an authenticated client.
  const client = await sdk.createClient({
    auth: process.env.OP_SERVICE_ACCOUNT_TOKEN,
    // Set the following to your own integration name and version.
    integrationName: "My 1Password Integration",
    integrationVersion: "v1.0.0",
  });

  return await client.secrets.resolve("op://vault/item/field");
}

async function manageItems() {
  // Creates an authenticated client.
  const client = await sdk.createClient({
    auth: process.env.OP_SERVICE_ACCOUNT_TOKEN,
    integrationName: "My 1Password Integration",
    integrationVersion: "v1.0.0",
  });

  const vaults = await client.vaults.listAll();

  for await (const vault of vaults) {
    console.log(vault.id + " " + vault.title);
    const items = await client.items.listAll(vault.id);
    for await (const item of items) {
      console.log(item.id + " " + item.title);
    }
  }

  // Create an item
  let item = await client.items.create({
    title: "My Item",
    category: sdk.ItemCategory.Login,
    vaultId: "7turaasywpymt3jecxoxk5roli",
    fields: [
      {
        id: "username",
        title: "username",
        fieldType: sdk.ItemFieldType.Text,
        value: "my username",
      },
      {
        id: "password",
        title: "password",
        fieldType: sdk.ItemFieldType.Concealed,
        value: "my secret value",
      },
      {
        id: "onetimepassword",
        title: "one-time password",
        sectionId: "custom section",
        fieldType: sdk.ItemFieldType.Totp,
        value:
          "otpauth://totp/my-example-otp?secret=jncrjgbdjnrncbjsr&issuer=1Password",
      },
    ],
    sections: [
      {
        id: "custom section",
        title: "my section",
      },
    ],
    tags: [],
  });

  // Get a one-time password code.
  let element = item.fields.find((element) => {
    return element.fieldType == sdk.ItemFieldType.Totp;
  });

  if (!element) {
    console.error("no totp field found on item");
    return;
  }

  switch (element.details.type) {
    case "Otp": {
      if (element.details.content.code) {
        console.log(element.details.content.code);
      } else {
        console.error(element.details.content.errorMessage);
      }
    }
    default:
  }

  // Edit an item (change the password)
  let newItem = {
    ...item,
    fields: item.fields
      .filter((f) => {
        return f.id == "password";
      })
      .map((f) => {
        f.value = "new password";
        return f;
      }),
  };

  let updatedItem = await client.items.put(newItem);
  console.log(updatedItem.fields);

  // Delete an item
  await client.items.delete(item.vaultId, item.id);
}

manageItems();
fetchSecret().then(console.log);
