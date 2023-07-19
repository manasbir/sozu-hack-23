import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
import Axios from 'axios'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { BigNumber } from 'ethers';
import mantleTestnet from '../types/mantleTestnet';
import { PROVIDER_NAMES, Provider, ProviderName } from '../types/activity';
import type { Antibot } from 'zkme-antibot-component';
const DynamicAntibot = dynamic<React.ComponentProps<typeof Antibot>>(
  () => import('zkme-antibot-component').then(res => res.Antibot),
  {
    ssr: false,
  });

function Page() {
  const [isHuman, setIsHuman] = useState(false);
  const [antibotOpen, setAntibotOpen] = useState(false);
  const [activity, setActivity] = useState<string[]>([]);
  const [isClaiming, setClaiming] = useState<boolean>(false);
  const [hash, setHash] = useState();

  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (!isHuman || !address) return;
    Axios.get(`https://api.knowyourcat.id/v1/${address}`).then(res => {
      const addressActivity = res?.data;
      const { providers } = addressActivity;
      const matchedProviders: string[] = []
      providers.forEach((provider: Provider) => {
        if (PROVIDER_NAMES.includes(provider.name as ProviderName) && provider.result) {
          matchedProviders.push(provider.name)
        }
      });
      setActivity(matchedProviders);
    })
  }, [isHuman, address])

  const submitClaim = () => {
    setClaiming(true);
    Axios
      .post(`/api/drip`, { address })
      .then(res => {
        setHash(res.data.txHash)
        setClaiming(false);
      });
  }

  return (
    <div className='w-screen min-h-screen bg-flowing-lines bg-cover bg-no-repeat bg-left-top p-12 overscroll-none'>
      <div className='container mx-auto max-w-[800px]'>
        <div className='text-center bg-white p-4 mx-auto mb-10 rounded-md'>
          <img className='w-48 h-48 mx-auto' src='/logo.png' alt='Sozu Haus' />
          <h2 className="text-4xl font-bold mb-2">Bootstrap your testnet wallet</h2>
          <h3 className="text-lg">Sozu MultiFaucet funds your wallet with
            <a
              href='https://explorer.testnet.mantle.xyz/token/0x9e693e40453F011B7377238d3A84A9E85e98bE98'
              target='_blank'
              className="inline-flex flex-row items-center border-2 border-gray rounded-md pr-1 ml-1"
            >
              <img className='w-5 h-5 inline mx-1' src='/MNT.png' />MNT</a>,
            <a className="inline-flex flex-row items-center border-2 border-gray rounded-md pr-1 ml-1"
              href='https://explorer.testnet.mantle.xyz/token/0x2C6db4f138A1336dB50Ab698cA70Cf99a37e1198'
              target='_blank'
            >
              <img className='w-5 h-5 inline mx-1' src='/WMNT.png' />wMNT</a>,
            <a className="inline-flex flex-row items-center border-2 border-gray rounded-md pr-1 ml-1"
              href='https://explorer.testnet.mantle.xyz/address/0x50c3e956D52c4ecDaeec86547de5fd578b65D580'
              target='_blank'>
              <img className='w-5 h-5 inline mx-1' src='/DAI.png' />DAI</a>, <br /> and
            <a className="inline-flex flex-row items-center border-2 border-gray rounded-md pr-1 mx-1"
              href='https://explorer.testnet.mantle.xyz/address/0x8AC79cc20bA8E96c1d7Baf4ec485d7118e805E5b'
              target='_blank'>
              <img className='w-5 h-5 inline mx-1' src='/NFT.png' />NFT</a> on the Mantle testnet, at once.
          </h3>
        </div>

        <div className='text-left bg-white p-3 px-6 mx-auto rounded-t-md border-gray border-b-2'>
          <h2 className="text-lg font-semibold">Request Tokens</h2>
        </div>
        <div className='text-left bg-white p-3 px-6 mx-auto rounded-b-md mb-10'>
          {!isHuman && <p className="mb-2">
            To prevent faucet botting, you must prove you are human via <a className="underline hover:text-gray-500" target='_blank' href='https://zk.me/'>zkMe</a>.
          </p>}
          {isHuman && !isConnected && <p className="mb-2">
            Please connect the wallet you{"'"}d like to drip assets to.
          </p>}
          {!isHuman && <button className='bg-black hover:bg-gray-800 text-white p-2 w-full rounded-md text-center mb-4'
            onClick={() => {
              setIsHuman(true)
              // if (!antibotOpen) setAntibotOpen(true)
              // else router.reload();
            }}
          >
            {antibotOpen ? 'Something went wrong. Click here to reload the page.' : 'Submit Proof-of-Humanity'}
          </button>
          }
          {isHuman && !isConnected && <div className="flex flex-row w-full justify-center">
            <ConnectButton />
          </div>}
          {typeof window !== "undefined" && <DynamicAntibot
            isOpen={antibotOpen}
            verifySuccess={() => {
              setAntibotOpen(false)
              setIsHuman(true)
            }}
          />}

          {isHuman && isConnected && <>
            <div className="flex flex-row w-full">
            <h1 className='font-semibold text-2xl mr-auto'>Your Credentials</h1>
            <ConnectButton />
            </div>
            {activity.length > 0 ? <h2>The following credentials were detected:</h2> : <h2>No credentials detected...</h2>}
            {activity.map((item) => (
              <li className='text-gray-500'>{item}</li>
            ))}
            {!isClaiming && !hash && <button
              className='bg-black hover:bg-gray-800 text-white p-2 w-full rounded-md text-center my-2'
              onClick={() => submitClaim()}
            >
              Claim {1 + (activity.length * .2)} MNT + Others
            </button>}

            {isClaiming && !hash && <button
              className='bg-black hover:bg-gray-800 text-white p-2 w-full rounded-md text-center my-2'
            >
              Claiming...
            </button>}

            {!isClaiming && hash && <a
              className='block w-full bg-black hover:bg-gray-800 text-white p-2 w-full rounded-md text-center my-2'
              href={`https://explorer.testnet.mantle.xyz/tx/${hash}`}
              target='_blank'
            >
              Claim complete! View transaction on Mantle Explorer
            </a>}
          </>
          }
        </div>

        <div className='text-left bg-white p-3 px-6 mx-auto rounded-t-md border-gray border-b-2'>
          <h2 className="text-lg font-semibold">Faucet Details</h2>
        </div>
        <div className='text-left bg-white p-3 px-6 mx-auto rounded-b-md mb-10'>
          <h3 className="mb-1 font-semibold">General Information</h3>
          <p className="mb-1">You must submit proof of humanity via <a className="underline hover:text-gray-500" target='_blank' href='https://zk.me/'>zkMe</a>. Additionally, you must prove you own the recipient address by signing a message.</p>
          <p className="mb-1">Using <a className="underline hover:text-gray-500" target='_blank' href='https://knowyourcat.id/'>KYCat</a>, we attest your onchain merit via your interactions and activity. With this merit you may be eligible for bonus MNT and wMNT.</p>
          <p className="mb-1">You can claim from the faucet once every 24 hours.</p>
        </div>

        <div className='text-left bg-white p-3 px-6 mx-auto rounded-t-md border-gray border-b-2'>
          <h2 className="text-lg font-semibold">Token Details</h2>
        </div>
        <div className='text-left bg-white p-3 px-6 mx-auto rounded-b-md mb-10'>
          <h2 className="font-semibold">Mantle Testnet (
            <a
              className="hover:text-gray-500 underline"
              href="https://medium.com/0xmantle/onboarding-to-mantle-testnet-a-complete-guide-f3ea2cf9d4b0"
              target='_blank'
            >connection details</a>
            {", "}
            <button
              className="hover:text-gray-500 underline"
              onClick={() => {
                window.ethereum?.request?.({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: BigNumber.from(mantleTestnet.id)._hex,
                      chainName: mantleTestnet.name,
                      nativeCurrency: mantleTestnet.nativeCurrency,
                      rpcUrls: [mantleTestnet.rpcUrls.default.http[0], mantleTestnet.rpcUrls.public.http[0]],
                    },
                  ],
                })
              }}
            >
              Add to MetaMask
            </button>
            )</h2>
          <h4 className="text-gray-500 mb-1">Faucet drips {">"}1 MNT, {">"}1 wMNT, 1000 DAI, and 10 NFTs (ERC721).</h4>
          <label>NFTs:</label>
          <a
            href='https://explorer.testnet.mantle.xyz/address/0x8AC79cc20bA8E96c1d7Baf4ec485d7118e805E5b'
            target='_blank'
            className="block bg-gray-200 hover:bg-gray-300 w-full rounded-md text-center mb-4 w-full px-4 overflow-hidden"
          >
            0x8AC79cc20bA8E96c1d7Baf4ec485d7118e805E5b
          </a>
          <label>wMNT:</label>
          <a
            href='https://explorer.testnet.mantle.xyz/token/0x2C6db4f138A1336dB50Ab698cA70Cf99a37e1198'
            target='_blank'
            className="block bg-gray-200 hover:bg-gray-300 w-full rounded-md text-center mb-2 w-full px-4 overflow-hidden"
          >
            0x2C6db4f138A1336dB50Ab698cA70Cf99a37e1198
          </a>
          <button className="bg-gray-200 hover:bg-gray-300 w-full rounded-md text-center mb-4">Add to MetaMask</button>
          <label>DAI:</label>
          <a
            href='https://explorer.testnet.mantle.xyz/address/0x50c3e956D52c4ecDaeec86547de5fd578b65D580'
            target='_blank'
            className="block bg-gray-200 hover:bg-gray-300 w-full rounded-md text-center mb-2 w-full px-4 overflow-hidden"
          >
            0x50c3e956D52c4ecDaeec86547de5fd578b65D580
          </a>
          <button className="bg-gray-200 hover:bg-gray-300 w-full rounded-md text-center mb-4">Add to MetaMask</button>
        </div>

        <div className='text-left bg-white p-4 mx-auto mb-10 rounded-md'>
          <p className='text-sm text-gray-500'>
            These smart contracts are being provided as is. No guarantee, representation or warranty is being made, express or implied, as to the safety or correctness of the user interface or the smart contracts. They have not been audited and as such there can be no assurance they will work as intended, and users may experience delays, failures, errors, omissions or loss of transmitted information. We are not liable for any of the foregoing. Users should proceed with caution and use at their own risk.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
