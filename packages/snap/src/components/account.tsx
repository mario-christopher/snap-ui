import {
  SnapComponent,
  Button,
  Box,
  Row,
  Text,
  Divider,
  Heading,
} from '@metamask/snaps-sdk/jsx';

import { HomePage } from './home-page';
import { Props } from '../utils';

export enum AccountInfoButtons {
  Back = 'btnAccountInfo_back',
}

export const AccountInfo: SnapComponent<Props> = ({ snapState }) => {
  return (
    <Box>
      <Heading>Account Information</Heading>
      <Divider></Divider>
      <Row label="Customer">
        <Text>{`${snapState.member.firstName} ${snapState.member.lastName}`}</Text>
      </Row>
      <Row label="Frequent flyer no.">
        <Text>{snapState.member.frequentFlyerNo}</Text>
      </Row>
      <Row label="Member since">
        <Text>{snapState.member.memberSince}</Text>
      </Row>
      <Row label="Miles accumulated">
        <Text>{snapState.member.miles}</Text>
      </Row>
      <Divider></Divider>
      <Button name={AccountInfoButtons.Back}>Home</Button>
    </Box>
  );
};

export const accountInfoBack_Click = async (id: string) => {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <HomePage />,
    },
  });
};
