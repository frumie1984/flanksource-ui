import { FaWindows } from "react-icons/fa";
import { DiGoogleCloudPlatform } from "react-icons/di";
import { stringSortHelper } from "../../utils/common";
import { Connection } from "./ConnectionForm";

const enum ConnectionsFieldTypes {
  checkbox = "checkbox",
  input = "input",
  numberInput = "numberInput",
  EnvVarSource = "EnvVarSource"
}

type Variant = "small" | "large";

const variants: { [key: string]: Variant } = {
  small: "small",
  large: "large"
};

export type Field = {
  label: string;
  key: string;
  type: ConnectionsFieldTypes;
  variant?: Variant;
  required?: boolean;
  hint?: string;
  default?: boolean | number | string;
};

export const enum ConnectionValueType {
  AWS = "aws",
  Azure = "azure",
  AzureDevops = "azure_devops",
  Discord = "discord",
  Dynatrace = "dynatrace",
  ElasticSearch = "elasticsearch",
  Email = "email",
  GCP = "google_cloud",
  GenericWebhook = "generic_webhook",
  Git = "git",
  Github = "github",
  GoogleChat = "google_chat",
  HTTP = "http",
  IFTTT = "ifttt",
  JMeter = "jmeter",
  Kubernetes = "kubernetes",
  LDAP = "ldap",
  Matrix = "matrix",
  Mattermost = "mattermost",
  Mongo = "mongo",
  MySQL = "mysql",
  Ntfy = "ntfy",
  OpsGenie = "opsgenie",
  Postgres = "postgres",
  Prometheus = "prometheus",
  Pushbullet = "pushbullet",
  Pushover = "pushover",
  Redis = "redis",
  Restic = "restic",
  Rocketchat = "rocketchat",
  SFTP = "sftp",
  Slack = "slack",
  SlackWebhook = "slackwebhook",
  SMB = "smb",
  SQLServer = "sql_server",
  Teams = "teams",
  Telegram = "telegram",
  Webhook = "webhook",
  Windows = "windows",
  ZulipChat = "zulip_chat"
}

export type ConnectionType = {
  title: string;
  value: ConnectionValueType;
  icon?: React.ReactNode | string | null;
  fields: Field[];
  convertToFormSpecificValue?: (data: Record<string, string>) => Connection;
  preSubmitConverter?: (data: Record<string, string>) => object;
  hide?: boolean;

  /** indicates whether this connection is primarily for notification */
  forNotification?: boolean;
};

export const connectionTypes: ConnectionType[] = [
  {
    title: "Postgres",
    icon: "postgres",
    value: ConnectionValueType.Postgres,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "URL",
        key: "url",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Username",
        key: "username",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Password",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      }
    ]
  },
  {
    title: "MySQL",
    icon: "mysql",
    value: ConnectionValueType.MySQL,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "URL",
        key: "url",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Username",
        key: "username",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Password",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      }
    ]
  },
  {
    title: "SQL Server",
    icon: "sqlserver",
    value: ConnectionValueType.SQLServer,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "URL",
        key: "url",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Username",
        key: "username",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Password",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      }
    ]
  },
  {
    title: "HTTP",
    icon: "http",
    value: ConnectionValueType.HTTP,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "URL",
        key: "url",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Username",
        key: "username",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Password",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Insecure TLS",
        key: "insecure_tls",
        type: ConnectionsFieldTypes.checkbox
      }
    ]
  },
  {
    title: "Prometheus",
    icon: "prometheus",
    value: ConnectionValueType.Prometheus,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "URL",
        key: "url",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Username",
        key: "username",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: false
      },
      {
        label: "Password",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: false
      },
      {
        label: "Insecure TLS",
        key: "insecure_tls",
        type: ConnectionsFieldTypes.checkbox
      }
    ]
  },
  {
    title: "Elasticsearch",
    icon: "elasticsearch",
    value: ConnectionValueType.ElasticSearch,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "URL",
        key: "url",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Username",
        key: "username",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Password",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Insecure TLS",
        key: "insecure_tls",
        type: ConnectionsFieldTypes.checkbox
      }
    ]
  },
  {
    title: "Mongo",
    icon: "mongo",
    value: ConnectionValueType.Mongo,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "URL",
        key: "url",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Username",
        key: "username",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Password",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Insecure TLS",
        key: "insecure_tls",
        type: ConnectionsFieldTypes.checkbox
      }
    ]
  },
  {
    title: "LDAP",
    icon: "ldap",
    value: ConnectionValueType.LDAP,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "URL",
        key: "url",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Username",
        key: "username",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Password",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Insecure TLS",
        key: "insecure_tls",
        type: ConnectionsFieldTypes.checkbox
      }
    ]
  },
  {
    title: "Redis",
    icon: "redis",
    value: ConnectionValueType.Redis,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Database",
        key: "db",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "URL",
        key: "url",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Username",
        key: "username",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: false
      },
      {
        label: "Password",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: false
      },
      {
        label: "Insecure TLS",
        key: "insecure_tls",
        type: ConnectionsFieldTypes.checkbox
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        db: data.properties?.db
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        url: data.url,
        username: data.username,
        password: data.password,
        insecure_tls: data.insecure_tls,
        properties: {
          db: data.db
        }
      };
    }
  },
  {
    title: "Windows",
    value: ConnectionValueType.Windows,
    icon: <FaWindows className="w-5 h-5" />,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Username",
        key: "username",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Password",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Domain",
        key: "domain",
        type: ConnectionsFieldTypes.input,
        required: false
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        domain: data.properties?.domain
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        username: data.username,
        password: data.password,
        url: data.url,
        properties: {
          domain: data.domain
        }
      };
    }
  },
  {
    title: "Google Cloud",
    value: ConnectionValueType.GCP,
    icon: <DiGoogleCloudPlatform className="w-6 h-6" />,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Endpoint",
        key: "url",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Certificate",
        key: "certificate",
        type: ConnectionsFieldTypes.EnvVarSource,
        variant: variants.large,
        required: true
      }
    ]
  },
  {
    title: "SFTP",
    icon: "sftp",
    value: ConnectionValueType.SFTP,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Host",
        key: "host",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Username",
        key: "username",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Password",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Port",
        key: "port",
        type: ConnectionsFieldTypes.input,
        required: false
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      const regex = /(.+)?:(.+)?@(.+)?:(.+)/;
      const result = data.url.replace("sftp://", "").match(regex) || [];
      return {
        ...data,
        username: result[1],
        password: result[2],
        host: result[3],
        port: result[4]
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        url: `sftp://${data.username}:${data.password}@${data.host}:${data.port}`
      };
    }
  },
  {
    title: "AWS",
    icon: "aws",
    value: ConnectionValueType.AWS,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Region",
        key: "region",
        type: ConnectionsFieldTypes.input,
        required: false
      },
      {
        label: "Profile",
        key: "profile",
        type: ConnectionsFieldTypes.input,
        required: false
      },
      {
        label: "Access Key",
        key: "username",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: false
      },
      {
        label: "Secret Key",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: false
      },
      {
        label: "Insecure TLS",
        key: "insecure_tls",
        type: ConnectionsFieldTypes.checkbox
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        region: data.properties?.region,
        profile: data.properties?.profile,
        insecure_tls: data.properties?.insecureTLS === "true"
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        username: data.username,
        password: data.password,
        properties: {
          region: data.region,
          profile: data.profile,
          insecureTLS: data.insecure_tls
        }
      };
    }
  },
  {
    title: "Kubernetes",
    icon: "kubernetes",
    value: ConnectionValueType.Kubernetes,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Certificate",
        key: "certificate",
        type: ConnectionsFieldTypes.EnvVarSource,
        variant: variants.large,
        required: false
      }
    ]
  },
  {
    title: "Azure Devops",
    icon: "azure-devops",
    value: ConnectionValueType.AzureDevops,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Organization",
        key: "username",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Personal Access Token",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      }
    ]
  },
  {
    title: "Azure",
    icon: "azure",
    value: ConnectionValueType.Azure,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Client ID",
        key: "username",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Client Secret",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Tenant ID",
        key: "tenant",
        type: ConnectionsFieldTypes.input,
        required: true
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        tenant: data.properties?.tenant
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        username: data.username,
        password: data.password,
        properties: {
          tenant: data.tenant
        }
      };
    }
  },
  {
    title: "GitHub",
    icon: "github",
    value: ConnectionValueType.Github,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Personal Access Token",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      }
    ]
  },
  {
    title: "Restic",
    icon: "restic",
    value: ConnectionValueType.Restic,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Password",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Repository URL",
        key: "url",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "AWS Connection Name",
        key: "awsConnectionName",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Access Key",
        key: "accessKey",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Secret Key",
        key: "secretKey",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        password: data.password,
        url: data.url,
        awsConnectionName: data.awsConnectionName,
        accessKey: data.accessKey,
        secretKey: data.secretKey
      };
    }
  },
  {
    title: "SMB",
    icon: "smb",
    value: ConnectionValueType.SMB,
    hide: true,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Username",
        key: "username",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Password",
        key: "password",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Workstation",
        key: "workstation",
        type: ConnectionsFieldTypes.input
      },
      {
        label: "Share name",
        key: "sharename",
        type: ConnectionsFieldTypes.input
      },
      {
        label: "Search path",
        key: "searchPath",
        type: ConnectionsFieldTypes.input
      },
      {
        label: "Port",
        key: "port",
        type: ConnectionsFieldTypes.numberInput,
        default: 445
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        workstation: data.properties?.workstation,
        sharename: data.properties?.sharename,
        searchPath: data.properties?.searchPath,
        port: data.properties?.port
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        username: data.username,
        password: data.password,
        properties: {
          workstation: data.workstation,
          sharename: data.sharename,
          searchPath: data.searchPath,
          port: data.port
        }
      };
    }
  },
  {
    title: "JMeter",
    icon: "jmeter",
    value: ConnectionValueType.JMeter,
    hide: true,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Host",
        key: "url",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Port",
        key: "port",
        type: ConnectionsFieldTypes.numberInput
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        port: data.properties?.port
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        url: data.url,
        properties: {
          port: data.port
        }
      };
    }
  },
  {
    title: "Dynatrace",
    icon: "dynatrace",
    value: ConnectionValueType.Dynatrace,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Host",
        key: "url",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "API Key",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Scheme",
        key: "scheme",
        type: ConnectionsFieldTypes.input,
        required: true
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        scheme: data.properties?.scheme
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        url: data.url,
        password: data.password,
        properties: {
          scheme: data.scheme
        }
      };
    }
  },
  {
    title: "Discord",
    forNotification: true,
    icon: "discord",
    value: ConnectionValueType.Discord,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Webhook ID",
        key: "username",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Token",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      }
    ],
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        username: data.username,
        password: data.password,
        url: `discord://$(password)@${data.username}`
      };
    }
  },
  {
    title: "Email",
    forNotification: true,
    icon: "email",
    value: ConnectionValueType.Email,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Username",
        key: "username",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Password",
        key: "password",
        hint: "SMTP server password or hash (for OAuth2)",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "From Address",
        key: "from",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "From Name",
        key: "fromName",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Host",
        key: "host",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Port",
        key: "port",
        type: ConnectionsFieldTypes.numberInput,
        default: 25,
        required: true
      },
      {
        label: "Encryption method",
        key: "encryptionMethod",
        type: ConnectionsFieldTypes.input,
        hint: "None, ExplicitTLS, ImplicitTLS, Auto (default)",
        default: "Auto",
        required: true
      },
      {
        label: "SMTP authentication method",
        key: "authMethod",
        type: ConnectionsFieldTypes.input,
        hint: "None, Plain, CRAMMD5, Unknown, OAuth2",
        default: "Unknown",
        required: true
      },
      {
        label: "Insecure TLS",
        key: "insecure_tls",
        type: ConnectionsFieldTypes.checkbox
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        authMethod: data.properties?.authMethod,
        encryptionMethod: data.properties?.encryptionMethod,
        from: data.properties?.from,
        fromName: data.properties?.fromName,
        host: data.properties?.host,
        port: data.properties?.port
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        url: `smtp://$(username):$(password)@${data.host}:${data.port}/?UseStartTLS=${data.insecure_tls}&Encryption=${data.encryptionMethod}&Auth=${data.authMethod}`,
        username: data.username,
        password: data.password,
        insecure_tls: data.insecure_tls,
        properties: {
          authMethod: data.authMethod,
          encryptionMethod: data.encryptionMethod,
          from: data.from,
          fromName: data.fromName,
          host: data.host,
          port: data.port
        }
      };
    }
  },
  {
    title: "Google Chat",
    forNotification: true,
    icon: "google-chat",
    value: ConnectionValueType.GoogleChat,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Key",
        key: "username",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Token",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Webhook Name",
        key: "webhook",
        type: ConnectionsFieldTypes.input,
        required: true
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        webhook: data.properties?.webhook
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        url: `googlechat://chat.googleapis.com/v1/spaces/${data.webhook}/messages?key=$(username)&token=$(password)`,
        username: data.username,
        password: data.password,
        properties: {
          webhook: data.webhook
        }
      };
    }
  },
  {
    title: "IFTTT",
    forNotification: true,
    icon: "ifttt",
    value: ConnectionValueType.IFTTT,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Webhook ID",
        key: "username",
        type: ConnectionsFieldTypes.input,
        required: true
      }
    ],
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        url: `ifttt://${data.username}`,
        username: data.username
      };
    }
  },
  {
    title: "Mattermost",
    forNotification: true,
    icon: "mattermost",
    value: ConnectionValueType.Mattermost,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Username",
        key: "username",
        hint: "Override webhook user",
        type: ConnectionsFieldTypes.input,
        required: false
      },
      {
        label: "Host",
        key: "host",
        hint: "Mattermost server host (host:port)",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Token",
        key: "password",
        hint: "Webhook token",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Channel",
        key: "channel",
        hint: "Override webhook channel",
        type: ConnectionsFieldTypes.input,
        required: false
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        host: data.properties?.host,
        channel: data.properties?.channel
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        username: data.username,
        url: `mattermost://${data.username}@${data.host}/$(password)/${data.channel}`,
        password: data.password,
        properties: {
          host: data.host,
          channel: data.channel
        }
      };
    }
  },
  {
    title: "Matrix",
    forNotification: true,
    value: ConnectionValueType.Matrix,
    icon: "matrix",
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "User",
        key: "username",
        hint: "Username or empty when using access token",
        type: ConnectionsFieldTypes.input,
        required: false
      },
      {
        label: "Password",
        key: "password",
        hint: "Password or access token",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Host",
        key: "host",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Insecure TLS",
        key: "insecure_tls",
        type: ConnectionsFieldTypes.checkbox
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        host: data.properties?.host,
        channel: data.properties?.channel
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        username: data.username,
        password: data.password,
        insecure_tls: data.insecure_tls,
        url: `matrix://${data.username}:$(password)@${data.host}/?DisableTLS=${data.insecure_tls}`,
        properties: {
          host: data.host
        }
      };
    }
  },
  {
    title: "Ntfy",
    forNotification: true,
    value: ConnectionValueType.Ntfy,
    icon: "ntfy",
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Username",
        key: "username",
        type: ConnectionsFieldTypes.input,
        required: false
      },
      {
        label: "Password",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: false
      },
      {
        label: "Host",
        key: "host",
        hint: "Server hostname and port",
        default: "ntfy.sh",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Topic",
        key: "topic",
        hint: "Target topic name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Insecure TLS",
        key: "insecure_tls",
        type: ConnectionsFieldTypes.checkbox
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        host: data.properties?.host,
        topic: data.properties?.topic
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      const scheme = data.insecure_tls ? "http" : "https";
      return {
        name: data.name,
        username: data.username,
        password: data.password,
        insecure_tls: data.insecure_tls,
        url: `ntfy://${data.username}:$(password)@${data.host}/${data.topic}?Scheme=${scheme}`,
        properties: {
          host: data.host,
          topic: data.topic
        }
      };
    }
  },
  {
    title: "OpsGenie",
    forNotification: true,
    icon: "opsgenie",
    value: ConnectionValueType.OpsGenie,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Host",
        key: "host",
        default: "api.opsgenie.com",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Port",
        key: "port",
        default: 443,
        type: ConnectionsFieldTypes.numberInput,
        required: true
      },
      {
        label: "API Key",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        host: data.properties?.host,
        port: data.properties?.port
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        url: `opsgenie://${data.host}:${data.port}/$(password)`,
        password: data.password,
        properties: {
          host: data.host,
          port: data.port
        }
      };
    }
  },
  {
    title: "Pushbullet",
    forNotification: true,
    icon: "pushbullet",
    value: ConnectionValueType.Pushbullet,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Token",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Targets",
        key: "targets",
        type: ConnectionsFieldTypes.input,
        required: true
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        targets: data.properties?.targets
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        url: `pushbullet://$(password)/${data.targets}`,
        password: data.password,
        properties: {
          targets: data.targets
        }
      };
    }
  },
  {
    title: "Pushover",
    forNotification: true,
    icon: "pushover",
    value: ConnectionValueType.Pushover,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "User",
        key: "username",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Token",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      }
    ],
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        url: `pushover://:$(password)@${data.username}/`,
        username: data.username,
        password: data.password
      };
    }
  },
  {
    title: "Rocketchat",
    forNotification: true,
    icon: "rocket",
    value: ConnectionValueType.Rocketchat,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Username",
        key: "user",
        type: ConnectionsFieldTypes.input,
        required: false
      },
      {
        label: "Host",
        key: "host",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Port",
        key: "port",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Token A",
        key: "username",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Token B",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Channel",
        key: "channel",
        type: ConnectionsFieldTypes.input,
        required: true
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        host: data.properties?.host,
        port: data.properties?.port,
        user: data.properties?.user,
        channel: data.properties?.channel
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        username: data.username,
        password: data.password,
        url: `rocketchat://${data.user}@${data.host}:${data.port}/$(username)/$(password)/${data.channel}`,
        properties: {
          host: data.host,
          port: data.port,
          user: data.user,
          channel: data.channel
        }
      };
    }
  },
  {
    title: "Slack",
    forNotification: true,
    icon: "slack",
    value: ConnectionValueType.Slack,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Channel",
        key: "username",
        hint: "Channel to send messages to in Cxxxxxxxxxx format",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Bot Token",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Bot Name",
        key: "fromName",
        type: ConnectionsFieldTypes.input,
        required: false
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        fromName: data.properties?.BotName
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        username: data.username,
        password: data.password,
        url: `slack://$(password)@${data.username}`,
        properties: {
          BotName: data.fromName
        }
      };
    }
  },
  {
    title: "Teams",
    forNotification: true,
    icon: "teams",
    value: ConnectionValueType.Teams,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Group",
        key: "group",
        type: ConnectionsFieldTypes.input,
        required: false
      },
      {
        label: "Tenant",
        key: "tenant",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "AltID",
        key: "altID",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "GroupOwner",
        key: "groupOwner",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Host",
        key: "host",
        type: ConnectionsFieldTypes.input,
        default: "outlook.office.com",
        required: true
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        group: data.properties?.group,
        tenant: data.properties?.tenant,
        altID: data.properties?.altID,
        host: data.properties?.host,
        groupOwner: data.properties?.groupOwner
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        url: `teams://${data.group}@${data.tenant}/${data.altID}/${data.groupOwner}?host=${data.host}`,
        properties: {
          group: data.group,
          tenant: data.tenant,
          altID: data.altID,
          host: data.host,
          groupOwner: data.groupOwner
        }
      };
    }
  },
  {
    title: "Telegram",
    forNotification: true,
    icon: "telegram",
    value: ConnectionValueType.Telegram,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Token",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Chats",
        hitns: "Chat IDs or Channel names (using @channel-name)",
        key: "username",
        type: ConnectionsFieldTypes.input,
        required: true
      }
    ],
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        url: `telegram://$(password)@telegram/?Chats=${data.username}`,
        username: data.username,
        password: data.password
      };
    }
  },
  {
    title: "Zulip Chat",
    forNotification: true,
    icon: "zulip",
    value: ConnectionValueType.ZulipChat,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "BotMail",
        key: "username",
        hint: "Bot e-mail address",
        type: ConnectionsFieldTypes.input,
        required: false
      },
      {
        label: "BotKey",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        required: true
      },
      {
        label: "Host",
        key: "host",
        type: ConnectionsFieldTypes.input,
        required: true
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        host: data.properties?.host
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        username: data.username,
        password: data.password,
        url: `zulip://${data.email}:$(password)@${data.host}/`,
        properties: {
          host: data.host
        }
      };
    }
  },
  {
    title: "Generic Webhook",
    forNotification: true,
    icon: "http",
    value: ConnectionValueType.GenericWebhook,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "URL",
        key: "username",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "ContentType",
        default: "application/json",
        key: "contentType",
        type: ConnectionsFieldTypes.input
      },
      {
        label: "Request Method",
        key: "requestMethod",
        type: ConnectionsFieldTypes.input,
        default: "POST",
        required: true
      },
      {
        label: "Message Key",
        default: "message",
        key: "key",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Title Key",
        default: "title",
        key: "titleKey",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Insecure TLS",
        key: "insecure_tls",
        type: ConnectionsFieldTypes.checkbox
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        contentType: data.properties?.contentType,
        requestMethod: data.properties?.requestMethod,
        key: data.properties?.key,
        titleKey: data.properties?.titleKey
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        username: data.username,
        url: `generic+${data.username}?ContentType=${data.contentType}&MessageKey=${data.key}&TitleKey=${data.titleKey}&RequestMethod=${data.requestMethod}&DisableTLS=${data.insecure_tls}`,
        insecure_tls: data.insecure_tls,
        properties: {
          contentType: data.contentType,
          requestMethod: data.requestMethod,
          message: data.message,
          titleKey: data.titleKey
        }
      };
    }
  },
  {
    title: "Git",
    icon: "git",
    value: ConnectionValueType.Git,
    fields: [
      {
        label: "Name",
        key: "name",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "URL",
        key: "url",
        type: ConnectionsFieldTypes.input,
        required: true
      },
      {
        label: "Username",
        key: "username",
        type: ConnectionsFieldTypes.EnvVarSource,
        variant: variants.large
      },
      {
        label: "Password",
        key: "password",
        type: ConnectionsFieldTypes.EnvVarSource,
        variant: variants.large
      },
      {
        label: "SSH Key",
        key: "certificate",
        type: ConnectionsFieldTypes.EnvVarSource,
        variant: variants.large
      },
      {
        label: "Ref",
        default: "main",
        key: "ref",
        type: ConnectionsFieldTypes.input,
        required: true
      }
    ],
    convertToFormSpecificValue: (data: Record<string, any>) => {
      return {
        ...data,
        ref: data.properties?.ref
      } as Connection;
    },
    preSubmitConverter: (data: Record<string, string>) => {
      return {
        name: data.name,
        url: data.url,
        password: data.password,
        username: data.username,
        certificate: data.certificate,
        properties: {
          ref: data.ref
        }
      };
    }
  }
]
  .sort((v1, v2) => {
    return stringSortHelper(v1.title, v2.title);
  })
  .filter((item) => !item.hide);
