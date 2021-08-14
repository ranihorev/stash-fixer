chrome.runtime.sendMessage({}, (response) => {
  var checkReady = setInterval(() => {
    if (document.readyState === "complete") {
      clearInterval(checkReady);
      runScript();
    }
  });
});

const runScript = () => {
  console.log("init");
  const betterHeader = document.querySelector(
    ".pull-request-header h2"
  ).innerHTML;
  const elem = document.querySelector("#commit-message");
  console.log(elem);
  if (elem) {
    elem.innerHTML = betterHeader;
  }
};
