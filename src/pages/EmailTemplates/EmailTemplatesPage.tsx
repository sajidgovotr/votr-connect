import React, { useState } from 'react';
import { useNavigate } from "react-router";
import {
    Box,
    Typography,
    Button,
    Paper,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import EmailTemplateList from './EmailTemplateList';

export interface EmailTemplate {
    id: string;
    name: string;
    subject: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

const EmailTemplatesPage: React.FC = () => {
    const navigate = useNavigate();

    const [templates, setTemplates] = useState<EmailTemplate[]>([
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
    ]);

    const handleCreateTemplate = () => {
        navigate('/email-templates/create');
    };

    const handleEditTemplate = (template: EmailTemplate) => {
        navigate(`/email-templates/edit/${template.id}`);
    };

    const handleDeleteTemplate = (templateId: string) => {
        if (window.confirm('Are you sure you want to delete this template?')) {
            setTemplates(templates.filter((template) => template.id !== templateId));
        }
    };


    return (
        <Box >
            <Box display="flex" justifyContent="space-between" mb={4}>
                <Typography variant="h4" component="h1">
                    Email Templates
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleCreateTemplate}
                >
                    Create Template
                </Button>
            </Box>

            <Paper sx={{ p: 2 }}>
                <EmailTemplateList
                    templates={templates}
                    onEdit={handleEditTemplate}
                    onDelete={handleDeleteTemplate}
                />
            </Paper>
        </Box>
    );
};

export default EmailTemplatesPage; 