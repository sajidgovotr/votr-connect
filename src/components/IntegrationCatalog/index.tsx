import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router";

interface IntegrationCardProps {
    title: string;
    description: string;
    buttonText: string;
    buttonColor: string;
    onClick: () => void;
}

const IntegrationCard = ({ title, description, buttonText, buttonColor, onClick }: IntegrationCardProps) => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 2
    }}>
        <Button
            fullWidth
            sx={{
                bgcolor: buttonColor,
                color: 'white',
                py: 2,
                fontSize: '1.125rem',
                textTransform: 'none',
                '&:hover': {
                    bgcolor: buttonColor,
                    opacity: 0.9
                }
            }}
        >
            {title}
        </Button>
        <Box sx={{
            bgcolor: '#F3F4F6',
            p: 3,
            borderRadius: '8px',
            width: '100%'
        }}>
            <Typography sx={{ color: '#4B5563', fontSize: '0.875rem' }}>
                {description}
            </Typography>
        </Box>
        <Button
            variant="contained"
            onClick={onClick}
            sx={{
                bgcolor: buttonColor,
                color: 'white',
                textTransform: 'none',
                px: 4,
                '&:hover': {
                    bgcolor: buttonColor,
                    opacity: 0.9
                }
            }}
        >
            {buttonText}
        </Button>
    </Box>
);

const IntegrationCatalog = () => {
    const navigate = useNavigate();
    const handleConfigure = (route: string) => {
        navigate(route);
    };

    const handleRequest = () => {
        console.log('Request clicked');
    };

    return (
        <Box className="p-6">
            <Typography
                variant="h4"
                sx={{
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: '#111827',
                    mb: 1
                }}
            >
                Integration Catalog
            </Typography>
            <Typography
                sx={{
                    fontSize: '1rem',
                    color: '#6B7280',
                    mb: 4
                }}
            >
                Select an integration type to get started with configuration.
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <IntegrationCard
                        title="REST API"
                        description="Share data via endpoints with JSON responses"
                        buttonText="Configure"
                        buttonColor="#3B82F6"
                        onClick={() => handleConfigure('/integration-catalog/rest-api-integration')}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <IntegrationCard
                        title="GraphQL"
                        description="Flexible data queries with schema definitions"
                        buttonText="Configure"
                        buttonColor="#9333EA"
                        onClick={() => handleConfigure('/integration-catalog/graphql-integration')}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <IntegrationCard
                        title="File Upload"
                        description="Scheduled file transfers via SFTP/FPS"
                        buttonText="Configure"
                        buttonColor="#F97316"
                        onClick={() => handleConfigure('/integration-catalog/file-upload-integration')}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <IntegrationCard
                        title="Custom Integration"
                        description="Special requirements? Contact our team"
                        buttonText="Request"
                        buttonColor="#6B7280"
                        onClick={handleRequest}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default IntegrationCatalog; 