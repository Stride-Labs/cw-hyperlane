/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.16.5.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import { InstantiateMsg, ExecuteMsg, QueryMsg, MigrateMsg, OriginDomainResponse } from "./Hub.types";
export interface HubReadOnlyInterface {
  contractAddress: string;
  originDomain: () => Promise<OriginDomainResponse>;
}
export class HubQueryClient implements HubReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.originDomain = this.originDomain.bind(this);
  }

  originDomain = async (): Promise<OriginDomainResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      origin_domain: {}
    });
  };
}
export interface HubInterface extends HubReadOnlyInterface {
  contractAddress: string;
  sender: string;
  instantiate: ({
    defaultIsm,
    owner
  }: {
    defaultIsm: string;
    owner: string;
  }, fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
  migrate: (fee?: number | StdFee | "auto", memo?: string, funds?: Coin[]) => Promise<ExecuteResult>;
}
export class HubClient extends HubQueryClient implements HubInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.instantiate = this.instantiate.bind(this);
    this.migrate = this.migrate.bind(this);
  }

  instantiate = async ({
    defaultIsm,
    owner
  }: {
    defaultIsm: string;
    owner: string;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      instantiate: {
        default_ism: defaultIsm,
        owner
      }
    }, fee, memo, funds);
  };
  migrate = async (fee: number | StdFee | "auto" = "auto", memo?: string, funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      migrate: {}
    }, fee, memo, funds);
  };
}