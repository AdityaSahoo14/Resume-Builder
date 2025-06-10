document.addEventListener("DOMContentLoaded", () => {
    let experienceIndex = 0;

    function addExperienceEntry() {
        const container = document.getElementById("experienceContainer");

        const experienceDiv = document.createElement("div");
        experienceDiv.className = "border p-3 my-2 rounded";

        experienceDiv.innerHTML = `
            <div class="row g-3">
                <div class="col-md-6">
                    <input type="text" class="form-control" placeholder="Designation" name="designation[]" required>
                </div>
                <div class="col-md-6">
                    <input type="text" class="form-control" placeholder="Employer" name="employer[]" required>
                </div>
                <div class="col-md-6">
                    <input type="text" class="form-control start-date" name="start[]" placeholder="Start (MM/YYYY)" required>
                </div>
                <div class="col-md-6">
                    <input type="text" class="form-control stop-date" name="stop[]" id="stop-${experienceIndex}" placeholder="Stop (MM/YYYY)" required>
                </div>

                <div class="col-12">
                    <div class="form-check mb-2">
                        <input class="form-check-input current-checkbox" type="checkbox" id="current-${experienceIndex}">
                        <label class="form-check-label" for="current-${experienceIndex}">
                            I currently work here
                        </label>
                    </div>

                    <div id="editor-${experienceIndex}" class="quill-editor" style="height: 150px;"></div>
                    <input type="hidden" name="description[]" id="desc-${experienceIndex}">
                </div>
            </div>
        `;

        container.appendChild(experienceDiv);

        const currentCheckbox = experienceDiv.querySelector(`#current-${experienceIndex}`);
        const stopDateInput = experienceDiv.querySelector(`#stop-${experienceIndex}`);
        const descTextarea = experienceDiv.querySelector(`#desc-${experienceIndex}`);

        const quill = new Quill(`#editor-${experienceIndex}`, {
            theme: 'snow',
            placeholder: 'What you did in this job...',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'bullet' }, { 'list': 'ordered' }],
                    ['clean']
                ]
            }
        });

        // Save content into hidden input on change
        quill.on('text-change', () => {
            descTextarea.value = quill.root.innerHTML;
        });

        // Handle "currently working" checkbox
        currentCheckbox.addEventListener("change", () => {
            if (currentCheckbox.checked) {
                stopDateInput.value = "";
                stopDateInput.setAttribute("readonly", true);
            } else {
                stopDateInput.removeAttribute("readonly");
            }
        });

        experienceIndex++;
    }

    // Initial experience entry
    addExperienceEntry();

    // Button to add more
    document.getElementById("addExperienceBtn").addEventListener("click", addExperienceEntry);

    document.getElementById("toggleSidebar").addEventListener("click", () => {
        const sidebar = document.getElementById("sidebar-wrapper");
        sidebar.classList.toggle("collapsed");
    });

    document.querySelectorAll('.list-group-item').forEach(link => {
        const targetId = link.getAttribute('href');
        const collapseElement = document.querySelector(targetId);
        const icon = link.querySelector('.section-icon');

        const updateIcon = () => {
            if (collapseElement.classList.contains('show')) {
            icon.classList.remove('fa-caret-right');
            icon.classList.add('fa-caret-down');
            } else {
            icon.classList.remove('fa-caret-down');
            icon.classList.add('fa-caret-right');
            }
        };

        // Initialize on page load
        updateIcon();

        // Listen for collapse toggle
        collapseElement.addEventListener('shown.bs.collapse', updateIcon);
        collapseElement.addEventListener('hidden.bs.collapse', updateIcon);
    });

    document.querySelectorAll('.section-header').forEach(header => {
        const targetId = header.getAttribute('data-bs-target');
        const collapseElement = document.querySelector(targetId);
        const icon = header.querySelector('.section-icon');

        if (!collapseElement || !icon) return;

        const updateIcon = () => {
            if (collapseElement.classList.contains('show')) {
            icon.classList.remove('fa-caret-right');
            icon.classList.add('fa-caret-down');
            header.setAttribute('aria-expanded', 'true');
            } else {
            icon.classList.remove('fa-caret-down');
            icon.classList.add('fa-caret-right');
            header.setAttribute('aria-expanded', 'false');
            }
        };

        // Initialize icon on page load
        updateIcon();

        // Update icon on collapse events
        collapseElement.addEventListener('shown.bs.collapse', updateIcon);
        collapseElement.addEventListener('hidden.bs.collapse', updateIcon);
    });

    const skillsContainer = document.getElementById("skillsContainer");
    const addSkillHeaderBtn = document.getElementById("addSkillHeaderBtn");

    // Function to add a skill input inside a skill group
    function addSkill(btn, value = "") {
        // btn is the clicked "Add Skill" button inside the skill group
        const skillGroup = btn.closest(".skill-group");
        const skillFields = skillGroup.querySelector(".skillFields");

        const div = document.createElement("div");
        div.className = "input-group mb-2";

        const input = document.createElement("input");
        input.type = "text";
        input.className = "form-control";
        input.placeholder = "Enter a skill";
        input.name = "skills[]";
        input.value = value;

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "btn btn-outline-danger";
        removeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        removeBtn.onclick = () => div.remove();

        div.appendChild(input);
        div.appendChild(removeBtn);
        skillFields.appendChild(div);
    }

    // Function to add a new skill group (header + skills container + add skill button)
    function addSkillGroup(headerValue = "") {
        const groupDiv = document.createElement("div");
        groupDiv.className = "skill-group border rounded p-3 mb-3";

        groupDiv.innerHTML = `
            <div class="d-flex align-items-center mb-2">
                <input type="text" class="form-control me-2" name="skill_group_headers[]" placeholder="Header e.g. Languages" required value="${headerValue}">
                <button class="btn btn-outline-danger" type="button" title="Remove header">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="skillFields"></div>
            <button class="btn btn-sm btn-outline-primary mt-1" type="button">Add Skill</button>
        `;

        // Remove header group button
        const removeHeaderBtn = groupDiv.querySelector("button.btn-outline-danger");
        removeHeaderBtn.onclick = () => groupDiv.remove();

        // Add Skill button inside group
        const addSkillBtn = groupDiv.querySelector("button.btn-outline-primary");
        addSkillBtn.onclick = () => addSkill(addSkillBtn);

        // Append group to container
        skillsContainer.appendChild(groupDiv);

        // Add one empty skill input by default
        addSkill(addSkillBtn);
    }

    // Add header button click handler
    addSkillHeaderBtn.addEventListener("click", () => {
        addSkillGroup();
    });

    // Initialize with one skill group on page load
    addSkillGroup();

    // Enable drag-and-drop for skill groups only
    new Sortable(skillsContainer, {
        animation: 150,
        handle: ".skill-group",
        ghostClass: "bg-light",
    });

    let educationIndex = 0;

    function addEducationEntry() {
        const container = document.getElementById("educationContainer");

        const educationDiv = document.createElement("div");
        educationDiv.className = "border p-3 my-2 rounded";

        educationDiv.innerHTML = `
            <div class="row g-3">
                <div class="col-md-6">
                    <input type="text" class="form-control" placeholder="Institution Name" name="institution[]" required>
                </div>
                <div class="col-md-6">
                    <select class="form-select" name="degree[]" required>
                        <option value="">Select Degree</option>
                        <option value="Bachelors">Bachelors</option>
                        <option value="Masters">Masters</option>
                        <option value="School">School</option>
                        <option value="PHD">PHD</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <input type="text" class="form-control" placeholder="Graduation Date (MM/YYYY)" name="grad_year[]" required>
                </div>
                <div class="col-md-6">
                    <input type="text" class="form-control" placeholder="CGPA / Percentage" name="cgpa[]" required>
                </div>
            </div>
        `;

        container.appendChild(educationDiv);
        educationIndex++;
    }
    
    // Initial Education Entry
    addEducationEntry();

    // Button to add more
    document.getElementById("addEducationBtn").addEventListener("click", addEducationEntry);

    let projectIndex = 0;
    function addProjectEntry() {
        const container = document.getElementById("projectsContainer");

        const wrapper = document.createElement("div");
        wrapper.className = "border p-3 my-2 rounded";

        wrapper.innerHTML = `
            <div class="row g-3">
                <div class="col-md-6">
                    <input type="text" class="form-control" name="project_title[]" placeholder="Project Title" required>
                </div>
                <div class="col-md-6">
                    <input type="month" class="form-control" name="project_year[]" required>
                </div>
                <div class="col-12">
                    <div id="project-editor-${projectIndex}" style="height: 150px;"></div>
                    <input type="hidden" name="project_description[]">
                </div>
                <div class="col-12">
                    <input type="text" class="form-control" name="project_technologies[]" placeholder="Technologies Used (e.g., Python, React)">
                </div>
            </div>
        `;

        container.appendChild(wrapper);

        const quill = new Quill(`#project-editor-${projectIndex}`, {
            theme: 'snow',
            placeholder: 'Project description...',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'bullet' }, { 'list': 'ordered' }],
                    ['clean']
                ]
            }
        });

        const descInput = wrapper.querySelector("input[name='project_description[]']");
        quill.on('text-change', () => {
            descInput.value = quill.root.innerHTML;
        });

        projectIndex++;
    }

    let achievementIndex = 0;

    function addAchievementEntry() {
        const container = document.getElementById("achievementsContainer");

        const wrapper = document.createElement("div");
        wrapper.className = "border p-3 my-2 rounded";

        wrapper.innerHTML = `
            <div class="row g-3">
                <div class="col-md-6">
                    <input type="text" class="form-control" name="achievement_title[]" placeholder="Achievement Title" required>
                </div>
                <div class="col-md-6">
                    <input type="month" class="form-control" name="achievement_year[]" required>
                </div>
                <div class="col-12">
                    <div id="achievement-editor-${achievementIndex}" style="height: 150px;"></div>
                    <input type="hidden" name="achievement_description[]">
                </div>
                <div class="col-12">
                    <input type="text" class="form-control" name="achievement_context[]" placeholder="Context (e.g., Competition, Award)">
                </div>
            </div>
        `;

        container.appendChild(wrapper);

        const quill = new Quill(`#achievement-editor-${achievementIndex}`, {
            theme: 'snow',
            placeholder: 'Achievement details...',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'bullet' }, { 'list': 'ordered' }],
                    ['clean']
                ]
            }
        });

        const descInput = wrapper.querySelector("input[name='achievement_description[]']");
        quill.on('text-change', () => {
            descInput.value = quill.root.innerHTML;
        });

        achievementIndex++;
    }

    // Initialize first entries
    addProjectEntry();
    addAchievementEntry();

    document.getElementById("addProjectBtn").addEventListener("click", addProjectEntry);
    document.getElementById("addAchievementBtn").addEventListener("click", addAchievementEntry);

    let certificationIndex = 0;

    function addCertificationEntry() {
        const container = document.getElementById("certificationContainer");

        const wrapper = document.createElement("div");
        wrapper.className = "border p-3 my-2 rounded";

        wrapper.innerHTML = `
            <div class="row g-3">
                <div class="col-md-6">
                    <input type="text" class="form-control" name="cert_title[]" placeholder="Certification Title" required>
                </div>
                <div class="col-md-6">
                    <input type="text" class="form-control" name="cert_issuer[]" placeholder="Issuing Organization">
                </div>
                <div class="col-md-6">
                    <input type="month" class="form-control" name="cert_issue_date[]" placeholder="Date of Issuance">
                </div>
                <div class="col-md-6">
                    <input type="month" class="form-control" name="cert_expiry_date[]" placeholder="Expiration Date (optional)">
                </div>
                <div class="col-md-6">
                    <input type="text" class="form-control" name="cert_id[]" placeholder="Certificate ID (optional)">
                </div>
                <div class="col-md-6">
                    <input type="url" class="form-control" name="cert_url[]" placeholder="Certificate URL (optional)">
                </div>
                <div class="col-12">
                    <div id="cert-editor-${certificationIndex}" style="height: 150px;"></div>
                    <input type="hidden" name="cert_description[]">
                </div>
            </div>
        `;

        container.appendChild(wrapper);

        const quill = new Quill(`#cert-editor-${certificationIndex}`, {
            theme: 'snow',
            placeholder: 'Certification details...',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'bullet' }, { 'list': 'ordered' }],
                    ['clean']
                ]
            }
        });

        const descInput = wrapper.querySelector("input[name='cert_description[]']");
        quill.on('text-change', () => {
            descInput.value = quill.root.innerHTML;
        });

        certificationIndex++;
    }

    document.getElementById("addCertificationBtn").addEventListener("click", addCertificationEntry);
    addCertificationEntry();

    function addPortfolioEntry() {
        const container = document.getElementById("portfolioContainer");

        const wrapper = document.createElement("div");
        wrapper.className = "border p-3 my-2 rounded";

        wrapper.innerHTML = `
            <div class="row g-3">
                <div class="col-md-6">
                    <input type="text" class="form-control" name="portfolio_title[]" placeholder="Link Title (e.g., GitHub, Behance)" required>
                </div>
                <div class="col-md-6">
                    <input type="url" class="form-control" name="portfolio_link[]" placeholder="https://your-link.com" required>
                </div>
            </div>
        `;

        container.appendChild(wrapper);
    }

    document.getElementById("addPortfolioBtn").addEventListener("click", addPortfolioEntry);
    addPortfolioEntry();
    
    const interestsContainer = document.getElementById("interestsContainer");
    const addInterestBtn = document.getElementById("addInterestBtn");

    function addInterest(value = "") {
        const div = document.createElement("div");
        div.className = "input-group mb-2";

        const input = document.createElement("input");
        input.type = "text";
        input.className = "form-control";
        input.placeholder = "Enter an interest";
        input.name = "interests[]";
        input.value = value;

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "btn btn-outline-danger";
        removeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        removeBtn.onclick = () => div.remove();

        div.appendChild(input);
        div.appendChild(removeBtn);
        interestsContainer.appendChild(div);
    }

    // Add interest on button click
    addInterestBtn.addEventListener("click", () => {
        addInterest();
    });

    // Add one interest input by default on load
    addInterest();

    document.getElementById("generateResumeBtn").addEventListener("click", () => {
        const preview = document.getElementById("resumePreview");
        const downloadBtn = document.getElementById("downloadResumeBtn");

        document.getElementById("sidebar-wrapper").style.display = "none";
        document.getElementById("page-content-wrapper").style.display = "none";

        // Personal Info
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const city = document.getElementById("city").value.trim();
        const country = document.getElementById("country").value.trim();
        const pincode = document.getElementById("pincode").value.trim();
        const address = [city, country, pincode].filter(Boolean).join(", ");

        // Portfolio
        const portfolioTitles = document.getElementsByName("portfolio_title[]");
        const portfolioLinks = document.getElementsByName("portfolio_link[]");

        let portfolioHTML = "";
        for (let i = 0; i < portfolioTitles.length; i++) {
            const title = portfolioTitles[i].value.trim();
            const link = portfolioLinks[i].value.trim();
            if (title && link) {
                portfolioHTML += `<li><strong>${title}:</strong> <a href="${link}" target="_blank">${link}</a></li>`;
            }
        }

        // Profile
        const profile = document.getElementById("profileText").value.trim();

        //Skills
        const skillGroups = document.querySelectorAll(".skill-group");
        let skillsHTML = "";

        skillGroups.forEach(group => {
            const headerInput = group.querySelector('input[name="skill_group_headers[]"]');
            const skillInputs = group.querySelectorAll('input[name="skills[]"]');

            const header = headerInput?.value.trim();
            const skills = Array.from(skillInputs)
                .map(input => input.value.trim())
                .filter(Boolean);

            if (header && skills.length > 0) {
                skillsHTML += `
                    <div class="mb-3">
                        <h5>${header}</h5>
                        <ul class="mb-0">
                            ${skills.map(skill => `<li>${skill}</li>`).join("")}
                        </ul>
                    </div>
                `;
            }
        });

        // Experience
        const designations = document.getElementsByName("designation[]");
        const employers = document.getElementsByName("employer[]");
        const starts = document.getElementsByName("start[]");
        const stops = document.getElementsByName("stop[]");
        const descriptions = document.getElementsByName("description[]");

        let experienceHTML = "";

        for (let i = 0; i < designations.length; i++) {
            const designation = designations[i].value.trim();
            const employer = employers[i].value.trim();
            const start = starts[i].value.trim();
            const stop = stops[i].value.trim();
            const description = descriptions[i].value.trim();

            if (designation && employer && start) {
                experienceHTML += `
                    <div class="mb-3">
                        <h5 class="mb-1">${designation} at ${employer}</h5>
                        <p class="mb-1 text-muted">${start} - ${stop || "Present"}</p>
                        <div>${description}</div>
                    </div>
                `;
            }
        }

        // Education
        const institutions = document.getElementsByName("institution[]");
        const degrees = document.getElementsByName("degree[]");
        const years = document.getElementsByName("grad_year[]");
        const scores = document.getElementsByName("cgpa[]");

        let educationHTML = "";

        for (let i = 0; i < institutions.length; i++) {
            const institution = institutions[i].value.trim();
            const degree = degrees[i].value.trim();
            const rawDate = years[i].value.trim(); // format: MM/YYYY
            const score = scores[i].value.trim();

            // Optional: Format MM/YYYY to "Month Year"
            let gradDate = "";
            if (/^\d{2}\/\d{4}$/.test(rawDate)) {
                const [monthPart, yearPart] = rawDate.split("/");
                const monthName = new Date(`${yearPart}-${monthPart}-01`).toLocaleString('default', { month: 'long' });
                gradDate = `${monthName} ${yearPart}`;
            }
            else {
                gradDate = rawDate; // fallback to raw value if format is off
            }

            if (institution && degree && rawDate) {
                educationHTML += `
                    <div class="mb-3">
                        <h5 class="mb-1">${degree}</h5>
                        <p class="mb-1 text-muted">${institution} | ${gradDate}</p>
                        ${score ? `<p>Score: ${score}</p>` : ""}
                    </div>
                `;
            }
        }

        //Projects 
        const projectTitles = document.getElementsByName("project_title[]");
        const projectYears = document.getElementsByName("project_year[]");
        const projectDescriptions = document.getElementsByName("project_description[]");
        const projectTechnologies = document.getElementsByName("project_technologies[]");

        let projectsHTML = "";

        for (let i = 0; i < projectTitles.length; i++) {
            const title = projectTitles[i].value.trim();
            const year = projectYears[i].value.trim();
            const description = projectDescriptions[i].value.trim();
            const tech = projectTechnologies[i].value.trim();

            if (title || description) {
                projectsHTML += `
                    <div class="mb-3">
                        <h5 class="mb-1">${title} ${year ? `<small class="text-muted">(${year})</small>` : ""}</h5>
                        ${tech ? `<p><strong>Technologies:</strong> ${tech}</p>` : ""}
                        ${description ? `<div>${description}</div>` : ""}
                    </div>
                `;
            }
        }
        
        // Certifications
        const certTitles = document.getElementsByName("cert_title[]");
        const certIssuers = document.getElementsByName("cert_issuer[]");
        const certIssueDates = document.getElementsByName("cert_issue_date[]");
        const certExpiryDates = document.getElementsByName("cert_expiry_date[]");
        const certIDs = document.getElementsByName("cert_id[]");
        const certURLs = document.getElementsByName("cert_url[]");
        const certDescriptions = document.getElementsByName("cert_description[]");

        let certificationsHTML = "";

        for (let i = 0; i < certTitles.length; i++) {
            const title = certTitles[i].value.trim();
            const issuer = certIssuers[i].value.trim();
            const issueDate = certIssueDates[i].value.trim();
            const expiryDate = certExpiryDates[i].value.trim();
            const certID = certIDs[i].value.trim();
            const certURL = certURLs[i].value.trim();
            const description = certDescriptions[i].value.trim();

            if (title) {
                certificationsHTML += `
                    <div class="mb-3">
                        <h5 class="mb-1">${title}</h5>
                        ${issuer ? `<p><strong>Issuer:</strong> ${issuer}</p>` : ""}
                        ${issueDate ? `<p><strong>Issued:</strong> ${issueDate}</p>` : ""}
                        ${expiryDate ? `<p><strong>Expires:</strong> ${expiryDate}</p>` : ""}
                        ${certID ? `<p><strong>Certificate ID:</strong> ${certID}</p>` : ""}
                        ${certURL ? `<p><strong>URL:</strong> <a href="${certURL}" target="_blank">${certURL}</a></p>` : ""}
                        ${description ? `<div>${description}</div>` : ""}
                    </div>
                `;
            }
        }

        // Achievements
        const achievementTitles = document.getElementsByName("achievement_title[]");
        const achievementYears = document.getElementsByName("achievement_year[]");
        const achievementDescriptions = document.getElementsByName("achievement_description[]");
        const achievementContexts = document.getElementsByName("achievement_context[]");

        let achievementsHTML = "";

        for (let i = 0; i < achievementTitles.length; i++) {
            const title = achievementTitles[i].value.trim();
            const year = achievementYears[i].value.trim();
            const desc = achievementDescriptions[i].value.trim();
            const context = achievementContexts[i].value.trim();

            if (title) {
                achievementsHTML += `
                    <div class="mb-3">
                        <h5 class="mb-1">${title}</h5>
                        ${year ? `<p><strong>Year:</strong> ${year}</p>` : ""}
                        ${context ? `<p><strong>Context:</strong> ${context}</p>` : ""}
                        ${desc ? `<div>${desc}</div>` : ""}
                    </div>
                `;
            }
        }
        
        // Interests
        const interestInputs = document.querySelectorAll('input[name="interests[]"]');
        let interestsHTML = "";

        const interests = Array.from(interestInputs)
            .map(input => input.value.trim())
            .filter(Boolean);

        if (interests.length > 0) {
            interestsHTML += `
                <div class="mb-3">
                    <h5>Interests</h5>
                    <ul class="mb-0">
                        ${interests.map(interest => `<li>${interest}</li>`).join("")}
                    </ul>
                </div>
            `;
        }

        // Resume HTML (Styled as per the template)
        // --- Assemble the Final Resume HTML ---
        preview.innerHTML = `
            <div class="p-4 md:p-8">
                <!-- Header -->
                <div class="text-center mb-4">
                    <h1>${name}</h1>
                    ${title ? `<h3>${title}</h3>` : ''}
                    <p class="mt-3 text-gray-400">
                        ${email}
                        ${phone ? `<span class="mx-2 text-gray-500">|</span>${phone}` : ''}
                        ${address ? `<span class="mx-2 text-gray-500">|</span>${address}`:''}
                    </p>
                    <div class="mt-3">
                        ${portfolioHTML}
                    </div>
                </div>

                <hr class="border-t-2 border-gray-700 my-6">

                <!-- Profile Section -->
                ${profile ? `
                <div>
                    <h2 class="section-title">Summary</h2>
                    <p class="text-center leading-relaxed">${profile}</p>
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

                <!-- Projects -->
                ${projectsHTML ? `
                <div class="mb-4">
                    <h4>Projects</h4>
                    ${projectsHTML}
                </div>` : ''}

                <!-- Certifications -->
                ${certificationsHTML ? `
                <div class="mb-4">
                    <h4>Certifications</h4>
                    ${certificationsHTML}
                </div>` : ''}

                <!-- Achievements -->
                ${achievementsHTML ? `
                <div class="mb-4">
                    <h4>Achievements</h4>
                    ${achievementsHTML}
                </div>` : ''}

                <!-- Portfolio -->
                ${portfolioHTML ? `
                <div class="mb-4">
                    <h4>Portfolio</h4>
                    <ul>${portfolioHTML}</ul>
                </div>` : ''}

                <!-- Interests -->
                ${interestsHTML}
            </div>
        `;

        preview.style.display = "block";
        downloadBtn.style.display = "inline-block";
    });


    // Download Resume as PDF
    document.getElementById("downloadResumeBtn").addEventListener("click", () => {
        window.print();
    });
});
