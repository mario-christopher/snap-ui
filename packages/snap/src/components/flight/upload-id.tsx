import {
  SnapComponent,
  Box,
  Divider,
  Heading,
  Field,
  Form,
  Radio,
  RadioGroup,
  FileInput,
  Button,
  Row,
  Text,
  Bold,
} from '@metamask/snaps-sdk/jsx';

import { FlightName } from './name';
import { FlightDetail, FlightDetailForm } from './detail';
import { Props } from '../../utils';
import { getState, setState, getFormValue } from '../../state';

export enum FlightUploadIdForm {
  Form = 'frmUploadId',
  FileInput = 'fiUploadId',
  UploadIdType = 'rdoIdType',
}

export enum FlightUploadIdButtons {
  Upload = 'btnUpoadIdUpload',
  Prev = 'btnUpoadIdPrev',
  Next = 'btnUpoadIdNext',
}

export const FlightUploadId: SnapComponent<Props> = ({ errors, snapState }) => {
  return (
    <Box>
      <Row label="Step">
        <Text>
          <Bold>2 of 5</Bold>
        </Text>
      </Row>
      <Divider></Divider>

      <Heading>Upload Id</Heading>
      <Form name={FlightUploadIdForm.Form}>
        <Field label="Select an Id type to upload">
          <RadioGroup name={FlightUploadIdForm.UploadIdType}
            value={snapState.booking?.rdoIdType as string}>
            {snapState.idTypes.map((id, i) => {
              return <Radio value={id.value}>{id.type}</Radio>;
            })}
          </RadioGroup>
        </Field>
        {/* The FileInput control has a regression, and may not work as expected in the current SDK version. */}
        <Field>
          <FileInput name={FlightUploadIdForm.FileInput} />
        </Field>
      </Form>
      <Divider></Divider>

      <Box direction="horizontal" alignment="center">
        <Button name={FlightUploadIdButtons.Prev}>Prev</Button>
        <Button name={FlightUploadIdButtons.Next}>Next</Button>
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

export const uploadIdPrev_Click = async (id: string) => {
  const snapState = await getState();

  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <FlightName snapState={snapState} />,
    },
  });
};

export const uploadIdNext_Click = async (id: string) => {
  const snapState = await getState();

  const errors: string[] = [];
  const formValue = await getFormValue(id, FlightUploadIdForm.Form);
  console.log("FormValue", formValue);

  let comp;
  if (errors.length == 0) {
    snapState.booking = {
      inpFlightNameFirstName: snapState.booking
        ?.inpFlightNameFirstName as string,
      inpFlightNameLastName: snapState.booking?.inpFlightNameLastName as string,
      rdoIdType: formValue[FlightUploadIdForm.UploadIdType],
      fiUploadId: formValue[FlightUploadIdForm.FileInput],
      inpFlightDetailDate: formValue[FlightDetailForm.InputDate],
      selectFlightDetailFrom: formValue[FlightDetailForm.SelectFrom],
      selectFlightDetailTo: formValue[FlightDetailForm.SelectTo],
    };
    console.log("SetState", snapState);
    await setState(snapState);
    comp = <FlightDetail snapState={snapState} />;
  } else {
    comp = <FlightUploadId errors={errors} snapState={snapState} />;
  }

  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: comp,
    },
  });
};
