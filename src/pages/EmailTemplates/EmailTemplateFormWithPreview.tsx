import React, { useState, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
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

const QuillEditor: React.FC<{
    value: string;
    onChange: (value: string) => void;
    error?: string;
}> = ({ value, onChange, error }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            const quill = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'color': [] }, { 'background': [] }],
                        ['link'],
                        ['clean']
                    ]
                },
                placeholder: 'Compose your email template...',
            });

            quill.root.innerHTML = value;

            quill.on('text-change', () => {
                const html = quill.root.innerHTML;
                onChange(html);
            });

            quillRef.current = quill;
        }
    }, [onChange, value]);

    useEffect(() => {
        if (quillRef.current && value !== quillRef.current.root.innerHTML) {
            quillRef.current.root.innerHTML = value;
        }
    }, [value]);

    return (
        <Box sx={{ mb: 2 }}>
            <div ref={editorRef} style={{ height: '200px', marginBottom: '20px' }} />
            {error && (
                <Typography color="error" variant="caption">
                    {error}
                </Typography>
            )}
        </Box>
    );
};

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
        // Replace placeholders with sample values while preserving HTML
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
                    <Typography variant="subtitle2" gutterBottom>
                        Content
                    </Typography>
                    <QuillEditor
                        value={formData.content}
                        onChange={(value) => {
                            setFormData(prev => ({ ...prev, content: value }));
                            if (errors.content) {
                                setErrors(prev => ({ ...prev, content: '' }));
                            }
                        }}
                        error={errors.content}
                    />
                    <Typography variant="caption" color="textSecondary">
                        Available placeholders: {`{{name}}, {{email}}, {{company}}, {{date}}, {{resetLink}}`}
                    </Typography>
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

                <Box
                    sx={{
                        '& .ql-editor': {
                            padding: 0,
                            '& p': { margin: 0 }
                        }
                    }}
                >
                    <div
                        className="ql-editor"
                        dangerouslySetInnerHTML={{
                            __html: processContent(formData.content)
                        }}
                    />
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