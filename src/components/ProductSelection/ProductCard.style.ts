import { makeStyles } from '@mui/styles';

const useProductCardStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 0,
    transition: 'all 0.2s ease-in-out',
    border: '1px solid #E6E6E9',
    background: '#fff',
    borderRadius: 12,
    minHeight: 320,
  },
  selected: {
    border: '2px solid #6366F1',
    background: '#F8F9FF',
    boxShadow: '0 4px 24px rgba(99,102,241,0.08)',
  },
  disabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    display: 'block',
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 12,
    boxSizing: 'border-box',
    marginTop: 8,
    marginBottom: 8,
  },
  title: {
    marginBottom: 8,
    fontWeight: 600,
    textAlign: 'center',
    color: '#030712',
  },
  description: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 0,
    fontSize: 14,
    lineHeight: 1.5,
  },
  button: {
    marginTop: 'auto',
    textTransform: 'none',
    borderRadius: '0 0 20px 20px',
    color: '#8C8E9C',
    '&:hover': {
      background: '#DBDFFF',
      color: '#fff',
    },
  },
  footer: {
    background: 'transparent',
    borderRadius: '0 0 12px 12px',
    transition: 'background 0.2s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
  },
});

export default useProductCardStyles; 