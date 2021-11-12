chrome.runtime.sendMessage({}, (response) => {
  runScript();
});

const runScript = () => {
  const stringToRemove = /^Pull request #\d+: /i;
  let observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      if (
        (mutation.target as HTMLElement).classList.contains("atlaskit-portal")
      ) {
        for (let addedNode of mutation.addedNodes) {
          const node = (addedNode as HTMLElement).querySelector(
            'input[id="commit-message-title"]'
          ) as HTMLInputElement | undefined;
          if (node) {
            node.value = node.value.replace(stringToRemove, "");
            return;
          }
        }
      }
    }
  });

  observer.observe(document, { childList: true, subtree: true });
};
