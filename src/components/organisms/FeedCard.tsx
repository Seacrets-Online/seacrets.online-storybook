import { useState, useEffect } from 'react';
import { Box, Skeleton, IconButton, Stack } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
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

const feedCardStyles: Record<string, SxProps<Theme>> = {
  card: {
    width: '100%',
    maxWidth: 400,
    bgcolor: 'transparent',
    color: 'white',
    overflow: 'hidden',
  },
  mediaContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: '3/4',
    borderRadius: '24px',
    overflow: 'hidden',
    mb: 1.5,
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
    p: 2,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 3,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    cursor: 'pointer',
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    p: 2,
    background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)',
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 3,
  },
  actionRow: {
    display: 'flex',
    gap: 1,
    mb: 1.5,
  },
  mainActions: {
    display: 'flex',
    alignItems: 'center',
    bgcolor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    px: 0.5,
  },
  tipButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    bgcolor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    px: 2,
    py: 1,
    color: 'white',
    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
  },
  shareButton: {
    bgcolor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    color: 'white',
    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
  },
  content: {
    px: 0.5,
  },
  hashtag: {
    color: '#E91E63',
    fontWeight: 500,
    mr: 1,
    cursor: 'pointer',
    '&:hover': { textDecoration: 'underline' },
  },
};

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
    <Box sx={feedCardStyles.card}>
      {/* Media Section */}
      <Box sx={feedCardStyles.mediaContainer}>
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
        <Box sx={feedCardStyles.overlayTop}>
          <Box sx={feedCardStyles.userInfo} onClick={onUserClick}>
            <Avatar
              src={userAvatar}
              alt={username}
              sx={{ width: 44, height: 44, border: '2px solid white' }}
            />
            <Box>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Text sx={{ fontWeight: 700, fontSize: '1.1rem', lineHeight: 1 }}>
                  {username}
                </Text>
                {isVerified && <VerifiedIcon sx={{ fontSize: 16, color: '#E91E63' }} />}
              </Stack>
              <Text sx={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.2 }}>
                @{handle}
              </Text>
            </Box>
          </Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Text sx={{ fontSize: '0.9rem', fontWeight: 500 }}>{timeAgo}</Text>
            <IconButton onClick={onMore} size="small" sx={{ color: 'white' }}>
              <MoreIcon />
            </IconButton>
          </Stack>
        </Box>

        <Box
          component="img"
          src={imageUrl}
          alt="Post content"
          sx={[
            feedCardStyles.image,
            { opacity: isLoaded ? 1 : 0 }
          ]}
        />

        {/* Bottom Overlay (Watermark-like text) */}
        <Box sx={feedCardStyles.overlayBottom}>
          <Text sx={{ fontSize: '0.75rem', opacity: 0.8 }}>
            app.seacrets.online/{handle}
          </Text>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box sx={feedCardStyles.actionRow}>
        <Box sx={feedCardStyles.mainActions}>
          <Stack direction="row" alignItems="center" spacing={0}>
            <IconButton onClick={onLike} sx={{ color: 'white' }}>
              <FavoriteIcon />
            </IconButton>
            <Text sx={{ fontWeight: 600, fontSize: '0.9rem', pr: 1 }}>{likesCount}</Text>
          </Stack>
          <Box sx={{ width: '1px', height: '20px', bgcolor: 'rgba(255,255,255,0.2)', mx: 0.5 }} />
          <IconButton onClick={onSave} sx={{ color: 'white' }}>
            <BookmarkIcon />
          </IconButton>
        </Box>

        <IconButton sx={feedCardStyles.tipButton} onClick={onTip}>
          <TipIcon sx={{ fontSize: 20 }} />
          <Text sx={{ fontWeight: 600, fontSize: '0.9rem' }}>Tip</Text>
        </IconButton>

        <IconButton sx={feedCardStyles.shareButton} onClick={onShare}>
          <SendIcon sx={{ fontSize: 20, transform: 'rotate(-20deg)', mt: -0.5 }} />
        </IconButton>
      </Box>

      {/* Caption & Hashtags */}
      <Box sx={feedCardStyles.content}>
        {caption && (
          <Text sx={{ fontSize: '0.95rem', mb: 0.5, lineHeight: 1.4 }}>
            {caption}
          </Text>
        )}
        <Text sx={{ fontSize: '0.95rem', mb: 0.5 }}>
          @{handle}
        </Text>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {hashtags.map((tag) => (
            <Text key={tag} sx={feedCardStyles.hashtag}>
              #{tag}
            </Text>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FeedCard;
