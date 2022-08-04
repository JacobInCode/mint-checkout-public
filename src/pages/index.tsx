import { IconWallet, Card, Button, Tag, Heading } from 'degen'
import Navbar from 'components/Navbar';
import Mint from 'components/Mint';
import Quantity from 'components/Quantity';
import { projectConfig } from 'config';
import React, { FC, useEffect, useState } from 'react';
import { BigNumber, Contract, providers } from 'ethers';
import axios from "axios"
import {env} from 'utils/constants'

type Props = {
  totalSupplyLeft: number;
  ethPrice: number;
};

const Index: FC<Props> = ({ totalSupplyLeft, ethPrice }) => {

  const [amount, setAmount] = useState(1);
  const [soldOut, setSoldOut] = useState(false);

  useEffect(() => {
    if (projectConfig.totalSupply - totalSupplyLeft === 0) {
      setSoldOut(true);
    }

  }, [totalSupplyLeft])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: "rgb(247, 247, 247)",
        padding: '10px'
      }}
    >
      <Navbar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '400px',
            width: '100%',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card padding="6" shadow width="full">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '20px',
                gap: '10px',
              }}
            >
              <Heading level="1" >{projectConfig.name}</Heading>
              <Tag tone={soldOut ? 'pink' : 'blue'} label={`${totalSupplyLeft} / ${projectConfig.totalSupply}`}>{soldOut ? 'Sold Out' : 'Remaining'}</Tag>
              <div style={{ textAlign: 'center', color: 'gray', marginTop: '10px', marginBottom: '10px', paddingRight: '10px', paddingLeft: '10px' }}>{projectConfig.description}</div>
            </div>
          </Card>
          <Card padding="6" shadow width="full" >
            <div
              style={{
                width: "100%",
                height: "100%",
                marginTop: '10px',
                gap: '8px',
                marginBottom: '6px'
              }}
            >
              <Quantity totalSupplyLeft={totalSupplyLeft} setAmount={setAmount} disabled={soldOut} ethPrice={ethPrice} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  backgroundColor: "rgb(247, 247, 247)",
                  padding: '12px',
                  paddingTop: '12px',
                  marginTop: '12px',
                  borderRadius: '20px'
                }}
              >
                <Mint amount={amount} disabled={soldOut} />
                {/* <Button onClick={!address ? openConnectModal : () => console.log("mint")} prefix={<IconEth />} center width='full'>Mint with Crypto</Button> */}
                <Button disabled={soldOut} onClick={() => console.log("pay with card")}
                  prefix={<IconWallet />} center width='full' variant="secondary">Mint with Card</Button>
              </div>

              {/* <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingTop: '22px',
                  borderRadius: '16px',
                  fontWeight: 'medium',
                  fontSize: '12px',
                  color: 'rgba(0, 0, 0, .4)'
                }}
              >
                Powered By UncannyNFT
              </div> */}
            </div>
          </Card>
        </div>
      </div>

    </div>
  );
};

export async function getStaticProps() {
  const network = projectConfig.networkId === '1' ? 'mainnet' : 'goerli';
  const infuraURL = `https://${network}.infura.io/v3/${env.INFURA_KEY}`;
  const provider = new providers.JsonRpcProvider({ url: infuraURL });
  const contract = new Contract(projectConfig.contractAddress, projectConfig.contractAbi, provider);
  const totalSupply: BigNumber = await contract.totalSupply();
  let response = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD', {
    headers: {
      'authorization': `Apikey ${env.CRYPTO_COMPARE_API_KEY}`
    }
  });

  return {
    props: {
      ethPrice: response.data.USD,
      totalSupplyLeft: totalSupply.toString(),
    },
    revalidate: 15,
  };
}

export default Index;