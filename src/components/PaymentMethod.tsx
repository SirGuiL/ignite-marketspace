import { HStack, Text } from "native-base";
import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  method: string;
};

export function PaymentMethod({ icon, method }: Props) {
  return (
    <HStack alignItems="center" mt={1}>
      {icon}

      <Text ml={2} color="gray.200" fontFamily="body" fontSize="sm">
        {method}
      </Text>
    </HStack>
  );
}
