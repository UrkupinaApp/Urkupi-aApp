import requests
import serial
import time

# Configuración de la conexión serial con Arduino
puerto_serial = 'COM3'  # Ajusta 'COM3' al puerto correcto de tu Arduino
baudios = 9600

# URL de la API para descargar tickets
url_api = 'http://103.195.100.76:3002/tickets/descargar'

# Función para hacer la solicitud a la API
def descargar_ticket(numero_ticket):
    try:
        # Realizar la solicitud POST a la API
        response = requests.post(url_api, json={'numero_ticket': numero_ticket})

        # Verificar si la solicitud fue exitosa (código de respuesta 200)
        if response.status_code == 200:
            print("Respuesta de la API: OK")
            return True
        else:
            print(f"Error en la solicitud a la API. Código de estado: {response.status_code}")
            return False

    except requests.exceptions.RequestException as e:
        print(f"No se pudo conectar con la API. Error: {e}")
        return False

# Loop infinito para leer tickets continuamente
while True:
    try:
        # Obtener el número de ticket desde la entrada del usuario o algún otro método
        numero_ticket = input("Ingrese el número de ticket a consultar (o 'exit' para salir): ")

        if numero_ticket.lower() == 'exit':
            break  # Salir del loop si se ingresa 'exit'

        # Llamar a la función para descargar el ticket desde la API
        if descargar_ticket(numero_ticket):
            print("Avanzar")

            # Establecer la conexión serial con Arduino
            ser = serial.Serial(puerto_serial, baudios)
            time.sleep(2)  # Esperar a que se establezca la conexión

            # Enviar el comando de avance a Arduino
            ser.write(b'AVANCE')  # Ajusta el comando según lo que espera tu programa Arduino

            # Cerrar la conexión serial
            time.sleep(2)
            ser.close()

        else:
            print("No avanzar")

    except KeyboardInterrupt:
        print("\nSaliendo del script.")
        break
