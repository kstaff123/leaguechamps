document.addEventListener("DOMContentLoaded", function() {
    const championGrid = document.getElementById("champion-grid");

    // Function to create a champion card element with flip effect
    function createChampionCard(champion) {
        // Create the main card container
        const card = document.createElement("div");
        card.className = "champion-card";

        // Inner div for the flipping effect
        const inner = document.createElement("div");
        inner.className = "champion-inner";

        // Front of the card
        const front = document.createElement("div");
        front.className = "champion-front";
        front.style.backgroundImage = `url('${champion.splash_art}')`;

        // Overlay with champion name
        const overlay = document.createElement("div");
        overlay.className = "champion-overlay";
        const nameSpan = document.createElement("span");
        nameSpan.textContent = champion.name.toUpperCase();
        overlay.appendChild(nameSpan);
        front.appendChild(overlay);

        // Back of the card with champion details
        const back = document.createElement("div");
        back.className = "champion-back";

        const backTitle = document.createElement("h2");
        backTitle.textContent = champion.name;

        const archetype = document.createElement("p");
        archetype.textContent = `Role: ${champion.archetype}`;

        const description = document.createElement("p");
        description.textContent = champion.description;

        back.appendChild(backTitle);
        back.appendChild(archetype);
        back.appendChild(description);

        // Append front and back to inner, and inner to card
        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);

        // Add event listener for flipping effect on the inner container
        card.addEventListener("click", () => {
            inner.classList.toggle("flip");
        });

        return card;
    }

    // Fetch the champions data from the JSON file
    fetch("champs.json")
        .then(response => response.json())
        .then(championsData => {
            // Clear the grid to avoid duplicates
            championGrid.innerHTML = '';

            // Populate the grid with champions
            championsData.forEach(champion => {
                const card = createChampionCard(champion);
                championGrid.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching champions data:', error));
});
