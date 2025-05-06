import { Box, Grid2, Skeleton, Typography } from "@mui/material";
import { Card } from "@/components";
import StatusIndicator from "@/components/StatusIndicator";
import StatusBadge from "@/components/StatusBadge";
import ActivityList from "@/components/ActivityList";
import FileUploadsList from "@/components/FileUploadsList";
import { useGetUploadedCSVFilesQuery } from "@/services/express-integration";

const activities = [
    {
        title: "API Test Successful",
        timestamp: "Today, 10:45 AM",
        description: "All API endpoints are functioning correctly"
    },
    {
        title: "Production Readiness Requested",
        timestamp: "Today, 09:30 AM",
        description: "Awaiting review from the admin team"
    },
    {
        title: "GraphQL Schema Updated",
        timestamp: "Yesterday, 4:15 PM",
        description: "Added new types and resolvers for user management"
    },
    {
        title: "REST API Endpoint Configuration",
        timestamp: "Yesterday, 2:30 PM",
        description: "Updated authentication endpoints"
    }
];

const Dashboard = () => {
    const { data: files, isLoading: isLoadingFiles } = useGetUploadedCSVFilesQuery(null);
    return (
        <Box className="p-6">
            <Typography
                variant="h4"
                sx={{
                    fontSize: "1.75rem",
                    fontWeight: 600,
                    mb: 1
                }}
            >
                Dashboard
            </Typography>
            <Typography
                sx={{
                    fontSize: "1rem",
                    mb: 4,
                    color: "#6B7280"
                }}
            >
                Welcome back, John! Here's your integration status.
            </Typography>

            <Grid2 container spacing={3}>
                {/* Integration Status Card */}
                <Grid2 component="div" size={{ xs: 12, md: 6 }}>
                    <Card className="h-full">
                        <Box className="space-y-4">
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: "1.125rem",
                                    fontWeight: 600,
                                    mb: 3,
                                    color: "#111827"
                                }}
                            >
                                Integration Status
                            </Typography>
                            <StatusIndicator
                                status="active"
                                label="API Integration: Active"
                            />
                            <Typography
                                sx={{
                                    fontSize: "0.875rem",
                                    mt: 2,
                                    color: "#6B7280"
                                }}
                            >
                                Last Sync: 10 minutes ago
                            </Typography>
                        </Box>
                    </Card>
                </Grid2>

                {/* Production Status Card */}
                <Grid2 component="div" size={{ xs: 12, md: 6 }}>
                    <Card className="h-full">
                        <Box className="space-y-4">
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: "1.125rem",
                                    fontWeight: 600,
                                    mb: 2,
                                    color: "#111827"
                                }}
                            >
                                Production Status
                            </Typography>
                            <StatusBadge
                                status="inProgress"
                                label="In Progress"
                            />
                            <Typography
                                sx={{
                                    fontSize: "0.875rem",
                                    mt: 2,
                                    color: "#6B7280"
                                }}
                            >
                                Pending Admin Approval
                            </Typography>
                        </Box>
                    </Card>
                </Grid2>


                {/* Recent Activity Card */}
                <Grid2 component="div" size={{ xs: 6 }}>
                    <Card>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: "1.125rem",
                                fontWeight: 600,
                                mb: 3,
                                color: "#111827"
                            }}
                        >
                            Recent Activity
                        </Typography>
                        <ActivityList activities={activities} />
                    </Card>
                </Grid2>
                <Grid2 component="div" size={{ xs: 6 }}>
                    {isLoadingFiles ? <Skeleton variant="rectangular" height={400} /> : <FileUploadsList files={files} />}
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default Dashboard; 