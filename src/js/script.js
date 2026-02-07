// The below code is for the typing animation of the titles on the homepage
const title = document.getElementById('title');
if (title) {
  const fullText = title.textContent.trim();
  
  // clear existing children
  title.innerHTML = '';

  // create a text node that we'll update (so we don't stomp on sibling elements)
  const textNode = document.createTextNode('');
  title.appendChild(textNode);

  // create a blinking cursor element and append it inside the title
  const cursor = document.createElement('span');
  cursor.textContent = '|';
  cursor.className = 'typing-cursor';
  cursor.style.color = '#000000';
  cursor.style.marginLeft = '6px';
  cursor.style.fontWeight = '700';
  cursor.style.display = 'inline-block';
  cursor.style.verticalAlign = 'bottom';
  title.appendChild(cursor);

  // blink the cursor by toggling visibility
  setInterval(() => {
    cursor.style.visibility = (cursor.style.visibility === 'hidden') ? 'visible' : 'hidden';
  }, 500);

  let pos = 0;
  let isDeleting = false;
  const typingSpeed = 80; // base speed in ms
  const deletingSpeed = 40; // faster deleting
  const pauseAfterTyping = 1000; // pause at end before deleting
  const pauseAfterDeleting = 400; // pause when fully deleted

  function loop() {
    if (!isDeleting) {
      // typing forward
      pos++;
      textNode.nodeValue = fullText.substring(0, pos);

      if (pos === fullText.length) {
        // reached end: pause then start deleting
        isDeleting = true;
        setTimeout(loop, pauseAfterTyping);
        return;
      }
      setTimeout(loop, typingSpeed);
    } else {
      // deleting
      pos--;
      textNode.nodeValue = fullText.substring(0, pos);

      if (pos === 0) {
        // fully deleted: pause then start typing again
        isDeleting = false;
        setTimeout(loop, pauseAfterDeleting);
        return;
      }
      setTimeout(loop, deletingSpeed);
    }
  }

  loop();
}

// The below code is for handling the contact form submisson via Formspree using AJAX

const form = document.querySelector('#contact-form')
const statusMessage = document.querySelector('#form-status')

//   // adding an event listener to the form's submit event
//   // (see how the query selector on line 3 selects the whole form itself by its id)

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // stops the normal page redirect to Formspree

  statusMessage.textContent = "Sending..."
  statusMessage.className = "my-4 text-sm text-blue-600" // adds margin top-bottom with text properties

  const formData = new FormData(form) // extracts the form's data and puts it as an object (key-value pairs)

  try {
    const response = await fetch(form.action, {
      method: form.method, // POST
      body: formData, // form data itself
      headers: { Accept: 'application/json' } // expects the response in JSON format'}
    })

    if (response.ok) {
        // SUCCESS
        statusMessage.textContent = "Thank you! Your message has been sent.";
        statusMessage.className = "mt-4 text-md text-green-600";
        form.reset();
      }
      else {
        // ERROR from Formspree
        const result = await response.json();

        if (result.errors) {
          statusMessage.textContent = result.errors.map(e => e.message).join(", ");
        }
        else {
          statusMessage.textContent = "Oops! Something went wrong. Please try again.";
        }
        statusMessage.className = "mt-4 text-md text-red-600";
      }
    } catch (error) {
      // NETWORK ERROR
      statusMessage.textContent = "Network error. Please try again later.";
      statusMessage.className = "mt-4 text-md text-red-600";
    }
});
