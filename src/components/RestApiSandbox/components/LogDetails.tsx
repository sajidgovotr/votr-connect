import { Box, Typography, Paper, Divider } from "@mui/material";

interface LogDetailsProps {
    logId?: string;
}

const LogDetails = ({ logId }: LogDetailsProps) => {
    // Dummy data for the log details
    const logDetails = {
        id: logId || "log_123456",
        timestamp: "Apr 8, 2025 10:45:12 ET",
        method: "GET",
        endpoint: "/shareholders",
        status: 200,
        duration: "245ms",
        requestHeaders: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
        },
        requestParams: {
            "limit": "100",
            "startDate": "2025-01-01"
        },
        responseHeaders: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "X-Request-ID": "req_123456789"
        },
        responseBody: {
            "data": [
                {
                    "id": "sh_123",
                    "name": "John Doe",
                    "shares": 1000,
                    "value": 50000
                },
                {
                    "id": "sh_124",
                    "name": "Jane Smith",
                    "shares": 2000,
                    "value": 100000
                }
            ],
            "pagination": {
                "total": 150,
                "page": 1,
                "limit": 100
            }
        }
    };

    const JsonDisplay = ({ data }: { data: object }) => (
        <pre style={{
            backgroundColor: '#F9FAFB',
            padding: '16px',
            borderRadius: '8px',
            overflow: 'auto',
            margin: 0,
            fontSize: '0.875rem',
            fontFamily: 'monospace'
        }}>
            {JSON.stringify(data, null, 2)}
        </pre>
    );

    const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#111827',
                    mb: 2
                }}
            >
                {title}
            </Typography>
            {children}
        </Box>
    );

    const getStatusColor = (status: number) => {
        if (status === 200) return '#22C55E';
        if (status === 401) return '#F59E0B';
        return '#EF4444';
    };

    const getStatusBgColor = (status: number) => {
        if (status === 200) return '#ECFDF5';
        if (status === 401) return '#FEF3C7';
        return '#FEE2E2';
    };

    return (
        <Box className="p-6">
            <Box sx={{ mb: 4 }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: '1.75rem',
                        fontWeight: 600,
                        color: '#111827',
                        mb: 1
                    }}
                >
                    API Call Log Details
                </Typography>
                <Typography
                    sx={{
                        fontSize: '1rem',
                        color: '#6B7280'
                    }}
                >
                    Detailed information about the API call
                </Typography>
            </Box>

            <Paper sx={{ p: 4, borderRadius: '8px' }}>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 3,
                    mb: 4
                }}>
                    <Box>
                        <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', mb: 1 }}>
                            Timestamp
                        </Typography>
                        <Typography sx={{ color: '#111827', fontWeight: 500 }}>
                            {logDetails.timestamp}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', mb: 1 }}>
                            Method
                        </Typography>
                        <Typography sx={{ color: '#111827', fontWeight: 500 }}>
                            {logDetails.method}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', mb: 1 }}>
                            Endpoint
                        </Typography>
                        <Typography sx={{ color: '#111827', fontWeight: 500 }}>
                            {logDetails.endpoint}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', mb: 1 }}>
                            Status
                        </Typography>
                        <Box
                            sx={{
                                display: 'inline-block',
                                px: 2,
                                py: 0.5,
                                borderRadius: '16px',
                                bgcolor: getStatusBgColor(logDetails.status),
                                color: getStatusColor(logDetails.status),
                                fontSize: '0.875rem',
                                fontWeight: 500
                            }}
                        >
                            {logDetails.status}
                        </Box>
                    </Box>
                    <Box>
                        <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', mb: 1 }}>
                            Duration
                        </Typography>
                        <Typography sx={{ color: '#111827', fontWeight: 500 }}>
                            {logDetails.duration}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Section title="Request Headers">
                    <JsonDisplay data={logDetails.requestHeaders} />
                </Section>

                <Section title="Request Parameters">
                    <JsonDisplay data={logDetails.requestParams} />
                </Section>

                <Section title="Response Headers">
                    <JsonDisplay data={logDetails.responseHeaders} />
                </Section>

                <Section title="Response Body">
                    <JsonDisplay data={logDetails.responseBody} />
                </Section>
            </Paper>
        </Box>
    );
};

export default LogDetails; 