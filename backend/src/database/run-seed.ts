import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

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

const achievements = [
  { name: 'First steps', description: 'Completed your first run', icon: '1st' },
  { name: '5 times Club', description: 'Completed 5 runs', icon: '2nd' },
  { name: '10 out of 10', description: 'Completed 10 runs', icon: '3rd' },
  { name: '25 wins', description: 'Completed 25 runs', icon: '4th' },
  { name: '50 wins', description: 'Completed 50 runs', icon: '5th' },
  { name: '10K Club', description: 'Completed 10K in one run', icon: '6th' },
  { name: '100KM Distance', description: 'Completed 100KM total distance', icon: '7th' },
];

async function runSeed() {
  try {
    console.log('-- Starting database seed...');

    await AppDataSource.initialize();
    console.log('-- Database connection established...');

    // Clear existing achievements
    await AppDataSource.query(`TRUNCATE TABLE "achievements" RESTART IDENTITY CASCADE`);
    console.log('-- Cleared existing achievements...');

    // Insert achievements
    for (const achievement of achievements) {
      await AppDataSource.query(
        `INSERT INTO "achievements" (name, description, icon) VALUES ($1, $2, $3)`,
        [achievement.name, achievement.description, achievement.icon],
      );
    }

    console.log(`-- Successfully added ${achievements.length} achievements!`);

    await AppDataSource.destroy();
    console.log('-- Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

runSeed();
