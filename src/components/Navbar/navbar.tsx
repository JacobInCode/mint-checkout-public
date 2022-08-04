import { ConnectButton } from '@rainbow-me/rainbowkit';
import { IconChevronLeft, Button } from 'degen'

function Navbar() {
  return (
    <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 12,
        }}
      >
        <Button shape="square" variant='tertiary' size='small'><IconChevronLeft /></Button>
        <ConnectButton />
      </div>
  );
}

export default Navbar;
