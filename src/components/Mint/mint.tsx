import { useEffect, FC } from 'react'
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
} from 'wagmi'
import { toast } from 'react-toastify';
import { Button, IconEth } from 'degen'
import { useAccount } from 'wagmi'
import {
    useConnectModal
} from '@rainbow-me/rainbowkit';
import { projectConfig } from 'config';
import { utils } from 'ethers';

type Props = {
    amount: number;
    disabled: boolean;
  };
  
  const Mint: FC<Props> = ({ amount, disabled }) => {

    const { openConnectModal } = useConnectModal();
    const { address } = useAccount()

    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        addressOrName: projectConfig.contractAddress,
        contractInterface: projectConfig.contractAbi,
        functionName: 'publicMint',
        args: [amount],
        overrides: {
            value: utils.parseEther((amount * projectConfig.mintPrice).toString()),
        }
    })

    const { data, error, isError, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    useEffect(() => {

        if (disabled) return;

        if (isPrepareError || isError) {
            let err = (prepareError || error)?.message

            toast("There was an error");
            console.log(err)
            // return;
        }

        if (isSuccess) {
            toast('Successfully minted your NFT!');
            // return;
        }

    }, [isPrepareError, isError, isSuccess])

    return (
        <Button disabled={!write || isLoading || disabled} loading={isLoading} onClick={!address ? openConnectModal : () => { if (write) { write() } }} prefix={<IconEth />} center width='full'>Mint with Crypto</Button>
    )
}

export default Mint;

