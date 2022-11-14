import { DataSourceOptions } from 'typeorm';

type configProps = DataSourceOptions & {
  autoLoadEntities: boolean;
};

export const config: configProps = {
  database: './db.sql',
  type: 'sqlite',
  synchronize: true,
  entities: ['dist/**/*.module.{js,ts}'],
  autoLoadEntities: true,
};
