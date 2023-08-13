import { toDataURL, type QRCodeToDataURLOptions } from 'qrcode';

export const getQrCode = (value: string, options: QRCodeToDataURLOptions) => {
  let qrValue: string = '';

  toDataURL(value, options, (err, url) => {
    if (err) {
      throw err;
    }

    qrValue = url;
  });

  return qrValue;
};
