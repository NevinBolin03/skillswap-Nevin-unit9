document.addEventListener('DOMContentLoaded', () => {

  const filterButtons = document.querySelectorAll(
    '.filter-buttons button'
  );

  const skillsContainer = document.querySelector('#skills-container');

  let skills = [];
  let selectedCategory = 'All';

  // Display skills on the website
  function displaySkills(skillsToDisplay) {
    if (!skillsContainer) {
      console.error('Skills container not found');
      return;
    }

    skillsContainer.innerHTML = '';

    skillsToDisplay.forEach(skill => {
      const card = document.createElement('div');
      card.classList.add('skill-card');
      card.dataset.category = skill.category;

      const title = document.createElement('h3');
      title.textContent = skill.title;

      const description = document.createElement('p');
      description.textContent = skill.description;

      const category = document.createElement('p');
      category.textContent = `Category: ${skill.category}`;

      const price = document.createElement('p');
      price.textContent = `Price: $${skill.price}`;

      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(category);
      card.appendChild(price);

      skillsContainer.appendChild(card);
    });
  }

  // Filter skills by category
  function applyFilter() {
    const filteredSkills = filterSkillsByCategory(
      skills,
      selectedCategory
    );

    displaySkills(filteredSkills);
  }

  // Load skills from backend database
  async function loadSkills() {
    if (skillsContainer) {
      skillsContainer.textContent = 'Loading skills...';
    }

    try {
      skills = await window.apiService.fetchSkills();
      applyFilter();

      console.log('Skills loaded from database:', skills);

    } catch (error) {
      console.error('Error loading skills:', error);

      if (skillsContainer) {
        skillsContainer.textContent =
          'Unable to load skills. Make sure the backend is running.';
      }
    }
  }

  // Filter button events
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      selectedCategory = button.dataset.category;

      filterButtons.forEach(btn => {
        btn.classList.remove('active');
      });

      button.classList.add('active');

      applyFilter();
    });
  });

  // Handle the Add Skill form
  const addSkillForm = document.querySelector('#add-skill-form');
  const formMessage = document.querySelector('#form-message');

  if (addSkillForm) {
    addSkillForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const submitButton = addSkillForm.querySelector(
        'button[type="submit"]'
      );

      const skillData = {
        title: document.querySelector('#skill-title').value.trim(),
        category: document.querySelector('#skill-category').value,
        price: Number(document.querySelector('#skill-price').value),
        description: document.querySelector('#skill-description').value.trim(),
        provider: document.querySelector('#skill-provider').value.trim()
      };

      submitButton.disabled = true;
      formMessage.textContent = 'Saving skill...';

      try {
        await window.apiService.createSkill(skillData);

        formMessage.textContent = 'Skill added successfully!';
        addSkillForm.reset();

        // Reload skills from the database
        selectedCategory = 'All';

        filterButtons.forEach(button => {
          button.classList.toggle(
            'active',
            button.dataset.category === 'All'
          );
        });

        await loadSkills();

      } catch (error) {
        console.error('Error creating skill:', error);
        formMessage.textContent =
          'Unable to save skill. Make sure the backend is running.';
      } finally {
        submitButton.disabled = false;
      }
    });
  }

  // Load database skills when page opens
  loadSkills();

});