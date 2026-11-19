# Gachara Ndirangu — Ol Moran Ward website

A responsive, multi-page static website built for GitHub Pages. Theme: black and gold. Slogan: **Unity, Knowledge and Wealth.**

## Pages included

- Home
- About Gachara
- Our Vision
- Achievements
- Events
- Gallery
- Contact
- Register
- Login / team portal information page

## 1. Preview locally

Open `index.html` in a browser. For best results, run a local static server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## 2. Add area photographs — automatic gallery

1. Copy your area photographs into `images/areas/`.
2. Supported formats: JPG, JPEG, PNG, WEBP and GIF.
3. Optional: add a `.txt` file with the same base name as an image to set its caption. Example: `market-day.jpg` and `market-day.txt`.
4. Push the files to GitHub. The included GitHub Actions workflow scans the folder, generates `images/areas/manifest.json`, and deploys the site.
5. All images in that folder will appear in the Gallery page. The first three also appear on the homepage.

The browser cannot list files in a static folder by itself. This project solves that by generating a manifest automatically during deployment.

## 3. Configure campaign contact details

Open `assets/js/site.js` and replace:

```js
campaignEmail: "REPLACE-WITH-OFFICIAL-EMAIL@example.com"
```

with the official campaign email address. You can also add the public social media URLs in the same configuration object.

The forms use the visitor's email application (`mailto:`). They do not store submissions in a database. For reliable online form submissions, connect a form service or backend before launch.

## 4. Publish with GitHub Pages

1. Create a new GitHub repository, for example `gachara-ndirangu`.
2. Upload the contents of this project to the repository root. Do not upload only the ZIP file.
3. Ensure the default branch is named `main`.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, choose **GitHub Actions** as the source.
6. Push to `main`. The workflow in `.github/workflows/deploy.yml` will generate the gallery manifest and deploy the website.
7. GitHub will show the published website URL in **Settings → Pages** and in the workflow deployment.

If you prefer to deploy from a repository subfolder or use a custom domain, update the deployment configuration accordingly.

## 5. Important launch checks

- Replace the campaign email with an official address.
- Add only verified biography, event, achievement and contact information.
- Replace the sample hero background with an image you own or have permission to use, if desired. It is currently a remote Unsplash image.
- Add a favicon and official social links if available.
- The Login page is informational only. GitHub Pages is static and this project does not provide secure authentication. Add a proper authentication provider/backend before offering user accounts.
- Check that you have permission and, where needed, consent to publish all photographs.

## Project structure

```text
.
├── index.html
├── about.html
├── vision.html
├── achievements.html
├── events.html
├── gallery.html
├── contact.html
├── register.html
├── login.html
├── assets/
│   ├── css/style.css
│   └── js/site.js
├── images/areas/
├── scripts/generate-gallery-manifest.py
└── .github/workflows/deploy.yml
```
