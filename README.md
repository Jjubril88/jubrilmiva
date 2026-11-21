# Jubril Muhammad - Student Portfolio (COS 106 Term Project)

## What each file does
- index.html - Home (name, photo, welcome, bio, About Me button)
- about.html - Education table, skills table, hobbies list, audio player
- projects.html - Three beginner project cards
- planner.html - Academic task manager
- contact.html - Contact details + validated form
- css/style.css - All styling (colours, layout, responsive rules, animations)
- js/script.js - Menu, planner and form validation
- images/profile.jpg - Your photo
- audio/welcome.wav - Sample audio on the About page

## Run it
Double-click index.html. Or in VS Code use the Live Server extension.

## Change your photo
Replace images/profile.jpg with your new photo (keep the same file name).

## Edit your information
Open the .html files in VS Code and change the text. Name, email and phone appear in the header, footer, index.html, about.html and contact.html (use Ctrl+F). Edit hobbies and skills in about.html so they are true for you.

## Put it online (free)
Go to app.netlify.com/drop and drag the whole jubril-portfolio folder in. You get a live link.

## Upload to GitHub
1. Create a GitHub account and a new repository named jubril-portfolio.
2. Click "uploading an existing file", drag in all files and folders, then Commit.
3. For a live link: Settings > Pages > Source: main branch > Save. Wait 1-2 minutes.
Submit the live link and the repository link.

## How the code works (for your defence)
- HTML is the structure. header, nav, main, section and footer are semantic tags. Tables, lists, forms, images, links and audio each have a clear job.
- CSS is the style. :root variables store the colours in one place. Flexbox lines up the navigation and hero. Grid builds the cards. @media rules adapt the layout for phones. @keyframes slideIn and transition give the animations.
- Planner JavaScript: tasks live in an array of objects. showTasks() clears the list and rebuilds it with the DOM (createElement, appendChild). The checkbox changes done, Delete uses splice, and localStorage saves the array as text (JSON.stringify) so it survives refresh.
- Form JavaScript: on submit, preventDefault stops the reload, then three checks run: empty fields, email pattern (regular expression), digits-only pattern. A message shows the result.
- The form does not send email. That needs a backend or an external service.
