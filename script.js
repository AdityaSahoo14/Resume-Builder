document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('resume-form');
    const preview = document.getElementById('preview');
    const downloadBtn = document.getElementById('download-pdf');

    // --- Dynamic Field Adders ---

    // Add Skill
    document.getElementById('add-skill').addEventListener('click', () => {
        const list = document.getElementById('skills-list');
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'e.g., JavaScript';
        input.className = 'w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 skill-item';
        list.appendChild(input);
    });

    // Add Portfolio Link
    document.getElementById('add-portfolio').addEventListener('click', () => {
        const list = document.getElementById('portfolio-list');
        const newItem = document.createElement('div');
        newItem.className = 'portfolio-item flex gap-2';
        newItem.innerHTML = `
            <input type="text" placeholder="Link Name (e.g., LinkedIn)" class="w-1/2 p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 portfolio-name">
            <input type="url" placeholder="URL" class="w-1/2 p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 portfolio-link">
        `;
        list.appendChild(newItem);
    });

    // Add Experience
    document.getElementById('add-experience').addEventListener('click', () => {
        const list = document.getElementById('experience-list');
        const newItem = document.createElement('div');
        newItem.className = 'p-3 border border-gray-600 rounded-lg experience-item-form';
        newItem.innerHTML = `
            <input type="text" placeholder="Job Title" class="w-full p-2 mb-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 exp-title">
            <input type="text" placeholder="Company" class="w-full p-2 mb-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 exp-company">
            <div class="flex gap-2 mb-2">
                <input type="text" placeholder="Start Date" class="w-1/2 p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 exp-start">
                <input type="text" placeholder="End Date" class="w-1/2 p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 exp-end">
            </div>
            <textarea placeholder="Description of your role and achievements..." rows="3" class="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 exp-desc"></textarea>
        `;
        list.appendChild(newItem);
    });

    // Add Education
    document.getElementById('add-education').addEventListener('click', () => {
        const list = document.getElementById('education-list');
        const newItem = document.createElement('div');
        newItem.className = 'p-3 border border-gray-600 rounded-lg education-item-form';
        newItem.innerHTML = `
            <input type="text" placeholder="Degree or Certificate" class="w-full p-2 mb-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 edu-degree">
            <input type="text" placeholder="Institution" class="w-full p-2 mb-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 edu-institution">
                <div class="flex gap-2 mb-2">
                <input type="text" placeholder="Start Date" class="w-1/2 p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 edu-start">
                <input type="text" placeholder="End Date" class="w-1/2 p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 edu-end">
            </div>
        `;
        list.appendChild(newItem);
    });

    // Add Project
    document.getElementById('add-project').addEventListener('click', () => {
        const list = document.getElementById('projects-list');
        const newItem = document.createElement('div');
        newItem.className = 'p-3 border border-gray-600 rounded-lg project-item-form';
        newItem.innerHTML = `
            <input type="text" placeholder="Project Title" class="w-full p-2 mb-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 project-title">
            <input type="text" placeholder="Year" class="w-full p-2 mb-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 project-year">
            <textarea placeholder="Project Description" rows="2" class="w-full p-2 mb-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 project-description"></textarea>
            <input type="text" placeholder="Technologies Used (comma separated)" class="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 project-tech">
        `;
        list.appendChild(newItem);
    });

    // Add Certification
    document.getElementById('add-certification').addEventListener('click', () => {
        const list = document.getElementById('certifications-list');
        const newItem = document.createElement('div');
        newItem.className = 'p-3 border border-gray-600 rounded-lg certification-item-form';
        newItem.innerHTML = `
            <input type="text" placeholder="Certificate Title" class="w-full p-2 mb-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cert-title">
            <input type="text" placeholder="Issuing Organization" class="w-full p-2 mb-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cert-org">
            <input type="text" placeholder="Date Achieved" class="w-full p-2 mb-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cert-date">
            <input type="url" placeholder="Verification Link" class="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cert-link">
        `;
        list.appendChild(newItem);
    });

    // Add Achievement
    document.getElementById('add-achievement').addEventListener('click', () => {
        const list = document.getElementById('achievements-list');
        const newItem = document.createElement('div');
        newItem.className = 'p-3 border border-gray-600 rounded-lg achievement-item-form';
        newItem.innerHTML = `
            <input type="text" placeholder="Achievement Title" class="w-full p-2 mb-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ach-title">
            <input type="text" placeholder="Year" class="w-full p-2 mb-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ach-year">
            <textarea placeholder="Description" rows="2" class="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ach-description"></textarea>
        `;
        list.appendChild(newItem);
    });

    // Add Interest (like skills)
    document.getElementById('add-interest').addEventListener('click', () => {
        const list = document.getElementById('interests-list');
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.placeholder = 'e.g., Photography, Football';
        newInput.className = 'w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 interest-item';
        list.appendChild(newInput);
    });
    
    // --- Form Submission and Preview Generation ---
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // --- Gather Data from Form ---
        const name = document.getElementById('name').value.trim();
        const title = document.getElementById('title').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const profile = document.getElementById('profile').value.trim();

        const portfolioItems = Array.from(document.querySelectorAll('.portfolio-item')).map(item => ({
            name: item.querySelector('.portfolio-name').value.trim(),
            link: item.querySelector('.portfolio-link').value.trim()
        })).filter(p => p.name && p.link);

        const skills = Array.from(document.querySelectorAll('.skill-item')).map(input => input.value.trim()).filter(Boolean);

        const experience = Array.from(document.querySelectorAll('.experience-item-form')).map(item => ({
            title: item.querySelector('.exp-title').value.trim(),
            company: item.querySelector('.exp-company').value.trim(),
            startDate: item.querySelector('.exp-start').value.trim(),
            endDate: item.querySelector('.exp-end').value.trim(),
            description: item.querySelector('.exp-desc').value.trim(),
        })).filter(exp => exp.title);

        const education = Array.from(document.querySelectorAll('.education-item-form')).map(item => ({
            degree: item.querySelector('.edu-degree').value.trim(),
            institution: item.querySelector('.edu-institution').value.trim(),
            startDate: item.querySelector('.edu-start').value.trim(),
            endDate: item.querySelector('.edu-end').value.trim(),
        })).filter(edu => edu.degree);

        const projects = Array.from(document.querySelectorAll('.project-item-form')).map(item => ({
            title: item.querySelector('.project-title').value.trim(),
            year: item.querySelector('.project-year').value.trim(),
            description: item.querySelector('.project-description').value.trim(),
            tech: item.querySelector('.project-tech').value.trim()
        })).filter(proj => proj.title);

        const certifications = Array.from(document.querySelectorAll('.certification-item-form')).map(item => ({
            title: item.querySelector('.cert-title').value.trim(),
            org: item.querySelector('.cert-org').value.trim(),
            date: item.querySelector('.cert-date').value.trim(),
            link: item.querySelector('.cert-link').value.trim()
        })).filter(cert => cert.title);

        const achievements = Array.from(document.querySelectorAll('.achievement-item-form')).map(item => ({
            title: item.querySelector('.ach-title').value.trim(),
            year: item.querySelector('.ach-year').value.trim(),
            description: item.querySelector('.ach-description').value.trim()
        })).filter(ach => ach.title);

        const interests = Array.from(document.querySelectorAll('.interest-item')).map(input => input.value.trim()).filter(Boolean);

        // --- Generate HTML for Sections ---

        const portfolioHTML = portfolioItems.length > 0 ? portfolioItems.map(p => `<a href="${p.link}" target="_blank">${p.name}</a>`).join('<span class="mx-2 portfolio-seperator">|</span>') : '';
        
        const skillsHTML = skills.length > 0 ? `<div class="skills-grid">${skills.map(skill => `<p>${skill}</p>`).join('')}</div>` : '';

        const experienceHTML = experience.length > 0 ? experience.map(exp => `
            <div class="experience-item">
                <div class="item-header">
                    <div>
                        <h4>${exp.title}</h4>
                        <h5>${exp.company}</h5>
                    </div>
                    <p class="item-date">${exp.startDate} - ${exp.endDate}</p>
                </div>
                <p class="mt-2">${exp.description.replace(/\n/g, '<br>')}</p>
            </div>
        `).join('') : '';

        const educationHTML = education.length > 0 ? education.map(edu => `
            <div class="education-item">
                <div class="item-header">
                    <div>
                        <h4>${edu.degree}</h4>
                        <h5>${edu.institution}</h5>
                    </div>
                    <p class="item-date">${edu.startDate} - ${edu.endDate}</p>
                </div>
            </div>
        `).join('') : '';

        const projectsHTML = projects.length > 0 ? projects.map(proj => `
            <div class="project-item">
                <div class="item-header">
                    <h4>${proj.title}</h4>
                    <p class="item-date">${proj.year}</p>
                </div>
                <p class="mt-1">${proj.description}</p>
                ${proj.tech ? `<p class="mt-1"><span class="text-blue-400">Tech:</span> ${proj.tech}</p>` : ''}
            </div>
        `).join('') : '';

        const certificationsHTML = certifications.length > 0 ? certifications.map(cert => `
            <div class="certification-item">
                <div class="item-header">
                    <h4>${cert.title}</h4>
                    <h5>${cert.org}</h5>
                </div>
                <p class="item-date">${cert.date}</p>
                ${cert.link ? `<p class="text-blue-400"><a href="${cert.link}" target="_blank">${cert.link}</a></p>` : ''}
            </div>
        `).join('') : '';

        const achievementsHTML = achievements.length > 0 ? achievements.map(ach => `
            <div class="achievement-item">
                <div class="item-header">
                    <h4>${ach.title}</h4>
                    <p class="item-date">${ach.year}</p>
                </div>
                <p class="mt-1">${ach.description}</p>
            </div>
        `).join('') : '';

        const interestsHTML = interests.length > 0 ? `<div class="skills-grid">${interests.map(interest => `<p>${interest}</p>`).join('')}</div>` : '';

        // --- Assemble the Final Resume HTML ---
        preview.innerHTML = `
            <div class="p-4 md:p-8">
                <!-- Header -->
                <div class="text-center mb-4">
                    <h1>${name}</h1>
                    ${title ? `<h3>${title}</h3>` : ''}
                    
                    <hr class="border-t-2 border-gray-700 my-6 portfolio-hr">
                    
                    <p class="mt-3 portfolio-contact">
                        ${email}
                        ${phone ? `<span class="mx-2 portfolio-seperator">|</span>${phone}` : ''}
                        ${address ? `<span class="mx-2 portfolio-seperator">|</span>${address}`:''}
                        ${portfolioItems.length ? `<span class="mx-2 portfolio-seperator">|</span>${portfolioHTML}` : ''}
                    </p>
                </div>
                
                
                <!-- *************************************
                    Portfolio Section
                    <hr class="border-t-2 border-gray-700 my-6">

                <div class="mt-3">
                    ${portfolioHTML}
                    <hr class="border-t-2 border-gray-700 my-6">
                </div>
                ********************************************** -->
                
                    
                <!-- Profile Section -->
                ${profile ? `
                <div>
                    <h2 class="section-title">Summary</h2>
                    <p class="text-justify leading-relaxed">${profile}</p>
                </div>` : ''}

                <!-- Skills Section -->
                ${skillsHTML ? `
                <div>
                    <h2 class="section-title">Skills</h2>
                    ${skillsHTML}
                </div>` : ''}

                <!-- Experience Section -->
                ${experienceHTML ? `
                <div>
                    <h2 class="section-title">Work Experience</h2>
                    ${experienceHTML}
                </div>` : ''}

                <!-- Education Section -->
                ${educationHTML ? `
                <div>
                    <h2 class="section-title">Education</h2>
                    ${educationHTML}
                </div>` : ''}

                <!-- Projects Section -->
                ${projectsHTML ? `
                <div>
                    <h2 class="section-title">Projects</h2>
                    ${projectsHTML}
                </div>` : ''}

                <!-- Certifications Section -->
                ${certificationsHTML ? `
                <div>
                    <h2 class="section-title">Certifications</h2>
                    ${certificationsHTML}
                </div>` : ''}

                <!-- Achievements Section -->
                ${achievementsHTML ? `
                <div>
                    <h2 class="section-title">Achievements</h2>
                    ${achievementsHTML}
                </div>` : ''}

                <!-- Interests Section -->
                ${interestsHTML ? `
                <div>
                    <h2 class="section-title">Interests</h2>
                    ${interestsHTML}
                </div>` : ''}
            </div>
        `;

        preview.style.display = "block";
        downloadBtn.style.display = "block";
    });
    
    // --- PDF Download Functionality ---
    downloadBtn.addEventListener('click', () => {
        const resumeContent = document.getElementById('preview');
        const opt = {
            margin:       0.5,
            filename:     'resume.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, backgroundColor: '#fff' },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        // Use a clone of the element for PDF generation to avoid display issues
        html2pdf().from(resumeContent.cloneNode(true)).set(opt).save();
    });

});