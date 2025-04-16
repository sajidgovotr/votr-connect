import { Box, Button, Typography, Stack } from "@mui/material";
import Chip from "../Chip";

interface IntegrationCardProps {
    title: string;
    description: string;
    buttonText: string;
    buttonColor: string;
    onClick: ((environment: string) => void) | (() => void);
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
    configurationStatus = [],
}: IntegrationCardProps) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 2,
            position: 'relative',
            height: '100%'
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
                width: '100%',
                flexGrow: 1
            }}>
                <Typography sx={{ color: '#4B5563', fontSize: '0.875rem' }}>
                    {description}
                </Typography>
            </Box>
            <Stack direction="column" spacing={2} width="100%">
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
            </Stack>
        </Box>
    );
};

export default IntegrationCard; 