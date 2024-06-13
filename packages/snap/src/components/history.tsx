import {
  SnapComponent,
  Button,
  Box,
  Text,
  Divider,
  Link,
  Heading,
} from '@metamask/snaps-sdk/jsx';

import { HomePage } from './home-page';
import { Props } from '../utils';
import { getState, setState } from '../state';

export enum HistoryForm {
  InputSearch = 'inputHistory_search',
}

export enum HistoryButtons {
  Back = 'btnHistory_back',
  Prev = 'btnHistory_prev',
  Next = 'btnHistory_next',
}

export const History: SnapComponent<Props> = ({ snapState }) => {
  const pageSize = 5;
  const firstPage = snapState.historyPageNo == 0;
  const lastPage =
    snapState.historyPageNo ==
    Math.floor(snapState.flightHistory.length / pageSize);
  const startIndex = firstPage ? 0 : snapState.historyPageNo * pageSize + 1;

  const items = snapState.flightHistory.slice(
    startIndex,
    startIndex + pageSize,
  );

  return (
    <Box>
      <Heading>Your Flight History</Heading>
      <Divider></Divider>
      <Box>
        {items.map((hist, i) => {
          return (
            <Link
              key={i + 1}
              href={`https://snappy-air.com/snap/${hist.from}-${hist.to}`}
            >{`${hist.date} : ${hist.from}-${hist.to}`}</Link>
          );
        })}
      </Box>
      <Divider></Divider>
      <Box>
        <Box direction="horizontal" alignment='center'>
          <Button name={HistoryButtons.Prev} disabled={firstPage}>
            Prev Page
          </Button>
          <Button name={HistoryButtons.Next} disabled={lastPage}>
            Next Page
          </Button>
        </Box>
        <Divider></Divider>
        <Button name={HistoryButtons.Back}>Home</Button>
      </Box>
    </Box>
  );
};

export const historyBack_Click = async (id: string) => {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <HomePage />,
    },
  });
};

export const historyPrev_Click = async (id: string) => {
  const snapState = await getState();
  snapState.historyPageNo = snapState.historyPageNo - 1;
  await setState(snapState);

  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <History snapState={snapState} />,
    },
  });
};

export const historyNext_Click = async (id: string) => {
  const snapState = await getState();
  snapState.historyPageNo = snapState.historyPageNo + 1;
  await setState(snapState);
  console.log('State', snapState);

  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <History snapState={snapState} />,
    },
  });
};
