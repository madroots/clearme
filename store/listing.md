# Chrome Web Store listing

Paste these into **Developer Dashboard → Store listing**.

- **Name:** ClearMe
- **Summary (132 characters max):** Clear cookies, cache and site data for the current site in one click, then reload. Fully configurable.
- **Category:** Developer Tools
- **Language:** English
- **Homepage URL:** https://github.com/madroots/clearme
- **Support URL:** https://github.com/madroots/clearme/issues
- **Privacy policy URL:** https://github.com/madroots/clearme/blob/main/PRIVACY.md

## Detailed description

ClearMe clears the current website's cookies, cache and stored data with one
click, then reloads the page. No popup, no confirmation dialogs.

It is useful when a site is misbehaving, an asset is stubbornly stale, a deploy
is not showing up, or you simply want a clean sign-out without hunting for the
logout button.

WHAT IT CLEARS

- Cookies for the whole registrable domain, including subdomains
- HTTP cache for the current origin
- Cache Storage
- localStorage and sessionStorage
- IndexedDB
- Service workers
- File System data (optional)

Everything is scoped to the site you clicked from, on both http and https. On
www. pages the bare domain is included too.

HOW TO USE

- Click the toolbar icon. The badge animates while ClearMe works, then shows a
  checkmark and the page reloads.
- Right-click the icon and choose Options to choose what gets cleared and
  whether to reload. Settings save automatically.
- Use "Clear data for all sites" in Options when you want a profile-wide clean;
  it asks for confirmation.

PRIVACY

No accounts, no analytics, no remote servers, no host permissions and no
content scripts. ClearMe processes everything locally and collects no user
data. See the privacy policy for details.

Made by best-web.sk.
