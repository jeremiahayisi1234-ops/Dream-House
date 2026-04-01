# Luxury Villa VR (A-Frame) — Examination

This repository contains the **Examination** coursework: a WebVR luxury villa built with **A-Frame**, including six furnished rooms, animated pool water, landscaping, and animated figures.

## GitHub repository

| | |
|---|---|
| **Owner** | [jeremiahayisi1234-ops](https://github.com/jeremiahayisi1234-ops) |
| **Repository** | [https://github.com/jeremiahayisi1234-ops/Examination](https://github.com/jeremiahayisi1234-ops/Examination) |
| **Clone** | `git clone https://github.com/jeremiahayisi1234-ops/Examination.git` |

After you create the repo on GitHub (same name `Examination`), push this folder:

```bash
git init
git add .
git commit -m "Initial commit: A-Frame luxury villa VR"
git branch -M main
git remote add origin https://github.com/jeremiahayisi1234-ops/Examination.git
git push -u origin main
```

## Hosting

### School / course URL (replace `IndexNumber`)

**[https://IndexNumber.ceiscy.com/Examination](https://IndexNumber.ceiscy.com/Examination)**

Upload the contents of this `Examination` folder to the path your instructor expects (often the site root contains a folder named `Examination` with `index.html` inside).

### GitHub Pages

1. Push this repository to `jeremiahayisi1234-ops/Examination`.
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**.
4. Your site will be available at:

**[https://jeremiahayisi1234-ops.github.io/Examination/](https://jeremiahayisi1234-ops.github.io/Examination/)**

(If the repo or folder name differs, adjust the URL accordingly.)

## Run locally

Open `index.html` in a local web server (required for some browsers and scripts):

```bash
npx --yes serve .
```

Then visit `http://localhost:3000` (or the port shown).

## Documentation PDF

- **Markdown / HTML:** `DOCUMENTATION.md`, `DOCUMENTATION.html` (browser **Print → Save as PDF** for the longest report).
- **Included PDF:** `DOCUMENTATION.pdf` is generated in this repo. To regenerate on Windows without Node.js:

```powershell
cd Examination
powershell -ExecutionPolicy Bypass -File .\gen-pdf.ps1
```

- **Alternative (Node.js):** `npm install` then `npm run doc-pdf` uses `gen-pdf.js` and **pdfkit** for a richer layout.

## Project layout

- `index.html` — main A-Frame scene  
- `js/water-shader.js` — pool water shader  
- `js/pool-orbit.js` — kid/dog motion  
- `js/scene-helpers.js` — tree factories  
- `js/procedural-textures.js` — small canvas textures (wood, grass, marble accents)  

## Controls

**WASD** (or arrows) to move, **mouse** or **touch** to look, **Enter VR** in the headset for immersive mode.
