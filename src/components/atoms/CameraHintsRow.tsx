import { Box } from "./Box";
import Text from "./Text";
import { colorTokens } from "../../utils/colors.generated";
import { spacingTokens } from "../../utils/spacing.generated";

export interface CameraHintsRowProps {
  hints?: string[];
  className?: string;
}

/**
 * CameraHintsRow Atom
 * Displays visual hints for camera capture quality ("Too Blur", "Too Small", "Too Dark").
 * Uses design tokens for all styling.
 */
export const CameraHintsRow = ({
  hints = ["Too Blur", "Too Small", "Too Dark"],
  className = "",
}: CameraHintsRowProps) => {
  const colors = colorTokens.dark;

  return (
    <Box
      className={className}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: `${spacingTokens["12"]}px`,
        marginTop: `${spacingTokens["16"]}px`,
      }}
    >
      {hints.map((text) => (
        <Box
          key={text}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: `${spacingTokens["8"]}px`,
          }}
        >
          <Text
            variant="body-large"
            sx={{
              fontSize: "18px",
              lineHeight: 1,
              color: colors.mdSysColorError,
            }}
          >
            ✕
          </Text>
          <Text
            variant="body-small"
            sx={{
              color: colors.mdSysColorOnSurface,
            }}
          >
            {text}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default CameraHintsRow;
