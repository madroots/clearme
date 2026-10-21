# Test instructions

Paste into **Developer Dashboard → Test instructions**. No credentials are
required; use a disposable browser profile because clearing is destructive.

1. Open any http(s) site that sets cookies and local storage (for example,
   sign in to a test account on a site you control).
2. Click the ClearMe toolbar icon. The badge animates `.` → `..` → `...`, then
   shows `✓`, and the page reloads.
3. Check DevTools → Application: cookies, localStorage/sessionStorage,
   IndexedDB, Cache Storage and service workers for that site are cleared, and
   the page's HTTP cache entry is gone (the asset is downloaded again).
4. Right-click the toolbar icon → Options. Toggle a few data types; changes
   save automatically. Toggle "Reload the page" off and verify the page is no
   longer reloaded.
5. In Options, "Clear data for all sites" shows a confirmation dialog before
   removing data for every site.
6. Only http and https pages are supported; on a `chrome://` page the badge
   shows `✕` and no data is touched.
