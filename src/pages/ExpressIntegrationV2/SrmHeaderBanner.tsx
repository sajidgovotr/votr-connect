import { Box, Typography, Paper } from '@mui/material';

const SrmHeaderBanner = () => (
  <Paper
    elevation={0}
    sx={{
      mb: 3,
      borderRadius: 1,
      p: 0,
      textAlign: 'center',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e0e0e0',
      overflow: 'hidden',
    }}
  >
    <Box
      component="img"
      src="/images/SRM_Banner.png"
      alt="SRM Banner"
      sx={{
        width: '100%',
        height: 120,
        objectFit: 'cover',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        display: 'block',
        pt: 2,
        px: 2,
      }}
    />
    <Box px={{ xs: 2, md: 4 }} py={2}>
      <Typography variant="h6" fontWeight={600}>
        Shareholder Relationship Management (SRM)
      </Typography>
      <Typography variant="body2" maxWidth={700} mx="auto">
        Manage and optimize your shareholder relationships with our comprehensive SRM solution.
      </Typography>
    </Box>
  </Paper>
);

export default SrmHeaderBanner; 