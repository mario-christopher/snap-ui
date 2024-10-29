import {
  SnapComponent,
  Box,
  Form,
  Field,
  Input,
  Divider,
  Button,
  Dropdown,
  Option,
  Text,
  Bold,
  Row,
  Heading,
} from '@metamask/snaps-sdk/jsx';

import { FlightUploadId } from './upload-id';
import { FlightReview } from './review';
import { Props } from '../../utils';
import { getFormValue, getState, setState } from '../../state';

export enum FlightDetailForm {
  Form = 'frmFlightDetail',
  InputDate = 'inpFlightDetailDate',
  SelectFrom = 'selectFlightDetailFrom',
  SelectTo = 'selectFlightDetailTo',
}

export enum FlightDetailButtons {
  Prev = 'btnFlightDetailPrev',
  Next = 'btnFlightDetailNext',
}

export const FlightDetail: SnapComponent<Props> = ({ errors, snapState }) => {
  return (
    <Box>
      <Row label="Step">
        <Text>
          <Bold>3 of 5</Bold>
        </Text>
      </Row>
      <Divider></Divider>

      <Heading>Flight information</Heading>
      <Form name={FlightDetailForm.Form}>
        <Field label="Flight Date">
          <Input
            name={FlightDetailForm.InputDate}
            placeholder="MM/DD/YYYY"
            value={snapState.booking?.inpFlightDetailDate}
          ></Input>
        </Field>
        <Field label="From">
          <Dropdown
            name={FlightDetailForm.SelectFrom}
            value={snapState.booking?.selectFlightDetailFrom as string}
          >
            {snapState.airportCodes.map((airport, i) => {
              return <Option value={airport.value}>{airport.cityName}</Option>;
            })}
          </Dropdown>
        </Field>
        <Field label="Return Date">
          <Dropdown
            name={FlightDetailForm.SelectTo}
            value={snapState.booking?.selectFlightDetailTo as string}
          >
            {snapState.airportCodes.map((airport, i) => {
              return <Option value={airport.value}>{airport.cityName}</Option>;
            })}
          </Dropdown>
        </Field>
      </Form>
      <Divider></Divider>

      <Box direction="horizontal" alignment="center">
        <Button name={FlightDetailButtons.Prev}>Prev</Button>
        <Button name={FlightDetailButtons.Next}>Next</Button>
      </Box>

      {errors && errors.length > 0 ? (
        <Box>
          <Divider></Divider>
          <Box>
            {errors?.map((e, i) => {
              return <Text key={i + 1}>{e}</Text>;
            })}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

export const flightDetailPrev_Click = async (id: string) => {
  const snapState = await getState();

  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <FlightUploadId snapState={snapState} />,
    },
  });
};

export const flightDetailNext_Click = async (id: string) => {
  const snapState = await getState();

  const errors: string[] = [];
  const formValue = await getFormValue(id, FlightDetailForm.Form);
  if (
    !formValue[FlightDetailForm.InputDate] ||
    formValue[FlightDetailForm.InputDate].length == 0
  ) {
    errors.push('Flight date cannot be empty');
  }
  if (
    !formValue[FlightDetailForm.SelectFrom] ||
    formValue[FlightDetailForm.SelectFrom].length == 0
  ) {
    errors.push('From airport code cannot be empty');
  }
  if (
    !formValue[FlightDetailForm.SelectTo] ||
    formValue[FlightDetailForm.SelectTo].length == 0
  ) {
    errors.push('To airport code cannot be empty');
  }

  if (
    formValue[FlightDetailForm.SelectFrom] &&
    formValue[FlightDetailForm.SelectTo] &&
    formValue[FlightDetailForm.SelectFrom] ==
      formValue[FlightDetailForm.SelectTo]
  ) {
    errors.push('From and To cannot be the same');
  }

  let comp;
  if (errors.length == 0) {
    snapState.booking = {
      inpFlightNameFirstName: snapState.booking
        ?.inpFlightNameFirstName as string,
      inpFlightNameLastName: snapState.booking?.inpFlightNameLastName as string,
      rdoIdType: snapState.booking?.rdoIdType as string,
      fiUploadId: snapState.booking?.fiUploadId as any,
      inpFlightDetailDate: formValue[FlightDetailForm.InputDate],
      selectFlightDetailFrom: formValue[FlightDetailForm.SelectFrom],
      selectFlightDetailTo: formValue[FlightDetailForm.SelectTo],
    };
    await setState(snapState);
    comp = <FlightReview snapState={snapState} />;
  } else {
    comp = <FlightDetail errors={errors} snapState={snapState} />;
  }

  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: comp,
    },
  });
};
