import {
  SnapComponent,
  Box,
  Divider,
  Heading,
  Image,
} from '@metamask/snaps-sdk/jsx';

import logo from '../../images/snappy-air.svg';

export const Header: SnapComponent = () => {
  return (
    <Box>
      <Heading>Snappy Airlines</Heading>
      <Image src={logo}></Image>
      <Divider></Divider>
    </Box>
  );
};
