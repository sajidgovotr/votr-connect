import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Stack,
} from '@mui/material';
import { EmailTemplate } from './EmailTemplatesPage';

interface EmailTemplateFormProps {
    template: EmailTemplate | null;
    onSave: (template: Omit<EmailTemplate, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
    onPreview: () => void;
}

const EmailTemplateForm: React.FC<EmailTemplateFormProps> = ({
    template,
    onSave,
    onCancel,
    onPreview,
}) => {
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

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
                {template ? 'Edit Template' : 'Create New Template'}
            </Typography>

            <Stack spacing={3}>
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

                <TextField
                    fullWidth
                    label="Content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    error={!!errors.content}
                    helperText={errors.content || 'You can use {{name}} as a placeholder for dynamic content'}
                    multiline
                    rows={8}
                    required
                />

                <Box display="flex" gap={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button variant="outlined" onClick={onPreview}>
                        Preview
                    </Button>
                    <Button variant="contained" type="submit">
                        {template ? 'Update' : 'Create'} Template
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};

export default EmailTemplateForm; 