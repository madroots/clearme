import { clearAllSites, NothingSelectedError } from './lib/clean.js';
import { DEFAULT_SETTINGS, loadSettings, saveSettings } from './lib/settings.js';

const LABELS = {
  cookies: 'cookies',
  cache: 'cache',
  cacheStorage: 'cache storage',
  indexedDB: 'IndexedDB',
  localStorage: 'local storage',
  serviceWorkers: 'service workers',
  fileSystems: 'file system data',
};

const inputs = [...document.querySelectorAll('input[data-key]')];
const savedEl = document.getElementById('saved');
const statusEl = document.getElementById('clear-all-status');
const clearAllButton = document.getElementById('clear-all');
const resetButton = document.getElementById('reset');

let savedTimer;
let statusTimer;

function currentSettings() {
  const settings = { ...DEFAULT_SETTINGS };
  for (const input of inputs) {
    settings[input.dataset.key] = input.checked;
  }
  return settings;
}

function render(settings) {
  for (const input of inputs) {
    input.checked = settings[input.dataset.key] === true;
  }
}

function flashSaved() {
  savedEl.textContent = 'Saved';
  savedEl.classList.add('visible');
  clearTimeout(savedTimer);
  savedTimer = setTimeout(() => savedEl.classList.remove('visible'), 1400);
}

function setStatus(message, tone = '') {
  statusEl.textContent = message;
  statusEl.className = `feedback${tone ? ` ${tone}` : ''}`;
  clearTimeout(statusTimer);
  if (tone === 'ok') {
    statusTimer = setTimeout(() => setStatus(''), 6000);
  }
}

function selectedLabels(settings) {
  return Object.keys(LABELS)
    .filter((key) => settings[key] === true)
    .map((key) => LABELS[key]);
}

const listFormat = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});

for (const input of inputs) {
  input.addEventListener('change', async () => {
    try {
      await saveSettings(currentSettings());
      flashSaved();
    } catch (error) {
      console.error('ClearMe: could not save settings', error);
      setStatus('Could not save settings. Try reloading this page.', 'error');
    }
  });
}

resetButton.addEventListener('click', async () => {
  try {
    const settings = await saveSettings(DEFAULT_SETTINGS);
    render(settings);
    flashSaved();
    setStatus('');
  } catch (error) {
    console.error('ClearMe: could not reset settings', error);
    setStatus('Could not reset settings.', 'error');
  }
});

clearAllButton.addEventListener('click', async () => {
  const settings = currentSettings();
  const labels = selectedLabels(settings);
  if (labels.length === 0) {
    setStatus('Select at least one thing to clear first.', 'error');
    return;
  }

  const confirmed = window.confirm(
    `Clear ${listFormat.format(labels)} for all websites?\n\nThis cannot be undone.`,
  );
  if (!confirmed) return;

  clearAllButton.disabled = true;
  setStatus('Clearing…');
  try {
    await clearAllSites(settings);
    setStatus(`Cleared ${listFormat.format(labels)} for all sites.`, 'ok');
  } catch (error) {
    if (error instanceof NothingSelectedError) {
      setStatus('Select at least one thing to clear first.', 'error');
    } else {
      console.error('ClearMe: could not clear all sites', error);
      setStatus('Could not clear all sites. Try again.', 'error');
    }
  } finally {
    clearAllButton.disabled = false;
  }
});

render(await loadSettings());
