declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: string;

    POSTGRES_TYPE?: string;
    POSTGRES_HOST?: string;
    POSTGRES_PORT?: string;
    POSTGRES_NAME?: string;

    POSTGRES_USER?: string;
    POSTGRES_PASSWORD?: string;

    GOOGLE_STORAGE_PROJECT_ID?: string;
    GOOGLE_STORAGE_PRIVATE_KEY?: string;
    GOOGLE_STORAGE_CLIENT_EMAIL?: string;
    GOOGLE_STORAGE_MEDIA_BUCKET?: string;

    SENDGRID_API_KEY?: string;
    SESSION_SECRET?: string;

    JWT_VERIFICATION_TOKEN_SECRET?: string;
    JWT_VERIFICATION_TOKEN_EXPIRATION_TIME?: string;
    JWT_RESET_TOKEN_SECRET?: string;
    EMAIL_CONFIRMATION_URL?: string;

    TWO_FACTOR_AUTHENTICATION_APP_NAME?: string;

    NODE_ENV?: string;

    SSL_CRT_FILE?: string;
    SSL_KEY_FILE?: string;

  }
}
