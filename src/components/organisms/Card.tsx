import React from 'react';
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardActions as MuiCardActions,
  Typography,
} from '@mui/material';
import type { CardProps } from '@mui/material';
import Button from '../atoms/Button';
import Avatar from '../atoms/Avatar';
import type { ButtonProps } from '../atoms/Button';

export type CardAction = ButtonProps | React.ReactNode;

export interface CardPropsExtended extends Omit<CardProps, 'content'> {
  title?: string;
  subtitle?: string;
  avatar?: React.ReactNode;
  content?: React.ReactNode;
  actions?: CardAction[];
}

export const Card = ({
  title,
  subtitle,
  avatar,
  content,
  actions,
  children,
  ...props
}: CardPropsExtended) => (
  <MuiCard {...props}>
    <MuiCardContent>
      {(title || avatar) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          {avatar && (React.isValidElement(avatar) ? avatar : <Avatar>{avatar}</Avatar>)}
          <div style={{ minWidth: 0 }}>
            {title && <strong>{title}</strong>}
            {subtitle && (
              <Typography variant="body2" color="text.secondary" noWrap>
                {subtitle}
              </Typography>
            )}
          </div>
        </div>
      )}
      {content || children}
    </MuiCardContent>
    {actions && actions.length > 0 && (
      <MuiCardActions>
        {actions.map((a, i) => (
          <Button
            key={i}
            {...(typeof a === 'object' && a !== null && !React.isValidElement(a)
              ? (a as ButtonProps)
              : { children: a as React.ReactNode })}
          />
        ))}
      </MuiCardActions>
    )}
  </MuiCard>
);

export default Card;
