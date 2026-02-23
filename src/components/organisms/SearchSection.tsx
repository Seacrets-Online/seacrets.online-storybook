import { useState } from 'react';
import { Box, InputAdornment } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import { shapeTokens } from '../../utils/shapes';
import { Search as SearchIcon } from '@mui/icons-material';
import Text from '../atoms/Text';
import TextField from '../molecules/TextField';
import SegmentedControl from '../molecules/SegmentedControl';
import PillTabGroup from '../molecules/PillTabGroup';
import FilterTag from '../molecules/FilterTag';

export type SearchType = 'usuario' | 'nombre' | 'hashtag' | 'palabras';

export interface SearchFilterTag {
  id: string;
  label: string;
  active?: boolean;
  removable?: boolean;
}

export interface SearchSectionProps extends BoxProps {
  title?: string;
  searchTypes?: { value: SearchType; label: string }[];
  filterCategories?: { value: string; label: string }[];
  activeFilters?: SearchFilterTag[];
  onSearchTypeChange?: (type: SearchType) => void;
  onSearch?: (query: string) => void;
  onFilterCategoryClick?: (category: string) => void;
  onRemoveFilter?: (id: string) => void;
  onClearFilters?: () => void;
  clearFiltersLabel?: string;
}

const defaultSearchTypes = [
  { value: 'usuario' as SearchType, label: 'Usuario' },
  { value: 'nombre' as SearchType, label: 'Nombre' },
  { value: 'hashtag' as SearchType, label: '# Hastag' },
  { value: 'palabras' as SearchType, label: 'Palabras' },
];

const defaultFilterCategories = [
  { value: 'edad', label: 'Edad' },
  { value: 'genero', label: 'Género' },
  { value: 'pais', label: 'País' },
];

export const SearchSection = ({
  title = 'Búsqueda de Secretos',
  searchTypes = defaultSearchTypes,
  filterCategories = defaultFilterCategories,
  activeFilters = [],
  onSearchTypeChange,
  onSearch,
  onFilterCategoryClick,
  onRemoveFilter,
  onClearFilters,
  clearFiltersLabel = 'Clear All Filters X',
  sx,
  ...props
}: SearchSectionProps) => {
  const [searchType, setSearchType] = useState<SearchType>('usuario');
  const [query, setQuery] = useState('');

  const handleSearchType = (type: SearchType) => {
    setSearchType(type);
    onSearchTypeChange?.(type);
  };

  return (
    <Box sx={[(t) => ({ display: 'flex', flexDirection: 'column', gap: t.layout.space16 }), ...(sx ? [sx] : [])] as SxProps<Theme>} {...props}>
      <Text variant="headline-small" component="h1" sx={{ color: 'text.primary', textAlign: 'center' }}>
        {title}
      </Text>

      <SegmentedControl
        tabs={searchTypes}
        value={searchType}
        onChange={handleSearchType}
      />

      <TextField
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch?.(query)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Box
                component="button"
                type="button"
                onClick={() => onSearch?.(query)}
                aria-label="Buscar"
                sx={(t) => ({
                  p: t.layout.space4,
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: 'text.primary',
                  '&:hover': { opacity: 0.8 },
                })}
              >
                <SearchIcon />
              </Box>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: shapeTokens['corner-small'],
            bgcolor: 'var(--md-sys-color-surface-container-low)',
          },
        }}
      />

      <PillTabGroup
        tabs={filterCategories}
        value={undefined}
        onChange={(v) => onFilterCategoryClick?.(v)}
        variant="rounded"
      />

      {activeFilters.length > 0 && (
        <Box sx={(t) => ({ display: 'flex', flexDirection: 'column', gap: t.layout.space8, width: '100%' })}>
          <Box
            sx={(theme) => ({
              position: 'relative',
              width: '100%',
              minWidth: 0,
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: theme.spacing(theme.layout.space24),
                background: `linear-gradient(to left, ${theme.palette.background.default} 0%, transparent 100%)`,
                pointerEvents: 'none',
              },
            })}
          >
            <Box
              sx={(t) => ({
                display: 'flex',
                gap: t.layout.space8,
                alignItems: 'center',
                width: '100%',
                overflowX: 'auto',
                overflowY: 'hidden',
                flexWrap: 'nowrap',
                scrollbarWidth: 'none',
                WebkitOverflowScrolling: 'touch',
                '&::-webkit-scrollbar': { display: 'none' },
              })}
            >
              {activeFilters.map((f) => (
                <FilterTag
                  key={f.id}
                  label={f.label}
                  active={f.active}
                  showDelete={f.removable !== false}
                  onDelete={f.removable !== false ? () => onRemoveFilter?.(f.id) : undefined}
                  sx={{ flexShrink: 0 }}
                />
              ))}
            </Box>
          </Box>
          <Box
            component="button"
            type="button"
            onClick={onClearFilters}
            sx={{
              width: '100%',
              color: 'primary.main',
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              textAlign: 'right',
            }}
          >
            <Text variant="label-small" sx={{ color: 'inherit' }}>
              {clearFiltersLabel}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SearchSection;
