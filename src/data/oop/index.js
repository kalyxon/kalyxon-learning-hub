import { cppBasicsTutorial } from './basics';
import { cppOopTutorial } from './oop';
import { cppStringsTutorial } from './strings';

export const cppTutorials = [
  cppBasicsTutorial,
  cppOopTutorial,
  cppStringsTutorial
];

console.log(`📚 C++ tutorials loaded: ${cppTutorials.length}`);
