'use client';

import Image from 'next/image';
import { getQrCode } from '@/lib/getQrCode';

type QRCodeProps = {
  value: string;
};

const QRCode = ({ value }: QRCodeProps) => {
  const qrValue = getQrCode(value);

  return <Image src={qrValue} alt="QR Code" width={36} height={36} />;
};

export default QRCode;
