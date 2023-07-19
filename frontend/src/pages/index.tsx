import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useSigner, useProvider } from 'wagmi'
import { BigNumber } from 'ethers';
import mantleTestnet from '../types/mantleTestnet';

function Page() {
  const provider = useProvider();
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
              <img className='w-5 h-5 inline mx-1' src='/BIT.png' />wMNT</a>,
            <a className="inline-flex flex-row items-center border-2 border-gray rounded-md pr-1 ml-1"
              href='https://explorer.testnet.mantle.xyz/address/0xd22d145e02F2064c5cE256a0583a1566b812Ae26'
              target='_blank'>
              <img className='w-5 h-5 inline mx-1' src='/DAI.png' />DAI</a>, <br /> and
            <a className="inline-flex flex-row items-center border-2 border-gray rounded-md pr-1 mx-1"
              href='https://explorer.testnet.mantle.xyz/address/0x81fd1a6A47B0238d196546d64b39d63C3DA38942'
              target='_blank'>
              <img className='w-5 h-5 inline mx-1' src='/NFT.png' />NFT</a> on the Mantle testnet, at once.
          </h3>
        </div>

        <div className='text-left bg-white p-3 px-6 mx-auto rounded-t-md border-gray border-b-2'>
          <h2 className="text-lg font-semibold">Request Tokens</h2>
        </div>
        <div className='text-left bg-white p-3 px-6 mx-auto rounded-b-md mb-10'>
          <p className="mb-2">To prevent faucet botting, you must prove you are human via <a className="underline hover:text-gray-500" target='_blank' href='https://zk.me/'>zkMe</a>.</p>
          <ConnectButton />
        </div>

        <div className='text-left bg-white p-3 px-6 mx-auto rounded-t-md border-gray border-b-2'>
          <h2 className="text-lg font-semibold">Faucet Details</h2>
        </div>
        <div className='text-left bg-white p-3 px-6 mx-auto rounded-b-md mb-10'>
          <h3 className="mb-1 font-semibold">General Information</h3>
          <p className="mb-1">You must submit proof of humanity via <a className="underline hover:text-gray-500" target='_blank' href='https://zk.me/'>zkMe</a>. Additionally, you must prove you own the recipient address by signing a message.</p>
          <p className="mb-1">Using <a className="underline hover:text-gray-500" target='_blank' href='https://knowyourcat.id/'>KYCat</a>, we attest your onchain merit via your interactions and activity. With this merit you may be eligible for bonus MNT and wMNT </p>
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
          <h4 className="text-gray-500 mb-1">Faucet drips {">"}1 MNT, 1 wMNT, 500 DAI, and 1 NFT (ERC721).</h4>
          <label>NFTs:</label>
          <a
            href='https://explorer.testnet.mantle.xyz/address/0x81fd1a6A47B0238d196546d64b39d63C3DA38942'
            target='_blank'
            className="block bg-gray-200 hover:bg-gray-300 w-full rounded-md text-center mb-4 w-full px-4 overflow-hidden"
          >
            0x81fd1a6A47B0238d196546d64b39d63C3DA38942
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
            href='https://explorer.testnet.mantle.xyz/address/0xd22d145e02F2064c5cE256a0583a1566b812Ae26'
            target='_blank'
            className="block bg-gray-200 hover:bg-gray-300 w-full rounded-md text-center mb-2 w-full px-4 overflow-hidden"
          >
            0xd22d145e02F2064c5cE256a0583a1566b812Ae26
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
