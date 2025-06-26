import { Box, Typography, Paper } from '@mui/material';
import performanceSvg from '@/assets/svgs/performance.svg';
import apiIconSvg from '@/assets/svgs/api-icon.svg';

interface SrmHeaderBannerProps {
  heading?: string;
  subheading?: string;
}

const SrmHeaderBanner = ({
  heading,
  subheading,
}: SrmHeaderBannerProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3,
        borderRadius: 1,
        p: 2,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e0e0e0',
        overflow: 'hidden',
      }}
    >
      <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', bgcolor: 'unset', p: 3, borderRadius: 1, background: 'radial-gradient(103.03% 103.03% at 0% 0%, rgba(240, 241, 255, 0.5) 0%, rgba(184, 191, 255, 0.5) 100%)' }}>
        <Box mr={2}>
          <img src={performanceSvg} alt="Performance" width={122} height={93} />
        </Box>
        <Box>
          <Typography variant="h4">Shareholder Relationship Management (SRM)</Typography>
          <Typography variant="body1" color='text.primary'>
            Manage and optimize your shareholder relationships with our comprehensive SRM solution.
          </Typography>
        </Box>
      </Paper>
      <Box px={1} py={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box mr={3}>
          <img src={apiIconSvg} alt="API Icon" width={44} height={45} />
        </Box>
        <Box>
          {heading && (
            <Typography variant="h5">
              {heading}
            </Typography>
          )}
          {subheading && (
            <Typography variant="body2" maxWidth={700}>
              {subheading}
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default SrmHeaderBanner; 