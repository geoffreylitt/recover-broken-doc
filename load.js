// Load existing cloned essay from FS, and try to sync w server

import { isValidAutomergeUrl, Repo } from "@automerge/automerge-repo";
import { next as Automerge } from "@automerge/automerge";
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";
import { NodeFSStorageAdapter } from "@automerge/automerge-repo-storage-nodefs";

const OLD_ESSAY = "automerge:4CjXynrUTZj2KBWZ5g62RUvF9zdW";
const NEW_ESSAY = "automerge:2S3isz1DXAWEPAjUZGqVVX3tHwAU";

const repo = new Repo({
  network: [new BrowserWebSocketClientAdapter("wss://sync.automerge.org")],
  // network: [],
  storage: new NodeFSStorageAdapter("./.automerge"),
});

const handle = repo.find(NEW_ESSAY);

console.log("loading doc...");

await handle.whenReady();

console.log(handle.docSync());
