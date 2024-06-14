""" 
import mysql.connector
import serial
import time

# Configuración de la conexión serial con Arduino
puerto_serial = 'COM4'  # Ajusta 'COM3' al puerto correcto de tu Arduino
baudios = 9600

# Configuración de la conexión a la base de datos
config = {
    'host': '103.195.100.76',
    'user': 'admin',
    'password': 'admin',
    'database': 'urkupina'
}

try:
    # Establecer la conexión a la base de datos
    conexion_bd = mysql.connector.connect(**config)

    # Comprobar si la conexión a la base de datos fue exitosa
    if conexion_bd.is_connected():
        print("Conexión exitosa a la base de datos.")

        # Crear un cursor para ejecutar consultas
        cursor_bd = conexion_bd.cursor()

        # Obtener el número de ticket que deseas consultar
        N_ticket = input("Ingrese el número de ticket a consultar: ")

        # Realizar una consulta a la tabla 'tickets' para el número de ticket específico
        consulta_bd = f"SELECT carga FROM tickets WHERE N_ticket = '{N_ticket}'"
        cursor_bd.execute(consulta_bd)

        # Obtener los resultados
        resultado_bd = cursor_bd.fetchone()

        # Imprimir el resultado por consola
        if resultado_bd:
            carga = resultado_bd[0]  # Obtener el valor de la columna 'carga'

            # Verificar el valor de 'carga'
            if carga.lower() == 'true':
                print("Avanzar")

                # Establecer la conexión serial con Arduino
                ser = serial.Serial(puerto_serial, baudios)
                time.sleep(2)  # Esperar a que se establezca la conexión

                # Enviar el comando de avance a Arduino
                ser.write(b'AVANCE')  # Ajusta el comando según lo que espera tu programa Arduino

                # Cerrar la conexión serial
                ser.close()

                # Aquí podrías actualizar la columna 'carga' a 'false' en la base de datos

            else:
                print("No avanzar")

        else:
            print(f"No se encontró un ticket con el número {N_ticket}")

except mysql.connector.Error as err:
    print(f"No se pudo conectar a la base de datos. Mensaje de error: {err}")

finally:
    # Cerrar el cursor y la conexión a la base de datos al finalizar
    if 'conexion_bd' in locals() and conexion_bd.is_connected():
        cursor_bd.close()
        conexion_bd.close()
        print("Conexión a la base de datos cerrada.") """


import requests
import serial
import time

# Configuración de la conexión serial con Arduino
puerto_serial = 'COM4'  # Ajusta 'COM3' al puerto correcto de tu Arduino
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

            # Obtener la respuesta JSON de la API (si es necesario)
            data = response.json()

            # Verificar si la respuesta indica que se puede avanzar
            if data.get('status') == 'OK':
                return True
            else:
                return False

        else:
            print(f"Error en la solicitud a la API. Código de estado: {response.status_code}")
            return False

    except requests.exceptions.RequestException as e:
        print(f"No se pudo conectar con la API. Error: {e}")
        return False

# Obtener el número de ticket desde la entrada del usuario o algún otro método
numero_ticket = input("Ingrese el número de ticket a consultar: ")

# Llamar a la función para descargar el ticket desde la API
if descargar_ticket(numero_ticket):
    print("Avanzar")

    # Establecer la conexión serial con Arduino
    ser = serial.Serial(puerto_serial, baudios)
    time.sleep(2)  # Esperar a que se establezca la conexión

    # Enviar el comando de avance a Arduino
    ser.write(b'AVANCE')  # Ajusta el comando según lo que espera tu programa Arduino

    # Cerrar la conexión serial
    ser.close()

else:
    print("No avanzar")

# No necesitas manejar explícitamente la conexión y el cursor de la base de datos
# ya que ahora estás usando la API en lugar de MySQL directamente.
