import React from "react";
import { Box } from "../atoms/Box";
import { PassportIcon } from "../atoms/PassportIcon";
import { BadgeIcon } from "../atoms/BadgeIcon";
import Text from "../atoms/Text";
import { colorTokens } from "../../utils/colors.generated";
import { spacingTokens } from "../../utils/spacing.generated";

export interface IdentityOptionProps {
  type: "passport" | "badge";
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export const IdentityOption = ({
  type,
  label,
  selected = false,
  onClick,
}: IdentityOptionProps) => {
  const colors = colorTokens.dark;

  /**
   * DARK MODE COLOR LOGIC:
   * 1. Content (Icon/Text): Surface Dim (depending on your Figma) or OnSecondaryContainer if selected.
   * 2. Background: Surface Container Low (base) or Secondary Container (selected).
   * 3. Border: A subtle Outline tone to provide structure in the dark.
   */
  const contentColor = selected
    ? colors.mdSysColorOnSecondaryContainer
    : colors.mdRefPaletteNeutral60;

  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: `${spacingTokens["12"]}px`,
        padding: `${spacingTokens["24"]}px`,
        width: "140px",
        height: "140px",
        cursor: "pointer",
        borderRadius: "24px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

        // Background color
        backgroundColor: selected
          ? colors.mdSysColorSecondaryContainer
          : colors.mdSysColorSurfaceContainerLow,

        // Border
        border: `1.5px solid ${selected ? colors.mdSysColorPrimary : colors.mdRefPaletteNeutral60}`,

        boxShadow: selected
          ? `0px 0px 15px ${colors.mdSysColorPrimary}33`
          : "none",

        "&:hover": {
          backgroundColor: selected
            ? colors.mdSysColorSecondaryContainer
            : colors.mdSysColorSurfaceContainerHigh,
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Icon*/}
      {type === "passport" ? (
        <PassportIcon sx={{ color: contentColor, fontSize: 44 }} />
      ) : (
        <BadgeIcon sx={{ color: contentColor, fontSize: 44 }} />
      )}

      {/* Text */}
      <Text
        variant="label-large"
        sx={{
          textAlign: "center",
          color: contentColor,
          fontWeight: selected ? "700" : "500",
          letterSpacing: "0.5px",
        }}
      >
        {label}
      </Text>
    </Box>
  );
};

export default IdentityOption;
