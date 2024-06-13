import { SnapComponent, Box, Text, Spinner } from '@metamask/snaps-sdk/jsx';

type Processprops = {
  waitMessage?: string;
};

export const Process: SnapComponent<Processprops> = ({
  waitMessage = 'Please wait ...',
}) => {
  return (
    <Box>
      <Text>{waitMessage}</Text>
      <Spinner></Spinner>
    </Box>
  );
};
