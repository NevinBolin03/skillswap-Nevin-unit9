
function filterSkillsByCategory(skills, category) {
  if (category === 'All') {
    return skills;
  }

  return skills.filter(skill => skill.category === category);
}

// Calculate the total cost of selected skills
function calculateTotalCosts(skills) {
  return skills.reduce((total, skill) => {
    return total + Number(skill.price);
  }, 0);
}

// Find skills that match a user's interests
function matchSkillsToUser(skills, interests) {
  return skills.filter(skill => {
    return interests.includes(skill.category);
  });
}

// Export functions for Jest testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    filterSkillsByCategory,
    calculateTotalCosts,
    matchSkillsToUser
  };
}
