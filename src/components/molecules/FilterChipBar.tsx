import { Box } from "@mui/material";
import type { BoxProps, SxProps, Theme } from "@mui/material";
import { Search } from "@mui/icons-material";
import FilterTag from "./FilterTag";
import IconButton from "../atoms/IconButton";

export interface FilterChipItem {
  id: string;
  label: string;
}

export interface FilterChipBarProps extends BoxProps {
  chips?: FilterChipItem[];
  onDelete?: (id: string) => void;
  onSearch?: () => void;
}

export const FilterChipBar = ({
  chips = [],
  onDelete,
  onSearch,
  sx,
  ...props
}: FilterChipBarProps) => (
  <Box
    sx={
      [
        (t) => ({
          display: "flex",
          alignItems: "center",
          gap: t.layout.space8,
          px: t.layout.space16,
          overflowX: "auto",
          flexShrink: 0,
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }),
        ...(sx ? [sx] : []),
      ] as SxProps<Theme>
    }
    {...props}
  >
    {chips.map((chip) => (
      <FilterTag
        key={chip.id}
        label={chip.label}
        active
        showDelete
        onDelete={() => onDelete?.(chip.id)}
      />
    ))}
    {onSearch && (
      <IconButton
        aria-label="Search filters"
        size="small"
        onClick={onSearch}
        sx={{ flexShrink: 0, color: "text.secondary" }}
      >
        <Search />
      </IconButton>
    )}
  </Box>
);

export default FilterChipBar;
