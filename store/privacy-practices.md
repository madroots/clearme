# Privacy practices fields

Paste these into **Developer Dashboard → Privacy practices**.

## Single purpose

Clear cookies, cache and other site data for the current website when the user
clicks the extension icon.

## Permission justifications

**browsingData**
Only runs after an explicit click. It deletes the selected cookies, cache,
Cache Storage, localStorage, sessionStorage, IndexedDB, service workers and
File System data for the clicked site. Data is removed locally; nothing is
read, stored or transmitted.

**storage**
Stores the user's clearing preferences (which data types to clear and whether
to reload) in chrome.storage.sync. No browsing data is stored.

**activeTab**
Grants temporary access to the active tab after the user clicks the icon,
solely to read its URL so the correct site's data is cleared. The extension
injects no content scripts and reads no page content.

## Remote code

No, I am not using remote code.

## Data usage

The extension does not collect, transmit, sell or share user data. Leave all
data-type categories unchecked and certify the limited-use statements: data is
used only for the extension's single purpose, not for advertising, profiling or
creditworthiness, and no humans read it.

This is accurate even though ClearMe deletes cookies and site data: the data is
removed locally on click and is never read or transmitted. The privacy policy
discloses that local handling explicitly.

## Privacy policy

https://github.com/madroots/clearme/blob/main/PRIVACY.md

Also use this URL in the developer account's privacy policy field if the
dashboard asks for one there.
