export default function generarCadenaAleatoria() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let cadenaAleatoria = '';
  
    while (cadenaAleatoria.length < 20) {
      const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  
      // Verifica si el caracter ya está en la cadena
      if (cadenaAleatoria.indexOf(caracterAleatorio) === -1) {
        cadenaAleatoria += caracterAleatorio;
      }
    }
  
    return cadenaAleatoria;
  }