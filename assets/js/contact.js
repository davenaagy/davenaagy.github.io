(function() {
  // Initialize EmailJS with your Public Key
  emailjs.init("EF7ctNbkv4uOL6YG9"); // Replace with your actual public key
})();

document.querySelector('#contact form').addEventListener('submit', function(e) {
  e.preventDefault();

  const submitButton = this.querySelector('input[type="submit"]');
  const originalButtonText = submitButton.value;
  
  // Disable button and show loading state
  submitButton.disabled = true;
  submitButton.value = 'Sending...';
  
  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  if (!formData.name || !formData.email || !formData.message) {
    alert('Please fill in all fields.');
    submitButton.disabled = false;
    submitButton.value = originalButtonText;
    return;
  }

  // Send email using EmailJS
  sendEmail("template_9b6zvr5", formData, submitButton, originalButtonText) // Send Lead email
  // sendEmail("template_0i8ahsg", formData, submitButton, originalButtonText) // Send Auto Reply email
});

const sendEmail = (templateId, formData, submitButton, originalButtonText) => {
  emailjs.send('service_9hfq90g', templateId, formData)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      
      // Show success message
      submitButton.value = 'Message Sent!';
      submitButton.style.backgroundColor = '#4CAF50';
      
      // Reset form
      document.querySelector('#contact form').reset();
      
      // Reset button after 3 seconds
      setTimeout(function() {
        submitButton.disabled = false;
        submitButton.value = originalButtonText;
        submitButton.style.backgroundColor = '';
      }, 3000);
      
    }, function(error) {
      console.log('FAILED...', error);
      
      // Show error message
      submitButton.value = 'Failed to Send';
      submitButton.style.backgroundColor = '#f44336';
      
      // Reset button after 3 seconds
      setTimeout(function() {
        submitButton.disabled = false;
        submitButton.value = originalButtonText;
        submitButton.style.backgroundColor = '';
      }, 3000);
    });
}