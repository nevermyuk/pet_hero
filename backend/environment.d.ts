declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: string;

    POSTGRES_HOST?: string;
    POSTGRES_PORT?: string;
    POSTGRES_USER?: string;
    POSTGRES_PASSWORD?: string;
    POSTGRES_NAME?: string;
    POSTGRES_TYPE?: string;

    GOOGLE_STORAGE_PROJECT_ID?: string;
    GOOGLE_STORAGE_PRIVATE_KEY?: string;
    GOOGLE_STORAGE_CLIENT_EMAIL?: string;
    GOOGLE_STORAGE_MEDIA_BUCKET?: string;

    SENDGRID_API_KEY?: string;

    JWT_VERIFICATION_TOKEN_SECRET?: string;
    JWT_VERIFICATION_TOKEN_EXPIRATION_TIME?: string;
    EMAIL_CONFIRMATION_URL?: string;

    TWO_FACTOR_AUTHENTICATION_APP_NAME?: string;

  }
}
