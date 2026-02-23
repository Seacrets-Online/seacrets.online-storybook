import { type ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import GlobalHeader from '../organisms/GlobalHeader';
import SearchSection from '../organisms/SearchSection';
import SearchResultCard from '../organisms/SearchResultCard';
import type { SearchFilterTag, SearchType } from '../organisms/SearchSection';

export type { SearchType } from '../organisms/SearchSection';
export type { SearchFilterTag } from '../organisms/SearchSection';

export interface SearchResultItem {
  id: string;
  name: string;
  priceLabel?: string;
  hashtag?: string;
  imageUrl?: string;
}

export interface SearchTemplateProps extends Omit<BoxProps, 'results'> {
  balance?: string;
  headerNavItems?: { value: string; label: string }[];
  onProfileClick?: () => void;
  onBalanceClick?: () => void;
  onNavClick?: (value: string) => void;
  title?: string;
  searchTypes?: { value: SearchType; label: string }[];
  filterCategories?: { value: string; label: string }[];
  activeFilters?: SearchFilterTag[];
  onSearchTypeChange?: (type: SearchType) => void;
  onSearch?: (query: string) => void;
  onFilterCategoryClick?: (category: string) => void;
  onRemoveFilter?: (id: string) => void;
  onClearFilters?: () => void;
  onViewProfile?: (item: SearchResultItem) => void;
  onSubscribe?: (item: SearchResultItem) => void;
  results?: SearchResultItem[];
  renderResults?: (props: { results: SearchResultItem[] }) => ReactNode;
  /** Callback when user scrolls near the bottom */
  onLoadMore?: () => void;
  /** Whether more results are currently being loaded */
  isLoadingMore?: boolean;
}

const rootSx: SxProps<Theme> = {
  flex: 1,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  bgcolor: 'background.default',
  height: '100%',
  overflowY: 'auto', // Enable scroll here
};

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

const defaultActiveFilters: SearchFilterTag[] = [
  { id: '1', label: 'Nuevos', active: true },
  { id: '2', label: 'Lives' },
  { id: '3', label: 'Gratis' },
  { id: '4', label: 'Popular' },
  { id: '5', label: 'Hentai', removable: false },
];

const getPlaceholderImage = (seed: string) => {
  const hash = Math.abs(seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0));
  return `https://100k-faces.vercel.app/api/random-image?seed=${hash}`;
};

const defaultResults: SearchResultItem[] = [
  { id: '1', name: 'Daniela', priceLabel: 'Gratis', hashtag: '#tetas', imageUrl: getPlaceholderImage('1') },
  { id: '2', name: 'Georgia', priceLabel: 'Gratis', hashtag: '#tetas', imageUrl: getPlaceholderImage('2') },
  { id: '3', name: 'Sofia', priceLabel: 'Gratis', hashtag: '#tetas', imageUrl: getPlaceholderImage('3') },
];

export const SearchTemplate = ({
  balance,
  headerNavItems,
  onProfileClick,
  onBalanceClick,
  onNavClick,
  title = 'Búsqueda de Secretos',
  searchTypes = defaultSearchTypes,
  filterCategories = defaultFilterCategories,
  activeFilters = defaultActiveFilters,
  onSearchTypeChange,
  onSearch,
  onFilterCategoryClick,
  onRemoveFilter,
  onClearFilters,
  onViewProfile,
  onSubscribe,
  results = defaultResults,
  renderResults,
  onLoadMore,
  isLoadingMore = false,
  sx,
  ...props
}: SearchTemplateProps) => {
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    // 1000px threshold for proactive loading
    const bottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 1000;
    if (bottom && onLoadMore && !isLoadingMore) {
      onLoadMore();
    }
  };

  return (
    <Box
      onScroll={handleScroll}
      sx={[rootSx, ...(sx ? [sx] : [])] as SxProps<Theme>}
      {...props}
    >
      <Container
        maxWidth="sm"
        sx={{
          flex: 1,
          minHeight: 0,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          px: (t) => t.layout.space16,
          py: (t) => t.layout.space16,
        }}
      >
        <GlobalHeader
          balance={balance}
          navItems={headerNavItems}
          onProfileClick={onProfileClick}
          onBalanceClick={onBalanceClick}
          onNavClick={onNavClick}
          sx={(t) => ({ flexShrink: 0, mb: t.layout.space24 })}
        />
        <SearchSection
          title={title}
          searchTypes={searchTypes}
          filterCategories={filterCategories}
          activeFilters={activeFilters}
          onSearchTypeChange={onSearchTypeChange}
          onSearch={onSearch}
          onFilterCategoryClick={onFilterCategoryClick}
          onRemoveFilter={onRemoveFilter}
          onClearFilters={onClearFilters}
          sx={(t) => ({ flexShrink: 0, mb: t.layout.space16 })}
        />

        <Box sx={{ flex: 1, minHeight: 0 }}>
          {renderResults ? (
            renderResults({ results })
          ) : (
            <Box sx={(t) => ({ display: 'flex', flexDirection: 'column', gap: t.layout.space16 })}>
              {results.map((item) => (
                <SearchResultCard
                  key={item.id}
                  name={item.name}
                  priceLabel={item.priceLabel}
                  hashtag={item.hashtag}
                  imageUrl={item.imageUrl ?? getPlaceholderImage(item.id)}
                  onViewProfile={() => onViewProfile?.(item)}
                  onSubscribe={() => onSubscribe?.(item)}
                />
              ))}
              
              {/* Skeleton placeholders for natural infinite loading */}
              {isLoadingMore && (
                <>
                  <SearchResultCard name="" sx={{ opacity: 0.6 }} />
                  <SearchResultCard name="" sx={{ opacity: 0.3 }} />
                </>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default SearchTemplate;
