import { MidwayConfig } from '@midwayjs/core';
import { UserEntity } from '../entity/user.entity';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1658242720839_4230',
  koa: {
    port: 7001,
  },
  orm: {
    type: 'postgres',
    host: '124.223.64.166',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'testdb',
    synchronize: true,
    logging: false,
    entities: [UserEntity],
    migrations: [],
    subscribers: [],
  },
  app: {
    jwt: {
      prefix: '/api', // 指定已/api开头的接口地址需要拦截
      ignore: ['/api/user/login'], // 指定该接口地址，不需要拦截
    },
  },
  jwt: {
    secret: 'gsafety', // fs.readFileSync('xxxxx.key')
    expiresIn: '2d', // https://github.com/vercel/ms
  },
} as MidwayConfig;
