# GitGo — One-Command Solution Publisher for VS Code

Stop wasting time documenting solutions. Publish in one command.

GitGo is a VS Code extension that publishes solved coding problems to GitHub using a single command by automating folder creation, README generation, screenshot handling, and Git operations.

Write Code → Run **Publish Solution** → Done.

---

## Problem

Developers who regularly solve coding problems and maintain GitHub repositories must manually:

- Create problem folders  
- Decide naming conventions  
- Copy and rename solution files  
- Write README files  
- Add screenshots  
- Run git commands  
- Create branches and pull requests  

Because this workflow is long and repetitive:

- Repositories become inconsistent  
- Folder structures become messy  
- Developers stop documenting  
- Solutions remain unpublished  

### Root Cause

Publishing a solution is treated as many independent steps instead of a single atomic operation.

---

## Solution

GitGo converts solution publishing into one atomic pipeline executed by a single command.

Everything required to publish a solution is handled automatically.

No terminal usage.  
No manual file handling.  
No README writing.  
No git commands.

---

## Installation

1. Open VS Code  
2. Go to Extensions (`Ctrl + Shift + X`)  
3. Search **GitGo**  
4. Click Install  

---

## Usage

1. Open a solution file  
2. Press `Ctrl + Shift + P`  
3. Run **GitGo: Publish Solution**  
4. Follow prompts  

Your solution is published automatically.

---

## Commands

GitGo exposes the following VS Code commands:

- **GitGo: Publish Solution**  
  Runs the complete solution publishing pipeline.

- **GitGo: Change Repository**  
  Change or reset the target GitHub repository used for publishing.

Access commands using:

`Ctrl + Shift + P` → Type **GitGo**

---

## Quick Start

1. Open your solution file in VS Code  
2. Press `Ctrl + Shift + P`  
3. Run **GitGo: Publish Solution**  
4. Select problem type (LeetCode / Normal)  
5. If LeetCode:
   - Enter difficulty  
   - Enter execution time  
6. Choose parent folder  
7. Enter problem folder name  

GitGo will automatically:

- Create the folder  
- Copy and rename solution file  
- Generate README  
- Attach screenshots  
- Commit changes  
- Push to GitHub or create a Pull Request  

---

## First-Time Setup

On first run, GitGo will ask for:

- Repository path  
- Author name  
- GitHub profile link  
- Default push mode  

These values are saved and reused automatically.

---

## Requirements

- Git installed  
- Git configured with GitHub  
- Existing GitHub repository  

---

## Target Users

- DSA / LeetCode practitioners  
- Interview preparation students  
- Developers maintaining solution repositories  

---

## Core Design Principle

**One Command = One Complete Publish Pipeline**

Either everything succeeds or nothing is written.

---

## Architecture

GitGo uses a modular service-based architecture:

- Language detection  
- Filename standardization  
- Problem type handling  
- Metadata prompts  
- Folder creation  
- File copying  
- README generation  
- Screenshot handling  
- Repository setup  
- Default branch detection  
- Git automation  
- PR description generation  

Each module has a single responsibility.

---

## Tech Stack

- TypeScript  
- VS Code Extension API  
- Node.js  
- esbuild  
- Git CLI  
- Node core modules  

![VS Code](https://img.shields.io/badge/VS%20Code-Extension-blue)
![TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Folder Structure Generated

Each published problem produces:

- One solution file  
- One README  
- One test case screenshot  
- One submission screenshot  

Structure is consistent across all problems.

---

## Standardized Filenames

Regardless of original filename, solutions are renamed to a consistent format to guarantee uniformity across the repository.

---

## README Generation

### LeetCode Problems

Generated README contains:

- Problem name  
- Programming language  
- Difficulty  
- Execution time  
- Code explanation  
- Concepts used  
- Screenshots  
- File information  
- Author  

### Normal Problems

Generated README contains:

- Problem name  
- Short description  
- Files  
- Screenshot  
- Author  

---

## Git Automation

GitGo supports two publishing modes:

### Normal Push

Solution is committed and pushed directly to the default branch.

### Pull Request Mode

GitGo creates a new branch, commits the solution, pushes it, and generates a pull request.

---

## Default Branch Detection

GitGo automatically detects the repository’s default branch, even if it is not named `main` or `master`.

---

## Settings

User configurable:

- Author name  
- GitHub URL  
- LinkedIn URL  
- Default push mode  
- Default problem type  
- Repository path  

---

## Memory Features

GitGo remembers:

- Repository path  
- Author details  
- Last used parent folder  

No repeated setup.

---

## Error Handling

- All operations executed through safe wrappers  
- Friendly error messages  
- Automatic rollback on failure  
- No partial publishes  

---

## Security

- No credentials stored  
- Uses existing git authentication  

---

## Project Status

- Core pipeline complete  
- Settings UI complete  
- Memory features implemented  
- Error guarding implemented  
- Ready for Marketplace packaging  

---

## Authors

- Sujal Patil – https://github.com/SujalPatil21  
- Shreya Awari – https://github.com/shreyaawari28  
- Tejas Halvankar – https://github.com/Tejas-H01  
- Nihal Mishra – https://github.com/nihal27998  

---

## License

MIT License
