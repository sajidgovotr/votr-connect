import { Box, Button, TextField, Typography } from "@mui/material";

interface DataSet {
    title: string;
    color: string;
    features: string[];
}

interface SampleDataTabProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    dataSets: DataSet[];
}

const SampleDataTab = ({
    searchQuery,
    setSearchQuery,
    dataSets
}: SampleDataTabProps) => {
    return (
        <Box sx={{
            bgcolor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            p: 4
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: '#111827'
                    }}
                >
                    Sample Data Sets
                </Typography>
                <TextField
                    placeholder="Search datasets..."
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        width: '300px',
                        '& .MuiOutlinedInput-root': {
                            bgcolor: 'white',
                            '& fieldset': { borderColor: '#E5E7EB' },
                            '&:hover fieldset': { borderColor: '#D1D5DB' },
                        },
                    }}
                />
            </Box>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 3
            }}>
                {dataSets.map((dataset, index) => (
                    <Box
                        key={index}
                        sx={{
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            overflow: 'hidden'
                        }}
                    >
                        <Box
                            sx={{
                                bgcolor: dataset.color,
                                color: 'white',
                                p: 2,
                                fontWeight: 500
                            }}
                        >
                            {dataset.title}
                        </Box>
                        <Box sx={{ p: 3 }}>
                            {dataset.features.map((feature, idx) => (
                                <Box
                                    key={idx}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: '#6B7280',
                                        fontSize: '0.875rem',
                                        mb: idx < dataset.features.length - 1 ? 1 : 0
                                    }}
                                >
                                    <Box
                                        component="span"
                                        sx={{
                                            width: '4px',
                                            height: '4px',
                                            borderRadius: '50%',
                                            bgcolor: '#D1D5DB',
                                            mr: 2
                                        }}
                                    />
                                    {feature}
                                </Box>
                            ))}
                            <Button
                                sx={{
                                    mt: 3,
                                    color: dataset.color,
                                    textTransform: 'none',
                                    p: 0,
                                    '&:hover': {
                                        bgcolor: 'transparent',
                                        opacity: 0.8
                                    }
                                }}
                            >
                                View & Use
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default SampleDataTab; 