# Resume-Builder
Website Used to Build Resume


markdown
Copy
Edit
# Resume Builder

A dynamic, responsive web application to help users create professional resumes. This tool allows users to input personal details, experiences, skills, and more, preview the resume in real-time, and download it as a PDF.

## Features

- Live preview of resume as user fills the form
- Multiple input sections:
  - Personal Details
  - Portfolio Links
  - Profile Summary
  - Skills
  - Work Experience
  - Education
  - Projects
  - Certifications
  - Achievements
  - Interests
- Add/remove dynamic fields for each section
- Download the generated resume as a PDF
- TailwindCSS for sleek, responsive styling
- Dark-themed form with light resume preview

## Technologies Used

- HTML5
- TailwindCSS
- JavaScript (Vanilla)
- [html2pdf.js](https://www.npmjs.com/package/html2pdf.js) for PDF generation
- Google Fonts: Inter & Josefin Sans

## How to Use

1. Open `index.html` in your browser.
2. Fill in the form sections on the left panel.
3. Click **Generate Resume** to preview the result.
4. Click **Download as PDF** to export your resume.

## Folder Structure

/project-root
│
├── index.html # Main HTML file containing the full resume builder UI and logic
├── README.md # Project overview and usage instructions (this file)

markdown
Copy
Edit

## Customization

- You can modify the Tailwind styles directly in the `<style>` tag inside the HTML.
- Font and layout customizations are handled using TailwindCSS utility classes.
- If needed, you can extract JavaScript into a separate file for modularity.

## License

This project is open-source and free to use under the MIT License.

