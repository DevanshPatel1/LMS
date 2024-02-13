import { Environment } from '@delon/theme';

export const environment = {
  production: true,
  api: {
    baseUrl: 'http://localhost:4200/',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  }
} as Environment;
