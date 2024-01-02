import { Image, IBoxProps, Pressable, useTheme, Center } from "native-base";
import { useState } from "react";

import AvatarEmpty from "@assets/AvatarEmpty.png";
import { PencilSimpleLine } from "phosphor-react-native";

type Props = IBoxProps & {
  size: number;
  editable?: boolean;
};

export function Avatar({ size, editable = false, ...rest }: Props) {
  const [hasPhoto, setHasPhoto] = useState(false);
  const { colors } = useTheme();

  return (
    <Center w={size} h={size} {...rest} rounded="full">
      <Image
        source={
          hasPhoto ? { uri: "https://github.com/SirGuiL.png" } : AvatarEmpty
        }
        alt="avatar"
        w="full"
        h="full"
      />

      {editable && (
        <Pressable
          position="absolute"
          style={{
            right: -10,
          }}
          bottom={0}
          rounded="full"
          bg="blue.500"
          p={3}
        >
          <PencilSimpleLine size={16} color={colors.gray["600"]} />
        </Pressable>
      )}
    </Center>
  );
}
