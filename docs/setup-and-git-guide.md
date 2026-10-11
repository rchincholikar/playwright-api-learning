# Playwright + TypeScript API Automation

## Setup and Git Workflow Guide

**Platform:** Windows
**Terminal:** PowerShell in VS Code
**Version control:** Git and GitHub

This guide covers installing the required tools, configuring Git, connecting a local project to GitHub, making the first commit, pushing changes, and maintaining the repository in the future.

---

## 1. Install Node.js and npm

Node.js allows JavaScript to run outside the browser. npm is the package manager used to install and manage project dependencies.

1. Visit the official website: [https://nodejs.org/](https://nodejs.org/)
2. Download and install a suitable LTS version.
3. Restart your terminal or open a new VS Code terminal.

Verify the installation:

```powershell
node --version
npm --version
```

Both commands should display version numbers.

## 2. Install Git for Windows

Git tracks source-code changes and allows us to push committed changes to GitHub.

1. Visit [https://git-scm.com/downloads/win](https://git-scm.com/downloads/win)
2. Download and install Git for Windows.
3. Use the default installation options unless you have a specific requirement.
4. Restart the terminal.

Verify the installation:

```powershell
git --version
```

## 3. Configure Git identity

Git records the author name and email for each commit.

Configure your identity:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your-github-email@example.com"
```

Replace the example values with your preferred name and email.

Verify the configuration:

```powershell
git config --global user.name
git config --global user.email
```

These settings identify the author of a commit. They do not authenticate you to GitHub.

## 4. Open the existing project

Open the existing Playwright project folder in VS Code.

Example project path:

```text
P:\AutomationTS\playwright-api-learning
```

Open the VS Code terminal and confirm the current directory:

```powershell
Get-Location
```

Check the Git status:

```powershell
git status
```

If Git reports that the folder is not a repository, initialize it:

```powershell
git init
git branch -M main
```

- `git init` initializes a local Git repository.
- `git branch -M main` renames the current branch to `main`.

Do not repeat initialization if the repository is already configured.

## 5. Create a GitHub repository

1. Open [https://github.com/](https://github.com/) and sign in.
2. Select **New repository**.
3. Enter the repository name, for example `playwright-api-learning`.
4. Choose Public or Private.
5. If the local project already contains files, create an empty remote repository without automatically adding a README, `.gitignore`, or license.
6. Click **Create repository**.

Copy the HTTPS repository URL. It should resemble:

```text
https://github.com/YOUR-USERNAME/playwright-api-learning.git
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## 6. Connect the local project to GitHub

Add the remote repository:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/playwright-api-learning.git
```

If `origin` already exists, update its URL instead:

```powershell
git remote set-url origin https://github.com/YOUR-USERNAME/playwright-api-learning.git
```

Verify the remote:

```powershell
git remote -v
```

Expected output:

```text
origin  https://github.com/YOUR-USERNAME/playwright-api-learning.git (fetch)
origin  https://github.com/YOUR-USERNAME/playwright-api-learning.git (push)
```

`origin` is the conventional name for the remote repository.

## 7. Create the `.gitignore` file

The `.gitignore` file tells Git which files and directories should not be tracked.

In the project root, run this complete PowerShell command:

```powershell
@'
node_modules/
test-results/
playwright-report/
coverage/
.env
.env.*
!.env.example
'@ | Set-Content -Encoding utf8 .gitignore
```

Verify the file:

```powershell
Get-Content .gitignore
```

### What these rules mean

| Rule                 | Purpose                                           |
| -------------------- | ------------------------------------------------- |
| `node_modules/`      | Ignore installed npm dependencies                 |
| `test-results/`      | Ignore generated test results                     |
| `playwright-report/` | Ignore generated Playwright reports               |
| `coverage/`          | Ignore test coverage output                       |
| `.env`               | Ignore environment files that may contain secrets |
| `.env.*`             | Ignore other environment-specific files           |
| `!.env.example`      | Allow a safe example environment file             |

Never commit actual passwords, API keys, access tokens, or confidential company data.

Important: `.gitignore` does not automatically untrack files that Git already tracks. If a sensitive file has already been committed, additional cleanup may be necessary.

## 8. Understand Git's working directory, staging area, and commits

Git has three important local areas:

1. **Working directory:** Files you create or modify.
2. **Staging area:** Changes selected for the next commit.
3. **Repository history:** Saved commits.

The normal flow is:

```text
Working directory
       |
       | git add
       v
Staging area
       |
       | git commit
       v
Local Git history
       |
       | git push
       v
GitHub repository
```

Useful commands:

```powershell
git status
git add .
git diff
git diff --cached
```

- `git status` shows changed, staged, and untracked files.
- `git add .` stages changes in the current directory and its subdirectories, excluding files ignored by Git.
- `git diff` displays unstaged changes.
- `git diff --cached` displays staged changes.

Always review staged files before committing.

## 9. Correct an accidental `git add .`

If you accidentally stage `node_modules/` or other unwanted files, do not delete your project files.

First, ensure the appropriate rules exist in `.gitignore`.

### If you have not made your first commit

The command below may fail because there is no `HEAD` commit yet:

```powershell
git restore --staged .
```

For this initial-commit situation, you can clear the Git index with:

```powershell
git rm -r --cached .
```

This removes the selected paths from Git's index but preserves the files on your computer.

Then stage the files again:

```powershell
git add .
git status
```

Review the list to confirm that `node_modules/`, test output, and secrets are excluded.

Do not use `git clean` or `git reset --hard` for this task.

## 10. Understand branches

A branch is an independent line of development.

Common examples:

- `main` — the main project branch.
- `feature/add-api-tests` — a branch for implementing new API tests.

Check your current branch:

```powershell
git branch
```

Create and switch to a new feature branch:

```powershell
git switch -c feature/initial-api-automation
```

Switch back to `main`:

```powershell
git switch main
```

For a personal learning project, pushing directly to `main` can be sufficient. For professional development practice, use feature branches and Pull Requests.

A typical team workflow is:

```text
main
  |
  +-- feature/add-api-tests
             |
             +-- Commit changes
             +-- Push branch
             +-- Open Pull Request
             +-- Review and merge into main
```

## 11. Review and create your first commit

Before committing, run:

```powershell
git status
git diff --cached
```

Check that the staged files are appropriate. Confirm that generated folders, secrets, and unrelated files are excluded.

Create the first commit:

```powershell
git commit -m "Initial commit: Playwright API automation learning project"
```

A commit saves a snapshot of the staged changes in your local repository. It does not upload them to GitHub.

## 12. Push the first commit to GitHub

### Option A: Push directly to `main`

If your current branch is `main`, run:

```powershell
git push -u origin main
```

### Option B: Push a feature branch

If you created the branch `feature/initial-api-automation`, run:

```powershell
git push -u origin feature/initial-api-automation
```

The `-u` option configures upstream tracking. Future pushes from that branch can generally use `git push` alone.

If GitHub asks you to authenticate, follow the browser sign-in or credential prompt. Never share your password or access token.

### If the push is rejected

If GitHub already contains commits that are absent locally, do not force-push as a shortcut. Inspect the local and remote histories and reconcile them safely.

## 13. Verify the first push

Run:

```powershell
git status
git log --oneline -5
```

After a successful push, your branch may report:

```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

Open your GitHub repository in the browser and verify that your project files appear.

## 14. Everyday workflow for future changes

After the first push, use this workflow whenever you modify tests, configuration, or documentation.

### Step 1: Edit and save

Make your changes in VS Code.

### Step 2: Review the changes

```powershell
git status
git diff
```

### Step 3: Stage the changes

```powershell
git add .
git status
```

Confirm that only the intended files are staged.

### Step 4: Commit the changes

```powershell
git commit -m "Add API response validation tests"
```

Replace the message with a short description of the actual changes.

### Step 5: Push the changes

```powershell
git push
```

If you are working on a feature branch, push that branch and open a Pull Request when ready.

Remember:

```text
Edit → Review → Stage → Commit → Push
```

## 15. Common Git commands

| Command                      | Purpose                            |
| ---------------------------- | ---------------------------------- |
| `git status`                 | Check the current repository state |
| `git add .`                  | Stage changes                      |
| `git diff`                   | Review unstaged changes            |
| `git diff --cached`          | Review staged changes              |
| `git commit -m "Message"`    | Create a commit                    |
| `git push`                   | Upload committed changes           |
| `git pull`                   | Fetch and integrate remote changes |
| `git log --oneline -5`       | View the latest five commits       |
| `git branch`                 | List local branches                |
| `git switch main`            | Switch to `main`                   |
| `git switch -c feature/name` | Create and switch to a branch      |
| `git remote -v`              | Display remote repository URLs     |

## 16. Troubleshooting

### Git says the folder is not a repository

Confirm the project directory:

```powershell
Get-Location
```

If necessary, navigate to the project root and run `git status`.

### `git restore --staged .` reports that `HEAD` cannot be resolved

This can happen before the first commit. Use the initial-commit recovery steps in Section 9.

### `node_modules/` still appears in Git status

Verify `.gitignore` and check whether the files are already tracked. If they were staged but not committed, remove them from the index and stage again as explained in Section 9.

### Git reports LF/CRLF warnings on Windows

These are line-ending warnings and are not necessarily errors. Review the staged changes and proceed if the files are correct.

### Git asks for authentication

Follow GitHub's browser or credential prompt. Do not paste passwords or personal access tokens into chat or commit them to the repository.

### A push is rejected

Inspect the error and repository history. If the remote contains separate commits, reconcile the histories rather than using a force-push without understanding the consequences.

---

## Final checklist

Before every push, confirm:

- [x] I am in the correct project directory.
- [x] I am on the intended branch.
- [x] I reviewed `git status`.
- [x] No secrets or confidential files are staged.
- [x] `node_modules/` and generated test output are excluded.
- [x] My commit message describes the changes.
- [x] The push succeeded.
- [x] I verified the repository when necessary.

**Recommended practice:** Keep `README.md` as a short project overview, this document as your setup and Git reference, and your learning-roadmap document for TypeScript, Playwright, and API automation concepts.
