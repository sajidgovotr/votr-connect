import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import useProductCardStyles from './ProductCard.style';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface ProductCardProps {
  image?: string;
  title: string;
  description: string;
  onClick: () => void;
  selected?: boolean;
  disabled?: boolean;
}

const ProductCard = ({ image, title, description, onClick, selected, disabled }: ProductCardProps) => {
  const classes = useProductCardStyles();
  const cardClass = [
    classes.card,
    selected ? classes.selected : '',
    disabled ? classes.disabled : '',
  ].join(' ');
  return (
    <Card className={cardClass}>
      <CardActionArea disabled={disabled} onClick={onClick} sx={{ flexGrow: 1 }}>
        {image && (
          <CardMedia
            component="img"
            height="120"
            image={image}
            alt={title}
            className={classes.image}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div" className={classes.title} fontWeight={600} align="center">
            {title}
          </Typography>
          <Typography variant="body2" className={classes.description} align="center">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div className={classes.footer} style={{ borderTop: '1px solid #E6E6E9' }}>
        <Button
          variant="text"
          fullWidth
          className={classes.button}
          onClick={onClick}
          disabled={disabled}
          endIcon={<ChevronRightIcon />}
        >
          Get Started
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;