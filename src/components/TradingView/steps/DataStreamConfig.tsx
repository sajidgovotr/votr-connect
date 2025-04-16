import React from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Alert,
    Chip,
} from '@mui/material';
import { FiBarChart2, FiClock, FiDollarSign, FiGlobe } from 'react-icons/fi';

interface DataStreamConfigProps {
    config: {
        dataStreams: string[];
    };
    onUpdate: (field: string, value: string[]) => void;
    onNext: () => void;
    onBack: () => void;
}

const availableStreams = [
    {
        id: 'real_time_prices',
        name: 'Real-Time Prices',
        description: 'Live price updates for stocks, forex, and crypto',
        icon: FiDollarSign,
        category: 'Market Data'
    },
    {
        id: 'technical_indicators',
        name: 'Technical Indicators',
        description: 'Real-time technical analysis indicators and signals',
        icon: FiBarChart2,
        category: 'Analysis'
    },
    {
        id: 'market_hours',
        name: 'Market Hours',
        description: 'Trading hours and market status updates',
        icon: FiClock,
        category: 'Market Data'
    },
    {
        id: 'global_markets',
        name: 'Global Markets',
        description: 'Data from major global exchanges and markets',
        icon: FiGlobe,
        category: 'Market Data'
    }
];

const DataStreamConfig: React.FC<DataStreamConfigProps> = ({
    config,
    onUpdate,
    onNext,
    onBack
}) => {
    const handleStreamToggle = (streamId: string) => {
        const currentStreams = config.dataStreams;
        const newStreams = currentStreams.includes(streamId)
            ? currentStreams.filter(id => id !== streamId)
            : [...currentStreams, streamId];
        onUpdate('dataStreams', newStreams);
    };

    const isValid = config.dataStreams.length > 0;

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Data Stream Configuration
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 3 }}>
                Select the data streams you want to integrate with your application
            </Typography>

            <Alert severity="info" sx={{ mb: 3 }}>
                Data stream availability may vary based on your TradingView subscription level.
                Some streams may require additional authentication.
            </Alert>

            <Grid container spacing={2} sx={{ mb: 4 }}>
                {availableStreams.map((stream) => {
                    const Icon = stream.icon;
                    return (
                        <Grid item xs={12} md={6} key={stream.id}>
                            <Card
                                sx={{
                                    p: 2,
                                    border: '1px solid',
                                    borderColor: config.dataStreams.includes(stream.id)
                                        ? 'primary.main'
                                        : 'divider',
                                    bgcolor: config.dataStreams.includes(stream.id)
                                        ? 'primary.lighter'
                                        : 'background.paper',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                    },
                                }}
                                onClick={() => handleStreamToggle(stream.id)}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={config.dataStreams.includes(stream.id)}
                                                onChange={() => handleStreamToggle(stream.id)}
                                            />
                                        }
                                        label=""
                                        sx={{ mr: 1, mt: -1 }}
                                    />
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <Icon size={20} style={{ marginRight: '8px' }} />
                                            <Typography variant="subtitle1">
                                                {stream.name}
                                            </Typography>
                                            <Chip
                                                label={stream.category}
                                                size="small"
                                                sx={{ ml: 1 }}
                                            />
                                        </Box>
                                        <Typography variant="body2" color="textSecondary">
                                            {stream.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={onBack}>
                    Back
                </Button>
                <Button
                    variant="contained"
                    onClick={onNext}
                    disabled={!isValid}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default DataStreamConfig; 