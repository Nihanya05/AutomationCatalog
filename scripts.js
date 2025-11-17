/*
 * Description: The purpose for this file is to add functionality to the site. Below you can find the description for each funtion applied.
 */

/* Load content from JSON file to craft each card */
fetch('projects.json')
  .then(response => response.json())
  .then(projects => {
    const catalogue = document.getElementById("catalogue"); // Reference to HTML element 'id=catalogue'.

    /* Crafting cards dinamically... */
    projects.forEach(project => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-name", project.name);
      card.setAttribute("data-repository", project.repository);
      card.setAttribute("data-link", project.link);
      card.setAttribute("data-description", project.descrition);
      card.setAttribute("data-aap", project.aap);
      card.setAttribute("data-os", project.os);
      card.setAttribute("data-js", project.js);
      
      const jsIcon = project.js === "Yes"
      ? ` <img src="images/bare-metal-server.svg" alt="Icon" class="icon">`
      : '';
    
      const aapIcon = project.aap === "Yes"
      ? ` <img src="images/logo--red-hat-ansible.svg" alt="Icon" class="icon">`
      : '';
      
      const osIcon = project.os === "Windows"
      ? ` <img src="images/icons8-windows.svg" alt="Icon" class="icon">` : project.os === "Linux" 
      ? ` <img src="images/linux.svg" alt="Icon" class="icon">` : '';

    /* Icon for windows gotten from: https://icons8.com/icons/family-windows */
    /* Filling cards with datasets... */
    card.innerHTML = `
      <h3>${project.name}</h3>
      <p class="hide-on-description"><strong>Asset Class:</strong> ${project.assetclass}</p>
      <p class="description">${project.description}</p>
      <div class="icon-container">
        ${jsIcon}
        ${aapIcon}
        ${osIcon}
      </div>
      <div class="bottom-right-icon">
        <a href="${project.link}" target="_blank">
          <img src="images/launch.svg" alt="Bottom-right Icon" class="icon"> <!-- Adds the icon -->
        </a>
      </div>
    `;
    
      /* Add a new card to the container */
      catalogue.appendChild(card);
    });

    /* Function - Searching cards by 'name', 'project', 'link', 'github', & 'available' */
    const searchInput = document.getElementById('searchBar');
    const cards = document.querySelectorAll('.card');

    searchInput.addEventListener('input', function() {
      const query = searchInput.value.toLowerCase();

      let resultsFound = false;

      cards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const repository = card.dataset.repository.toLowerCase();
        const link = card.dataset.link.toLowerCase();
        const aap = card.dataset.aap.toLowerCase();
        const os = card.dataset.os.toLowerCase();

        if (name.includes(query) || repository.includes(query) || link.includes(query) || aap.includes(query) || os.includes(query)) {
          card.style.display = 'block';
          resultsFound = true;
        } else {
          card.style.display = 'none';
        }
      });

      /* Subfunction - Removing 'no-results' message before appending a new card */
      const noResults = document.querySelector('.no-results');
      
      if (resultsFound && noResults) {
        noResults.remove();
      } else if (!resultsFound && !noResults) {
        const noResultsMessage = document.createElement('div');

        noResultsMessage.className = 'no-results';
        noResultsMessage.textContent = 'Not matches found.';
        document.getElementById('catalogue').appendChild(noResultsMessage);
      }
    });
  });

/* Search & filter cards by word */
//    const searchInput = document.getElementById('searchBar');
//    const cards = document.querySelectorAll('.card');
//    
//    searchInput.addEventListener('input', function() {
//    const query = searchInput.value.toLowerCase();
//    
//    let resultsFound = false;
//    
//    cards.forEach(card => {
//      const name = card.dataset.name.toLowerCase();
//      const repository = card.dataset.repository.toLowerCase();
//      const link = card.dataset.link.toLowerCase();
//      const aap = card.dataset.aap.toLowerCase();
//      const os = card.dataset.os.toLowerCase();
//    
//      if (name.includes(query) || repository.includes(query) || link.includes(query) || aap.includes(query) || os.includes(query)) {
//        card.style.display = 'block';
//        resultsFound = true;
//      } else {
//        card.style.display = 'none';
//      }
//    });
//    
//    if (!resultsFound) {
//      const noResults = document.createElement('div');
//      noResults.className = 'no-results';
//      noResults.textContent = 'Not matches.';
//      document.getElementById('catalogue').appendChild(noResults);
//    } else {
//      const noResults = document.querySelector('.no-results');
//      if (noResults) {
//        noResults.remove();
//      }
//    }
//    });
//  })
//  .catch(error => console.error('Error to load JSON file!!!', error));

/* Come and join the dark side */
const themeToggleButton = document.getElementById("themeToggle");

themeToggleButton.addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
  document.querySelector("header").classList.toggle("dark-mode");
  document.querySelectorAll(".card").forEach(card => {
    card.classList.toggle("dark-mode");
  });
  document.querySelectorAll(".search.input").forEach(input => {
    input.classList.toggle("dark-mode");
  });
  document.querySelectorAll(".no-results").forEach(noResult => {
    noResult.classList.toggle("dark-mode");
   });

  /* Switch moon-sun icon */
  if (document.body.classList.contains("dark-mode")) {
    themeToggleButton.textContent = "꩜";
  } else {
    themeToggleButton.textContent = "⏾";
  }
});
