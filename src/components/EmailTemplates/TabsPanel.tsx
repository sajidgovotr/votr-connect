import { Box } from '@mui/material';

const TabsPanel = ({ tabs }: { tabs: { label: string; content: React.ReactNode }[] }) => {
    // Placeholder: just render the first tab's content
    return <Box>{tabs[0]?.content}</Box>;
};

export default TabsPanel; 