import { OSS_CONFIG, DB_CONFIG } from '../../.evn.prd';
import { OSS_DEV_CONFIG, DB_DEV_CONFIG } from '../../.evn';

export const ossConfig =
  process.env.NODE_ENV === 'dev' ? OSS_DEV_CONFIG : OSS_CONFIG;

export const dbConfig =
  process.env.NODE_ENV === 'dev' ? DB_DEV_CONFIG : DB_CONFIG;
