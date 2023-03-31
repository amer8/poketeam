import { Center, Spinner, Stack } from "@chakra-ui/react";

const TeamListLoading = () => {
  return (
    <Center>
    <Stack direction='row' spacing={4}>
      <Spinner size='xl' />
    </Stack>
    </Center>
  );
};

export default TeamListLoading;
