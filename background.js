import { clearTab } from './lib/action.js';
import { normalizeSettings } from './lib/settings.js';

chrome.action.onClicked.addListener((tab) => {
  void clearTab(tab);
});

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  const { settings } = await chrome.storage.sync.get('settings');
  if (!settings) {
    await chrome.storage.sync.set({ settings: normalizeSettings({}) });
  }
  if (reason === 'install') {
    await chrome.runtime.openOptionsPage();
  }
});
