import { Achievements } from 'src/achievements/entities/achievements.entity';
import { DataSource } from 'typeorm';

export async function seedAchievements(dataSource: DataSource): Promise<void> {
  const achievementsRepository = dataSource.getRepository(Achievements);

  // Clear existing data if any
  const existingAchievements = await achievementsRepository.count();
  if (existingAchievements > 0) {
    console.log('===== Clearing existing achievements data...=====');
    await achievementsRepository.clear();

    // Reset the auto-increment sequence to start from 1
    await dataSource.query(
      `ALTER SEQUENCE achievements_id_seq RESTART WITH 1;`,
    );
    console.log('===== Cleared successfully! =====');
  }

  //Inject Achievements data
  const achievements = [
    {
      id: 1,
      name: 'First steps',
      description: 'Completed your first run',
      icon: '1st',
    },
    {
      id: 2,
      name: '5 times Club',
      description: 'Completed 5 runs',
      icon: '2st',
    },
    {
      id: 3,
      name: '10 out of 10',
      description: 'Completed 10 runs',
      icon: '3st',
    },
    {
      id: 4,
      name: '25 wins',
      description: 'Completed 25 runs',
      icon: '4st',
    },
    {
      id: 5,
      name: '50 wins',
      description: 'Completed 50 runs',
      icon: '5th',
    },
    {
      id: 6,
      name: '10K Club',
      description: 'Completed 10K in one run',
      icon: '6th',
    },
    {
      id: 7,
      name: '100KM Distance',
      description: 'Completed 100KM total distance',
      icon: '7th',
    },
  ];

  await achievementsRepository.save(achievements);

  console.log(`Successfully added ${achievements.length} achievements!`);
}
