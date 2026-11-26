# Deployment Guide

## Prerequisites
The project has been successfully built. The production-ready files are located in the `dist` folder.

## Option 1: Netlify Drop (Recommended)
This is the simplest method and requires no additional tools.

1. Open your file explorer and navigate to:
   `c:\Users\CSC\Documents\Fuji japanese\fuji-japanese-institute\dist`
2. Open [Netlify Drop](https://app.netlify.com/drop) in your web browser.
3. Drag and drop the entire `dist` folder onto the webpage.
4. Netlify will upload and deploy your site instantly. You will receive a live URL.

## Option 2: Local Preview
To verify the build works before deploying:

1. Open a terminal in the project directory.
2. Run the following command:
   ```bash
   npm run preview
   ```
3. Open the URL shown in the terminal (typically `http://localhost:4173`) to view your site.
