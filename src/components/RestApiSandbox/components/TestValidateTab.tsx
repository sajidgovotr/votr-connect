import { useState } from 'react';
import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Tab, IconButton, CircularProgress } from "@mui/material";
import { useFormContext, useFieldArray } from 'react-hook-form';
import SelectBox from '../../SelectBox';
import CloseIcon from '@mui/icons-material/Close';



interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`request-tabpanel-${index}`}
            aria-labelledby={`request-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

interface TestValidateTabProps {
    responseStatus: string;
    responseTime: string;
    responseBody: any;
    onExecute: () => void;
    isLoading: boolean;
}

const TestValidateTab = ({
    responseStatus,
    responseTime,
    responseBody,
    onExecute,
    isLoading
}: TestValidateTabProps) => {
    const { register, control, watch, setValue } = useFormContext();
    const [selectedTab, setSelectedTab] = useState(0);

    const { fields: parameterFields, append: appendParameter, remove: removeParameter } = useFieldArray({
        control,
        name: "parameters"
    });

    const { fields: formDataFields, append: appendFormData, remove: removeFormData } = useFieldArray({
        control,
        name: "formData"
    });

    const method = watch("method");
    const isRequestBodyMethod = method === 'POST' || method === 'PUT';

    const methodOptions = [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' }
    ];

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={{
            bgcolor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            p: 4
        }}>
            <Typography
                variant="h6"
                sx={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#111827',
                    mb: 4
                }}
            >
                Test API Endpoint
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 2, mb: 4 }}>
                <Box>
                    <Typography sx={{ fontSize: '0.875rem', color: '#374151', mb: 1 }}>
                        Endpoint
                    </Typography>
                    <TextField
                        fullWidth
                        {...register("endpoint", { required: "Endpoint is required" })}
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                bgcolor: 'white',
                                '& fieldset': { borderColor: '#E5E7EB' },
                                '&:hover fieldset': { borderColor: '#D1D5DB' },
                            },
                        }}
                    />
                </Box>
                <Box>
                    <Typography sx={{ fontSize: '0.875rem', color: '#374151', mb: 1 }}>
                        Method
                    </Typography>
                    <SelectBox
                        value={method}
                        options={methodOptions}
                        handleChangeValue={(value) => setValue("method", value)}
                        size="small"
                        sx={{ minWidth: 120 }}
                    />
                </Box>
            </Box>

            {isRequestBodyMethod ? (
                <Box>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={selectedTab} onChange={handleTabChange}>
                            {/* <Tab label="Request Body" /> */}
                            <Tab label="Form Data" />
                        </Tabs>
                    </Box>

                    {/* <CustomTabPanel value={selectedTab} index={0}>
                        <TextField
                            fullWidth
                            multiline
                            rows={8}
                            {...register("requestBody")}
                            sx={{
                                fontFamily: 'monospace',
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'white',
                                    '& fieldset': { borderColor: '#E5E7EB' },
                                    '&:hover fieldset': { borderColor: '#D1D5DB' },
                                },
                            }}
                        />
                    </CustomTabPanel> */}

                    <CustomTabPanel value={selectedTab} index={0}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: '#374151', fontWeight: 500, pl: 0 }}>Name</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Type</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Value</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {formDataFields.map((field, index) => (
                                    <TableRow key={field.id}>
                                        <TableCell sx={{ pl: 0 }}>
                                            <TextField
                                                size="small"
                                                {...register(`formData.${index}.name`)}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': { borderColor: '#E5E7EB' },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <SelectBox
                                                value={watch(`formData.${index}.type`)}
                                                options={[
                                                    { value: 'text', label: 'Text' },
                                                    { value: 'file', label: 'File' }
                                                ]}
                                                handleChangeValue={(value) => {
                                                    setValue(`formData.${index}.type`, value);
                                                    setValue(`formData.${index}.value`, '');
                                                }}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {watch(`formData.${index}.type`) === 'text' ? (
                                                <TextField
                                                    size="small"
                                                    {...register(`formData.${index}.value`)}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': { borderColor: '#E5E7EB' },
                                                        },
                                                    }}
                                                />
                                            ) : (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    {watch(`formData.${index}.value`) instanceof File ? (
                                                        <Box sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 1,
                                                            bgcolor: '#F3F4F6',
                                                            borderRadius: '4px',
                                                            py: 0.5,
                                                            px: 1
                                                        }}>
                                                            <Typography sx={{ fontSize: '0.875rem' }}>
                                                                {watch(`formData.${index}.value`).name}
                                                            </Typography>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => setValue(`formData.${index}.value`, '')}
                                                                sx={{ p: 0.5 }}
                                                            >
                                                                <CloseIcon sx={{ fontSize: 16 }} />
                                                            </IconButton>
                                                        </Box>
                                                    ) : (
                                                        <Button
                                                            variant="outlined"
                                                            component="label"
                                                            size="small"
                                                            sx={{
                                                                textTransform: 'none',
                                                                borderColor: '#E5E7EB',
                                                                color: '#374151',
                                                                '&:hover': {
                                                                    borderColor: '#D1D5DB',
                                                                    bgcolor: 'transparent'
                                                                }
                                                            }}
                                                        >
                                                            Select Files
                                                            <input
                                                                type="file"
                                                                hidden
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) {
                                                                        setValue(`formData.${index}.value`, file);
                                                                    }
                                                                }}
                                                            />
                                                        </Button>
                                                    )}
                                                </Box>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => removeFormData(index)}
                                                sx={{
                                                    color: '#EF4444',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        bgcolor: 'transparent',
                                                        opacity: 0.8
                                                    }
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Button
                            onClick={() => appendFormData({ name: '', value: '', type: 'text' })}
                            sx={{
                                mt: 2,
                                color: '#3B82F6',
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: 'transparent',
                                    opacity: 0.8
                                }
                            }}
                        >
                            + Add Form Data
                        </Button>
                    </CustomTabPanel>
                </Box>
            ) : (
                <>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: '#111827',
                            mb: 2
                        }}
                    >
                        Request Parameters
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: '#374151', fontWeight: 500, pl: 0 }}>Name</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Value</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {parameterFields.map((field, index) => (
                                    <TableRow key={field.id}>
                                        <TableCell sx={{ pl: 0 }}>
                                            <TextField
                                                size="small"
                                                {...register(`parameters.${index}.name`)}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': { borderColor: '#E5E7EB' },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                size="small"
                                                {...register(`parameters.${index}.value`)}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': { borderColor: '#E5E7EB' },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => removeParameter(index)}
                                                sx={{
                                                    color: '#EF4444',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        bgcolor: 'transparent',
                                                        opacity: 0.8
                                                    }
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Button
                            onClick={() => appendParameter({ name: '', value: '' })}
                            sx={{
                                mt: 2,
                                color: '#3B82F6',
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: 'transparent',
                                    opacity: 0.8
                                }
                            }}
                        >
                            + Add Parameter
                        </Button>
                    </Box>
                </>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <Button
                    variant="contained"
                    onClick={onExecute}
                    disabled={isLoading}
                    sx={{
                        color: 'white',
                        textTransform: 'none',
                        px: 4,
                        minWidth: '100px',
                        position: 'relative',
                        bgcolor: '#3B82F6',
                        '&:hover': {
                            bgcolor: '#2563EB'
                        }
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {isLoading ? (
                            <>
                                <CircularProgress size={20} color="inherit" />
                                <span>Loading...</span>
                            </>
                        ) : (
                            'Execute'
                        )}
                    </Box>
                </Button>
            </Box>

            <Typography
                variant="h6"
                sx={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#111827',
                    mb: 2
                }}
            >
                Response
            </Typography>

            <Box sx={{
                bgcolor: '#F9FAFB',
                p: 2,
                borderRadius: '6px',
                display: 'flex',
                gap: 3,
                mb: 2
            }}>
                <Typography sx={{
                    color: responseStatus.includes('200') ? '#059669' : '#DC2626',
                    fontWeight: 500
                }}>
                    {responseStatus}
                </Typography>
                <Typography sx={{ color: '#374151' }}>{responseTime}</Typography>
            </Box>

            {responseBody && (
                <Box sx={{
                    bgcolor: '#F9FAFB',
                    p: 2,
                    borderRadius: '6px',
                    maxHeight: '400px',
                    overflow: 'auto'
                }}>
                    <pre style={{
                        margin: 0,
                        fontFamily: 'monospace',
                        fontSize: '0.875rem',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                    }}>
                        {typeof responseBody === 'string'
                            ? responseBody
                            : JSON.stringify(responseBody, null, 2)}
                    </pre>
                </Box>
            )}
        </Box>
    );
};

export default TestValidateTab; 