import React from 'react';
import QRCode from 'qrcode.react';
import String from '../auxiliares/String'

const Qr = ({textoQr}) => {
  
    console.log(textoQr)
  return (
    <div>
     
      <QRCode value={textoQr} />
    </div>
  );
};

export default Qr;
