import { MidwayConfig } from '@midwayjs/core';
import { UserEntity } from '../entity/user.entity';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1658242720839_4230',
  koa: {
    port: 7001,
  },
  orm: {
    type: 'mysql',
    host: '101.132.79.222',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'testdb',
    synchronize: false,
    logging: false,
    entities: [UserEntity],
    migrations: [],
    subscribers: [],
  },
} as MidwayConfig;
