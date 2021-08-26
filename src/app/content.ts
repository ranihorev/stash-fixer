chrome.runtime.sendMessage({}, (response) => {
  let checkReady = setInterval(() => {
    if (document.readyState === "complete") {
      clearInterval(checkReady);
      retry(10, runScript);
    }
  }, 100);
});

const retry = (maxRetries: number, fn: () => void) => {
  console.log(`Running, attempts left: ${maxRetries}`);
  try {
    fn();
  } catch (e) {
    if (maxRetries <= 0) {
      throw e;
    }
    setTimeout(() => retry(maxRetries - 1, fn), 500);
  }
};

const runScript = () => {
  const betterHeaderElem = document.querySelector(".pull-request-header h2");

  if (!betterHeaderElem) {
    throw new Error("Better header elem is missing");
  }

  const elem = document.querySelector("#commit-message");
  if (elem) {
    elem.innerHTML = betterHeaderElem.innerHTML;
    elem.setAttribute("data-original-value", betterHeaderElem.innerHTML);
  } else {
    throw new Error("commit message elem was not found");
  }
};
