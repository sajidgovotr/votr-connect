import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Divider,
} from '@mui/material';
import { EmailTemplate } from './EmailTemplatesPage';

interface EmailTemplatePreviewProps {
    template: EmailTemplate;
}

const EmailTemplatePreview: React.FC<EmailTemplatePreviewProps> = ({ template }) => {
    const processContent = (content: string) => {
        // Replace placeholders with sample values
        return content.replace(/{{(\w+)}}/g, (match, placeholder) => {
            const sampleValues: Record<string, string> = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                company: 'ACME Corp',
                date: new Date().toLocaleDateString(),
            };
            return sampleValues[placeholder] || match;
        });
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Template Preview
            </Typography>

            <Paper sx={{ p: 3, bgcolor: '#f5f5f5' }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="textSecondary">
                        From: Your Company &lt;no-reply@yourcompany.com&gt;
                    </Typography>
                    <br />
                    <Typography variant="caption" color="textSecondary">
                        Subject: {template.subject}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ whiteSpace: 'pre-wrap' }}>
                    <Typography variant="body1">
                        {processContent(template.content)}
                    </Typography>
                </Box>
            </Paper>

            <Typography variant="caption" color="textSecondary" sx={{ mt: 2, display: 'block' }}>
                Note: This is a preview. Placeholders are replaced with sample values.
            </Typography>
        </Box>
    );
};

export default EmailTemplatePreview; 