import { Box, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useState } from "react";

interface TabPanelProps {
    value: number;
    index: number;
    children: React.ReactNode;
}

const CustomTabPanel = ({ children, value, index }: TabPanelProps) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
};

interface TabsProps {
    tabs: {
        label: string;
        content: React.ReactNode;
    }[];
}

const TabPanel = ({ tabs }: TabsProps) => {
    const [value, setValue] = useState(0);

    const handleChange = (_event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="account management tabs"
                    sx={{
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontSize: '0.9375rem',
                            fontWeight: 500,
                            color: '#6B7280',
                            '&.Mui-selected': {
                                color: '#111827',
                                fontWeight: 600
                            }
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#2563EB'
                        }
                    }}
                >
                    {tabs.map((tab, index) => (
                        <Tab key={index} label={tab.label} />
                    ))}
                </Tabs>
            </Box>
            {tabs.map((tab, index) => (
                <CustomTabPanel key={index} value={value} index={index}>
                    {tab.content}
                </CustomTabPanel>
            ))}
        </Box>
    );
};

export default TabPanel; 