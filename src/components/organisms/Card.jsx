import React from 'react';
import MuiCard from '@mui/material/Card';
import MuiCardContent from '@mui/material/CardContent';
import MuiCardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '../atoms/Button.jsx';
import Avatar from '../atoms/Avatar.jsx';

/**
 * Card organism - Post/card block.
 * Composes atoms (Button, Avatar).
 */
export const Card = ({
  title,
  subtitle,
  avatar,
  content,
  actions,
  children,
  ...props
}) => (
  <MuiCard {...props}>
    <MuiCardContent>
      {(title || avatar) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          {avatar && (React.isValidElement(avatar) ? avatar : <Avatar>{avatar}</Avatar>)}
          <div>
            {title && <strong>{title}</strong>}
            {subtitle && (
              <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
            )}
          </div>
        </div>
      )}
      {content || children}
    </MuiCardContent>
    {actions && actions.length > 0 && (
      <MuiCardActions>
        {actions.map((a, i) => (
          <Button key={i} {...(typeof a === 'object' ? a : { children: a })} />
        ))}
      </MuiCardActions>
    )}
  </MuiCard>
);

export default Card;
