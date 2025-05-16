import { Box, Typography, Button, Card, Divider } from '@mui/material';
import CompanyLogo from '@/assets/svgs/votr-icon.svg';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const analystBanner = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=600&h=60';

const EmailPreview = () => {
    return (
        <Box className="w-full min-h-screen bg-[#F7F7F8] flex  flex-col items-center !py-10 rounded-md">
            <Box className="w-full flex justify-center items-center">
                <Typography variant="h6" className="!text-[1rem] !leading-tight !text-gray-400">Email Preview</Typography>
            </Box>
            <Card className="w-full max-w-[500px] !rounded-2xl !shadow-lg !mt-5 !py-5 !bg-white" sx={{ boxShadow: '0 4px 24px 0 rgba(16,24,40,0.10)' }}>
                {/* Header */}
                <Box className="flex flex-row items-center justify-between !px-7 !pt-7 !pb-4">
                    <Box className="flex items-center">
                        <img src={CompanyLogo} alt="Interactive Brokers" className="h-7" style={{ display: 'block' }} />
                    </Box>
                    <Box
                        className="flex items-center"
                        sx={{
                            border: '1px solid #E6E6E9',
                            borderRadius: '8px',
                            background: '#F7F7F8',
                            px: 2.5,
                            py: 0.5,
                            fontSize: 15,
                            fontWeight: 600,
                            color: '#8C8E9C',
                            letterSpacing: 0.2,
                            minHeight: 32,
                        }}
                    >
                        <span style={{ color: '#B0B1B8', fontWeight: 500, fontSize: 15, marginRight: 2 }}>NASDAQ:</span>
                        <span style={{ color: '#222', fontWeight: 700, fontSize: 15 }}>AAPL</span>
                    </Box>
                </Box>

                <Divider className="!mb-0 !mt-0" />
                {/* Headline */}
                <Box className="!px-7 !pt-7 !pb-2">
                    <Typography fontWeight={700} className="!text-[2rem] !leading-[2.3rem] !mb-7 !mt-1">
                        Vote in the {'{Issuer Name}'}<br />Annual Meeting
                    </Typography>
                    {/* Analyst Banner */}
                    <Box className="w-full !mb-7">
                        <Box className="w-full h-[56px] rounded-lg overflow-hidden flex items-center bg-gradient-to-r from-[#1A237E] to-[#1976D2] relative">
                            <Box className="flex items-center h-full pl-5 pr-4 z-10">

                                <Box>
                                    <Typography fontSize={15} fontWeight={700} color="#fff">IBKR GlobalAnalyst</Typography>
                                    <Typography fontSize={12} color="#E0E7EF">Scan the World for Investment Opportunities</Typography>
                                </Box>
                            </Box>
                            <img src={analystBanner} alt="Analyst Banner" className="absolute right-0 top-0 h-full w-2/3 object-cover rounded-lg z-0" style={{ objectPosition: 'right' }} />
                        </Box>
                    </Box>
                    {/* Email Body */}
                    <Typography fontSize={18} className="!mb-2 !font-semibold">Dear Valued Shareholder,</Typography>
                    <Typography fontSize={16} className="!mb-2">
                        Velit eu qui dolore. Nulla est officia ex duis in exercitation ex velit ut proident minim magna ea. Amet <b>January 2, 2025</b>, nisi nisi aliqua tempor mollit. Aliquip dolore mollit ut esse eiusmod officia nostrud minim dolor veniam id. Minim nostrud exceptur dolore.
                    </Typography>
                    <Typography fontSize={16} className="!mb-6">
                        Sint in et sint occaecat excepteur irure fugiat occaecat anim duis Lorem adipisicing dolor anim.
                    </Typography>
                    <Button
                        variant="contained"
                        fullWidth
                        endIcon={<ArrowForwardIosIcon sx={{ fontSize: 18 }} />}
                        sx={{ bgcolor: '#EA4334', color: '#fff', borderRadius: '8px', fontWeight: 600, py: 1.4, mb: 2, '&:hover': { bgcolor: '#c32d1a' }, fontSize: 18, textTransform: 'none' }}
                    >
                        View Details
                    </Button>
                </Box>
                {/* Footer */}
                <Box className="bg-white !px-7 !pt-5 !pb-3 !rounded-b-2xl">
                    <Typography fontSize={14} className="!mb-2 !text-left">
                        This email was sent to <b>username@email.com</b>. If you'd rather not receive this kind of email, you can <b style={{ color: '#111', textDecoration: 'underline' }}>manage your email preferences.</b>
                    </Typography>
                    <Typography fontSize={14} color="#8C8E9C" className="mb-4 text-left">
                        © 2025 Blink, 4517 Washington Ave. Manchester, Kentucky 39495
                    </Typography>
                    <Divider className="!mb-3 !mt-0" />
                    <Box className="flex items-center justify-between !mt-2 !mb-1.5">
                        <Box className="flex items-center gap-2">
                            <img src={CompanyLogo} alt="Interactive Brokers" className="h-6" />
                            <Typography fontWeight={700} fontSize={18} className="!ml-2">Interactive<span style={{ fontWeight: 400 }}>Brokers</span></Typography>
                        </Box>
                        <Box className="flex items-center gap-5">
                            <TwitterIcon sx={{ color: '#B0B1B8', fontSize: 24 }} />
                            <FacebookIcon sx={{ color: '#B0B1B8', fontSize: 24 }} />
                            <InstagramIcon sx={{ color: '#B0B1B8', fontSize: 24 }} />
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default EmailPreview; 