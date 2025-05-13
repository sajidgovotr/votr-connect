import { Box, Typography } from "@mui/material";
import { Card, CustomButton } from "@/components";
import TextField from "@/components/Textfields";
import Select from "@/components/SelectBox";
import { useNavigate } from "react-router";
import Header from "@/components/Onboarding/Header";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import OnboardingLayout from "@/components/Onboarding/Container";

// Example options
const companyTypes = [
    { value: "type1", label: "Type 1" },
    { value: "type2", label: "Type 2" },
];
const states = [
    { value: "NY", label: "New York" },
    { value: "CA", label: "California" },
];

// Validation schema
const schema = yup.object().shape({
    brokerName: yup.string().required("Broker Dealer Name is required"),
    dtcc: yup.string().required("DTCC is required"),
    companyType: yup.string().required("Company Type is required"),
    incorpState: yup.string().required("State of Incorporation is required"),
    address1: yup.string().required("Address Line 1 is required"),
    address2: yup.string(),
    city: yup.string().required("City is required"),
    addressState: yup.string().required("State is required"),
    zip: yup.string().required("Zip is required"),
});

const StepBrokerDealer = () => {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            brokerName: "",
            dtcc: "",
            companyType: "",
            incorpState: "",
            address1: "",
            address2: "",
            city: "",
            addressState: "",
            zip: "",
        }
    });

    const onSubmit = (data: any) => {
        // handle form data
        navigate("/onboarding/step-2");
    };

    return (
        <OnboardingLayout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 ">
                    <Header />

                    {/* Broker Dealer Details */}
                    <Card className="p-2 !bg-white">
                        <Typography variant="h6" marginBottom={2}>Broker Dealer Details</Typography>
                        <Box display={"flex"} gap={2} width={"100%"} marginTop={2}>
                            <Box width={"50%"}>
                                <Controller
                                    name="brokerName"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Broker Dealer Name"
                                            placeholder="Enter registered name"
                                            type="text"
                                            error={!!errors.brokerName}
                                            helperText={errors.brokerName?.message}
                                            fullWidth
                                            handleChangeValue={field.onChange}
                                            value={field.value}
                                            className="mb-2"
                                        />
                                    )}
                                />
                            </Box>
                            <Box width={"50%"}>
                                <Controller
                                    name="dtcc"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="DTCC"
                                            placeholder="eg. 392934"
                                            type="text"
                                            error={!!errors.dtcc}
                                            helperText={errors.dtcc?.message}
                                            fullWidth
                                            handleChangeValue={field.onChange}
                                            value={field.value}
                                            className="!mb-2"
                                        />
                                    )}
                                />
                            </Box>

                        </Box>
                        <Box>
                            <Box marginTop={2}>
                                <Controller
                                    name="companyType"
                                    control={control}

                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Company Type"
                                            placeholder="Select type"
                                            value={field.value}
                                            options={companyTypes}
                                            handleChangeValue={field.onChange}
                                            error={!!errors.companyType}
                                            helperText={errors.companyType?.message}
                                            fullWidth
                                        />
                                    )}
                                /></Box>

                            <Box marginTop={2}>
                                <Controller
                                    name="incorpState"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="State of Incorporation"
                                            placeholder="Select State"
                                            value={field.value}
                                            options={states}
                                            handleChangeValue={field.onChange}
                                            error={!!errors.incorpState}
                                            helperText={errors.incorpState?.message}
                                            fullWidth
                                            className="mb-2"
                                        />
                                    )}
                                />
                            </Box>

                        </Box>
                    </Card>

                    {/* Address Section */}
                    <Card className="p-2 !bg-white">
                        <Typography variant="h6">Address</Typography>
                        <Box marginTop={2}>
                            <Controller
                                name="address1"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Address Line 1"
                                        type="text"
                                        error={!!errors.address1}
                                        helperText={errors.address1?.message}
                                        fullWidth
                                        handleChangeValue={field.onChange}
                                        value={field.value}
                                    />
                                )}
                            />
                        </Box>

                        <Box marginTop={2}>
                            <Controller
                                name="address2"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Address Line 2"
                                        type="text"
                                        error={!!errors.address2}
                                        helperText={errors.address2?.message}
                                        fullWidth
                                        handleChangeValue={field.onChange}
                                        value={field.value || ""}
                                    />
                                )}
                            />
                        </Box>

                        <Box display={"flex"} gap={2} width={"100%"} marginTop={2}>
                            <Box width={"33.3%"}>
                                <Controller
                                    name="city"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="City"
                                            type="text"
                                            error={!!errors.city}
                                            helperText={errors.city?.message}
                                            fullWidth
                                            handleChangeValue={field.onChange}
                                            value={field.value}
                                        />
                                    )}
                                />
                            </Box>
                            <Box width={"33.3%"}>
                                <Controller
                                    name="addressState"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="State"
                                            placeholder="Select one"
                                            value={field.value}
                                            options={states}
                                            handleChangeValue={field.onChange}
                                            error={!!errors.addressState}
                                            helperText={errors.addressState?.message}
                                            fullWidth
                                        />
                                    )}
                                />
                            </Box>
                            <Box width={"33.3%"}>
                                <Controller
                                    name="zip"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Zip"
                                            placeholder="E.g., 10003"
                                            type="text"
                                            error={!!errors.zip}
                                            helperText={errors.zip?.message}
                                            fullWidth
                                            handleChangeValue={field.onChange}
                                            value={field.value}
                                        />
                                    )}
                                />
                            </Box>
                        </Box>
                    </Card>

                    {/* Action Buttons */}
                    <Box className="flex gap-2">
                        <CustomButton
                            variant="outlined"
                            sx={{ width: "100%" }}
                            title="Cancel"
                            onClick={() => navigate("/onboarding")}
                            type="button"
                        />
                        <CustomButton
                            variant="contained"
                            sx={{ width: "100%" }}
                            title="Next"
                            type="submit"
                        />
                    </Box>
                </div>
            </form>
        </OnboardingLayout>

    );
};

export default StepBrokerDealer;