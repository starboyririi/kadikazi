document.addEventListener("DOMContentLoaded", function() {
    const forgetPasswordLink = document.getElementById("forget-password-link");
    const forgetPasswordModal = document.getElementById("forget-password-modal");
    const closeButton = document.querySelector(".close-button");
    const resetButton = document.getElementById("reset-button");

    forgetPasswordLink.addEventListener("click", function(event) {
        event.preventDefault();
        forgetPasswordModal.style.display = "block";
    });

    closeButton.addEventListener("click", function() {
        forgetPasswordModal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === forgetPasswordModal) {
            forgetPasswordModal.style.display = "none";
        }
    });

    resetButton.addEventListener("click", function() {
        const email = document.getElementById("reset-email").value;
        
        if (email) {
            fetch('send_reset_email.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('A reset link has been sent to your email.');
                    forgetPasswordModal.style.display = "none";
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => console.error('Error:', error));
        } else {
            alert('Please enter a valid email address.');
        }
    });
});
