document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById("members");
    const viewButtons = Array.from(document.querySelectorAll(".view-btn"));
    const membershipFilter = document.getElementById("membershipFilter");
    let membersData = [];

    async function fetchMembers() {
        try {
            const res = await fetch("data/members.json");
            if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
            membersData = await res.json();
            renderMembers(membersData);
        } catch (err) {
            membersContainer.innerHTML = `<p>Error loading members: ${err.message}</p>`;
            console.error(err);
        }
    }

    function renderMembers(list, view = "grid") {
       
        membersContainer.classList.toggle("list", view === "list");
        membersContainer.classList.toggle("grid", view === "grid");

       
        membersContainer.innerHTML = "";

        
        list.forEach(member => {
            const article = document.createElement("article");
            article.className = "member";
            article.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo" width="160" height="120" loading="lazy">
        <div class="member-info">
          <h3>${member.name}</h3>
          <p class="tagline">${member.tagline}</p>
          <p class="meta">EMAIL: <a href="mailto:${member.email}">${member.email}</a></p>
          <p class="meta">PHONE: <a href="tel:${member.phone.replace(/[^\d+]/g, '')}">${member.phone}</a></p>
          <p class="meta">URL: <a href="${member.website}" target="_blank" rel="noopener">${new URL(member.website).hostname}</a></p>
          <p class="meta">Address: ${member.address}</p>
          <p class="meta">Level: ${levelLabel(member.level)}</p>
        </div>
      `;
            membersContainer.appendChild(article);
        });
    }

    function levelLabel(level) {
        return level === 3 ? "Gold" : level === 2 ? "Silver" : "Member";
    }

   
    viewButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            viewButtons.forEach(b => {
                b.classList.remove("active");
                b.setAttribute("aria-pressed", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-pressed", "true");
            const view = btn.dataset.view;
          
            const filtered = applyFilter(membershipFilter.value);
            renderMembers(filtered, view);
        });
    });

  
    membershipFilter.addEventListener("change", () => {
        const viewBtn = document.querySelector(".view-btn.active");
        const view = viewBtn ? viewBtn.dataset.view : "grid";
        const filtered = applyFilter(membershipFilter.value);
        renderMembers(filtered, view);
    });

    function applyFilter(value) {
        if (!value || value === "all") return membersData;
        const level = parseInt(value, 10);
        return membersData.filter(m => m.level === level);
    }

   
    fetchMembers();
});