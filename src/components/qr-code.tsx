'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import type { QRCodeToDataURLOptions } from 'qrcode';

import { getQrCode } from '@/lib/getQrCode';

type QRCodeProps = {
  value: string;
  width?: number;
  height?: number;
};

const QRCode = ({ value, width = 36, height = 36 }: QRCodeProps) => {
  const { theme } = useTheme();

  const isDarkTheme = theme === 'dark';

  const backgroundColor = isDarkTheme ? '#00000000' : '#ffffffff';
  const color = isDarkTheme ? '#C9CECD' : '#000000FF';

  const options: QRCodeToDataURLOptions = {
    width: 128,
    margin: 2,
    type: 'image/webp',
    color: {
      light: backgroundColor,
      dark: color,
    },
  };

  const qrValue = getQrCode(value, options);

  return <Image src={qrValue} alt="QR Code" width={width} height={height} />;
};

export default QRCode;
