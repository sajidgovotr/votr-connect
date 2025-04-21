import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import ProductSelection from "../IntegrationSteps/ProductSelection/ProductSelection";
import RouterOutlinedIcon from '@mui/icons-material/RouterOutlined';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import IntegrationCard from './IntegrationCard';

const IntegrationCatalog = () => {
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState<string>("");
    const [selectedIntegrationType, setSelectedIntegrationType] = useState<string>("");

    // Check URL for existing parameters
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const product = params.get('product');
        const integrationType = params.get('integrationType');

        if (product) {
            setSelectedProduct(product);
        }

        if (integrationType) {
            setSelectedIntegrationType(integrationType);
        }
    }, []);

    const handleConfigure = (integrationType: string, route: string) => () => {
        setSelectedIntegrationType(integrationType);
        navigate(`${route}?environment=dev&product=${selectedProduct}&integrationType=${integrationType}`);
    };

    const handleRequest = () => {
        setSelectedIntegrationType('custom');
        console.log('Request clicked');
    };

    const handleProductSelect = (product: string) => {
        setSelectedProduct(product);
        // Reset integration type when selecting a new product
        setSelectedIntegrationType("");
    };

    const handleBack = () => {
        setSelectedProduct("");
        setSelectedIntegrationType("");
        navigate('?');
    };

    // Example configuration status - replace with your actual data
    const restApiStatus = [
        { environment: 'dev' as const, isConfigured: true },
        { environment: 'staging' as const, isConfigured: false },
        { environment: 'prod' as const, isConfigured: true }
    ];

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
                {!selectedProduct
                    ? "First, select a product you want to integrate with."
                    : "Now, select an integration type to get started with configuration."}
            </Typography>

            {!selectedProduct ? (
                <ProductSelection
                    selectedProduct={selectedProduct}
                    onProductSelect={handleProductSelect}
                />
            ) : (
                <>
                    <Box sx={{ mb: 4 }}>
                        <Button
                            variant="outlined"
                            onClick={handleBack}
                            sx={{ mr: 2 }}
                        >
                            Change Product
                        </Button>
                        <Typography
                            component="span"
                            sx={{
                                color: '#4B5563',
                                fontSize: '0.875rem'
                            }}
                        >
                            Selected Product: {selectedProduct}
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <IntegrationCard
                                title="REST API (Pull Model)"
                                description="VOTR pulls daily shareholder position data from your API"
                                onClick={handleConfigure('rest-api', '/integration-catalog/rest-api-integration')}
                                configurationStatus={restApiStatus}
                                isRecommended={true}
                                isSelected={selectedIntegrationType === 'rest-api'}
                                icon={<RouterOutlinedIcon sx={{
                                    color: selectedIntegrationType === 'rest-api' ? '#4f46e5' : '#6366f1',
                                    fontSize: 26
                                }} />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <IntegrationCard
                                title="SFTP File Transfer"
                                description="Upload daily position files to VOTR Connect's SFTP server"
                                onClick={handleConfigure('sftp', '/integration-catalog/file-upload-integration')}
                                isSelected={selectedIntegrationType === 'sftp'}
                                icon={<UploadOutlinedIcon sx={{
                                    color: selectedIntegrationType === 'sftp' ? '#4f46e5' : '#6366f1',
                                    fontSize: 26
                                }} />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <IntegrationCard
                                title="Direct Database Connection"
                                description="Connect directly to your database (Advanced)"
                                onClick={handleConfigure('database', '/integration-catalog/graphql-integration')}
                                isSelected={selectedIntegrationType === 'database'}
                                icon={<StorageOutlinedIcon sx={{
                                    color: selectedIntegrationType === 'database' ? '#4f46e5' : '#6366f1',
                                    fontSize: 26
                                }} />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <IntegrationCard
                                title="Request Custom Integration"
                                description="Need a different integration method? Let us know your requirements"
                                onClick={handleRequest}
                                isCustomIntegration={true}
                                isSelected={selectedIntegrationType === 'custom'}
                                icon={<BuildOutlinedIcon sx={{
                                    color: selectedIntegrationType === 'custom' ? '#4f46e5' : '#6366f1',
                                    fontSize: 26
                                }} />}
                            />
                        </Grid>
                    </Grid>
                </>
            )}
        </Box>
    );
};

export default IntegrationCatalog; 