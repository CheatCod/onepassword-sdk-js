/*
 Generated by typeshare 1.11.0
*/

export enum ItemCategory {
  Login = "Login",
  SecureNote = "SecureNote",
  CreditCard = "CreditCard",
  CryptoWallet = "CryptoWallet",
  Identity = "Identity",
  Password = "Password",
  Document = "Document",
  ApiCredentials = "ApiCredentials",
  BankAccount = "BankAccount",
  Database = "Database",
  DriverLicense = "DriverLicense",
  Email = "Email",
  MedicalRecord = "MedicalRecord",
  Membership = "Membership",
  OutdoorLicense = "OutdoorLicense",
  Passport = "Passport",
  Rewards = "Rewards",
  Router = "Router",
  Server = "Server",
  SshKey = "SshKey",
  SocialSecurityNumber = "SocialSecurityNumber",
  SoftwareLicense = "SoftwareLicense",
  Person = "Person",
  Unsupported = "Unsupported",
}

export enum ItemFieldType {
  Text = "Text",
  Concealed = "Concealed",
  CreditCardType = "CreditCardType",
  Phone = "Phone",
  Url = "Url",
  Totp = "Totp",
  Unsupported = "Unsupported",
}

/** Field type-specific attributes. */
export type ItemFieldDetails =
  /** The computed OTP code and other details */
  { type: "Otp"; content: OtpFieldDetails };

/** Represents a field within an item. */
export interface ItemField {
  /** The field's ID */
  id: string;
  /** The field's title */
  title: string;
  /** The ID of the section containing the field. Built-in fields such as usernames and passwords don't require a section. */
  sectionId?: string;
  /** The field's type */
  fieldType: ItemFieldType;
  /** The string representation of the field's value */
  value: string;
  /** Field type-specific attributes. */
  details?: ItemFieldDetails;
}

/** A section groups together multiple fields in an item. */
export interface ItemSection {
  /** The section's unique ID */
  id: string;
  /** The section's title */
  title: string;
}

/**
 * Controls the auto-fill behavior of a website.
 *
 *
 * For more information, visit https://support.1password.com/autofill-behavior/
 */
export enum AutofillBehavior {
  /** Auto-fill any page that’s part of the website, including subdomains */
  AnywhereOnWebsite = "AnywhereOnWebsite",
  /** Auto-fill only if the domain (hostname and port) is an exact match. */
  ExactDomain = "ExactDomain",
  /** Never auto-fill on this website */
  Never = "Never",
}

export interface Website {
  /** The website URL */
  url: string;
  /** The label of the website, e.g. 'website', 'sign-in address' */
  label: string;
  /**
   * The auto-fill behavior of the website
   *
   * For more information, visit https://support.1password.com/autofill-behavior/
   */
  autofillBehavior: AutofillBehavior;
}

/** Represents a 1Password item. */
export interface Item {
  /** The item's ID */
  id: string;
  /** The item's title */
  title: string;
  /** The item's category */
  category: ItemCategory;
  /** The ID of the vault where the item is saved */
  vaultId: string;
  /** The item's fields */
  fields: ItemField[];
  /** The item's sections */
  sections: ItemSection[];
  /** The item's tags */
  tags: string[];
  /** The websites used for autofilling for items of the Login and Password categories. */
  websites: Website[];
  /** The item's version */
  version: number;
}

export interface ItemCreateParams {
  /** The item's category */
  category: ItemCategory;
  /** The ID of the vault where the item is saved */
  vaultId: string;
  /** The item's title */
  title: string;
  /** The item's fields */
  fields?: ItemField[];
  /** The item's sections */
  sections?: ItemSection[];
  /** The item's tags */
  tags?: string[];
  /** The websites used for autofilling for items of the Login and Password categories. */
  websites?: Website[];
}

/** Represents a decrypted 1Password item. */
export interface ItemOverview {
  /** The item's ID */
  id: string;
  /** The item's title */
  title: string;
  /** The item's category */
  category: ItemCategory;
  /** The ID of the vault where the item is saved */
  vaultId: string;
  /** The websites used for autofilling for items of the Login and Password categories. */
  websites: Website[];
}

/** Additional attributes for OTP fields. */
export interface OtpFieldDetails {
  /** The OTP code, if successfully computed */
  code?: string;
  /** The error message, if the OTP code could not be computed */
  errorMessage?: string;
}

/** Represents a decrypted 1Password vault. */
export interface VaultOverview {
  /** The vault's ID */
  id: string;
  /** The vault's title */
  title: string;
}
