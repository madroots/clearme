export const DEFAULT_SETTINGS = Object.freeze({
  cookies: true,
  cache: true,
  cacheStorage: true,
  indexedDB: true,
  localStorage: true,
  serviceWorkers: true,
  fileSystems: false,
  reload: true,
});

const KEYS = Object.keys(DEFAULT_SETTINGS);

export function normalizeSettings(settings) {
  const normalized = {};
  for (const key of KEYS) {
    normalized[key] = typeof settings?.[key] === 'boolean' ? settings[key] : DEFAULT_SETTINGS[key];
  }
  return normalized;
}

export async function loadSettings() {
  const stored = await chrome.storage.sync.get('settings');
  return normalizeSettings(stored.settings);
}

export async function saveSettings(settings) {
  const normalized = normalizeSettings(settings);
  await chrome.storage.sync.set({ settings: normalized });
  return normalized;
}
