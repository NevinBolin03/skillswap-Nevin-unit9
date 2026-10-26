
const {
  filterSkillsByCategory,
  calculateTotalCosts,
  matchSkillsToUser
} = require('../skillswap-functions');

const skills = [
  { title: 'Python Tutoring', category: 'Programming', price: 20 },
  { title: 'Guitar Lessons', category: 'Music', price: 15 },
  { title: 'Resume Review', category: 'Career', price: 0 },
  { title: 'Web Development', category: 'Programming', price: 25 }
];

describe('filterSkillsByCategory', () => {

  test('filters skills by category', () => {
    const result = filterSkillsByCategory(skills, 'Programming');

    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('Python Tutoring');
    expect(result[1].title).toBe('Web Development');
  });

  test('returns all skills when category is All', () => {
    expect(filterSkillsByCategory(skills, 'All')).toEqual(skills);
  });

  test('returns an empty array when no skills match', () => {
    expect(filterSkillsByCategory(skills, 'Cooking')).toEqual([]);
  });

});

describe('calculateTotalCosts', () => {

  test('calculates the total price of skills', () => {
    expect(calculateTotalCosts(skills)).toBe(60);
  });

  test('returns zero for an empty array', () => {
    expect(calculateTotalCosts([])).toBe(0);
  });

  test('handles free skills', () => {
    expect(calculateTotalCosts([
      { title: 'Resume Review', price: 0 }
    ])).toBe(0);
  });

});

describe('matchSkillsToUser', () => {

  test('matches skills based on user interests', () => {
    const result = matchSkillsToUser(skills, ['Programming']);

    expect(result).toHaveLength(2);
  });

  test('matches multiple interests', () => {
    const result = matchSkillsToUser(
      skills,
      ['Programming', 'Music']
    );

    expect(result).toHaveLength(3);
  });

  test('returns empty array when no interests match', () => {
    expect(matchSkillsToUser(skills, ['Cooking'])).toEqual([]);
  });

});
