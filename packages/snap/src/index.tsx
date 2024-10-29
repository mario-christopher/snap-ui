import {
  OnHomePageHandler,
  OnInstallHandler,
  OnUserInputHandler,
  UserInputEventType,
} from '@metamask/snaps-sdk';

import {
  HomePage,
  HomePageButtons,
  homePageAccountInfo_Click,
  homePageHistory_Click,
  homePageBookFlight_Click,
} from './components/home-page';

import {
  AccountInfoButtons,
  accountInfoBack_Click,
} from './components/account';

import {
  HistoryButtons,
  historyBack_Click,
  historyNext_Click,
  historyPrev_Click,
} from './components/history';

import {
  InstallPage,
  OnInstallButtons,
  onInstallHome_Click,
} from './components/on-install';

import {
  FlightNameButtons,
  flightNameCancel_Click,
  flightNameNext_Click,
} from './components/flight/name';

import {
  FlightDetailButtons,
  flightDetailNext_Click,
  flightDetailPrev_Click,
} from './components/flight/detail';

import {
  FlightReviewButtons,
  flightReviewNext_Click,
  flightReviewPrev_Click,
} from './components/flight/review';

import {
  FlightVoucherButtons,
  flightVoucherHome_Click,
} from './components/flight/voucher';

import { getIDTypes, getAirportCodes, getFlightHistory, getMemberInfo } from './utils';
import { setState } from './state';
import { FlightUploadIdButtons, uploadIdNext_Click, uploadIdPrev_Click } from './components/flight/upload-id';

export const onInstall: OnInstallHandler = async () => {
  const member = await getMemberInfo();
  const airportCodes = await getAirportCodes();
  const idTypes = await getIDTypes();
  const flightHistory = await getFlightHistory();

  await setState({
    member,
    idTypes,
    airportCodes,
    flightHistory,
    historyPageNo: 0,
  });

  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: <InstallPage></InstallPage>,
    },
  });
};

export const onHomePage: OnHomePageHandler = async () => {
  return { content: <HomePage /> };
};

export const onUserInput: OnUserInputHandler = async ({
  id,
  event,
  context,
}) => {
  if (event.type === UserInputEventType.ButtonClickEvent) {
    switch (event.name) {
      case OnInstallButtons.Home:
        await onInstallHome_Click(id);
        break;

      case HomePageButtons.AccountInfo:
        await homePageAccountInfo_Click(id);
        break;
      case HomePageButtons.FlightHistory:
        await homePageHistory_Click(id);
        break;
      case HomePageButtons.BookFlight:
        await homePageBookFlight_Click(id);
        break;

      case AccountInfoButtons.Back:
        await accountInfoBack_Click(id);
        break;

      case HistoryButtons.Back:
        await historyBack_Click(id);
        break;
      case HistoryButtons.Prev:
        await historyPrev_Click(id);
        break;
      case HistoryButtons.Next:
        await historyNext_Click(id);
        break;

      case FlightNameButtons.Cancel:
        await flightNameCancel_Click(id);
        break;
      case FlightNameButtons.Next:
        await flightNameNext_Click(id);
        break;

      case FlightUploadIdButtons.Prev:
        await uploadIdPrev_Click(id);
        break;
      case FlightUploadIdButtons.Next:
        await uploadIdNext_Click(id);
        break;

      case FlightDetailButtons.Prev:
        await flightDetailPrev_Click(id);
        break;
      case FlightDetailButtons.Next:
        await flightDetailNext_Click(id);
        break;

      case FlightReviewButtons.Prev:
        await flightReviewPrev_Click(id);
        break;
      case FlightReviewButtons.Next:
        await flightReviewNext_Click(id);
        break;

      case FlightVoucherButtons.Home:
        await flightVoucherHome_Click(id);
        break;
    }
  }
};
