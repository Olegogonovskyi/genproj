import * as path from 'node:path';
import * as dotenv from 'dotenv';
dotenv.config({
  path: path.resolve(process.cwd(), 'environments', 'local.env'),
});
import { DataSource } from 'typeorm';
import getter from './src/config/configuration';

const databaseConfig = getter().postgres;


export default new DataSource({
  type: 'postgres',
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.user,
  password: String(databaseConfig.password),
  database: databaseConfig.dbName,
  entities: [
    path.join(process.cwd(), 'src', 'database', 'entities', '*.entity.ts'),
  ],
  migrations: [
    path.join(process.cwd(), 'src', 'database', 'migrations', '*.ts'),
  ],
  synchronize: false,
  logging: true,
});
