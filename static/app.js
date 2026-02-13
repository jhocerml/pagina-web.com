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
    submitButton.disabled = true;

    const formData = new FormData(this);

    fetch("/send_email", {
        method: "POST",
        body: formData,
        headers: { "X-Requested-With": "XMLHttpRequest" }
    })
    .then(async (response) => {

        const data = await response.json().catch(() => ({}));

        if (!response.ok || !data.ok) {
            throw new Error(data.message || "Error");
        }

        return data;
    })
    .then((data) => {

        showFlashMessage(data.message || "Mensaje enviado correctamente.", "success");

        document.getElementById("contact-form").reset();

        submitButton.classList.remove("loading");
        submitButton.disabled = false;

    })
    .catch((error) => {

        showFlashMessage(error.message || "Hubo un error al enviar el mensaje.", "danger");

        console.error("Error:", error);

        submitButton.classList.remove("loading");
        submitButton.disabled = false;
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

document.getElementById("year").textContent = new Date().getFullYear();
