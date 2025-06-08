(function () {
  const keywords = ["fast-paced", "dynamic environment", "self-starter", "rockstar", "synergy", "wear many hats"];
  const MIN_DAYS_OLD = 30;

  function showWarningBanner(message) {
    if (document.querySelector("#ghost-job-banner")) return;

    const banner = document.createElement("div");
    banner.id = "ghost-job-banner";
    banner.innerText = message;
    Object.assign(banner.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      padding: "10px",
      backgroundColor: "orange",
      color: "black",
      zIndex: "99999",
      fontWeight: "bold",
      textAlign: "center"
    });
    document.body.prepend(banner);
    console.log("[Ghost Job Detector] Banner injected.");
  }

  function hashJobContent(text) {
    return btoa(unescape(encodeURIComponent(text))).substring(0, 100);
  }

  function detectRepost(currentUrl, jobTitle, jobText) {
    const hash = hashJobContent(jobText);
    const savedData = JSON.parse(localStorage.getItem("ghostJobHistory") || "{}");

    const jobKey = jobTitle.toLowerCase().slice(0, 50);
    const today = new Date().toISOString().split("T")[0];

    if (savedData[jobKey]) {
      const previous = savedData[jobKey];
      const daysOld = Math.floor((new Date(today) - new Date(previous.date)) / (1000 * 60 * 60 * 24));

      if (previous.hash === hash && daysOld >= 30) {
        showWarningBanner(`🚨 This job may have been reposted after ${daysOld} days`);
      }
    }

    savedData[jobKey] = { hash, url: currentUrl, date: today };
    localStorage.setItem("ghostJobHistory", JSON.stringify(savedData));
  }

  function detectGhostJob(jobText) {
    let warningLevel = 0;

    let keywordHits = keywords.filter(kw => jobText.includes(kw));
    if (keywordHits.length > 2) warningLevel++;

    const repostRegex = /(reposted|this job has been reposted|was reposted|repost date|updated on)/i;
    if (repostRegex.test(jobText)) {
      warningLevel += 2;
    }

    const ageRegex = /(posted\s+((\d+)[+]?)\s+(days?|months?)\s+ago)|(posted on\s+\w+\s+\d{1,2})/i;
    const ageMatch = jobText.match(ageRegex);
    if (ageMatch) {
      const numeric = parseInt(ageMatch[3] || "0");
      const unit = ageMatch[4] || "";
      if ((unit.startsWith('month') && numeric >= 1) || (unit.startsWith('day') && numeric >= MIN_DAYS_OLD)) {
        warningLevel++;
      }
    }

    if (warningLevel >= 2) {
      showWarningBanner("⚠️ This job may be a ghost listing or repost.");
    }

    detectRepost(window.location.href, document.title, jobText);
  }

  function scanPageForJobText() {
    let content = "";

    const selectors = [
      '[class*="job-details"]',
      '[class*="show-more-less-html__markup"]',
      '[class*="description"]',
      '[data-description] main',
      'main',
      'body'
    ];

    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el && el.innerText.length > 500) {
        content = el.innerText;
        break;
      }
    }

    if (content) {
      console.log("[Ghost Job Detector] Job text found. Running analysis...");
      detectGhostJob(content.toLowerCase());
      return true;
    }

    return false;
  }

  function startScanner() {
    let attempts = 0;
    const maxAttempts = 15;

    const interval = setInterval(() => {
      const success = scanPageForJobText();
      attempts++;
      if (success || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 1500);
  }

  console.log("[Ghost Job Detector] Initializing...");
  startScanner();
})();