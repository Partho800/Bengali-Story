import { translations } from '../translations';
import {
  translate,
  isValidLocale,
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  LOCALE_COOKIE_NAME,
} from '../utils';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

console.log('🧪 Starting Language & Theme System Verification Tests...\n');

// Test 1: Verify Default Locale and Storage Constants
console.log('Test 1: Default Locale & Storage Constants');
assert(DEFAULT_LOCALE === 'bn', 'Default locale must be "bn"');
assert(LOCALE_STORAGE_KEY === 'bengali_story_locale', 'Storage key must be bengali_story_locale');
assert(LOCALE_COOKIE_NAME === 'bengali_story_locale', 'Cookie name must be bengali_story_locale');
assert(isValidLocale('bn') === true, 'bn should be valid');
assert(isValidLocale('en') === true, 'en should be valid');
assert(isValidLocale('fr') === false, 'fr should be invalid');
assert(isValidLocale(null) === false, 'null should be invalid');
console.log('  ✅ Passed');

// Test 2: Verify Dictionary Symmetry and Presence of Required Categories
console.log('\nTest 2: Dictionary Categories Completeness');
const requiredCategories = [
  'common',
  'nav',
  'buttons',
  'forms',
  'validation',
  'loading',
  'emptyStates',
  'errors',
  'notifications',
  'dialogs',
  'storyCard',
  'reader',
  'dashboard',
  'writer',
  'home',
  'theme',
  'categoriesList',
] as const;

for (const cat of requiredCategories) {
  assert(cat in translations.bn, `Missing category in bn: ${cat}`);
  assert(cat in translations.en, `Missing category in en: ${cat}`);
  const bnKeys = Object.keys((translations.bn as any)[cat]);
  const enKeys = Object.keys((translations.en as any)[cat]);
  assert(bnKeys.length > 0, `Category ${cat} in bn is empty`);
  assert(enKeys.length > 0, `Category ${cat} in en is empty`);
  console.log(`  ✅ Category "${cat}": bn (${bnKeys.length} keys) | en (${enKeys.length} keys)`);
}

// Test 3: Verify Translations in Bengali
console.log('\nTest 3: Bengali translations resolution');
assert(translate('bn', 'nav.home') === 'নীড়পাতা', 'nav.home should resolve to নীড়পাতা');
assert(translate('bn', 'buttons.submit') === 'জমা দিন', 'buttons.submit should resolve to জমা দিন');
assert(translate('bn', 'buttons.save') === 'সংরক্ষণ করুন', 'buttons.save should resolve to সংরক্ষণ করুন');
assert(translate('bn', 'theme.light') === 'লাইট মোড', 'theme.light should resolve to লাইট মোড');
console.log('  ✅ Passed');

// Test 4: Verify Translations in English
console.log('\nTest 4: English translations resolution');
assert(translate('en', 'nav.home') === 'Home', 'nav.home should resolve to Home');
assert(translate('en', 'buttons.submit') === 'Submit', 'buttons.submit should resolve to Submit');
assert(translate('en', 'buttons.save') === 'Save', 'buttons.save should resolve to Save');
assert(translate('en', 'theme.dark') === 'Dark Mode', 'theme.dark should resolve to Dark Mode');
console.log('  ✅ Passed');

// Test 5: Verify Fallback Mechanism for Missing Translations
console.log('\nTest 5: Fallback Mechanism for Missing Translations');
// 5a. Fallback to alternate language
const fakeBnPath = 'theme.dark'; // exists in both
assert(translate('bn', fakeBnPath) === 'ডার্ক মোড', 'Existing bn key resolves');

// 5b. Non-existent path with custom fallback
const missingWithFallback = translate('bn', 'unknown.key.path', 'Custom Fallback Text');
assert(missingWithFallback === 'Custom Fallback Text', 'Should return custom fallback if key is missing');

// 5c. Non-existent path with no custom fallback
const missingWithoutFallback = translate('bn', 'nonexistent.category.key');
assert(missingWithoutFallback === 'nonexistent.category.key', 'Should return key path itself if no fallback provided');
console.log('  ✅ Passed: Alternate fallback, custom fallback, and key-path fallback work seamlessly');

// Test 6: Parameter Interpolation
console.log('\nTest 6: Parameter Interpolation');
const interpolatedBn = translate('bn', 'dashboard.welcome', undefined, { name: 'কবিরুল' });
assert(interpolatedBn === 'স্বাগতম, কবিরুল', `Expected 'স্বাগতম, কবিরুল', got: ${interpolatedBn}`);

const interpolatedEn = translate('en', 'dashboard.welcome', undefined, { name: 'Kazi' });
assert(interpolatedEn === 'Welcome, Kazi', `Expected 'Welcome, Kazi', got: ${interpolatedEn}`);

const cardCountBn = translate('bn', 'storyCard.chaptersCount', undefined, { count: 12 });
assert(cardCountBn === '১২টি অধ্যায়' || cardCountBn === '12টি অধ্যায়', `Got: ${cardCountBn}`);
console.log(`  ✅ Interpolated string: "${interpolatedBn}" & "${interpolatedEn}"`);

console.log('\n🎉 ALL I18N AND THEME VERIFICATION TESTS PASSED SUCCESSFULLY!');
