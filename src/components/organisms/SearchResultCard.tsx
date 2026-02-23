import { useState, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import { shapeTokens } from '../../utils/shapes';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

export interface SearchResultCardProps extends BoxProps {
  name: string;
  priceLabel?: string;
  hashtag?: string;
  imageUrl?: string;
  viewProfileLabel?: string;
  subscribeLabel?: string;
  onViewProfile?: () => void;
  onSubscribe?: () => void;
}

const gradientOverlay =
  'linear-gradient(to top, var(--md-sys-state-layer-on-surface-opacity-16) 0%, var(--md-sys-state-layer-on-surface-opacity-10) 35%, var(--md-sys-state-layer-on-surface-opacity-08) 70%, transparent 100%)';

export const SearchResultCard = ({
  name,
  priceLabel,
  hashtag,
  imageUrl,
  viewProfileLabel = 'Ver Perfil',
  subscribeLabel = 'Suscribirse',
  onViewProfile,
  onSubscribe,
  sx,
  ...props
}: SearchResultCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      if (img.complete) {
        setIsLoaded(true);
      } else {
        img.onload = () => setIsLoaded(true);
        img.onerror = () => setIsLoaded(true); // Prevent blocking if image fails to load
      }
    } else {
      setIsLoaded(true);
    }
  }, [imageUrl]);

  return (
    <Box
      sx={[
        {
          position: 'relative',
          borderRadius: shapeTokens['corner-small'],
          overflow: 'hidden',
          aspectRatio: '3/4',
          minHeight: 280,
          bgcolor: 'var(--md-sys-color-surface-container-low)',
        },
        ...(sx ? [sx] : []),
      ] as SxProps<Theme>}
      {...props}
    >
      {/* Image layer with real opacity transition */}
      {imageUrl && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 1,
          }}
        />
      )}

      {!isLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'var(--md-sys-color-surface-container-high)',
            zIndex: 2,
          }}
        />
      )}

      <Box
        sx={(t) => ({
          position: 'absolute',
          inset: 0,
          background: gradientOverlay,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          p: t.layout.space16,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out 0.2s', // Small delay for content reveal
          zIndex: 3,
        })}
      >
        <Box sx={{ mb: (t) => t.layout.space12 }}>
          <Text variant="h6" sx={{ color: 'var(--md-sys-color-on-primary)', fontWeight: 600 }}>
            {name}
          </Text>
          {priceLabel && (
            <Text variant="body2" sx={{ color: 'var(--md-sys-color-on-primary)' }}>
              {priceLabel}
            </Text>
          )}
          {hashtag && (
            <Box
              component="span"
              sx={(t) => ({
                display: 'inline-block',
                mt: t.layout.space4,
                px: t.layout.space8,
                py: t.layout.space4,
                borderRadius: shapeTokens['corner-small'],
                bgcolor: 'var(--md-sys-color-surface-container-highest)',
                color: 'var(--md-sys-color-on-primary)',
                fontSize: '0.75rem',
                whiteSpace: 'nowrap',
              })}
            >
              {hashtag}
            </Box>
          )}
        </Box>
        <Box sx={(t) => ({ display: 'flex', gap: t.layout.space8, minWidth: 0 })}>
          <Button
            variant="contained"
            size="small"
            color="inherit"
            shape="square"
            sx={{
              flex: 1,
              minWidth: 0,
              bgcolor: 'var(--md-sys-color-surface-container-highest)',
              color: 'var(--md-sys-color-on-primary)',
              '&:hover': { bgcolor: 'var(--md-sys-color-surface-container-high)' },
            }}
            onClick={onViewProfile}
          >
            {viewProfileLabel}
          </Button>
          <Button
            variant="contained"
            size="small"
            shape="square"
            sx={{ flex: 1, minWidth: 0 }}
            onClick={onSubscribe}
          >
            {subscribeLabel}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchResultCard;
