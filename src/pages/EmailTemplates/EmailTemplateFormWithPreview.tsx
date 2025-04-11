import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Paper,
    Divider,
    Tab,
    Tabs,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { EmailTemplate } from './EmailTemplatesPage';

interface EmailTemplateFormWithPreviewProps {
    template: EmailTemplate | null;
    onSave: (template: Omit<EmailTemplate, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>) => void;
    onCancel: () => void;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
    <div role="tabpanel" hidden={value !== index}>
        {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
);

const EmailTemplateFormWithPreview: React.FC<EmailTemplateFormWithPreviewProps> = ({
    template,
    onSave,
    onCancel,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [tabValue, setTabValue] = useState(0);

    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        content: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        subject: '',
        content: '',
    });

    useEffect(() => {
        if (template) {
            setFormData({
                name: template.name,
                subject: template.subject,
                content: template.content,
            });
        }
    }, [template]);

    const validateForm = () => {
        const newErrors = {
            name: '',
            subject: '',
            content: '',
        };

        if (!formData.name.trim()) {
            newErrors.name = 'Template name is required';
        }
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }
        if (!formData.content.trim()) {
            newErrors.content = 'Content is required';
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSave(formData);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const processContent = (content: string) => {
        // Replace placeholders with sample values
        return content.replace(/{{(\w+)}}/g, (match, placeholder) => {
            const sampleValues: Record<string, string> = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                company: 'ACME Corp',
                date: new Date().toLocaleDateString(),
                resetLink: 'https://example.com/reset-password',
            };
            return sampleValues[placeholder] || match;
        });
    };

    const renderForm = () => (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Template Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        error={!!errors.subject}
                        helperText={errors.subject}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        error={!!errors.content}
                        helperText={errors.content || 'Available placeholders: {{name}}, {{email}}, {{company}}, {{date}}, {{resetLink}}'}
                        multiline
                        rows={8}
                        required
                    />
                </Grid>
            </Grid>
        </Box>
    );

    const renderPreview = () => (
        <Box>
            <Paper sx={{ p: 3, bgcolor: '#f5f5f5', mb: 2 }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" display="block">
                        From: Your Company &lt;no-reply@yourcompany.com&gt;
                    </Typography>
                    <Typography variant="caption" display="block">
                        To: john.doe@example.com
                    </Typography>
                    <Typography variant="caption" display="block">
                        Subject: {formData.subject}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ whiteSpace: 'pre-wrap' }}>
                    <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                        {processContent(formData.content)}
                    </Typography>
                </Box>
            </Paper>

            <Typography variant="caption">
                Note: This is a preview with sample placeholder values.
            </Typography>
        </Box>
    );

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                {template ? 'Edit Template' : 'Create New Template'}
            </Typography>

            {isMobile ? (
                <>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
                            <Tab label="Edit" />
                            <Tab label="Preview" />
                        </Tabs>
                    </Box>

                    <TabPanel value={tabValue} index={0}>
                        {renderForm()}
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        {renderPreview()}
                    </TabPanel>
                </>
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        {renderForm()}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {renderPreview()}
                    </Grid>
                </Grid>
            )}

            <Box display="flex" gap={2} justifyContent="flex-end" mt={3}>
                <Button variant="outlined" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit}>
                    {template ? 'Update' : 'Create'} Template
                </Button>
            </Box>
        </Box>
    );
};

export default EmailTemplateFormWithPreview; 