import { Box, Typography, Button } from "@mui/material";
import { CustomButton, Card } from "@/components";
import Select from "@/components/SelectBox";
import { useNavigate } from "react-router";
import Header from "@/components/Onboarding/Header";
import { useState } from "react";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import OnboardingLayout from "@/components/Onboarding/Container";

// Example font options
const fonts = [
    { value: "inter", label: "Inter" },
    { value: "roboto", label: "Roboto" },
    { value: "lato", label: "Lato" },
];

// Example colors
const brandColors = [
    "#E74C3C", "#E57373", "#000000", "#F4B400", "#F8BBD0", "#FAD7C8", "#D7A89E"
];

const StepBranding = () => {
    const navigate = useNavigate();
    const [logo, setLogo] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState(brandColors[0]);
    const [font, setFont] = useState("");

    // File upload handler
    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogo(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <OnboardingLayout>
            <Box>
                <Header />

                {/* Business Logo */}
                <Card className="p-2 !bg-white">
                    <Typography fontWeight={500} mb={1}>Business Logo</Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        mb={1}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            id="logo-upload"
                            onChange={handleLogoChange}
                        />
                        <label htmlFor="logo-upload" style={{ cursor: "pointer", width: "100%" }}>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: 120,
                                    background: "repeating-linear-gradient(0deg, #f5f5f7 0px, #f5f5f7 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #f5f5f7 0px, #f5f5f7 1px, transparent 1px, transparent 40px)",
                                    borderRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "relative",
                                    overflow: "hidden"
                                }}
                            >
                                {logo ? (
                                    <Box
                                        sx={{
                                            width: 72,
                                            height: 72,
                                            borderRadius: "50%",
                                            background: "#fff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow: 1,
                                        }}
                                    >
                                        <img
                                            src={logo}
                                            alt="Business Logo"
                                            style={{
                                                width: "64px",
                                                height: "64px",
                                                borderRadius: "50%",
                                                objectFit: "cover"
                                            }}
                                        />
                                    </Box>
                                ) : (
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        <Button className="!rounded-full !bg-white !p-2 ">
                                            <FileUploadOutlinedIcon className="text-black" />
                                        </Button>

                                    </Box>
                                )}
                            </Box>
                        </label>
                    </Box>
                    <Typography variant="caption" color="textSecondary">
                        Preferred Image Dimensions: 5000 × 500 pixels @ 72 DPI. Maximum File Size: 1MB
                    </Typography>
                </Card>

                {/* Primary Brand Color */}
                <Card className="p-2 !bg-white" >
                    <Typography fontWeight={500} mb={1}>Primary Brand Color</Typography>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Button
                            variant={selectedColor === brandColors[0] ? "contained" : "outlined"}
                            color="inherit"
                            onClick={() => setSelectedColor(brandColors[0])}
                        >
                            Extracted from Logo
                        </Button>
                        {brandColors.slice(1).map((color, idx) => (
                            <Box
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                sx={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: "50%",
                                    background: color,
                                    border: selectedColor === color ? "2px solid #000" : "1px solid #ccc",
                                    cursor: "pointer"
                                }}
                            />
                        ))}
                        <Button variant="outlined" color="inherit">+</Button>
                    </Box>
                </Card>

                {/* Font */}
                <Card className="p-2 !bg-white" >
                    <Typography fontWeight={500} mb={1}>Font</Typography>
                    <Select
                        label=""
                        placeholder="Select one"
                        value={font}
                        options={fonts}
                        handleChangeValue={setFont}
                        fullWidth
                    />
                </Card>

                {/* Action Buttons */}
                <Box className="flex gap-2" mt={2}>
                    <CustomButton
                        variant="outlined"
                        sx={{ width: "100%" }}
                        title="Back"
                        onClick={() => navigate("/onboarding/step-2")}
                        type="button"
                    />
                    <CustomButton
                        variant="contained"
                        sx={{ width: "100%" }}
                        title="Complete Setup"
                        onClick={() => navigate("/")}
                    />
                </Box>
            </Box>
        </OnboardingLayout>

    );
};

export default StepBranding; 