import { Button, IconPlusSmall, Tag, IconMinusSmall, Box } from 'degen'
import React, { Dispatch, SetStateAction, useEffect, useState, FC } from 'react';
import { projectConfig } from 'config';

type Props = {
    disabled: boolean;
    totalSupplyLeft: number;
    setAmount: Dispatch<SetStateAction<number>>;
    ethPrice: number;
};

const Quantity: FC<Props> = ({ totalSupplyLeft, setAmount, disabled, ethPrice }) => {
    const [value, setValue] = useState(1);

    useEffect(() => {
        setAmount(value);
    }, [value])

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: "rgb(247, 247, 247)",
                padding: '12px',
                borderRadius: '20px',
                position: "relative",
                height: 'full'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    height: '100%',
                }}
            >
                <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'rgba(0, 0, 0, .4)', paddingLeft: '6px' }} >Quantity</div>
                <Tag tone="green" label={ethPrice ? `$${(ethPrice * value * projectConfig.mintPrice).toFixed(2)}` : ''}>{`${(projectConfig.mintPrice * value).toFixed(2)} ETH`}</Tag>
            </div>
            <div
                style={{
                    display: 'flex',
                    marginTop: "12px",
                    justifyContent: 'space-between',
                    gap: '8px',
                }}
            >
                <div
                    style={{
                        // marginTop: "-1px",
                        width: "33%"
                    }}
                >
                    <Button width="full" variant='tertiary' disabled={disabled} onClick={() => {
                        if (value === 1) return;
                        setValue(value - 1)
                    }}>
                        <IconMinusSmall />
                    </Button>
                </div>
                <Box 
                borderRadius='2xLarge'
                borderWidth='1'
                width='1/3'
                height='14'
                backgroundColor='white'
                >{<div
                style={{
                    display: 'flex',
                    fontWeight: "bold",
                    fontSize: '20px',
                    color: disabled ? 'gray' : 'black',
                    justifyContent: 'center', alignItems: 'center', lineHeight: 0, width: '100%', height: '100%'
                }}
                
                >{value}</div>}

                </Box>

                <div
                    style={{
                        // marginTop: "8px",
                        width: "33%",
                        // marginTop: "-1px"
                    }}
                >
                    <Button width="full" variant='tertiary' disabled={disabled} onClick={() => {
                        if (value === (projectConfig.totalSupply - totalSupplyLeft)) return;
                        setValue(value + 1)
                    }}>
                        <IconPlusSmall />
                    </Button>
                </div>
            </div>

        </div>
    );
}

export default Quantity;
