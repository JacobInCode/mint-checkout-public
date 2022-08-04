import { ContractInterface } from 'ethers';
// import { MintState } from 'features/mint/mint-types';
import projectJsonConfig from './projectConfig.json';
import contractAbi from './contractAbi.json';
import allowList from './allowList.json';
import { env } from '../utils/constants';

const { name, mint, totalSupply, isFreeMint, description } = projectJsonConfig;

const contractAddress = env.CONTRACT_ADDRESS;
const networkId = env.NETWORK_ID;

// todo later
// const state = MintState.Mint;

type ProjectConfig = {
  name: string;
  // state: MintState;

  isFreeMint: boolean;
  totalSupply: number;
  mintDate: Date;
  mintPrice: number;
  description: string;
  contractAddress: string;

  networkId: string; // 1 is mainnet

  contractAbi: ContractInterface;

  allowList: Array<{
    address: string;
    amount: number;
  }>;
};

export const projectConfig: ProjectConfig = {
  name,
  description,
  // state,
  isFreeMint,
  totalSupply,
  mintDate: new Date(mint.date),
  mintPrice: mint.price,
  contractAddress,
  networkId,
  contractAbi,
  allowList,
};
