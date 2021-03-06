import { commonEnv } from './environment.common';

const env: Partial<typeof commonEnv> = {
  production: true,
  logRequest: false,
  host: 'https://portal.spmed.kr',
  gateway: 'https://gwapi.spmed.kr/api-gateway/v1.0',
};

export const environment = { ...commonEnv, ...env };
