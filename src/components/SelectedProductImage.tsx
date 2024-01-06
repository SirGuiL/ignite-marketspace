import { Box, Image, IBoxProps, useTheme } from "native-base";
import { X } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

type Props = IBoxProps & {
  source: string;
  removeImage: () => void;
};

export function SelectedProductImage({ source, removeImage, ...rest }: Props) {
  const { colors, fontSizes, sizes } = useTheme();

  return (
    <Box
      w={"card"}
      h={"card"}
      justifyContent="flex-start"
      alignItems="flex-end"
      {...rest}
    >
      <Image
        source={{ uri: source }}
        rounded="md"
        position="absolute"
        w="full"
        h="full"
      />

      <TouchableOpacity
        style={{
          backgroundColor: colors.gray["200"],
          borderRadius: 999,
          padding: sizes[0.5],
          marginRight: sizes[1],
          marginTop: sizes[1],
        }}
        onPress={removeImage}
      >
        <X size={fontSizes["md"]} color={colors.gray["700"]} />
      </TouchableOpacity>
    </Box>
  );
}
