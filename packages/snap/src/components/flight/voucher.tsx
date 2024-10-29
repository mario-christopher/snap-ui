import {
  SnapComponent,
  Box,
  Text,
  Divider,
  Button,
  Heading,
  Copyable,
  Link,
  Bold,
  Row,
} from '@metamask/snaps-sdk/jsx';

import { HomePage } from '../home-page';

export enum FlightVoucherButtons {
  Home = 'btnFlightVoucherHome',
}

export const FlightVoucher: SnapComponent = () => {
  return (
    <Box>
      <Row label="Step">
        <Text>
          <Bold>5 of 5</Bold>
        </Text>
      </Row>
      <Divider></Divider>

      <Heading>Congratulations</Heading>
      <Copyable value="WcQIoTTyelqT2EhT8QWIRiOYik5Ls8UQRmGCSeeAZyg"></Copyable>
      <Text>
        {`You can use this voucher on `}
        <Link href="https://snappy-air.com/snap">Snappy Airlines</Link>{' '}
        {` to purchase your Ticket.`}
      </Text>
      <Divider></Divider>
      <Button name={FlightVoucherButtons.Home}>Home</Button>
    </Box>
  );
};

export const flightVoucherHome_Click = async (id: string) => {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <HomePage />,
    },
  });
};
