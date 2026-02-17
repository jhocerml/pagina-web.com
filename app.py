from flask import Flask, render_template, request, flash
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

app.secret_key = os.getenv('FLASK_SECRET_KEY', '0020022020')

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = app.config['MAIL_USERNAME']

mail = Mail(app)

# Lista de productos (simulación base de datos)
productos = [
    {"nombre": "ADIDAS CAMPUS", "imagen": "heroo.jpeg", "precio": 299, "linea": "Originals", "genero": "mujer"},
    {"nombre": "ADIDAS CAMPUS", "imagen": "zpt.jpeg",   "precio": 299, "linea": "Originals", "genero": "mujer"},
    {"nombre": "ADIDAS CAMPUS", "imagen": "zptr.jpeg",  "precio": 299, "linea": "Originals", "genero": "hombre"},
    {"nombre": "ADIDAS CAMPUS", "imagen": "3.jpeg",     "precio": 299, "linea": "Originals", "genero": "hombre"},
    {"nombre": "ADIDAS CAMPUS", "imagen": "4.jpeg",     "precio": 299, "linea": "Originals", "genero": "ninos"},
    {"nombre": "ADIDAS CAMPUS", "imagen": "12.jpeg",    "precio": 299, "linea": "Originals", "genero": "ninos"},
    {"nombre": "ADIDAS CAMPUS", "imagen": "444.jpeg",   "precio": 299, "linea": "Originals", "genero": "mujer"},
]




@app.route('/')
def index():
    return render_template('index.html', productos=productos)

@app.route('/send_email', methods=['POST'])
def send_email():
    try:
        nombre = request.form['nombre']
        correo = request.form['correo']
        mensaje = request.form['mensaje']

        # Crear el mensaje de correo
        msg = Message('Nuevo mensaje de contacto',
                      sender=app.config['MAIL_USERNAME'],
                      recipients=[app.config['MAIL_USERNAME']])
        msg.body = f"Nombre: {nombre}\nCorreo: {correo}\nMensaje: {mensaje}"

        # Enviar el mensaje
        mail.send(msg)
        flash("Mensaje enviado correctamente.", "success")
    except Exception as e:
        print(f"Error: {e}")
        flash("Ocurrió un error al enviar el mensaje. Intenta de nuevo más tarde.", "danger")

    return render_template('index.html', productos=productos)


if __name__ == "__main__":
    app.run(debug=True)