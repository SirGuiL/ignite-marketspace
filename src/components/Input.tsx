import { Input as NBInput, IInputProps } from "native-base";

type Props = IInputProps & {};

export function Input({ ...rest }: Props) {
  return (
    <NBInput
      borderWidth={0}
      rounded="md"
      px={4}
      py={3}
      bg="white"
      _focus={{
        bg: "white",
        borderWidth: 1,
        borderColor: "gray.300",
      }}
      {...rest}
    />
  );
}
