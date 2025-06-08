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
                    <input type="month" class="form-control" name="graduation_date[]" required>
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
    const interestInput = document.getElementById("interestInput");

    addInterestBtn.addEventListener("click", () => {
        const interest = interestInput.value.trim();
        if (!interest) return;

        const div = document.createElement("div");
        div.className = "input-group mb-2";

        const input = document.createElement("input");
        input.type = "text";
        input.className = "form-control";
        input.name = "interests[]";
        input.value = interest;

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "btn btn-outline-danger";
        removeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        removeBtn.onclick = () => div.remove();

        div.appendChild(input);
        div.appendChild(removeBtn);
        interestsContainer.appendChild(div);

        interestInput.value = "";
    });

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

        // Profile
        const profile = document.getElementById("profileText").value.trim();

        // Experience
        const experiences = Array.from(document.querySelectorAll('#experienceContainer > div')).map(entry => ({
            jobTitle: entry.querySelector('input[name="designation[]"]').value.trim(),
            org: entry.querySelector('input[name="employer[]"]').value.trim(),
            from: entry.querySelector('input[name="start[]"]').value,
            to: entry.querySelector('input[name="stop[]"]').value,
            // desc: entry.querySelector('textarea[name="description[]"]').value.trim()
        }));

        // Skills (for summary)
        const skills = Array.from(document.querySelectorAll('input[name="skills[]"]'))
            .map(input => input.value.trim())
            .filter(Boolean);

        // Resume HTML (Styled as per the template)
        preview.innerHTML = `
        <div class="container">
        <div class="row">
            <div class="col-md-10 offset-md-1">
            <div class="title text-center">
                <h1>${name}</h1>
                <h3>Fullstack Developer</h3>
                <h4><a href="#">${email}</a></h4>
                <hr />
                <ul class="list-inline">
                <li class="list-inline-item"><i class="devicon-html5-plain colored"></i></li>
                <li class="list-inline-item"><i class="devicon-css3-plain colored"></i></li>
                <li class="list-inline-item"><i class="devicon-javascript-plain colored"></i></li>
                <li class="list-inline-item"><i class="devicon-python-plain colored"></i></li>
                </ul>
            </div>

            <div class="summary">
                <h2 class="text-center">Summary</h2>
                <p>${profile}</p>
                <div class="row">
                ${[...Array(Math.ceil(skills.length / 3))].map((_, i) => `
                    <div class="col-md-3 col-sm-3">
                    ${skills.slice(i * 3, i * 3 + 3).map(skill => `<p>${skill}</p>`).join('')}
                    </div>
                `).join('')}
                </div>
            </div>

            <div class="work-experience">
                <h2 class="text-center">Work Experience</h2>
                ${experiences.map(exp => `
                <div class="row experience-title">
                    <div class="col-md-9">
                    <h3>${exp.org}</h3>
                    <h4>${exp.jobTitle}</h4>
                    </div>
                    <div class="col-md-3">
                    <h3>${exp.from} - ${exp.to}</h3>
                    </div>
                </div>
                <div class="row experience-summary">
                    <div class="col-md-12">
                    <p>${exp.desc}</p>
                    </div>
                </div>
                `).join('')}
            </div>
            </div>
        </div>
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
