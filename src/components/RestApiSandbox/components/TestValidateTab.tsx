import { useState } from 'react';
import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, Tabs, Tab, IconButton } from "@mui/material";
import CustomButton from '../../CustomButton';
import SelectBox from '../../SelectBox';
import CloseIcon from '@mui/icons-material/Close';

interface RequestParameter {
    name: string;
    value: string;
}

interface FormDataTextItem {
    name: string;
    value: string;
    type: 'text';
}

interface FormDataFileItem {
    name: string;
    value: File | string;
    type: 'file';
}

type FormDataItem = FormDataTextItem | FormDataFileItem;

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
    endpoint: string;
    setEndpoint: (value: string) => void;
    method: string;
    setMethod: (value: string) => void;
    parameters: RequestParameter[];
    setParameters: (params: RequestParameter[]) => void;
    responseStatus: string;
    responseTime: string;
    onExecute: () => void;
}

const TestValidateTab = ({
    endpoint,
    setEndpoint,
    method,
    setMethod,
    parameters,
    setParameters,
    responseStatus,
    responseTime,
    onExecute
}: TestValidateTabProps) => {
    const [requestBody, setRequestBody] = useState('{\n    \n}');
    const [selectedTab, setSelectedTab] = useState(0);
    const [formData, setFormData] = useState<FormDataItem[]>([]);

    const handleAddParameter = () => {
        setParameters([...parameters, { name: '', value: '' }]);
    };

    const handleRemoveParameter = (index: number) => {
        setParameters(parameters.filter((_, i) => i !== index));
    };

    const handleParameterChange = (index: number, field: 'name' | 'value', value: string) => {
        const newParameters = [...parameters];
        newParameters[index][field] = value;
        setParameters(newParameters);
    };

    const handleAddFormData = () => {
        setFormData([...formData, { name: '', value: '', type: 'text' }]);
    };

    const handleRemoveFormData = (index: number) => {
        setFormData(formData.filter((_, i) => i !== index));
    };

    const handleFormDataChange = (index: number, field: keyof FormDataItem, value: string | File) => {
        const newFormData = [...formData];
        if (field === 'type') {
            if (value === 'text') {
                newFormData[index] = { ...newFormData[index], type: 'text', value: '' };
            } else if (value === 'file') {
                newFormData[index] = { ...newFormData[index], type: 'file', value: '' };
            }
        } else {
            (newFormData[index] as any)[field] = value;
        }
        setFormData(newFormData);
    };



    const methodOptions = [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' }
    ];

    const isRequestBodyMethod = method === 'POST' || method === 'PUT';

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
                        value={endpoint}
                        onChange={(e) => setEndpoint(e.target.value)}
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
                        handleChangeValue={(value) => setMethod(value)}
                        size="small"
                        sx={{ minWidth: 120 }}
                    />
                </Box>
            </Box>

            {isRequestBodyMethod ? (
                <Box>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={selectedTab} onChange={handleTabChange}>
                            <Tab label="Request Body" />
                            <Tab label="Form Data" />
                        </Tabs>
                    </Box>

                    <CustomTabPanel value={selectedTab} index={0}>
                        <TextField
                            fullWidth
                            multiline
                            rows={8}
                            value={requestBody}
                            onChange={(e) => setRequestBody(e.target.value)}
                            sx={{
                                fontFamily: 'monospace',
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'white',
                                    '& fieldset': { borderColor: '#E5E7EB' },
                                    '&:hover fieldset': { borderColor: '#D1D5DB' },
                                },
                            }}
                        />
                    </CustomTabPanel>

                    <CustomTabPanel value={selectedTab} index={1}>
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
                                {formData.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ pl: 0 }}>
                                            <TextField
                                                size="small"
                                                value={item.name}
                                                onChange={(e) => handleFormDataChange(index, 'name', e.target.value)}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': { borderColor: '#E5E7EB' },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <SelectBox
                                                value={item.type}
                                                options={[
                                                    { value: 'text', label: 'Text' },
                                                    { value: 'file', label: 'File' }
                                                ]}
                                                handleChangeValue={(value) => handleFormDataChange(index, 'type', value)}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {item.type === 'text' ? (
                                                <TextField
                                                    size="small"
                                                    value={item.value}
                                                    onChange={(e) => handleFormDataChange(index, 'value', e.target.value)}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            '& fieldset': { borderColor: '#E5E7EB' },
                                                        },
                                                    }}
                                                />
                                            ) : (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    {item.value instanceof File ? (
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
                                                                {item.value.name}
                                                            </Typography>
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleFormDataChange(index, 'value', '')}
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
                                                                        handleFormDataChange(index, 'value', file);
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
                                                onClick={() => handleRemoveFormData(index)}
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
                            onClick={handleAddFormData}
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
                                {parameters.map((param, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ pl: 0 }}>
                                            <TextField
                                                size="small"
                                                value={param.name}
                                                onChange={(e) => handleParameterChange(index, 'name', e.target.value)}
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
                                                value={param.value}
                                                onChange={(e) => handleParameterChange(index, 'value', e.target.value)}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': { borderColor: '#E5E7EB' },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => handleRemoveParameter(index)}
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
                            onClick={handleAddParameter}
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
                <CustomButton
                    variant="contained"
                    onClick={onExecute}
                    sx={{ color: 'white', textTransform: 'none', px: 4 }}
                    title="Execute"
                />
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
                gap: 3
            }}>
                <Typography sx={{ color: '#059669' }}>{responseStatus}</Typography>
                <Typography sx={{ color: '#374151' }}>{responseTime}</Typography>
            </Box>
        </Box>
    );
};

export default TestValidateTab; 