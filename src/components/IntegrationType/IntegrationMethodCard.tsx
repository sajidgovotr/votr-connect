import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import useIntegrationMethodCardStyles from './IntegrationMethodCard.style';

interface IntegrationMethodCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badgeText?: string;
  onClick: () => void;
  disabled?: boolean;
}

const IntegrationMethodCard = ({ icon, title, description, badgeText, onClick, disabled }: IntegrationMethodCardProps) => {
  const classes = useIntegrationMethodCardStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea disabled={disabled} onClick={onClick}>
        <div className={classes.iconContainer}>{icon}</div>
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div" className={classes.title} align="center" fontWeight={600}>
            {title}
            {badgeText && <Chip label={badgeText} color="success" size="small" className={classes.badge} />}
          </Typography>
          <Typography variant="body2" className={classes.description} align="center">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default IntegrationMethodCard; 