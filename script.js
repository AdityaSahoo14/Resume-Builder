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
});
