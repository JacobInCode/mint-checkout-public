import { projectConfig } from 'config';
import { env } from './constants';

export const getOpenseaLink = (tokenId: number | string): string =>
  `https://${
    // eslint-disable-next-line radix
    env.NETWORK_ID === '1' ? '' : 'testnets.'
  }opensea.io/assets/ethereum/${env.CONTRACT_ADDRESS}/${tokenId}`;

const mintDataPerAddress = projectConfig.allowList.reduce((res, curr, index) => {
  const { amount } = curr;
  const address = curr.address.toLowerCase();
  res[address] = {
    address,
    amount,
    index,
  };
  return res;
}, {} as { [key: string]: { address: string; amount: number; index: number } });

export const getMintDataForAddress = (address: string) =>
  mintDataPerAddress[address] || {
    address,
    amount: 0,
    index: -1,
  };

export const shortenAddress = (address: string) =>
  address
    .slice(0, 6)
    .concat('...')
    .concat(address.slice(address.length - 4, address.length));
