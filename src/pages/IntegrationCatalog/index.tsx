import IntegrationCard from "@/components/IntegrationCard";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router";


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