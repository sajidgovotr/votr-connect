import { Box, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const StepBar = ({ steps, activeStep }: { steps: string[]; activeStep: number }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      background: '#fff',
      borderRadius: 2,
      boxShadow: '0 6px 24px 0 rgba(0,0,0,0.10)',
      p: 2,
      mb: 3,
      overflowX: 'auto',
      backdropFilter: 'blur(8px)',
      border: '1px solid #e0e0e0',
    }}
  >
    {steps.map((label, idx) => (
      <Box key={label} display="flex" alignItems="center">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1,
          }}
        >
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: idx === activeStep ? '#6366F1' : '#F3F4F6',
              color: idx === activeStep ? '#fff' : '#6366F1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: 16,
              border: idx === activeStep ? '2px solid #6366F1' : '2px solid #E5E7EB',
              transition: 'all 0.2s',
            }}
          >
            {idx + 1}
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: idx === activeStep ? '#6366F1' : '#374151',
              fontWeight: idx === activeStep ? 700 : 500,
              ml: 1,
              cursor: 'pointer',
            }}
          >
            {label}
          </Typography>
        </Box>
        {idx < steps.length - 1 && (
          <ChevronRightIcon sx={{ color: '#D1D5DB', mx: 1, fontWeight: 700 }} />
        )}
      </Box>
    ))}
  </Box>
);

export default StepBar; 