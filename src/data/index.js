import { dsaTutorials } from './dsa';
import { cppTutorials } from './cpp';

// Combine all tutorials
export const tutorialData = [
  ...dsaTutorials,
  ...cppTutorials
];

// Log to verify
console.log('📚 Total tutorials loaded:', tutorialData.length);
console.log('📊 Categories:', [...new Set(tutorialData.map(t => t.category))]);

// You can also export categories separately if needed
export const getCategories = () => {
  const categories = {};
  tutorialData.forEach(tutorial => {
    if (!categories[tutorial.category]) {
      categories[tutorial.category] = {
        name: tutorial.category,
        count: 0
      };
    }
    categories[tutorial.category].count++;
  });
  return categories;
};
