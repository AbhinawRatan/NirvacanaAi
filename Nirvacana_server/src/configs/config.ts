import dotenv from "dotenv";
dotenv.config();

interface Config {
  // Common
  API_ENDPOINT_URL: string;
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX_INTERVAL: number;
  RPC_URL_MAINNET: string;
  RPC_URL_DEVNET: string;
  TESTING_KEYPAIR: string;

  // Environment specific
  SOLANA_CLUSTER: string;
}

const commonConfig = {
  // Server endpoint url root
  API_ENDPOINT_URL: "/api/v1",

  //  User rate limiting
  RATE_LIMIT_WINDOW_MS: 5,
  RATE_LIMIT_MAX_INTERVAL: 1000,

  // RPC
  RPC_URL_MAINNET:
    "https://mainnet.helius-rpc.com/?api-key=5665e21a-8c75-43f7-b94e-aad5cea2390d",
  RPC_URL_DEVNET:
    "https://devnet.helius-rpc.com/?api-key=5665e21a-8c75-43f7-b94e-aad5cea2390d",
  // Keypairs
  TESTING_KEYPAIR: "projects/210718779637/secrets/testing-keypair/versions/1",
};

let config: Config;

if (process.env.ENVIRONMENT === "development") {
  // PROD Config
  config = {
    ...commonConfig,
    SOLANA_CLUSTER: "devnet",
  };
} else {
  // Final Testing Config
  config = {
    ...commonConfig,
    SOLANA_CLUSTER: "mainnet",
  };
}

export default config;
