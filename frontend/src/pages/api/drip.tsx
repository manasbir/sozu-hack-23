import { NextApiRequest, NextApiResponse } from 'next';
import { Contract, Wallet } from 'ethers';
import faucetABI from '../../types/faucetABI';

const { WALLET_PRIVATE_KEY, FAUCET_CONTRACT_ADDRESS } = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sponsor = new Wallet(WALLET_PRIVATE_KEY);
  const faucetContract = new Contract(FAUCET_CONTRACT_ADDRESS, faucetABI.abi, sponsor);
  await faucetContract.drip(req.body.user);
  res.status(200);
}
