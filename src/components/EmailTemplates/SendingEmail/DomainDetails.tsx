import { Box, Typography, Chip, IconButton, Tooltip, Button } from '@mui/material';
import Card from '@/components/Card';
import CustomButton from '@/components/CustomButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SendingEmailLogo from '@/assets/images/sending-email-logo.png';
import Table from '@/components/DynamicTable';
import { useState } from 'react';
import { ShieldMoon, CalendarMonth, AccessTime, MoreVert } from '@mui/icons-material';
import VerticalDivider from '@/components/AccountSetup/VerticalDIvider';

interface DomainDetailsProps {
    domain: string;
}

const dnsRecords = [
    {
        type: 'MX',
        host: 'send',
        value: 'feedback-smtp.us-east-1.amazonses.com',
        priority: '10',
        ttl: 'Auto',
        status: 'Not Started',
    },
    {
        type: 'TXT',
        host: 'send',
        value: 'v=spf1 include:amazonses.com ~all',
        priority: '',
        ttl: 'Auto',
        status: 'Not Started',
    },
    {
        type: 'TXT',
        host: 'resend._domainkey',
        value: 'p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...',
        priority: '',
        ttl: 'Auto',
        status: 'Not Started',
    },
];

const dmarcRecords = [
    {
        type: 'TXT',
        host: '_dmarc',
        value: 'v=DMARC1; p=none;',
    },
];

const DomainDetails: React.FC<DomainDetailsProps> = ({ domain }) => {
    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (value: string) => {
        navigator.clipboard.writeText(value);
        setCopied(value);
        setTimeout(() => setCopied(null), 1200);
    };

    // DNS Records Table Columns
    const dnsColumns = [
        { key: 'type', name: 'Type', align: 'left' },
        { key: 'host', name: 'Host / Name', align: 'left' },
        {
            key: 'value',
            name: 'Value',
            align: 'left',
            component: (row: any) => (
                <Box className="flex items-center gap-2 max-w-xs">
                    <span className="truncate">{row.value}</span>
                    <Tooltip title={copied === row.value ? 'Copied!' : 'Copy'}>
                        <IconButton size="small" onClick={e => { e.stopPropagation(); handleCopy(row.value); }}>
                            <ContentCopyIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
        { key: 'priority', name: 'Priority', align: 'left' },
        { key: 'ttl', name: 'TTL', align: 'left' },
        {
            key: 'status',
            name: 'Status',
            align: 'left',
            component: (row: any) => (
                <Chip label={row.status} size="small" className="!bg-[#F4F4F6] !text-gray-500 !font-medium" />
            ),
        },
    ];

    // DMARC Table Columns
    const dmarcColumns = [
        { key: 'type', name: 'Type', align: 'left' },
        { key: 'host', name: 'Host / Name', align: 'left' },
        {
            key: 'value',
            name: 'Value',
            align: 'left',
            component: (row: any) => (
                <Box className="flex items-center gap-2 max-w-xs">
                    <span className="truncate">{row.value}</span>
                    <Tooltip title={copied === row.value ? 'Copied!' : 'Copy'}>
                        <IconButton size="small" onClick={e => { e.stopPropagation(); handleCopy(row.value); }}>
                            <ContentCopyIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ];

    return (
        <Box className="w-full  mx-auto mt-10">
            {/* Header */}
            <Box className="flex items-center justify-between mb-8">
                <Box className="flex items-center gap-4">
                    <Box className="flex items-center justify-center">
                        <img src={SendingEmailLogo} alt="Sending Email" className="w-20 h-22" />
                    </Box>
                    <Box>
                        <Typography className="font-semibold !text-gray-300">Domain</Typography>
                        <Typography className="font-semibold !text-xl !md:text-2xl !mb-1">{domain}</Typography>
                    </Box>
                </Box>
                <Box className="flex items-center gap-2">
                    <CustomButton
                        title="Verify DNS Records"
                        variant="contained"
                        className='!w-fit'
                        startIcon={<ShieldMoon />}
                    />
                    <Button
                        className='!px-2'
                        variant="outlined"
                    ><MoreVert /></Button>
                </Box>

            </Box>
            {/* Created on & Status Row */}
            <Box className="flex items-center gap-8 mb-2 pl-2 border-y-2 !py-2 border-gray-200">
                <Box className="flex items-center gap-2 text-[#A0AEC0] text-sm">
                    <CalendarMonth className="text-base" />
                    <span>Created on :</span>
                    <span className="text-[#222] font-semibold">Today 4:20 PM EST</span>
                </Box>
                <VerticalDivider />
                <Box className="flex items-center gap-2 text-[#A0AEC0] text-sm">
                    <AccessTime className="text-base" />
                    <span>Current Status :</span>
                    <Chip label="Not Started" size="small" className="!bg-[#F4F4F6] !text-gray-500 !font-medium !ml-1 rounded-md" />
                </Box>
            </Box>
            <Typography fontWeight={600} fontSize={24} className="!my-4">DNS Records</Typography>
            {/* Info Alert */}
            <Box className="flex items-center gap-2 bg-[#F6F7FF] rounded-lg !pl-4 !pr-10 !py-3 !mb-6" style={{
                background: "radial-gradient(103.03% 103.03% at 0% 0%, rgba(240, 241, 255, 0.5) 0%, rgba(184, 191, 255, 0.5) 100%)"
            }}>
                <InfoOutlinedIcon className="text-[#6366F1]" />
                <Typography className="text-sm text-gray-700">
                    Access the DNS settings page of the DNS provider and add all the following DNS records to the records section. Once all are added, click the "Verify Records" button above.
                </Typography>
            </Box>

            {/* DNS Records Table */}
            <Card className="p-0 overflow-x-auto mb-8">
                <Table
                    data={dnsRecords}
                    columns={dnsColumns}
                    isLoading={false}
                    limit={dnsRecords.length}
                    page={1}
                    total={dnsRecords.length}
                    hidePagination
                />
            </Card>

            {/* DMARC Section */}
            <Typography fontWeight={600} fontSize={24} className="!my-4">DMARC - Recommended Record</Typography>
            <Card className="p-0 overflow-x-auto">
                <Table
                    data={dmarcRecords}
                    columns={dmarcColumns}
                    isLoading={false}
                    limit={dmarcRecords.length}
                    page={1}
                    total={dmarcRecords.length}
                    hidePagination
                />
            </Card>
        </Box >
    );
};

export default DomainDetails; 