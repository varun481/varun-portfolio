
        document.addEventListener("DOMContentLoaded", function() {
            document.querySelector("#contact-form").addEventListener("submit", async function(event) {
                event.preventDefault(); // Prevent default form submission

                const form = event.target;
                const formData = new FormData(form);

                var userName = form.querySelector("[name='name']").value.trim();
                var userEmail = form.querySelector("[name='email']").value.trim();
                var userMessage = form.querySelector("[name='message']").value.trim();

                if (!userName || !userEmail || !userMessage) {
                    alert("All fields are required!");
                    return;
                }

                if (!validateEmail(userEmail)) {
                    alert("Please enter a valid email address!");
                    return;
                }

                try {
                    const response = await fetch("https://formspree.io/f/mzzrbqno", {
                        method: "POST",
                        body: JSON.stringify({ name: userName, email: userEmail, message: userMessage }),
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        }
                    });

                    const result = await response.json();
                    if (response.ok) {
                        alert("✅ Email sent successfully!");
                        form.reset();
                    } else {
                        alert("❌ Failed to send email: " + (result.error || "Unknown error."));
                    }
                } catch (error) {
                    alert("❌ Network error: " + error.message);
                }
            });

            function validateEmail(email) {
                var re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
                return re.test(email);
            }
        });

function resizeImage(img) {
    if (img.style.width === "1000px") {
        img.style.width = "240px"; // Back to original size
    } else {
        img.style.width = "1000px";
        img.style.height="auto"  // Resize to 1000px on click
    }
}

document.getElementById("darkModeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
});

// Preserve user preference
window.onload = function() {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
};
