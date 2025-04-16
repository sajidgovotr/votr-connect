import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Alert,
    Card,
} from '@mui/material';

interface ApiKeySetupProps {
    config: {
        apiKey: string;
        apiSecret: string;
        environment: string;
    };
    onUpdate: (field: string, value: string) => void;
    onNext: () => void;
}

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ config, onUpdate, onNext }) => {
    const isValid = config.apiKey && config.apiSecret;

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                API Key Configuration
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 3 }}>
                Enter your TradingView API credentials to start the integration
            </Typography>

            <Card sx={{ p: 3, mb: 3 }}>
                <Alert severity="info" sx={{ mb: 3 }}>
                    You can find your API credentials in your TradingView account settings under the
                    Developer section.
                </Alert>

                <Box sx={{ mb: 3 }}>
                    <TextField
                        fullWidth
                        label="API Key"
                        value={config.apiKey}
                        onChange={(e) => onUpdate('apiKey', e.target.value)}
                        placeholder="Enter your TradingView API key"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="API Secret"
                        type="password"
                        value={config.apiSecret}
                        onChange={(e) => onUpdate('apiSecret', e.target.value)}
                        placeholder="Enter your TradingView API secret"
                    />
                </Box>

                <FormControl component="fieldset">
                    <Typography variant="subtitle2" gutterBottom>
                        Environment
                    </Typography>
                    <RadioGroup
                        value={config.environment}
                        onChange={(e) => onUpdate('environment', e.target.value)}
                    >
                        <FormControlLabel
                            value="sandbox"
                            control={<Radio />}
                            label={
                                <Box>
                                    <Typography variant="body1">Sandbox</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Test your integration with sample market data
                                    </Typography>
                                </Box>
                            }
                        />
                        <FormControlLabel
                            value="production"
                            control={<Radio />}
                            label={
                                <Box>
                                    <Typography variant="body1">Production</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Connect to live market data (requires verified account)
                                    </Typography>
                                </Box>
                            }
                        />
                    </RadioGroup>
                </FormControl>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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

export default ApiKeySetup; 