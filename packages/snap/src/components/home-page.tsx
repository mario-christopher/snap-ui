import { SnapComponent, Box, Button } from '@metamask/snaps-sdk/jsx';

import { Header } from './header';
import { AccountInfo } from './account';
import { History } from './history';
import { FlightName } from './flight/name';
import { getState, setState } from '../state';

export enum HomePageButtons {
  AccountInfo = 'btnHomePage_AccountInfo',
  FlightHistory = 'btnHomePage_FlightHistory',
  BookFlight = 'btnHomePage_BookFlight',
}

export const HomePage: SnapComponent = () => {
  return (
    <Box>
      <Header></Header>
      <Button name={HomePageButtons.AccountInfo}>Account Info.</Button>
      <Button name={HomePageButtons.FlightHistory}>Flight History</Button>
      <Button name={HomePageButtons.BookFlight}>Book Flight</Button>
    </Box>
  );
};

export const homePageAccountInfo_Click = async (id: string) => {
  const snapState = await getState();
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <AccountInfo snapState={snapState} />,
    },
  });
};

export const homePageHistory_Click = async (id: string) => {
  const snapState = await getState();
  snapState.historyPageNo = 0;
  await setState(snapState);

  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <History snapState={snapState} />,
    },
  });
};

export const homePageBookFlight_Click = async (id: string) => {
  const snapState = await getState();
  snapState.booking = {
    inpFlightNameFirstName: snapState.member.firstName,
    inpFlightNameLastName: snapState.member.lastName,
    rdoIdType: snapState.idTypes[0]?.value as string,
    fiUploadId: null,
    inpFlightDetailDate: '06/13/2024',
    selectFlightDetailFrom: snapState.airportCodes[0]?.value as string,
    selectFlightDetailTo: snapState.airportCodes[1]?.value as string,
  };
  await setState(snapState);

  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <FlightName snapState={snapState} />,
    },
  });
};
