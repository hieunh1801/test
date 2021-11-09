// run with --configuration staging

import { commonEnv } from './environment.common';

const env: Partial<typeof commonEnv> = {
  host: 'http://localhost:61126',
  gateway: 'https://gwapi.spmed.kr/api-gateway/v1.0',
};

export const environment = { ...commonEnv, ...env };
