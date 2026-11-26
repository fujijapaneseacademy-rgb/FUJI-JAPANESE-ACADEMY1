# Google Search Console Verification Checklist

Follow these steps to ensure Google correctly processes your updated sitemap and ignores the restricted pages.

## 1. Verify Deployment

- [ ] Visit `https://fujijapaneseacademy.com/sitemap.xml` in your browser.
- [ ] Ensure the page loads (it should look like an XML tree or use the XSL stylesheet).
- [ ] Open "Inspect" (F12) -> Network tab -> Refresh. Click on `sitemap.xml` and verify the `Content-Type` is `application/xml`.

## 2. Robots.txt Validation

- [ ] Visit `https://fujijapaneseacademy.com/robots.txt`.
- [ ] Confirm `Sitemap:` points to the correct URL.
- [ ] Confirm `/admin/`, `/login`, etc., are disallowed.

## 3. Google Search Console Actions

- [ ] Go to [Google Search Console](https://search.google.com/search-console).
- [ ] Navigate to **Indexing** > **Sitemaps**.
- [ ] Submit the sitemap again by entering `sitemap.xml` in the "Add a new sitemap" field.
- [ ] Check the **URL Inspection** tool for a specific page (e.g., `/courses`) and click "Request Indexing" if needed.
- [ ] Use the **Robots.txt Tester** (Legacy tool) to verify that `/admin/` is indeed blocked.

## 4. Troubleshooting

- If GSC says "Sitemap could not be read" or "Incorrect MIME type":
  - Double-check the `_headers` file in your `public` folder.
  - Ensure your Netlify deployment was successful and the files are in the root of the published site.
