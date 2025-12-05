// Get the modal and the button to open it
const modal = document.getElementById("contactModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementsByClassName("close")[0];
const contactForm = document.getElementById("contactForm");  // Form element
const messageDiv = document.getElementById("message");  // Div to show messages

// Open the modal when the button is clicked
openModalBtn.onclick = function() {
    modal.style.display = "block";
}

// Close the modal when the close button is clicked
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Close the modal if the user clicks anywhere outside the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Handle form submission with AJAX (fetch)
contactForm.onsubmit = function(event) {
    event.preventDefault();  // Prevent default form submit

    const formData = new FormData(contactForm);  // Collect form data
    const username = formData.get('username');
    const email = formData.get('email');

    // Send the form data to the server using AJAX (fetch)
    fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify({ username, email }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            messageDiv.innerHTML = "Submitted successfully!";
            messageDiv.style.color = "green";
        } else if (data.status === 'email_exists') {
            messageDiv.innerHTML = "Email already submitted!";
            messageDiv.style.color = "red";
        } else {
            messageDiv.innerHTML = "Error: " + data.message;
            messageDiv.style.color = "red";
        }
    })
    .catch(error => {
        messageDiv.innerHTML = "Error: " + error.message;
        messageDiv.style.color = "red";
    });
};
