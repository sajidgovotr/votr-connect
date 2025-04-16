import { Box, Typography, Grid } from '@mui/material';
import IntegrationCard from '@/components/IntegrationCatalog/IntegrationCard';

interface IntegrationTypeProps {
    selectedType: string;
    onTypeSelect: (type: string) => void;
    selectedProduct: string;
    onStepComplete?: (type: string, completed: boolean) => void;
    onNext?: () => void;
}

const integrationTypes = [
    {
        id: 'rest-api',
        title: 'REST API',
        description: 'Share data via endpoints with JSON responses',
        buttonText: 'Configure',
        buttonColor: '#3B82F6',
        steps: [
            'Basic Info',
            'Authentication',
            'Data Schema',
            'Review'
        ]
    },
    {
        id: 'graphql',
        title: 'GraphQL',
        description: 'Flexible data queries with schema definitions',
        buttonText: 'Configure',
        buttonColor: '#9333EA',
        steps: [
            'Basic Info',
            'Schema Design',
            'Security',
            'Review'
        ]
    },
    {
        id: 'file-upload',
        title: 'File Upload',
        description: 'Scheduled file transfers via SFTP/FPS',
        buttonText: 'Configure',
        buttonColor: '#F97316',
        steps: [
            'Basic Info',
            'File Configuration',
            'Transfer Settings',
            'Review'
        ]
    }
];

const IntegrationType = ({ onTypeSelect, selectedProduct, onNext }: IntegrationTypeProps) => {
    const handleConfigure = (typeId: string) => () => {
        onTypeSelect(typeId);
        if (onNext) {
            onNext();
        }
    };

    return (
        <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Select Integration Type for {selectedProduct}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Choose an integration type to begin configuration
            </Typography>

            <Grid container spacing={4}>
                {integrationTypes.map((type) => (
                    <Grid item xs={12} md={6} lg={4} key={type.id}>
                        <Box sx={{
                            height: '100%',
                            '& > div': {
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }
                        }}>
                            <IntegrationCard
                                title={type.title}
                                description={type.description}
                                buttonText={type.buttonText}
                                buttonColor={type.buttonColor}
                                onClick={handleConfigure(type.id)}
                                configurationStatus={[]}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default IntegrationType; 