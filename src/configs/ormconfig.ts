export const config = {
  database: './db.sql',
  type: 'sqlite',
  synchronize: true,
  entities: ['dist/**/*.module.{js,ts}'],
  autoLoadEntities: true,
};
