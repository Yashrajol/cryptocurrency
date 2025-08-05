import { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';

export const useCrypto = () => useContext(CryptoContext);