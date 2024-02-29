# Deploy Scripts

## Prerequisites

- [pnpm](https://pnpm.io/)

## Configuration

Create a `config.yaml` file in the root directory of the project. Default option for Osmosis testnet is following.

Also, you can check the full list of options in the [config.ts](./src/config.ts) file.

Generate a private key with: `{binary} keys export {name} --unarmored-hex --unsafe`

```yaml
network:
  # Chain ID
  id: "osmo-test-5"
  # Bech32 prefix
  hrp: "osmo"
  # RPC endpoint
  url: "https://rpc.osmotest5.osmosis.zone:443"
  # Gas price and denom
  gas:
    price: "0.025"
    denom: "uosmo"
  # Take the chain ID and apply an ascii / decimal conversion, 
  # then sum each integer
  domain: 1037 

signer: { PRIVATE_KEY }

deploy:
  ism:
    type: multisig
    owner: { SIGNER_ADDRESS }
    validators:
      { DOMAIN }:
        addrs:
          - { ADDRESS }
        threshold: 1

  hooks:
    default:
      type: mock

    required:
      type: aggregate
      owner: { SIGNER_ADDRESS }
      hooks:
        - type: merkle

        - type: pausable
          owner: { SIGNER_ADDRESS }
          paused: false
        - type: fee
          owner: { SIGNER_ADDRESS }
          fee:
            denom: uosmo
            amount: 1
```

## Usage

### Uploading Contract Codes

```bash
pnpm upload
```

### Deploying Contracts

```bash
pnpm run deploy
```

## Maintaining

### Adding a new contract

1. Add a new module with actual contract output name in the [contracts](./src/contracts/) directory.
2. Class name should be upper camel case conversion of the contract name.
3. Import new module [contracts/index.ts](./src/index.ts) file.
4. If a new contract is ISM or Hook, add a new option to config type.
5. Add a new field to the Contracts class in the [deploy.ts](./src/deploy.ts) file.
