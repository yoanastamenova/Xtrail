import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const email = process.argv[2];

if (!email) {
  console.error('Usage: npm run make-admin <email>');
  process.exit(1);
}

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [],
  synchronize: false,
});

async function makeAdmin() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected...');

    const result: { email: string; role: string }[] = await AppDataSource.query(
      `UPDATE "user" SET role = 'admin' WHERE email = $1 RETURNING email, role`,
      [email],
    );

    if (result.length === 0) {
      console.error(`User with email "${email}" not found.`);
      process.exit(1);
    }

    console.log(`User "${email}" is now an admin.`);

    await AppDataSource.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

makeAdmin();
