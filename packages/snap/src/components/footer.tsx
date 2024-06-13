import {
  SnapComponent,
  Box,
  Divider,
  Text,
  Link,
  Bold,
} from '@metamask/snaps-sdk/jsx';

export const Footer: SnapComponent = () => {
  return (
    <Box>
      <Text>
        {`Check out more about our Snap at `}
        <Link href="https://snappy-air.com/snap">Snappy Airlines</Link>
      </Text>
      <Divider></Divider>
      <Text>
        Visit the <Bold>Home Page</Bold> to book your next flight.
      </Text>
    </Box>
  );
};
