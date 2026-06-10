require('dotenv').config();
const mongoose = require('mongoose');
const Game = require('./Models/Game');

const gamesData = [
  {
    name: 'Snake & Chase',
    key: 'snake',
    rewardPoints: 100,
    requiredDays: 3,
    requiredPlaysPerDay: 5,
    rewardRepeatable: true,
    repeatRewardPoints: 50,
    dailyPlayLimit: 20,
    status: true
  },
  {
    name: 'Brain Teaser Quiz',
    key: 'quiz',
    rewardPoints: 100,
    requiredDays: 3,
    requiredPlaysPerDay: 5,
    rewardRepeatable: true,
    repeatRewardPoints: 50,
    dailyPlayLimit: 20,
    status: true
  },
  {
    name: 'Speed Tap Challenge',
    key: 'speedTap',
    rewardPoints: 100,
    requiredDays: 3,
    requiredPlaysPerDay: 5,
    rewardRepeatable: true,
    repeatRewardPoints: 50,
    dailyPlayLimit: 20,
    status: true
  },
  {
    name: 'Tic Tac Toe',
    key: 'ticTacToe',
    rewardPoints: 100,
    requiredDays: 3,
    requiredPlaysPerDay: 5,
    rewardRepeatable: true,
    repeatRewardPoints: 50,
    dailyPlayLimit: 20,
    status: true
  }
];

async function seedGames() {
  try {
    const mongoUri = process.env.MONGODB_URL || 'mongodb://localhost:27017/mynzo';
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected!');

    for (const data of gamesData) {
      const exists = await Game.findOne({ key: data.key });
      if (exists) {
        console.log(`Game with key "${data.key}" already exists, skipping...`);
      } else {
        await Game.create(data);
        console.log(`Seeded game: ${data.name}`);
      }
    }
    console.log('Finished seeding games!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding games:', err);
    process.exit(1);
  }
}

seedGames();
