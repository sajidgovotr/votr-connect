// NavigationCard.tsx
import React, { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { makeStyles } from '@mui/styles';

interface INavigationCardProps {
  icon: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  onClick?: () => void;
}

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    cursor: 'pointer',
  },
  iconContainer: {
    backgroundColor: '#F0F1FF', // equivalent of grey30
    // color: '#00bcd4',           // equivalent of aqua.deep
    padding: 12,
    marginRight: 24,
    // border: '1px solid #b0bec5', // equivalent of blue.greyed
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& svg': {
      fontSize: 32,
      color: 'inherit',
    },
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#030712',
    fontWeight: 500,
    marginBottom: 2,
    fontSize: 20,
    textTransform: 'none',
  },
  subtitle: {
    color: '#8C8E9C', 
    fontSize: 14,
    textTransform: 'none',
  },
  arrow: {
    color: '#8C8E9C',
    '& svg': {
      fontSize: 32,
    },
  },
}));

const NavigationCard: React.FC<INavigationCardProps> = ({
  icon,
  title,
  subtitle,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.card} onClick={onClick}>
      <Box className={classes.iconContainer}>{icon}</Box>
      <Box className={classes.content}>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" className={classes.subtitle}>
            {subtitle}
          </Typography>
        )}
      </Box>
      <Box className={classes.arrow}>
        <ChevronRightIcon />
      </Box>
    </Box>
  );
};

export default NavigationCard;
