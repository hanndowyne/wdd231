document.addEventListener("DOMContentLoaded", () => {
    const courses = [
        { code: "WDD130", title: "Web Fundamentals", description: "Intro to HTML & CSS basics.", credits: 2, category: "wdd", completed: true },
        { code: "WDD131", title: "Dynamic Web Fundamentals", description: "Responsive design and JS basics.", credits: 2, category: "wdd", completed: false },
        { code: "WDD231", title: "Client-side Scripting", description: "Advanced JS and DOM manipulation.", credits: 3, category: "wdd", completed: false },
        { code: "CSE110", title: "Intro to Programming", description: "Programming fundamentals.", credits: 3, category: "cse", completed: true },
        { code: "CSE111", title: "Programming with Functions", description: "Functions and modular code.", credits: 3, category: "cse", completed: false }
    ];
    const container = document.getElementById("course-container");
    const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
    const totalCreditEl = document.getElementById("total-credit");
    const displayCountEl = document.getElementById("display-count")

    function renderCourses(filter = "all") {
        const filtered = filter === "all" ? courses : courses.filter(c => c.category === filter);
        container.innerHTML = "";

        filtered.forEach(course => {
            const card = document.createElement("article");
            card.className = "course-card";
            card.setAttribute("tabindex", "0");
            if (course.completed) card.classList.add("completed");

            card.innerHTML = `
        <h3>${course.code}</h3>
        <p class="course-title"><strong>${course.title}</strong></p>
        <p class="course-desc">${course.description}</p>
        <p class="course-meta">${course.credits} credit${course.credits > 1 ? "s" : ""} • ${course.category.toUpperCase()}</p>
        ${course.completed ? '<p class="completed-label" aria-hidden="true">Completed ✓</p>' : ''}
      `;
            container.appendChild(card);
        });

        const totalCredits = filtered.reduce((sum, c) => sum + c.credits, 0);
        totalCreditEl.textContent = `Total Credits: ${totalCredits}`;
        displayCountEl.textContent = `Courses shown: ${filtered.length}`;
    }

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => {
                b.classList.remove("active");
                b.setAttribute("aria-pressed", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-pressed", "true");
            renderCourses(btn.dataset.filter);
        });
    });

    renderCourses("all");
});