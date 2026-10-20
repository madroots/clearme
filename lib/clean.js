const SUPPORTED_PROTOCOLS = new Set(['http:', 'https:']);

// Settings keys double as chrome.browsingData DataTypeSet keys.
const DATA_TYPES = [
  'cookies',
  'cache',
  'cacheStorage',
  'indexedDB',
  'localStorage',
  'serviceWorkers',
  'fileSystems',
];

export class UnsupportedUrlError extends Error {
  constructor(url) {
    super(`Cannot clear site data for ${url || 'this page'}`);
    this.name = 'UnsupportedUrlError';
  }
}

export class NothingSelectedError extends Error {
  constructor() {
    super('No data types are selected');
    this.name = 'NothingSelectedError';
  }
}

/**
 * Chrome clears cookies for the whole registrable domain when an origin is
 * given, but other storage is origin-scoped. Clear both schemes, the current
 * host (including a dev port) and the bare domain when on www.
 */
export function siteOrigins(urlString) {
  let url;
  try {
    url = new URL(urlString);
  } catch {
    return null;
  }
  if (!SUPPORTED_PROTOCOLS.has(url.protocol) || !url.host) return null;

  const hosts = new Set([url.host]);
  if (url.hostname.startsWith('www.')) hosts.add(url.host.slice(4));

  const schemes =
    url.protocol === 'https:' ? ['https', 'http'] : ['http', 'https'];
  const origins = [];
  for (const host of hosts) {
    for (const scheme of schemes) origins.push(`${scheme}://${host}`);
  }
  return origins;
}

function buildDataSet(settings) {
  const dataSet = {};
  for (const type of DATA_TYPES) {
    if (settings[type] === true) dataSet[type] = true;
  }
  return dataSet;
}

export async function clearSite(urlString, settings) {
  const origins = siteOrigins(urlString);
  if (!origins) throw new UnsupportedUrlError(urlString);

  const dataToRemove = buildDataSet(settings);
  if (Object.keys(dataToRemove).length === 0) throw new NothingSelectedError();

  await chrome.browsingData.remove({ origins }, dataToRemove);
}

export async function clearAllSites(settings) {
  const dataToRemove = buildDataSet(settings);
  if (Object.keys(dataToRemove).length === 0) throw new NothingSelectedError();

  await chrome.browsingData.remove(
    { originTypes: { unprotectedWeb: true } },
    dataToRemove,
  );
}
