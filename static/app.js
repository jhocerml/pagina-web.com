/*Código para el boton tipo hamburguesa en disposivos móviles*/

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

/*Código para hacer funcionar el formulario */

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const submitButton = this.querySelector('button[type="submit"]'); 
    submitButton.classList.add('loading'); 

    const formData = new FormData(this);

    fetch('/send_email', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        showFlashMessage('Mensaje enviado correctamente.', 'success');
        this.reset(); // Limpia el formulario
        submitButton.classList.remove('loading');
    })
    .catch(error => {
        showFlashMessage('Hubo un error al enviar el mensaje.', 'danger');
        console.error('Error:', error);
        submitButton.classList.remove('loading'); 
    });
});

function showFlashMessage(message, category) {
    const flashContainer = document.getElementById('flash-messages');
    const flashMessage = document.createElement('div');
    flashMessage.className = `alert ${category}`;
    flashMessage.textContent = message;

    flashContainer.appendChild(flashMessage);

   
    setTimeout(() => {
        flashMessage.remove();
    }, 5000);
}