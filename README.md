# Ghost Job Detector – Firefox Extension

Detect potentially reposted or ghost job listings on popular job boards like LinkedIn, Indeed, and Glassdoor.

## What It Does

- Scans job descriptions for vague language, outdated posts, and signs of reposting.
- Highlights suspicious listings with a warning banner at the top of the page.
- Tracks and stores seen listings to detect reposts over time.
- Includes a popup with job count and a reset button.

Example:

![image](https://github.com/user-attachments/assets/e66ed1cb-2b1e-4fa1-9e24-86716f947fb9)


## How to Install (Temporary for Testing)

1. Download and extract this extension.
2. Open Firefox and go to `about:debugging`.
3. Click **"This Firefox"** → **"Load Temporary Add-on..."**
4. Select the `manifest.json` file in the extracted folder.

> ⚠️ Note: You’ll need to re-load it each time you restart Firefox.

## Targeted Sites

This extension only runs on:
- `https://*.linkedin.com/jobs/*`
- `https://*.indeed.com/viewjob*`
- `https://*.glassdoor.com/Job/*`

You can add more platforms in `manifest.json` if needed.

## Features

- **Keyword analysis:** Flags vague job listings.
- **Repost detection:** Looks for reposted markers and previously seen listings.
- **Banner alerts:** Warns you visually when something looks off.
- **Storage:** Uses `localStorage` to remember job postings.
- **Popup interface:** View jobs tracked and clear history.

## Files

- `manifest.json` – Extension manifest
- `content-script.js` – Main detection logic
- `popup.html` – Popup UI for stats and history reset
- `icon.png` – Your custom icon (not included, use any 128x128 PNG)

## Customization

Want to add more job boards?  
Just add more URL patterns under `"matches"` in `manifest.json`.

Want to enable/disable detection per site?  
You can build a toggle in `popup.html` and store settings in `localStorage`.

---

Made for job seekers who don’t want to waste time on ghost listings.
