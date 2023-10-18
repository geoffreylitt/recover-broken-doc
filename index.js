import { isValidAutomergeUrl, Repo } from "@automerge/automerge-repo";
import { next as Automerge } from "@automerge/automerge";
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";
import { NodeFSStorageAdapter } from "@automerge/automerge-repo-storage-nodefs";

const repo = new Repo({
  network: [new BrowserWebSocketClientAdapter("wss://sync.automerge.org")],
  storage: new NodeFSStorageAdapter("./.automerge"),
});

const handle = repo.find("automerge:4CjXynrUTZj2KBWZ5g62RUvF9zdW");

console.log("loading doc...");

await handle.whenReady();

const changes = Automerge.getAllChanges(handle.docSync());
const lastGoodChange = changes[changes.length - 2]; // change before the last one
const decoded = Automerge.decodeChange(lastGoodChange);
const goodHeads = [decoded.hash];

console.log("cloning...");
console.log(new Date());

// Clone a version of the doc on the old good heads
const clonedDoc = Automerge.clone(Automerge.view(handle.docSync(), goodHeads));

console.log("done cloning");
console.log(new Date());

const newHandle = repo.create();
console.log("Updating handle...");

// This is an internal thing that assigns a doc to the handle;
// we use it because repo.clone doesn't support heads.
newHandle.update(() => clonedDoc);

console.log("New handle:");
console.log(newHandle.url);

setTimeout(() => {
  console.log("Sleeping for 10000ms");
}, 10000);
