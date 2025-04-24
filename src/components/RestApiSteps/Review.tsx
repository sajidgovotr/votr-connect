import React from 'react';
import { Box, Typography, Button } from "@mui/material";
import { BasicInfoFormData, SchemaFormData } from './types';

interface ReviewProps {
    basicInfo: BasicInfoFormData | null;
    authMethod: string;
    dataSchema: SchemaFormData | null;
}

const Review: React.FC<ReviewProps> = ({ basicInfo, authMethod, dataSchema }) => (
    <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Review Your Configuration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Please review the information below and make any necessary changes.
        </Typography>
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Basic Information
            </Typography>
            {basicInfo ? (
                <>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Name: {basicInfo.integrationName}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Data Format: {basicInfo.dataFormat.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Update Frequency: {basicInfo.updateFrequency}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Base URL: {basicInfo.baseUrl}
                    </Typography>
                </>
            ) : (
                <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                    Basic information not available
                </Typography>
            )}
            <Button variant="outlined" sx={{ mt: 1 }}>Edit</Button>
        </Box>
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Authentication
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Method: {authMethod === 'oauth2' ? 'OAuth 2.0 (Client Credentials)' : 'API Key'}
            </Typography>
            <Button variant="outlined" sx={{ mt: 1 }}>Edit</Button>
        </Box>
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Data Schema
            </Typography>
            {dataSchema ? (
                <>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Resource: {dataSchema.resourceName} ({dataSchema.endpointPath})
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        Fields: {dataSchema.fields?.length || 0} defined
                    </Typography>
                </>
            ) : (
                <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                    Schema information not available
                </Typography>
            )}
            <Button variant="outlined" sx={{ mt: 1 }}>Edit</Button>
        </Box>
    </Box>
);

export default Review; 