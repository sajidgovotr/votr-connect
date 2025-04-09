import { Box, Typography, Divider } from "@mui/material";

interface ActivityItemProps {
    title: string;
    timestamp: string;
    description?: string;
}

const ActivityItem = ({ title, timestamp, description }: ActivityItemProps) => (
    <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', py: 3 }}>
            <Box>
                <Typography
                    sx={{
                        fontSize: "0.9375rem",
                        fontWeight: 500,
                        color: "#111827",
                        mb: description ? 0.5 : 0
                    }}
                >
                    {title}
                </Typography>
                {description && (
                    <Typography
                        sx={{
                            fontSize: "0.875rem",
                            color: "#6B7280"
                        }}
                    >
                        {description}
                    </Typography>
                )}
            </Box>
            <Typography
                sx={{
                    fontSize: "0.875rem",
                    color: "#6B7280"
                }}
            >
                {timestamp}
            </Typography>
        </Box>
        <Divider />
    </Box>
);

interface ActivityListProps {
    activities: ActivityItemProps[];
}

const ActivityList = ({ activities }: ActivityListProps) => {
    return (
        <Box sx={{ '& > :last-child .MuiDivider-root': { display: 'none' } }}>
            {activities.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
            ))}
        </Box>
    );
};

export default ActivityList; 