import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Alert,
    IconButton,
    Tooltip,
} from '@mui/material';
import { FiCopy, FiInfo } from 'react-icons/fi';

interface WebhookSetupProps {
    config: {
        webhookUrl: string;
        webhookEvents: string[];
    };
    onUpdate: (field: string, value: string) => void;
    onNext: () => void;
    onBack: () => void;
}

const availableEvents = [
    {
        id: 'price_alert',
        name: 'Price Alerts',
        description: 'Receive notifications when price targets are hit',
    },
    {
        id: 'indicator_signal',
        name: 'Indicator Signals',
        description: 'Get notifications for technical indicator signals',
    },
    {
        id: 'market_status',
        name: 'Market Status',
        description: 'Updates about market openings, closings, and trading halts',
    },
    {
        id: 'volume_spike',
        name: 'Volume Spikes',
        description: 'Alerts for unusual trading volume activity',
    },
];

const WebhookSetup: React.FC<WebhookSetupProps> = ({
    config,
    onUpdate,
    onNext,
    onBack
}) => {
    const handleEventToggle = (eventId: string) => {
        const currentEvents = config.webhookEvents;
        const newEvents = currentEvents.includes(eventId)
            ? currentEvents.filter(id => id !== eventId)
            : [...currentEvents, eventId];
        onUpdate('webhookEvents', newEvents as unknown as string);
    };

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(config.webhookUrl);
    };

    const isValid = config.webhookUrl && config.webhookEvents.length > 0;

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Webhook Configuration
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 3 }}>
                Set up webhooks to receive real-time notifications from TradingView
            </Typography>

            <Card sx={{ p: 3, mb: 3 }}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Webhook URL
                        <Tooltip title="The URL where TradingView will send webhook notifications">
                            <IconButton size="small" sx={{ ml: 1 }}>
                                <FiInfo />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                            fullWidth
                            value={config.webhookUrl}
                            onChange={(e) => onUpdate('webhookUrl', e.target.value)}
                            placeholder="https://your-api.example.com/tradingview-webhook"
                        />
                        <Tooltip title="Copy webhook URL">
                            <IconButton onClick={handleCopyUrl}>
                                <FiCopy />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                <Alert severity="info" sx={{ mb: 3 }}>
                    Make sure your webhook endpoint is publicly accessible and can handle POST requests.
                </Alert>

                <Typography variant="subtitle2" gutterBottom>
                    Webhook Events
                </Typography>
                <Grid container spacing={2}>
                    {availableEvents.map((event) => (
                        <Grid item xs={12} md={6} key={event.id}>
                            <Card
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    border: '1px solid',
                                    borderColor: config.webhookEvents.includes(event.id)
                                        ? 'primary.main'
                                        : 'divider',
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={config.webhookEvents.includes(event.id)}
                                            onChange={() => handleEventToggle(event.id)}
                                        />
                                    }
                                    label={
                                        <Box>
                                            <Typography variant="subtitle2">
                                                {event.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {event.description}
                                            </Typography>
                                        </Box>
                                    }
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Card>

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

export default WebhookSetup; 