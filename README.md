<p align="center">
  <img src="icons/icon128.png" width="88" height="88" alt="ClearMe icon">
</p>

<h1 align="center">ClearMe</h1>

<p align="center">
  One click clears the current site's cookies, cache and storage — then reloads the page.
</p>

<p align="center">
  <img alt="Manifest V3" src="https://img.shields.io/badge/manifest-v3-0e7490?style=flat-square">
  <img alt="Tested on Thorium" src="https://img.shields.io/badge/tested_on-Thorium-475569?style=flat-square">
  <img alt="No host permissions" src="https://img.shields.io/badge/host_permissions-none-0e7490?style=flat-square">
  <img alt="No telemetry" src="https://img.shields.io/badge/telemetry-none-475569?style=flat-square">
</p>

A small, popup-free Chromium extension for those moments when a site is acting
up, an asset is stubbornly stale, or you want a clean sign-out. Click the
toolbar icon and it clears the current site immediately.

Built for [Thorium](https://thorium.rocks/) and tested there; it works in other
Chromium-based browsers that support Manifest V3.

## Useful when

- **You're a web designer.** You changed CSS, JS or assets and need the browser
  to load the new files now — not a cached copy.
- **You're a developer.** A deploy looks stale, a service worker keeps serving
  the old app, or local state is stuck.
- **You want out quickly.** One click signs you out; no hunting for a buried or
  missing logout button.
- **A site is misbehaving.** Leftover cookies, storage or service workers make
  it loop or crash; clear everything and reload.
- **You're done with a site.** Remove its cookies and data without digging
  through browser settings.

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
- No host permissions, no content scripts, no telemetry, no remote servers.

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

No `<all_urls>`, no content scripts, no remote servers and no telemetry.

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

## Privacy

ClearMe collects no data and shares nothing; settings sync is handled by your
browser. Read the [privacy policy](PRIVACY.md).

## Author

Made by [best-web.sk](https://best-web.sk). Issues and suggestions are welcome.
