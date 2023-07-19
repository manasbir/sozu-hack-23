import { NextApiRequest, NextApiResponse } from 'next';
import { Contract, Wallet } from 'ethers';
import Axios from 'axios';
import { PROVIDER_NAMES, Provider, ProviderName } from '../../types/activity';
import faucetABI from '../../types/faucetABI';

const { WALLET_PRIVATE_KEY, FAUCET_CONTRACT_ADDRESS } = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sponsor = new Wallet(WALLET_PRIVATE_KEY);
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
  await faucetContract.drip(req.body.user, 1 + (.2 * matchedProviders.length));
  res.status(200);
}
