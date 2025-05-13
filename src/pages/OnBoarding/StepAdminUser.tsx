import { Box, Typography, FormControlLabel } from "@mui/material";
import { Card, CustomButton } from "@/components";
import TextField from "@/components/Textfields";
import Select from "@/components/SelectBox";
import Checkbox from "@/components/Checkbox";
import { useNavigate } from "react-router";
import Header from "@/components/Onboarding/Header";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import OnboardingLayout from "@/components/Onboarding/Container";

// Example options
const roles = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
];
const permissions = [
    "Permissions title 1",
    "Permissions title 1",
    "Permissions title 1",
    "Permissions title 1",
    "Permissions title 1",
    "Permissions title 1",
];

// Validation schema
const userSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    title: yup.string().required("Title is required"),
    role: yup.string().required("Role is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone Number is required"),
    permissions: yup.array().of(yup.string()).min(1, "At least one permission is required"),
});

const clearingSchema = userSchema.shape({
    sameAsVotr: yup.boolean(),
});

const schema = yup.object().shape({
    votr: userSchema,
    clearing: clearingSchema,
});

const StepAdminUser = () => {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            votr: {
                firstName: "",
                lastName: "",
                title: "",
                role: "",
                email: "",
                phone: "",
                permissions: [],
            },
            clearing: {
                firstName: "",
                lastName: "",
                title: "",
                role: "",
                email: "",
                phone: "",
                permissions: [],
                sameAsVotr: false,
            }
        }
    });

    // Watch for "Same as VOTR Connect" checkbox
    const sameAsVotr = watch("clearing.sameAsVotr");
    const votrValues = watch("votr");

    // If "Same as VOTR Connect" is checked, sync values
    if (sameAsVotr) {
        setTimeout(() => {
            setValue("clearing.firstName", votrValues.firstName);
            setValue("clearing.lastName", votrValues.lastName);
            setValue("clearing.title", votrValues.title);
            setValue("clearing.role", votrValues.role);
            setValue("clearing.email", votrValues.email);
            setValue("clearing.phone", votrValues.phone);
            setValue("clearing.permissions", votrValues.permissions);
        }, 0);
    }

    const onSubmit = (data: any) => {
        // handle form data
        navigate("/onboarding/step-3");
    };

    // Helper for rendering user section
    const renderUserSection = (prefix: "votr" | "clearing", title: string, subtitle: string, showSameAs?: boolean) => (
        <Card className="p-2 !bg-white">
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="body2" className="!text-gray-500">{subtitle}</Typography>
                </Box>
                {showSameAs && (
                    <Controller
                        name="clearing.sameAsVotr"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!!field.value}
                                        onChange={() => field.onChange(!field.value)}
                                    />
                                }
                                label="Same as VOTR Connect"
                            />
                        )}
                    />
                )}
            </Box>
            <Box display="flex" gap={2} mt={2}>
                <Box width="50%">
                    <Controller
                        name={`${prefix}.firstName`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="First Name"
                                placeholder="Eg. John"
                                type="text"
                                error={!!errors?.[prefix]?.firstName}
                                helperText={errors?.[prefix]?.firstName?.message}
                                fullWidth
                                handleChangeValue={field.onChange}
                                value={field.value ?? ""}
                            />
                        )}
                    />
                </Box>
                <Box width="50%">
                    <Controller
                        name={`${prefix}.lastName`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Last Name"
                                placeholder="Eg. Anderson"
                                type="text"
                                error={!!errors?.[prefix]?.lastName}
                                helperText={errors?.[prefix]?.lastName?.message}
                                fullWidth
                                handleChangeValue={field.onChange}
                                value={field.value ?? ""}
                            />
                        )}
                    />
                </Box>
            </Box>
            <Box display="flex" gap={2} mt={2}>
                <Box width="50%">
                    <Controller
                        name={`${prefix}.title`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Title"
                                placeholder="Eg. John"
                                type="text"
                                error={!!errors?.[prefix]?.title}
                                helperText={errors?.[prefix]?.title?.message}
                                fullWidth
                                handleChangeValue={field.onChange}
                                value={field.value ?? ""}
                            />
                        )}
                    />
                </Box>
                <Box width="50%">
                    <Controller
                        name={`${prefix}.role`}
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="Role"
                                placeholder="Select here"
                                value={field.value ?? ""}
                                options={roles}
                                handleChangeValue={field.onChange}
                                error={!!errors?.[prefix]?.role}
                                helperText={errors?.[prefix]?.role?.message}
                                fullWidth
                            />
                        )}
                    />
                </Box>
            </Box>
            <Box display="flex" gap={2} mt={2}>
                <Box width="50%">
                    <Controller
                        name={`${prefix}.email`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email"
                                placeholder="example@email.com"
                                type="email"
                                error={!!errors?.[prefix]?.email}
                                helperText={errors?.[prefix]?.email?.message}
                                fullWidth
                                handleChangeValue={field.onChange}
                                value={field.value ?? ""}
                            />
                        )}
                    />
                </Box>
                <Box width="50%">
                    <Controller
                        name={`${prefix}.phone`}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Phone Number"
                                placeholder="+1 (XXX) XX XXX"
                                type="text"
                                error={!!errors?.[prefix]?.phone}
                                helperText={errors?.[prefix]?.phone?.message}
                                fullWidth
                                handleChangeValue={field.onChange}
                                value={field.value ?? ""}
                            />
                        )}
                    />
                </Box>
            </Box>
            <Box mt={2} className="!bg-gray-200 !px-4 !py-2 rounded-md">
                <Typography fontWeight={500} mb={1}>Permissions</Typography>
                <Box display="flex" flexWrap="wrap" gap={2}>
                    <Controller
                        name={`${prefix}.permissions`}
                        control={control}
                        render={({ field }) => (
                            <>
                                {permissions.map((perm, idx) => (
                                    <FormControlLabel
                                        className="flex gap-1"
                                        key={perm + idx}
                                        control={
                                            <Checkbox

                                                checked={Array.isArray(field.value) ? field.value.includes(perm) : false}
                                                onChange={() => {
                                                    let newValue = Array.isArray(field.value) ? [...field.value] : [];
                                                    if (newValue.includes(perm)) {
                                                        newValue = newValue.filter((p): p is string => p !== perm && typeof p === 'string');
                                                    } else {
                                                        newValue.push(perm);
                                                    }
                                                    field.onChange(newValue);
                                                }}
                                            />
                                        }
                                        label={perm}
                                    />
                                ))}
                            </>
                        )}
                    />
                </Box>
                {errors?.[prefix]?.permissions && (
                    <Typography color="error" variant="caption">
                        {errors?.[prefix]?.permissions?.message}
                    </Typography>
                )}
            </Box>
        </Card>
    );

    return (
        <OnboardingLayout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Header />
                <Box className="flex gap-2 flex-col !p-2">
                    {renderUserSection("votr", "VOTR Connect Admin", "Minim et mollit culpa non velit non excepteur sint ut reprehenderit excepteur")}
                    {renderUserSection("clearing", "Clearing Broker Portal", "Minim et mollit culpa non velit non excepteur sint ut", true)}


                    <Box className="flex gap-2">
                        <CustomButton
                            variant="outlined"
                            sx={{ width: "100%" }}
                            title="Back"
                            onClick={() => navigate("/onboarding/step-1")}
                            type="button"
                        />
                        <CustomButton
                            variant="contained"
                            sx={{ width: "100%" }}
                            title="Next"
                            type="submit"
                        />
                    </Box>
                </Box>
            </form>
        </OnboardingLayout>

    );
};

export default StepAdminUser;
