# How to Push Your Code to GitHub

Since Git is not currently installed or recognized on your computer, you need to follow these steps manually.

## Step 1: Install Git
1.  Download Git from: [git-scm.com](https://git-scm.com/downloads)
2.  Install it (click "Next" through the default options).
3.  **Restart your computer** (or fully close and reopen VS Code) for the changes to take effect.

## Step 2: Create a Repository on GitHub
1.  Log in to [GitHub.com](https://github.com/).
2.  Click the **+** icon in the top right -> **New repository**.
3.  Name it: `fuji-japanese-institute`.
4.  **Important:** Do NOT check "Add a README", .gitignore, or license. Create an empty repository.
5.  Click **Create repository**.

## Step 3: Connect & Push Code
Open your VS Code terminal (Ctrl+` ~ `) and copy-paste these commands one by one:

```bash
# 1. Initialize Git
git init

# 2. Add your files
git add .

# 3. Create the first save
git commit -m "Initial launch of Fuji Japanese Institute website"

# 4. Connect to your GitHub repo 
# (REPLACE 'YOUR_USERNAME' with your actual GitHub username below!)
git remote add origin https://github.com/YOUR_USERNAME/fuji-japanese-institute.git

# 5. Push the code
git push -u origin master
```

## Step 4: Deploying (Optional)
Once your code is on GitHub, you can sign up for **Netlify** or **Vercel**, select "Import from GitHub", and choose this repository to put your website online for free!
