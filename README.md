<p align="center">
  <img src="icons/icon128.png" width="88" height="88" alt="ClearMe icon">
</p>

<h1 align="center">ClearMe</h1>

<p align="center">
  One click clears the current site's cookies, cache and storage — then reloads the page.
</p>

A small, popup-free Chromium extension for those moments when a site is acting
up, an asset is stubbornly stale, or you want a clean sign-out. Click the
toolbar icon and it clears the current site immediately.

Built for [Thorium](https://thorium.rocks/) and tested there; it works in other
Chromium-based browsers that support Manifest V3.

## Why

- **Fix weird sites.** Stale caches, leftover service workers and old site data
  cause problems that a normal reload can't solve.
- **Log out completely.** Cookies for the whole domain, plus local storage,
  IndexedDB and friends.
- **Stay in control.** Choose what gets cleared; defaults cover the useful
  cases.

## Features

- One click, no popup, no confirmation dialogs.
- Animated badge while it works: `.` → `..` → `...`, then `✓`.
- Clears the current origin's HTTP cache, Cache Storage, localStorage,
  sessionStorage, IndexedDB and service workers.
- Clears cookies for the whole registrable domain (including subdomains).
- Covers both `http` and `https`, plus the bare domain when you're on `www.`.
- Configurable in Options; settings save automatically.
- Optional page reload after clearing (on by default).
- "Clear data for all sites" for a full browser-profile cleanup.
- No host permissions, no content scripts, no network requests, no telemetry.

## Install

This is a local, developer-mode extension; it isn't published to a store.

1. Download or clone this repository.

   ```bash
   git clone https://github.com/madroots/clearme.git
   ```

2. Open `thorium://extensions` (or `chrome://extensions`).
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the `clearme` folder.
5. Pin ClearMe to the toolbar.

The settings page opens automatically after installation.

## Use

Click the icon. While clearing, the badge animates; afterwards it shows `✓`
and the tab reloads.

| Badge | Meaning |
| --- | --- |
| `.` `..` `...` | Clearing site data |
| `✓` | Done |
| `✕` | Cannot clear this page (for example `chrome://` pages) or an error occurred |
| `!` | Nothing selected — Options opens |

**Right-click the icon → Options** to configure:

- what to clear
- whether to reload the page
- clearing data for all sites

## Defaults

| Data | Default | Scope |
| --- | --- | --- |
| Cookies | on | Whole registrable domain, including subdomains (Chrome behavior) |
| Cache | on | Current origin |
| Cache storage | on | Current origin |
| Local storage | on | Current origin; Chrome also clears sessionStorage |
| IndexedDB | on | Current origin |
| Service workers | on | Current origin |
| File system storage | off | Current origin; rarely used by sites |
| Reload page | on | After clearing |

Clearing from `https://www.example.com/page` targets both schemes and the bare
domain as well:

```text
https://www.example.com  http://www.example.com
https://example.com      http://example.com
```

Deliberately untouched: history, downloads, passwords and autofill data.
"Clear all sites" also skips protected web apps and extension origins.

## Permissions

| Permission | Why |
| --- | --- |
| `browsingData` | Removes the selected cookies, cache and storage |
| `storage` | Saves your settings (via `chrome.storage.sync`) |
| `activeTab` | Reads the current tab's URL after you click the icon |

No `<all_urls>`, no content scripts, no background network access.

## Notes

- `sessionStorage` is cleared along with local storage (Chrome behavior).
- The page reload happens after the data is removed, so the site starts fresh.
- Data is only affected in the current browser profile.

## Project layout

```text
background.js        service worker and toolbar click wiring
lib/action.js        one-click flow, badge feedback
lib/clean.js         origin scoping and browsingData calls
lib/settings.js      defaults, load/save
options.html/.css/.js  settings page
icons/               extension icons
```

No build step. Edit the files and reload the extension from
`thorium://extensions`.

## Author

Made by [best-web.sk](https://best-web.sk). Issues and suggestions are welcome.
