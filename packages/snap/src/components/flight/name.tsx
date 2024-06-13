import {
  SnapComponent,
  Box,
  Divider,
  Form,
  Field,
  Input,
  Button,
  Heading,
  Row,
  Text,
  Bold,
} from '@metamask/snaps-sdk/jsx';

import { HomePage } from '../home-page';
import { FlightDetail } from './detail';
import { Props } from '../../utils';
import { getState, setState, getFormValue } from '../../state';

export enum FlightNameForm {
  Form = 'frmFlightName',
  InputFirstName = 'inpFlightNameFirstName',
  InputLastName = 'inpFlightNameLastName',
}

export enum FlightNameButtons {
  Cancel = 'btnFlightNameCancel',
  Next = 'btnFlightNameNext',
}

export const FlightName: SnapComponent<Props> = ({ errors, snapState }) => {
  return (
    <Box>
      <Row label="Step">
        <Text>
          <Bold>1 of 4</Bold>
        </Text>
      </Row>
      <Divider></Divider>

      <Heading>Passenger information</Heading>
      <Form name={FlightNameForm.Form}>
        <Field label="First Name">
          <Input
            name={FlightNameForm.InputFirstName}
            placeholder="Enter your first name."
            value={snapState.booking?.inpFlightNameFirstName}
          ></Input>
        </Field>
        <Field label="Last Name">
          <Input
            name={FlightNameForm.InputLastName}
            placeholder="Enter your last name."
            value={snapState.booking?.inpFlightNameLastName}
          ></Input>
        </Field>
      </Form>
      <Divider></Divider>

      <Box direction="horizontal" alignment="center">
        <Button name={FlightNameButtons.Cancel} variant='destructive'>Cancel</Button>
        <Button name={FlightNameButtons.Next}>Next</Button>
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

export const flightNameCancel_Click = async (id: string) => {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <HomePage />,
    },
  });
};

export const flightNameNext_Click = async (id: string) => {
  const snapState = await getState();

  const errors: string[] = [];
  const formValue = await getFormValue(id, FlightNameForm.Form);
  if (
    !formValue[FlightNameForm.InputFirstName] ||
    formValue[FlightNameForm.InputFirstName].length == 0
  ) {
    errors.push('First name cannot be empty');
  }
  if (
    !formValue[FlightNameForm.InputLastName] ||
    formValue[FlightNameForm.InputLastName].length == 0
  ) {
    errors.push('Last name cannot be empty');
  }

  let comp;
  if (errors.length == 0) {
    snapState.booking = {
      inpFlightNameFirstName: formValue[FlightNameForm.InputFirstName],
      inpFlightNameLastName: formValue[FlightNameForm.InputLastName],
      inpFlightDetailDate: snapState.booking?.inpFlightDetailDate as string,
      selectFlightDetailFrom: snapState.booking
        ?.selectFlightDetailFrom as string,
      selectFlightDetailTo: snapState.booking?.selectFlightDetailTo as string,
    };
    await setState(snapState);
    comp = <FlightDetail snapState={snapState} />;
  } else {
    comp = <FlightName errors={errors} snapState={snapState} />;
  }

  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: comp,
    },
  });
};
