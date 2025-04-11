import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router";
import {
    Box,
    Paper,
    Typography,
    Button,
    useTheme,
    useMediaQuery,

} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import EmailTemplateFormWithPreview from './EmailTemplateFormWithPreview';
import { EmailTemplate } from './EmailTemplatesPage';

// This would typically come from your API or state management
const mockTemplates: EmailTemplate[] = [
    {
        id: '1',
        name: 'Welcome Email',
        subject: 'Welcome to Our Platform',
        content: 'Hello {{name}},\n\nWelcome to our platform! We are excited to have you on board.\n\nBest regards,\nThe Team',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Password Reset',
        subject: 'Password Reset Request',
        content: 'Hi {{name}},\n\nWe received a request to reset your password. Click the link below to reset it:\n\n{{resetLink}}\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nThe Team',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const EmailTemplateFormPage: React.FC = () => {
    const navigate = useNavigate();
    const { templateId } = useParams<{ templateId: string }>();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [template, setTemplate] = useState<EmailTemplate | null>(null);

    useEffect(() => {
        if (templateId) {
            // In a real app, you would fetch the template from your API
            const foundTemplate = mockTemplates.find(t => t.id === templateId);
            if (foundTemplate) {
                setTemplate(foundTemplate);
            } else {
                // Template not found, redirect to list
                navigate('/email-templates');
            }
        }
    }, [templateId, navigate]);

    const handleSave = (templateData: Omit<EmailTemplate, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>) => {
        // In a real app, you would make an API call here
        console.log('Saving template:', templateData);

        // Navigate back to the list after saving
        navigate('/email-templates');
    };

    return (
        <Box >
            <Box mb={4}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/email-templates')}
                    sx={{ mb: 2 }}
                >
                    Back to Templates
                </Button>


                <Typography variant="h4" component="h1">
                    {templateId ? 'Edit Email Template' : 'Create New Email Template'}
                </Typography>
            </Box>

            <Paper sx={{ p: 3 }}>
                <EmailTemplateFormWithPreview
                    template={template}
                    onSave={handleSave}
                    onCancel={() => navigate('/email-templates')}
                />
            </Paper>
        </Box>
    );
};

export default EmailTemplateFormPage; 