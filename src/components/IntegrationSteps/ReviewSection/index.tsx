import { Box, Typography, IconButton, Alert } from '@mui/material';
import { EditIcon } from '@/assets/svgs/custom-icons';

interface ReviewField {
    name: string;
    value: string;
}

interface ReviewSection {
    section: string;
    fields: ReviewField[];
}

interface ReviewSectionProps {
    data: ReviewSection[];
    onEdit: (field: ReviewField) => void;
}

const ReviewSection = ({ data, onEdit }: ReviewSectionProps) => {
    return (
        <Box>

            <Alert severity="warning" sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="warning.main" gutterBottom sx={{ mb: 3 }}>
                    Final Review: Please carefully review all your integration details below. Once you click 'Save', the integration will be saved.
                </Typography>
            </Alert>
            {data && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {data.map((section) => (
                        <Box key={section.section}>
                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 2,
                                    fontWeight: 600,
                                    color: 'primary.main',
                                    borderBottom: '2px solid',
                                    borderColor: 'primary.main',
                                    pb: 1
                                }}
                            >
                                {section.section}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {section.fields.map((field) => (
                                    <Box
                                        key={field.name}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            p: 1.5,
                                            '&:hover': {
                                                bgcolor: 'action.hover',
                                                borderRadius: 1
                                            }
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                            <Typography variant="body2" color="primary.main" sx={{ minWidth: '150px' }}>
                                                {field.name}:
                                            </Typography>
                                            <Typography variant="body1">
                                                {field.value}
                                            </Typography>
                                        </Box>
                                        <IconButton
                                            size="small"
                                            onClick={() => onEdit(field)}
                                            sx={{
                                                color: 'primary.main',
                                                '&:hover': {
                                                    bgcolor: 'primary.light',
                                                    color: 'primary.dark'
                                                }
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default ReviewSection; 