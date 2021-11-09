// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
import { commonEnv } from './environment.common';

const env: Partial<typeof commonEnv> = {
  host: 'http://localhost:61126',
  gateway: 'http://localhost:61100/api-gateway/v1.0',
};

export const environment = { ...commonEnv, ...env };
