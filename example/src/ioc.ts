import { Command } from 'commander';
import { Container } from 'inversify';
import {
  Account,
  Chain,
  Hex,
  PublicClient,
  Transport,
  WalletClient,
  createPublicClient,
  createWalletClient,
  http,
} from 'viem';
import { mnemonicToAccount, privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';

import { defineChain } from 'viem/utils/chain/defineChain';

export const karak = /*#__PURE__*/ defineChain({
  id: 2410,
  network: 'karak',
  name: 'Karak',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    alchemy: {
      http: ['https://stride.rpc.karak.network?key=40i8LfO3b9lff9oa6q4Q6a0Ez5ijb8'],
    },
    infura: {
      http: ['https://stride.rpc.karak.network?key=40i8LfO3b9lff9oa6q4Q6a0Ez5ijb8'],
    },
    default: {
      http: ['https://stride.rpc.karak.network?key=40i8LfO3b9lff9oa6q4Q6a0Ez5ijb8'],
    },
    public: {
      http: ['https://stride.rpc.karak.network?key=40i8LfO3b9lff9oa6q4Q6a0Ez5ijb8'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'Etherscan',
      url: 'https://sepolia.etherscan.io',
    },
    default: {
      name: 'Etherscan',
      url: 'https://sepolia.etherscan.io',
    },
  },
  contracts: {
  },
  testnet: true,
})


export class Dependencies {
  account: Account;
  provider: {
    query: PublicClient<Transport, Chain>;
    exec: WalletClient<Transport, Chain, Account>;
  };
}

export const CONTAINER = new Container({
  autoBindInjectable: true,
  defaultScope: 'Singleton',
});

export async function injectDependencies(cmd: Command): Promise<void> {
  const { privateKey, mnemonic, endpoint } = cmd.optsWithGlobals();

  if (privateKey && mnemonic) {
    throw new Error('Cannot specify both private key and mnemonic');
  } else if (!privateKey && !mnemonic) {
    throw new Error('Must specify either private key or mnemonic');
  }

  const account = mnemonic
    ? mnemonicToAccount(mnemonic)
    : privateKeyToAccount(privateKey as Hex);

  const provider = {
    query: createPublicClient({
      chain: karak,
      transport: http(endpoint),
    }),
    exec: createWalletClient({
      chain: karak,
      account,
      transport: http(endpoint),
    }),
  };

  CONTAINER.bind(Dependencies).toConstantValue({ account, provider });
}
