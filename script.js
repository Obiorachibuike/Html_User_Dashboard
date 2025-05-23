   (() => {
      const sidebar = document.getElementById('sidebar');
      const hamburger = document.getElementById('hamburgerBtn');
      const body = document.body;
      const modalOverlay = document.getElementById('modalOverlay');
      const modalContent = document.getElementById('modalContent');
      const modalCloseBtn = document.getElementById('modalCloseBtn');
      
      
      
  const academicsList = document.getElementById('academicsList');
  const skillsContainer = document.getElementById('skillsContainer');
  const extrasList = document.getElementById('extrasList');
  const certList = document.getElementById('certList');

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, match => {
      const escapeMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
      return escapeMap[match];
    });
  }


      // Sidebar toggle for mobile
      const toggleSidebar = () => {
        sidebar.classList.toggle('show');
        hamburger.classList.toggle('open');
        body.classList.toggle('sidebar-open');
      };
      hamburger.addEventListener('click', toggleSidebar);
      hamburger.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleSidebar();
        }
      });
      
      // Navigation highlight logic
      const navItems = sidebar.querySelectorAll('nav ul li');
      navItems.forEach(item => {
        item.addEventListener('click', () => {
          navItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          // Could hook to scroll to sections or other behavior
          // For now just highlight
          if (window.innerWidth <= 900) toggleSidebar();
        });
      });

      // Modal management
      const sectionsData = {
        academic: {
          title: 'Add Academic/Experience',
          inputs: [
            {label: 'Title', id: 'titleInput', type: 'text', placeholder: 'e.g. Bachelor of Science'},
            {label: 'Subtitle', id: 'subtitleInput', type: 'text', placeholder: 'e.g. University of Somewhere'},
            {label: 'Date', id: 'dateInput', type: 'text', placeholder: 'e.g. 2018 - 2022'},
            {label: 'Description', id: 'descInput', type: 'textarea', placeholder: 'Details or achievements'}
          ],
          addFunc: addAcademic
        },
        skill: {
          title: 'Add Skills (comma separated)',
          inputs: [
            {label: 'Skills', id: 'skillInput', type: 'text', placeholder: 'e.g. HTML, CSS, JavaScript'}
          ],
          addFunc: addSkills
        },
        extra: {
          title: 'Add Extra',
          inputs: [
            {label: 'Extra item', id: 'extraInput', type: 'text', placeholder: 'e.g. Volunteer work'}
          ],
          addFunc: addExtra
        },
        cert: {
          title: 'Add Certificate',
          inputs: [
            {label: 'Certificate name', id: 'certInput', type: 'text', placeholder: 'e.g. AWS Certified Solutions Architect'}
          ],
          addFunc: addCert
        }
      };

      let currentSection = null;

      // Show modal with form for the chosen section type
      function showModal(type) {
        currentSection = type;
        const data = sectionsData[type];
        if (!data) return;
        // Build form HTML
        let formHtml = `<h3 id="modalTitle">${data.title}</h3><form id="modalForm" novalidate>`;
        data.inputs.forEach(input => {
          formHtml += `<label for="${input.id}">${input.label}</label>`;
          if (input.type === 'textarea') {
            formHtml += `<textarea id="${input.id}" placeholder="${input.placeholder}" required></textarea>`;
          } else {
            formHtml += `<input type="${input.type}" id="${input.id}" placeholder="${input.placeholder}" required />`;
          }
        });
        formHtml += `<div class="modal-actions">
            <button type="submit" class="btn-submit">Add</button>
          </div>
        </form>`;
        modalContent.innerHTML = formHtml;
        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        // Focus the first input
        const firstInput = modalContent.querySelector('input, textarea');
        if (firstInput) firstInput.focus();

        // Attach form submit handler
        const form = document.getElementById('modalForm');
        form.addEventListener('submit', e => {
          e.preventDefault();
          data.addFunc();
        });
      }

      function hideModal() {
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        modalContent.innerHTML = '';
        currentSection = null;
      }
      modalCloseBtn.addEventListener('click', hideModal);
      modalOverlay.addEventListener('click', e => {
        if(e.target === modalOverlay) hideModal();
      });
      document.addEventListener('keydown', e => {
        if(e.key === 'Escape' && modalOverlay.classList.contains('active')) {
          hideModal();
        }
      });
      
      



      // Utility to sanitize text for HTML
      function escapeHtml(text) {
        return text.replace(/[&<>"']/g, function(match) {
          const escapeMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
          return escapeMap[match];
        });
      }

      
      
      
  let userData = {
  academics: [
    {
      title: 'Frontend Developer',
      subtitle: 'Tech Inc.',
      date: '2021 - Present',
      desc: 'Working with React and Tailwind CSS.'
    }
  ],
  skills: ['HTML', 'CSS', 'JavaScript'],
  extras: ['Open source contributor'],
  certs: ['Google UX Design Certificate']
};

// Load data from localStorage or set default userData if none found
function loadData() {
  const stored = JSON.parse(localStorage.getItem('userData'));

  if (!stored) {
    // If no data in localStorage, save default and return it
    localStorage.setItem('userData', JSON.stringify(userData));
    return { ...userData };
  }

  return stored;
}



// This holds the live data from localStorage
let storedData = loadData();



renderAcademics();
renderSkills();
renderExtras();
renderCerts();



function saveAllData(data) {
  localStorage.setItem('userData', JSON.stringify(data));
  storedData = data; // Update the live data variable to keep in sync
}

function updateData(key, newData) {
  if (!storedData[key]) {
    storedData[key] = [];
  }

  const existing = storedData[key];
  console.log(`Before update, existing ${key}:`, existing);

  if (typeof newData === 'string') {
    if (!existing.includes(newData)) {
      existing.push(newData);
    }
  } else if (Array.isArray(newData) && typeof newData[0] === 'string') {
    newData.forEach(item => {
      if (!existing.includes(item)) {
        existing.push(item);
      }
    });
  } else {
    if (Array.isArray(newData)) {
      existing.push(...newData);
    } else {
      existing.push(newData);
    }
  }

  console.log(`After update, existing ${key}:`, existing);

  saveAllData(storedData); // Persist updated data
}


function renderAcademics() {
  const academics = storedData.academics;
  academicsList.innerHTML = academics.length === 0 
    ? `<p style="color:#94a3b8; font-style: italic;">No academic/experience entries yet.</p>` 
    : '';
  
  academics.forEach(({ title, subtitle, date, desc }, idx) => {
    const el = document.createElement('div');
    el.className = 'list-item';
    el.tabIndex = 0;
    el.innerHTML = `
      <div class="list-title">${escapeHtml(title)}</div>
      <div class="list-subtitle">${escapeHtml(subtitle)}</div>
      <div class="list-date">${escapeHtml(date)}</div>
      <div class="list-desc">${escapeHtml(desc)}</div>
      <button title="Remove entry">&times;</button>`;
    el.querySelector('button').addEventListener('click', () => {
      storedData.academics.splice(idx, 1);
      saveAllData(storedData);
      renderAcademics();
    });
    academicsList.appendChild(el);
  });
}

function renderSkills() {
  const skills = storedData.skills;
  skillsContainer.innerHTML = skills.length === 0 
    ? `<p style="color:#94a3b8; font-style: italic;">No skills added yet.</p>` 
    : '';

  skills.forEach((skill, idx) => {
    const span = document.createElement('span');
    span.className = 'skill-pill';
    span.innerHTML = `<span>${escapeHtml(skill)}</span><button>&times;</button>`;
    span.querySelector('button').addEventListener('click', () => {
      storedData.skills.splice(idx, 1);
      saveAllData(storedData);
      renderSkills();
    });
    skillsContainer.appendChild(span);
  });
}

function renderExtras() {
  const extras = storedData.extras;
  extrasList.innerHTML = extras.length === 0 
    ? `<p style="color:#94a3b8; font-style: italic;">No extra entries yet.</p>` 
    : '';

  extras.forEach((extra, idx) => {
    const el = document.createElement('div');
    el.className = 'list-item';
    el.innerHTML = `<div class="list-title">${escapeHtml(extra)}</div><button title="Remove entry">&times;</button>`;
    el.querySelector('button').addEventListener('click', () => {
      storedData.extras.splice(idx, 1);
      saveAllData(storedData);
      renderExtras();
    });
    extrasList.appendChild(el);
  });
}

function renderCerts() {
  const certs = storedData.certs;
  certList.innerHTML = certs.length === 0 
    ? `<p style="color:#94a3b8; font-style: italic;">No certificates added yet.</p>` 
    : '';

  certs.forEach((cert, idx) => {
    const el = document.createElement('div');
    el.className = 'list-item';
    el.innerHTML = `<div class="list-title">${escapeHtml(cert)}</div><button title="Remove entry">&times;</button>`;
    el.querySelector('button').addEventListener('click', () => {
      storedData.certs.splice(idx, 1);
      saveAllData(storedData);
      renderCerts();
    });
    certList.appendChild(el);
  });
}



  // Load everything on start
  loadData();
      
      
      
      
      
     



function addAcademic() {
  const title = document.getElementById('titleInput').value.trim();
  const subtitle = document.getElementById('subtitleInput').value.trim();
  const date = document.getElementById('dateInput').value.trim();
  const desc = document.getElementById('descInput').value.trim();

  if (!title || !subtitle || !date) {
    alert('Please fill in Title, Subtitle, and Date.');
    return;
  }

  updateData('academics', { title, subtitle, date, desc });
  renderAcademics();
  hideModal();
}

function addSkills() {
  const input = document.getElementById('skillInput').value.trim();
  if (!input) return alert('Please enter at least one skill.');
  
  const newSkills = input.split(',').map(s => s.trim()).filter(Boolean);
  updateData('skills', newSkills);
  renderSkills();
  hideModal();
}

function addExtra() {
  const input = document.getElementById('extraInput').value.trim();
  if (!input) return alert('Please enter a value.');
  
  updateData('extras', input);
  renderExtras();
  hideModal();
}

function addCert() {
  const input = document.getElementById('certInput').value.trim();
  if (!input) return alert('Please enter a certificate name.');

  updateData('certs', input);
  renderCerts();
  hideModal();
}




      // Buttons to open modals
      document.getElementById('btnAddAcademic').addEventListener('click', () => showModal('academic'));
      document.getElementById('btnAddSkill').addEventListener('click', () => showModal('skill'));
      document.getElementById('btnAddExtra').addEventListener('click', () => showModal('extra'));
      document.getElementById('btnAddCert').addEventListener('click', () => showModal('cert'));

      // Initialize empty views
     renderAcademics();
      renderSkills();
      renderExtras();
      renderCerts();
      
      
    })();
    
    
    
   
   
    