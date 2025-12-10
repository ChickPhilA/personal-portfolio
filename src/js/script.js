// The below code is for handling the contact form submisson via Formspree using AJAX

const form = document.querySelector('#contact-form');
const statusMessage = document.querySelector('#form-status');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // stops the normal page redirect to Formspree

    statusMessage.textContent = "Sending...";
    statusMessage.className = "mt-4 text-sm text-blue-600";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method, // POST
        body: formData, // form data itself
        headers: { 'Accept': 'application/json' } // expects the response in JSON format
      });

      if (response.ok) {
        // SUCCESS
        statusMessage.textContent = "Thank you! Your message has been sent.";
        statusMessage.className = "mt-4 text-sm text-green-600";
        form.reset();
      } else {
        // ERROR from Formspree
        const result = await response.json();
        if (result.errors) {
          statusMessage.textContent = result.errors.map(e => e.message).join(", ");
        } else {
          statusMessage.textContent = "Oops! Something went wrong. Please try again.";
        }
        statusMessage.className = "mt-4 text-sm text-red-600";
      }
    } catch (error) {
      // NETWORK ERRORso
      statusMessage.textContent = "Network error. Please try again later.";
      statusMessage.className = "mt-4 text-sm text-red-600";
    }
});
