export interface ServerConfig {
  port: number;
  cors: CorsConfig;
}

export interface CorsConfig {
  origin: string;
  credentials: boolean;
  // todo: add more options
}
