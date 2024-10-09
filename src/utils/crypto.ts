import { LOGIN_KEY } from '@/common/constants';
import { createCipheriv, createHash, randomBytes } from 'crypto';

function generateKeyFromString() {
  const inputString = LOGIN_KEY || '';
  const hash = createHash('sha256');
  const hashedString = hash.update(inputString).digest('hex');
  const key = Buffer.from(hashedString, 'hex');
  return key;
}

export const createEncryptData = async (data: string) => {
  const secretKey = generateKeyFromString();
  const vi = randomBytes(16);
  const cipher = createCipheriv('aes-256-cbc', secretKey, vi);
  const encryptedData = cipher.update(data);
  const result = Buffer.concat([encryptedData, cipher.final()]);
  return `${vi.toString('hex')}:${result.toString('hex')}`;
};
