
const config = {
  port: process.env.BS_PORT || 3005,
  log_level: process.env.BS_LOG_CONSOLE_LEVEL || 'info',
  enable_graphiql: process.env.BS_ENABLE_GRAPHQL_INTERFACE === 'true' || false,

  backstage_base_url: process.env.BS_BASE_URL || 'http://localhost:8000',
  use_influxdb: process.env.BS_USE_INFLUXDB === 'true' || false,

  postgres_backstage_port: process.env.BS_POSTGRES_PORT || 5432,
  postgres_backstage_host: process.env.BS_POSTGRES_HOST || 'postgres',
  postgres_backstage_user: process.env.BS_POSTGRES_USER || 'postgres',
  postgres_backstage_pwd: process.env.BS_POSTGRES_PASSWORD || 'postgres',
  postgres_backstage_database: process.env.BS_POSTGRES_DATABASE || 'dojot_dash_users',

  keycloak_internal_url: process.env.BS_KEYCLOAK_INTERNAL_URL || 'http://apigw:8000/auth',
  keycloak_external_url: process.env.BS_KEYCLOAK_EXTERNAL_URL || 'http://localhost:8000/auth',
  keycloak_code_challenge_method: process.env.BS_KEYCLOAK_CODE_CHALLENGE_METHOD || 'S256',
  keycloak_client_id: process.env.BS_KEYCLOAK_CLIENT_ID || 'gui',

  session_domain: process.env.BS_SESSION_DOMAIN || 'localhost',
  session_secret: process.env.BS_SESSION_SECRET || 'secret',
  session_proxy: process.env.BS_SESSION_PROXY === 'true' || true,
  session_cookie_name: process.env.BS_SESSION_COOKIE_NAME || 'dojot-backstage-cookie',
  session_cookie_path: process.env.BS_SESSION_COOKIE_PATH || '/',
  session_cookie_https: process.env.BS_SESSION_COOKIE_HTTPS === 'true' || false,
  session_cookie_max_age: process.env.BS_SESSION_COOKIE_MAX_AGE || 1800000, // 30m in milliseconds
  session_redis_prefix: process.env.BS_SESSION_REDIS_PREFIX || 'session:',

  redis_host: process.env.BS_REDIS_HOST || 'redis://backstage-redis',
  redis_port: process.env.BS_REDIS_PORT || 6379,
  redis_ttl: process.env.BS_REDIS_TTL || 86400, // 1 Day in seconds

  x509_url: process.env.BS_X509_URL || 'http://x509-identity-mgmt:3000',
  influxdb_retriever_url: process.env.BS_RETRIEVER_URL || 'http://influxdb-retriever:4000',
  file_management_url: process.env.BS_FILE_MANAGEMENT_URL || 'http://file-mgmt:7000',
  device_manager_url: process.env.BS_DEVICE_MANAGER_URL || 'http://device-manager-sidecar:5000',
  report_manager_url: process.env.BS_REPORT_MANAGER_URL || 'http://report-manager:3791',
  device_manager_batch_url: process.env.BS_DEVICE_MANAGER_URL || 'http://device-manager-batch:8089',
  x509_identity_mgmt: process.env.BS_X509_IDENTITY_MGMT || 'http://x509-identity-mgmt:3000/api',
  flows_url: process.env.BS_FLOWS_URL || 'http://flowbroker:80',
  history_url: process.env.BS_HISTORY_URL || 'http://history:8000',
};

export default config;
