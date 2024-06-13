import { SnapComponent, Box, Button, Divider } from '@metamask/snaps-sdk/jsx';

import { Header } from './header';
import { Footer } from './footer';
import { HomePage } from './home-page';

export enum OnInstallButtons {
  Home = 'btnOnInstallHome',
}

export const InstallPage: SnapComponent = () => {
  return (
    <Box>
      <Header></Header>
      <Footer></Footer>
      <Divider></Divider>
      <Button name={OnInstallButtons.Home}>Home Page</Button>
    </Box>
  );
};

export const onInstallHome_Click = async (id: string) => {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <HomePage />,
    },
  });
};
