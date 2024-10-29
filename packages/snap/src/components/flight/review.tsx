import {
  SnapComponent,
  Box,
  Text,
  Divider,
  Button,
  Row,
  Heading,
  Bold,
  Value,
} from '@metamask/snaps-sdk/jsx';

import { FlightDetail } from './detail';
import { FlightVoucher } from './voucher';
import { getState } from '../../state';
import { Props } from '../../utils';
import { Process } from '../process';

export enum FlightReviewButtons {
  Prev = 'btnFlightReviewPrev',
  Next = 'btnFlightReviewNext',
}

export const FlightReview: SnapComponent<Props> = ({ snapState }) => {
  const idType = snapState.idTypes.find(
    (id) => id.value == snapState.booking?.rdoIdType,
  )?.type;
  const fromCity = snapState.airportCodes.find(
    (airport) => airport.value == snapState.booking?.selectFlightDetailFrom,
  )?.cityName;
  const toCity = snapState.airportCodes.find(
    (airport) => airport.value == snapState.booking?.selectFlightDetailTo,
  )?.cityName;

  return (
    <Box>
      <Row label="Step">
        <Text>
          <Bold>4 of 5</Bold>
        </Text>
      </Row>
      <Divider></Divider>

      <Heading>Review your flight information</Heading>
      <Row label="Passenger Name">
        <Text>{`${snapState.booking?.inpFlightNameFirstName} ${snapState.booking?.inpFlightNameLastName}`}</Text>
      </Row>
      <Row label="ID Type">
        {/* <Text>{idType as string}</Text> */}
        <Value extra={snapState.booking?.fiUploadId?.name} value={idType as string}></Value>
      </Row>
      <Row label="Flight Date">
        <Text>{snapState.booking?.inpFlightDetailDate as string}</Text>
      </Row>
      <Row label="From">
        <Text>{fromCity as string}</Text>
      </Row>
      <Row label="To">
        <Text>{toCity as string}</Text>
      </Row>

      <Divider></Divider>
      <Row label="Flight Cost">
        <Value extra="1.21 ETH" value="$ 4,569.00"></Value>
      </Row>

      <Divider></Divider>

      <Box direction="horizontal" alignment="center">
        <Button name={FlightReviewButtons.Prev}>Prev</Button>
        <Button name={FlightReviewButtons.Next}>Next</Button>
      </Box>
    </Box>
  );
};

export const flightReviewPrev_Click = async (id: string) => {
  const snapState = await getState();

  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <FlightDetail snapState={snapState} />,
    },
  });
};

export const flightReviewNext_Click = async (id: string) => {
  const snapState = await getState();
  console.log("Booking Info", snapState.booking);

  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <Process />,
    },
  });

  await new Promise<void>((resolve) =>
    setTimeout(async () => {
      await snap.request({
        method: 'snap_updateInterface',
        params: {
          id,
          ui: <FlightVoucher />,
        },
      });
      resolve();
    }, 2000),
  );
};
