import { config } from 'dotenv';
import { Achievements } from 'src/achievements/entities/achievements.entity';
import { DataSource } from 'typeorm';
import { seedAchievements } from './seeds/achievements.seed';

config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Achievements],
  synchronize: false,
});

async function runSeed() {
  try {
    console.log('-- Starting database seed...');

    //Connection to db
    await AppDataSource.initialize();
    console.log('-- Database connection established...');

    console.log('-- Creating tables...');
    await AppDataSource.synchronize();
    console.log('-- Tables created successfully...');

    await seedAchievements(AppDataSource);

    await AppDataSource.destroy();
    console.log('-- Seeding compleated successfully ...');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

runSeed();
