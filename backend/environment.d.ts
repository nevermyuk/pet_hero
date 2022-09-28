declare namespace NodeJS {
  export interface ProcessEnv {
    PG_DB_HOST?: string;
    PG_DB_PORT?: string;
    PG_DB_USER?: string;
    PG_DB_PASS?: string;
    PG_DB_NAME?: string;
    PG_DB_TYPE?: string;
    PORT?: string;
    ENVIRONMENT: Environment;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
    GOOGLE_CALLBACK_URL?: string;
    GOOGLE_STORAGE_PROJECT_ID?: string;
    GOOGLE_STORAGE_PRIVATE_KEY: string;
    GOOGLE_STORAGE_CLIENT_EMAIL: string;
    GOOGLE_STORAGE_MEDIA_BUCKET: string;
  }
  export type Environment = 'DEVELOPMENT' | 'PRODUCTION';
}
