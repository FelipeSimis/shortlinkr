import { toDataURL, type QRCodeToDataURLOptions } from 'qrcode';

const options: QRCodeToDataURLOptions = {
  width: 36,
  margin: 2,
  type: 'image/webp',
  color: {
    light: '#000000',
    dark: '#C9CECD',
  },
};

export const getQrCode = (value: string) => {
  let qrValue: string = '';

  toDataURL(value, options, (err, url) => {
    if (err) {
      throw err;
    }

    qrValue = url;
  });

  return qrValue;
};
