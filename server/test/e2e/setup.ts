import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { GenericContainer } from 'testcontainers';
export default async () => {
  process.env.NODE_ENV = 'development';
  process.env.TYPESENSE_ENABLED = 'false';

  const pg = await new PostgreSqlContainer('postgres')
    .withExposedPorts(5432)
    .withDatabase('immich')
    .withUsername('postgres')
    .withPassword('postgres')
    .withReuse()
    .start();

  process.env.DB_URL = pg.getConnectionUri();

  const redis = await new GenericContainer('redis').withExposedPorts(6379).withReuse().start();

  process.env.REDIS_PORT = String(redis.getMappedPort(6379));
  process.env.REDIS_HOSTNAME = redis.getHost();
};
