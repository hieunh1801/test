// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  version: '1.0',
  host: 'http://localhost:61126',
  gateway: 'http://localhost:61100/api-gateway/v1.0',
  // gateway: 'https://gwapi.spmed.kr/api-gateway/v1.0',
  logRequest: true, // log request and response config

  production: false,
};
