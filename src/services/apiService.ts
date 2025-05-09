import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

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

export interface FormValues {
    baseUrl: string;
    authType: string;
    apiKey: string;
    endpoint: string;
    method: string;
    parameters: RequestParameter[];
    requestBody: string;
    formData: FormDataItem[];
}

export interface ApiResponse {
    status: number;
    body: any;
    method: string;
    timeTaken: number;
}

export const callEndpoint = async (formData: FormValues): Promise<ApiResponse> => {
    const startTime = performance.now();

    // Construct URL with parameters
    const url = new URL(formData.baseUrl + formData.endpoint);
    if (formData.method === 'GET' || formData.method === 'DELETE') {
        formData.parameters.forEach(param => {
            if (param.name && param.value) {
                url.searchParams.append(param.name, param.value);
            }
        });
    }

    // Prepare headers
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    // Add API Key if present
    if (formData.authType === 'API Key' && formData.apiKey) {
        headers['Authorization'] = `Bearer ${formData.apiKey}`;
    }

    // Prepare request config
    const config: AxiosRequestConfig = {
        method: formData.method,
        url: url.toString(),
        headers,
        validateStatus: () => true, // Accept all status codes
    };

    // Add body for POST/PUT requests
    if (formData.method === 'POST' || formData.method === 'PUT') {
        if (formData.formData.length > 0) {
            // Handle form data
            const formDataObj = new FormData();
            formData.formData.forEach(item => {
                if (item.type === 'text') {
                    formDataObj.append(item.name, item.value);
                } else if (item.type === 'file' && item.value instanceof File) {
                    formDataObj.append(item.name, item.value);
                }
            });
            config.data = formDataObj;
            config.headers = {
                ...config.headers,
                'Content-Type': 'multipart/form-data'
            };
        } else {
            // Handle JSON body
            try {
                config.data = JSON.parse(formData.requestBody);
            } catch (error) {
                throw new Error('Invalid JSON in request body');
            }
        }
    }

    try {
        const response: AxiosResponse = await axios(config);
        const endTime = performance.now();
        const timeTaken = endTime - startTime;

        return {
            status: response.status,
            body: response.data,
            method: formData.method,
            timeTaken
        };
    } catch (error) {
        const endTime = performance.now();
        if (axios.isAxiosError(error)) {
            return {
                status: error.response?.status || 0,
                body: error.response?.data || { error: error.message },
                method: formData.method,
                timeTaken: endTime - startTime
            };
        }
        return {
            status: 0,
            body: { error: error instanceof Error ? error.message : 'Unknown error occurred' },
            method: formData.method,
            timeTaken: endTime - startTime
        };
    }
}; 