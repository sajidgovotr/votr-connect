import { Box, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Check from '@mui/icons-material/Check';

const StepBar = ({ steps, activeStep }: { steps: string[]; activeStep: number }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff',
      borderRadius: 1,
      boxShadow: '0 6px 24px 0 rgba(0,0,0,0.10)',
      p: 3,
      mb: 3,
      overflowX: 'auto',
      backdropFilter: 'blur(8px)',
      border: '1px solid #e0e0e0',
    }}
  >
    {steps.map((label, idx) => {
      const isCompleted = idx < activeStep;
      return (
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
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: isCompleted ? '#5563F7' : '#F3F4F6',
                color: isCompleted ? '#fff' : '#6366F1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: 16,
                border: isCompleted ? 'none' : '2px solid #E5E7EB',
                transition: 'all 0.2s',
              }}
            >
              {isCompleted ? <Check sx={{ fontSize: 20 }} /> : idx + 1}
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: isCompleted ? '#5563F7' : '#6366F1',
                cursor: 'pointer',
                fontSize: 16,
              }}
            >
              {label}
            </Typography>
          </Box>
          {idx < steps.length - 1 && (
            <ChevronRightIcon sx={{ color: '#A0A3BD', mx: 2, fontWeight: 700, fontSize: 30 }} />
          )}
        </Box>
      );
    })}
  </Box>
);

export default StepBar; 