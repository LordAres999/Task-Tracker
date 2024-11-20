// Global variables
let seconds = 0;
let minutes = 0;
let hours = 0;
let isRunning = false;
let intervalId; // Declare intervalId globally

// Function to filter table rows based on selected category
function filterTable() {
    const selected = document.getElementById("filter").value.toLowerCase();
    const tableRows = document.querySelectorAll(".table-body tr");

    tableRows.forEach(row => {
        const category = row.cells[0].innerText.trim().toLowerCase();
        if (selected === "all" || category === selected) {
            row.style.display = "table-row";
        } else {
            row.style.display = "none";
        }
    });
}

document.getElementById("filter").addEventListener("change", filterTable);

// Start/Stop button for the stopwatch
function startStopButton() {
    if (!isRunning) {
        isRunning = true;
        intervalId = setInterval(() => {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }

            document.getElementById('startstopbutton').innerText = 'STOP';
            updateTimeDisplay();
        }, 1000);
    } else {
        isRunning = false;
        clearInterval(intervalId);
        document.getElementById("startstopbutton").innerText = "Start";
    }
}

// Function to reset the timer
function resetTimer() {
    clearInterval(intervalId);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("startstopbutton").innerText = "Start";
    updateTimeDisplay();
}

// Helper function to update the stopwatch display
function updateTimeDisplay() {
    let formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    document.querySelector('.stopwatch').innerText = formattedTime;
}

// Form submission to add a new row to the table
document.getElementById("form-entry").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form values
    const category = document.getElementById("category").value;
    const subCategory = document.getElementById("subCategory").value;
    const duration = document.querySelector('.stopwatch').innerText;
    const task = document.getElementById("task").value;

    // Input validation
    if (!category || !subCategory || !task) {
        alert("Please fill out all fields before submitting.");
        return; // Prevent form submission if fields are empty
    }

    // Create new table row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${category}</td>
        <td>${subCategory}</td>
        <td>${duration}</td>
        <td>${task}</td>
        <td>
            <button onclick="updateRow(this)">Update</button>
            <button onclick="deleteRow(this)">Delete</button>
        </td>
    `;

    document.querySelector(".table-body").appendChild(newRow);
    document.getElementById("form-entry").reset();
    resetTimer(); // Reset the stopwatch after adding the task
});

// Function to update a table row
function updateRow(button) {
    const row = button.closest("tr");
    const cells = row.querySelectorAll("td");

    // Populate form fields with row data
    document.getElementById("category").value = cells[0].innerText.trim();
    document.getElementById("subCategory").value = cells[1].innerText.trim();
    document.querySelector('.stopwatch').innerText = cells[2].innerText.trim();
    document.getElementById("task").value = cells[3].innerText.trim();

    row.remove(); // Remove the row after editing
}

// Function to delete a table row
function deleteRow(button) {
    const row = button.closest("tr");
    row.remove(); // Remove the row from the table
}
