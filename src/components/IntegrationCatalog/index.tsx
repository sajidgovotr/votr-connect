import { Box, Button, Grid, Typography, Stack, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router";
import Chip from "../Chip";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface IntegrationCardProps {
    title: string;
    description: string;
    buttonText: string;
    buttonColor: string;
    onClick: ((environment: string) => void) | (() => void);
    onDeconfigure?: (environment: string) => void;
    onEdit?: (environment: string) => void;
    configurationStatus?: {
        environment: 'dev' | 'staging' | 'prod';
        isConfigured: boolean;
    }[];
    isCustomIntegration?: boolean;
}

const IntegrationCard = ({
    title,
    description,
    buttonText,
    buttonColor,
    onClick,
    onDeconfigure,
    onEdit,
    configurationStatus = [],
    isCustomIntegration = false
}: IntegrationCardProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedEnv, setSelectedEnv] = useState<string | null>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, env: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedEnv(env);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedEnv(null);
    };

    const handleEdit = () => {
        if (selectedEnv && onEdit) {
            onEdit(selectedEnv);
            handleClose();
        }
    };

    const handleDeconfigureAction = () => {
        if (selectedEnv && onDeconfigure) {
            onDeconfigure(selectedEnv);
            handleClose();
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 2,
            position: 'relative'
        }}>
            <Box sx={{ width: '100%', position: 'relative' }}>
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
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        zIndex: 1
                    }}
                >
                    {configurationStatus.map(({ environment, isConfigured }) => (
                        isConfigured && (
                            <Chip
                                key={environment}
                                name={`${environment} configured`}
                                className="!bg-green-100 !text-green-800"
                            />
                        )
                    ))}
                </Stack>
            </Box>
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
            <Stack direction="column" spacing={2} width="100%">
                {isCustomIntegration ? (
                    <Button
                        variant="contained"
                        onClick={() => (onClick as () => void)()}
                        sx={{
                            bgcolor: buttonColor,
                            color: 'white',
                            textTransform: 'none',
                            '&:hover': {
                                bgcolor: buttonColor,
                                opacity: 0.9
                            }
                        }}
                    >
                        {buttonText}
                    </Button>
                ) : (
                    <>
                        <Stack direction="row" spacing={2} width="100%" justifyContent="center">
                            {['dev', 'staging', 'prod'].map((env) => {
                                const isConfigured = configurationStatus.some(s => s.environment === env && s.isConfigured);

                                return isConfigured ? (
                                    <Button
                                        key={env}
                                        variant="contained"
                                        onClick={(e) => handleMenuClick(e, env)}
                                        endIcon={<KeyboardArrowDownIcon />}
                                        sx={{
                                            bgcolor: buttonColor,
                                            color: 'white',
                                            textTransform: 'none',
                                            '&:hover': {
                                                bgcolor: buttonColor,
                                                opacity: 0.9
                                            }
                                        }}
                                    >
                                        {env.charAt(0).toUpperCase() + env.slice(1)}
                                    </Button>
                                ) : (
                                    <Button
                                        key={env}
                                        variant="contained"
                                        onClick={() => (onClick as (env: string) => void)(env)}
                                        sx={{
                                            bgcolor: buttonColor,
                                            color: 'white',
                                            textTransform: 'none',
                                            '&:hover': {
                                                bgcolor: buttonColor,
                                                opacity: 0.9
                                            }
                                        }}
                                    >
                                        {buttonText} {env.charAt(0).toUpperCase() + env.slice(1)}
                                    </Button>
                                );
                            })}
                        </Stack>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleEdit}>Edit  Configuration</MenuItem>
                            <MenuItem
                                onClick={handleDeconfigureAction}
                                sx={{ color: '#DC2626' }}
                            >
                                Deactivate
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </Stack>
        </Box>
    );
};

const IntegrationCatalog = () => {
    const navigate = useNavigate();
    const handleConfigure = (route: string) => (environment: string) => {
        navigate(`${route}?environment=${environment}`);
    };

    const handleRequest = () => {
        console.log('Request clicked');
    };

    const handleEdit = (route: string) => (environment: string) => {
        navigate(`${route}?environment=${environment}`);
    };

    const handleDeconfigure = (integrationType: string) => (environment: string) => {
        console.log('Deconfigure clicked for:', integrationType, 'in environment:', environment);
        // Add your deconfigure logic here
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
                Select an integration type to get started with configuration.
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <IntegrationCard
                        title="REST API"
                        description="Share data via endpoints with JSON responses"
                        buttonText="Configure"
                        buttonColor="#3B82F6"
                        onClick={handleConfigure('/integration-catalog/rest-api-integration')}
                        onEdit={handleEdit('/integration-catalog/rest-api-integration')}
                        onDeconfigure={handleDeconfigure('rest-api')}
                        configurationStatus={restApiStatus}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <IntegrationCard
                        title="GraphQL"
                        description="Flexible data queries with schema definitions"
                        buttonText="Configure"
                        buttonColor="#9333EA"
                        onClick={handleConfigure('/integration-catalog/graphql-integration')}
                        onEdit={handleEdit('/integration-catalog/graphql-integration')}
                        onDeconfigure={handleDeconfigure('graphql')}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <IntegrationCard
                        title="File Upload"
                        description="Scheduled file transfers via SFTP/FPS"
                        buttonText="Configure"
                        buttonColor="#F97316"
                        onClick={handleConfigure('/integration-catalog/file-upload-integration')}
                        onEdit={handleEdit('/integration-catalog/file-upload-integration')}
                        onDeconfigure={handleDeconfigure('file-upload')}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <IntegrationCard
                        title="Custom Integration"
                        description="Special requirements? Contact our team"
                        buttonText="Request"
                        buttonColor="#6B7280"
                        onClick={handleRequest}
                        isCustomIntegration={true}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default IntegrationCatalog; 