import {
  clearSite,
  NothingSelectedError,
  UnsupportedUrlError,
} from './clean.js';
import { loadSettings } from './settings.js';

const DEFAULT_TITLE = 'Clear cookies, cache and site data for this site';
const FEEDBACK_MS = 2500;
const BUSY_FRAME_MS = 280;
const BUSY_FRAMES = ['.', '..', '...'];
const BADGE_BUSY = '#475569';
const BADGE_SUCCESS = '#0e7490';
const BADGE_WARNING = '#b45309';
const BADGE_ERROR = '#b91c1c';

let feedbackTimer;
let busyTimer;

function stopBusyFeedback() {
  if (busyTimer !== null) {
    clearInterval(busyTimer);
    busyTimer = null;
  }
}

function startBusyFeedback(host) {
  clearTimeout(feedbackTimer);
  stopBusyFeedback();
  chrome.action.setBadgeBackgroundColor({ color: BADGE_BUSY });
  chrome.action.setTitle({
    title: host
      ? `ClearMe: clearing site data for ${host}…`
      : 'ClearMe: clearing site data…',
  });
  let frame = 0;
  chrome.action.setBadgeText({ text: BUSY_FRAMES[frame] });
  busyTimer = setInterval(() => {
    frame = (frame + 1) % BUSY_FRAMES.length;
    chrome.action.setBadgeText({ text: BUSY_FRAMES[frame] });
  }, BUSY_FRAME_MS);
}

function flashBadge(text, color, title) {
  stopBusyFeedback();
  chrome.action.setBadgeBackgroundColor({ color });
  chrome.action.setBadgeText({ text });
  chrome.action.setTitle({ title });
  clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(() => {
    chrome.action.setBadgeText({ text: '' });
    chrome.action.setTitle({ title: DEFAULT_TITLE });
  }, FEEDBACK_MS);
}

export async function clearTab(tab) {
  let host = '';
  try {
    host = new URL(tab?.url ?? '').host;
  } catch {
    // Non-web pages get unsupported feedback below.
  }
  startBusyFeedback(host);

  let settings;
  try {
    settings = await loadSettings();
  } catch (error) {
    console.error('ClearMe: could not load settings', error);
    flashBadge('✕', BADGE_ERROR, 'ClearMe: could not load settings');
    return;
  }

  try {
    if (!tab?.id || !tab.url) throw new UnsupportedUrlError('');
    await clearSite(tab.url, settings);
    if (settings.reload) {
      try {
        await chrome.tabs.reload(tab.id);
      } catch {
        // The tab may have been closed while clearing.
      }
    }
    flashBadge('✓', BADGE_SUCCESS, `Cleared site data for ${new URL(tab.url).host}`);
  } catch (error) {
    if (error instanceof NothingSelectedError) {
      flashBadge('!', BADGE_WARNING, 'ClearMe: nothing selected — opening Options');
      await chrome.runtime.openOptionsPage();
      return;
    }
    if (error instanceof UnsupportedUrlError) {
      flashBadge('✕', BADGE_ERROR, 'ClearMe: only http and https sites can be cleared');
      return;
    }
    console.error('ClearMe: could not clear site data', error);
    flashBadge('✕', BADGE_ERROR, 'ClearMe: could not clear site data');
  }
}
