import { makeStyles } from '@mui/styles';

const useIntegrationMethodCardStyles = makeStyles({
  card: {
    minHeight: 220,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    transition: 'box-shadow 0.2s',
    '&:hover': {
      boxShadow: '0 4px 16px rgba(99,102,241,0.15)',
    },
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  badge: {
    marginLeft: 8,
    verticalAlign: 'middle',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  description: {
    marginTop: 8,
    color: '#6B7280',
  },
});

export default useIntegrationMethodCardStyles; 