import { useState, useEffect } from 'react';
import { Box, Skeleton, IconButton, Stack, useTheme } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { shapeTokens } from '../../utils/shapes';
import {
  Favorite as FavoriteIcon,
  Bookmark as BookmarkIcon,
  MoreHoriz as MoreIcon,
  Send as SendIcon,
  MonetizationOn as TipIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import Avatar from '../atoms/Avatar';
import Text from '../atoms/Text';

export interface FeedCardProps {
  username: string;
  handle: string;
  userAvatar?: string;
  isVerified?: boolean;
  imageUrl: string;
  caption?: string;
  likesCount?: string;
  timeAgo?: string;
  hashtags?: string[];
  onLike?: () => void;
  onSave?: () => void;
  onTip?: () => void;
  onShare?: () => void;
  onMore?: () => void;
  onUserClick?: () => void;
}

const feedCardStyles = (theme: Theme): Record<string, SxProps<Theme>> => ({
  card: {
    width: '100%',
    maxWidth: 400,
    bgcolor: 'transparent',
    color: 'var(--md-sys-color-on-primary)',
    overflow: 'hidden',
  },
  mediaContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: '3/4',
    borderRadius: theme.spacing(theme.layout.space24),
    overflow: 'hidden',
    mb: theme.spacing(theme.layout.space12),
    bgcolor: 'var(--md-sys-color-surface-container-low)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  overlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    p: theme.layout.space16,
    background: 'linear-gradient(to bottom, var(--md-sys-state-layer-on-surface-opacity-16) 0%, transparent 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 3,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.layout.space8,
    cursor: 'pointer',
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    p: theme.layout.space16,
    background: 'linear-gradient(to top, var(--md-sys-state-layer-on-surface-opacity-16) 0%, transparent 100%)',
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 3,
  },
  actionRow: {
    display: 'flex',
    gap: theme.layout.space8,
    mb: theme.layout.space12,
  },
  mainActions: {
    display: 'flex',
    alignItems: 'center',
    bgcolor: 'var(--md-sys-state-layer-on-surface-opacity-08)',
    backdropFilter: 'blur(10px)',
    borderRadius: shapeTokens['corner-medium'],
    px: theme.layout.space4,
  },
  tipButton: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.layout.space4,
    bgcolor: 'var(--md-sys-state-layer-on-surface-opacity-08)',
    backdropFilter: 'blur(10px)',
    borderRadius: shapeTokens['corner-medium'],
    px: theme.layout.space16,
    py: theme.layout.space8,
    color: 'var(--md-sys-color-on-primary)',
    '&:hover': { bgcolor: 'var(--md-sys-state-layer-on-surface-opacity-10)' },
  },
  shareButton: {
    bgcolor: 'var(--md-sys-state-layer-on-surface-opacity-08)',
    backdropFilter: 'blur(10px)',
    borderRadius: shapeTokens['corner-medium'],
    color: 'var(--md-sys-color-on-primary)',
    '&:hover': { bgcolor: 'var(--md-sys-state-layer-on-surface-opacity-10)' },
  },
  content: {
    px: theme.layout.space4,
  },
  hashtag: {
    color: 'var(--md-sys-color-primary)',
    fontWeight: 500,
    mr: theme.layout.space8,
    cursor: 'pointer',
    '&:hover': { textDecoration: 'underline' },
  },
});

export const FeedCard = ({
  username,
  handle,
  userAvatar,
  isVerified = true,
  imageUrl,
  caption,
  likesCount = '1K',
  timeAgo = '1h',
  hashtags = [],
  onLike,
  onSave,
  onTip,
  onShare,
  onMore,
  onUserClick,
}: FeedCardProps) => {
  const theme = useTheme();
  const styles = feedCardStyles(theme);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      if (img.complete) {
        setIsLoaded(true);
      } else {
        img.onload = () => setIsLoaded(true);
        img.onerror = () => setIsLoaded(true);
      }
    } else {
      setIsLoaded(true);
    }
  }, [imageUrl]);

  return (
    <Box sx={styles.card}>
      {/* Media Section */}
      <Box sx={styles.mediaContainer}>
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

        {/* Top Overlay */}
        <Box sx={styles.overlayTop}>
          <Box sx={styles.userInfo} onClick={onUserClick}>
                <Avatar
              src={userAvatar}
              alt={username}
                  sx={{ width: 44, height: 44, border: '2px solid var(--md-sys-color-on-primary)' }}
            />
            <Box>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Text variant="title-medium" sx={{ fontWeight: 700, lineHeight: 1 }}>
                  {username}
                </Text>
                {isVerified && <VerifiedIcon sx={{ fontSize: 16, color: 'var(--md-sys-color-primary)' }} />}
              </Stack>
              <Text variant="label-medium" sx={{ opacity: 0.8, lineHeight: 1.2, color: 'var(--md-sys-color-on-primary)' }}>
                @{handle}
              </Text>
            </Box>
          </Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Text variant="label-medium" sx={{ fontWeight: 500 }}>{timeAgo}</Text>
            <IconButton onClick={onMore} size="small" sx={{ color: 'var(--md-sys-color-on-primary)' }}>
              <MoreIcon />
            </IconButton>
          </Stack>
        </Box>

        <Box
          component="img"
          src={imageUrl}
          alt="Post content"
          sx={{ ...styles.image, opacity: isLoaded ? 1 : 0 }}
        />

        {/* Bottom Overlay (Watermark-like text) */}
        <Box sx={styles.overlayBottom}>
          <Text variant="label-small" sx={{ opacity: 0.8 }}>
            app.seacrets.online/{handle}
          </Text>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box sx={styles.actionRow}>
        <Box sx={styles.mainActions}>
          <Stack direction="row" alignItems="center" spacing={0}>
            <IconButton onClick={onLike} sx={{ color: 'var(--md-sys-color-on-primary)' }}>
              <FavoriteIcon />
            </IconButton>
            <Text variant="label-large" sx={{ fontWeight: 600, pr: (t) => t.layout.space8 }}>{likesCount}</Text>
          </Stack>
          <Box sx={{ width: '1px', height: '20px', bgcolor: 'var(--md-sys-state-layer-on-surface-opacity-08)', mx: (t) => t.layout.space4 }} />
            <IconButton onClick={onSave} sx={{ color: 'var(--md-sys-color-on-primary)' }}>
            <BookmarkIcon />
          </IconButton>
        </Box>

        <IconButton sx={styles.tipButton} onClick={onTip}>
          <TipIcon sx={{ fontSize: 20 }} />
          <Text variant="label-large" sx={{ fontWeight: 600 }}>Tip</Text>
        </IconButton>

        <IconButton sx={styles.shareButton} onClick={onShare}>
          <SendIcon sx={{ fontSize: 20, transform: 'rotate(-20deg)', mt: -0.5 }} />
        </IconButton>
      </Box>

      {/* Caption & Hashtags */}
      <Box sx={styles.content}>
        {caption && (
          <Text variant="body-medium" sx={{ mb: (t) => t.layout.space4, lineHeight: 1.4 }}>
            {caption}
          </Text>
        )}
        <Text variant="body-medium" sx={{ mb: (t) => t.layout.space4 }}>
          @{handle}
        </Text>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {hashtags.map((tag) => (
            <Text key={tag} variant="body-medium" sx={styles.hashtag}>
              #{tag}
            </Text>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FeedCard;
