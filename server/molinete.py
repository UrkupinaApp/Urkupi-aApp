
import mysql.connector
import serial
import time

# Configuración de la conexión serial con Arduino
puerto_serial = 'COM4'  # Ajusta 'COM3' al puerto correcto de tu Arduino
baudios = 9600

# Configuración de la conexión a la base de datos
config = {
    'host': '192.168.0.40',
    'user': 'molinete2',
    'password': 'molinete2',
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
        print("Conexión a la base de datos cerrada.")