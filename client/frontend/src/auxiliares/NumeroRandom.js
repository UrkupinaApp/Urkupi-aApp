export default function NumeroRandom() {
    const numeros = '0123456789';
    let numeroAleatorio = '';
  
    while (numeroAleatorio.length < 20) {
      const digitoAleatorio = numeros.charAt(Math.floor(Math.random() * numeros.length));
  
      // Verifica si el dígito ya está en el número
      if (numeroAleatorio.indexOf(digitoAleatorio) === -1) {
        numeroAleatorio += digitoAleatorio;
      }
    }
  
    return numeroAleatorio;
  }