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
      chain: {
          id: 984123,
          network: 'forma',
          name: 'Forma',
          nativeCurrency: { name: 'TIA', symbol: 'TIA', decimals: 18 },
          rpcUrls: {
            default: {
              http: ['https://rpc.sketchpad-1.forma.art']
            },
            public: {
              http: ['https://rpc.sketchpad-1.forma.art'],
              webSocket: undefined
            }
          }
        },
      transport: http(endpoint),
    }),
    exec: createWalletClient({
      chain: {
        id: 984123,
        network: 'forma',
        name: 'Forma',
        nativeCurrency: { name: 'TIA', symbol: 'TIA', decimals: 18 },
        rpcUrls: {
          default: {
            http: ['https://rpc.sketchpad-1.forma.art']
          },
          public: {
            http: ['https://rpc.sketchpad-1.forma.art'],
            webSocket: undefined
          }
        }
      },
      account,
      transport: http(endpoint),
    }),
  };

  CONTAINER.bind(Dependencies).toConstantValue({ account, provider });
}
