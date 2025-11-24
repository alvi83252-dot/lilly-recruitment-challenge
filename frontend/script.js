
// create medicine
document.getElementById('createForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('newName').value;
    const price = parseFloat(document.getElementById('newPrice').value);
    const nameRegex = /^[a-zA-Z0-9 ]{2,50}$/;

    if (!name) {
        alert('Medicine name cannot be empty');
        return;
    }

    if (!nameRegex.test(name)) {
        alert('Medicine name must be 2-50 characters long and only contain letters, numbers, and spaces');
        return;
    }

    if (isNaN(price) || price < 0) {
        alert('Price must be a valid number greater than or equal to 0.');
        return;
    }

    // send a POST request to the backend to create medicine
    try {
        const response = await fetch('http://localhost:8000/create', {
            method: 'POST',
            body: new URLSearchParams({ name, price})
        });
        const result = await response.json();
        alert(result.message || result.error);
        fetchMedicines(); //refresh the list after creation
        e.target.reset(); // reset form fields
    } catch (err) {
        console.error(err);
        alert('Error Creating Medicine')
    }
});

// update medicine
document.getElementById('updateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('updateName').value;
    const price = parseFloat(document.getElementById('updatePrice').value);
    const nameRegex = /^[a-zA-Z0-9 ]{2,50}$/;

    if (!name) {
        alert('Medicine name cannot be empty');
        return;
    }

    if (!nameRegex.test(name)) {
        alert('Medicine name must be 2-50 characters long and only contain letters, numbers, and spaces');
        return;
    }
    
    if (isNaN(price) || price < 0) {
        alert('Price must be a valid number greater than or equal to 0.');
        return;
    }

        // send a POST request to the backend to create medicine
    try {
        const response = await fetch('http://localhost:8000/update', {
            method: 'POST',
            body: new URLSearchParams({ name, price })
        });
        const result = await response.json();
        alert(result.message || result.error);
        fetchMedicines(); // refresh the list
        e.target.reset(); // reset form fields
    } catch (err) {
        console.error(err);
        alert('Error Updating Medicine')
    }
});

// Delete Medicine
document.getElementById('deleteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('deleteName').value;


        // send a POST request to the backend to create medicine
    try {
        const response = await fetch('http://localhost:8000/delete', {
            method: 'DELETE',
            body: new URLSearchParams({ name })
        });
        const result = await response.json();
        alert(result.message || result.error);
        fetchMedicines(); // refresh medicine list after update
        e.target.reset(); // reset form fields
    } catch (err) {
        console.error(err) 
        alert('Error Deleting Medicine');
    }
});

// now we fetch the medicines fom backend when the browser opens
async function fetchMedicines() {
    try {
        const response = await fetch('http://localhost:8000/medicines');
        const data = await response.json();

        // checks if list is empty
        if (!data.medicines || data.medicines.length === 0) {
            document.getElementById('medicinesList').innerHTML = 
            '<p>No medicines available.</p>';
            return;
        }

        // clean and display the fecthed medicines
        CleanAndDisplayMedicines(data.medicines);

    } catch (error) {
        console.error('Error fetching medicines:', error);
        document.getElementById('medicinesList').innerHTML = 
        '<p>Error loading medicines. Please try again later.</p>';
    }
}

document.getElementById("searchBar").addEventListener("input", function() {
        const query = this.value.toLowerCase();

        // select all cards inside medicineList
        const cards = document.querySelectorAll("#medicinesList > div");

        cards.forEach(card => {
            // get medicine name 
            const nameElement = card.querySelector("h3");
            const name = nameElement ? nameElement.textContent.toLowerCase() : "";

            // show only matching cards
            if (name.includes(query)) {
                card.classList.remove("hide");
                setTimeout(() => card.style.display = "block", 200);
            } else {
                card.classList.add("hide");
                setTimeout(() => card.style.display = "none", 200);
            }
        });
});

// function to validate and clean and display medicines
function CleanAndDisplayMedicines(medicines) {
    const cleanedMedicines = medicines.map(med => { // presents elements in a list while filter will filter out elements that meet the condition in the function
        let issue = [];

        //Validate name
        if (!med.name || typeof med.name !== 'string' || med.name.trim() === '') {
            med.name = 'Unknown Medicine'; // fallback name
            issue.push('Invalid name');
        }

        //Validate price
        if (med.price === null || med.price === undefined || isNaN(med.price) || med.price < 0) {
            med.price = "Price not available"; // fallback price
            issue.push('Invalid or missing price');
        }

        return { ...med, issue };
    });

    displayMedicines(cleanedMedicines);
}

//display medicines on the screen
function displayMedicines(medicines) {
    const container = document.getElementById('medicinesList');
    container.innerHTML = ''; // Clear existing content

    medicines.forEach(med => {
        const card = document.createElement('div');
        card.className = 'medicine-card';

        // yellow highlight if there are issues
        if (med.issue.length > 0) {
            card.classList.add('warning-card');
        }

        card.innerHTML = `
            <h3>${med.name}</h3>
            <p><strong>Price:</strong> ${med.price}</p>

            ${med.issue.length > 0 ? `
            <div class="warning-box">
                <strong>Data Issues:</strong>
                <ul>
                    ${med.issue.map(issue => `<li>${issue}</li>`).join("")}
                </ul>
            </div>
            ` : ""}
        `;

        container.appendChild(card);
    });
}

// run on page load
document.addEventListener('DOMContentLoaded', fetchMedicines);  
