import { NextApiRequest, NextApiResponse } from 'next';
import { Contract, Wallet, providers, Transaction, utils } from 'ethers';
import Axios from 'axios';
import { PROVIDER_NAMES, Provider, ProviderName } from '../../types/activity';
import faucetABI from '../../types/faucetABI';

const { JsonRpcProvider } = providers;

const { WALLET_PRIVATE_KEY, FAUCET_CONTRACT_ADDRESS } = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const RPCProvider = new JsonRpcProvider('https://rpc.testnet.mantle.xyz');
  const sponsor = new Wallet(WALLET_PRIVATE_KEY, RPCProvider);
  const faucetContract = new Contract(FAUCET_CONTRACT_ADDRESS, faucetABI.abi, sponsor);
  const addressActivityResponse = await Axios.get(`https://api.knowyourcat.id/v1/${req.body.address}`);
  const addressActivity = addressActivityResponse?.data;
  const { providers } = addressActivity;
  const matchedProviders: string[] = []
  providers.forEach((provider: Provider) => {
    if (PROVIDER_NAMES.includes(provider.name as ProviderName) && provider.result) {
      matchedProviders.push(provider.name)
    }
  });
  const MNTAmount = 1 + (.2 * matchedProviders.length)
  const tx: Transaction = await faucetContract.drip(req.body.address, utils.parseEther(MNTAmount.toString()));
  res.status(200).json({ txHash: tx.hash });
}
