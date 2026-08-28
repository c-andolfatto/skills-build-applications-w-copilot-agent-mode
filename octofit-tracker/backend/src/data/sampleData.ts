export const sampleUsers = [
  {
    id: 'u1',
    name: 'Ava Nguyen',
    email: 'ava.nguyen@mergington.edu',
    fitnessLevel: 'Intermediate',
    goal: 'Improve 5K time',
    favoriteActivity: 'Running',
  },
  {
    id: 'u2',
    name: 'Malik Johnson',
    email: 'malik.johnson@mergington.edu',
    fitnessLevel: 'Beginner',
    goal: 'Build a weekly workout habit',
    favoriteActivity: 'Walking',
  },
  {
    id: 'u3',
    name: 'Sofia Rivera',
    email: 'sofia.rivera@mergington.edu',
    fitnessLevel: 'Advanced',
    goal: 'Increase upper-body strength',
    favoriteActivity: 'Strength Training',
  },
];

export const sampleTeams = [
  {
    id: 't1',
    name: 'Cardio Crew',
    description: 'Students focused on steps, jogs, and endurance.',
    challenge: 'September Step-Up',
    memberEmails: ['ava.nguyen@mergington.edu', 'malik.johnson@mergington.edu'],
  },
  {
    id: 't2',
    name: 'Power Pods',
    description: 'Small-group strength and conditioning goals.',
    challenge: 'Bodyweight Blast',
    memberEmails: ['sofia.rivera@mergington.edu'],
  },
];

export const sampleActivities = [
  {
    id: 'a1',
    userEmail: 'ava.nguyen@mergington.edu',
    type: 'Running',
    durationMinutes: 35,
    caloriesBurned: 320,
    loggedAt: '2026-08-27T14:30:00.000Z',
  },
  {
    id: 'a2',
    userEmail: 'malik.johnson@mergington.edu',
    type: 'Walking',
    durationMinutes: 42,
    caloriesBurned: 210,
    loggedAt: '2026-08-27T16:00:00.000Z',
  },
  {
    id: 'a3',
    userEmail: 'sofia.rivera@mergington.edu',
    type: 'Strength Training',
    durationMinutes: 50,
    caloriesBurned: 390,
    loggedAt: '2026-08-28T07:15:00.000Z',
  },
];

export const sampleWorkouts = [
  {
    id: 'w1',
    title: 'Lunch Break Power Walk',
    difficulty: 'Beginner',
    focus: 'Cardio',
    durationMinutes: 20,
    description: 'A brisk walk with short pace pickups every five minutes.',
  },
  {
    id: 'w2',
    title: 'Track Tune-Up',
    difficulty: 'Intermediate',
    focus: 'Speed',
    durationMinutes: 30,
    description: 'Warm up, then rotate through four quick interval sets.',
  },
  {
    id: 'w3',
    title: 'Strength Circuit',
    difficulty: 'Advanced',
    focus: 'Strength',
    durationMinutes: 40,
    description: 'Three rounds of squats, push-ups, lunges, and planks.',
  },
];

export const sampleLeaderboard = [
  {
    id: 'l1',
    userEmail: 'ava.nguyen@mergington.edu',
    teamName: 'Cardio Crew',
    points: 1280,
    streakDays: 12,
    rank: 1,
  },
  {
    id: 'l2',
    userEmail: 'sofia.rivera@mergington.edu',
    teamName: 'Power Pods',
    points: 1175,
    streakDays: 10,
    rank: 2,
  },
  {
    id: 'l3',
    userEmail: 'malik.johnson@mergington.edu',
    teamName: 'Cardio Crew',
    points: 940,
    streakDays: 7,
    rank: 3,
  },
];
