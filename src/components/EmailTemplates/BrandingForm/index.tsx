import { Box } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import BusinessLogoUploader from './BusinessLogoUploader';
import BrandColorPicker from './BrandColorPicker';
import FontDropdown from './FontDropdown';
import MarketingLanguageInput from './MarketingLanguageInput';
import SocialLinksInput from './SocialLinksInput';
import BrandImageUploader from './BrandImageUploader';
import FormActions from './FormActions';
import Card from '../../Card';
import EmailPreview from './EmailPreview';

const schema = yup.object().shape({
    businessLogo: yup.mixed().required('Business logo is required'),
    brandColor: yup.string().required('Brand color is required'),
    font: yup.string().required('Font is required'),
    marketingLanguage: yup.string().required('Marketing language is required'),
    socialLinks: yup.array().of(
        yup.object().shape({
            type: yup.string().required(),
            url: yup.string().url('Enter a valid URL').required('URL is required'),
        })
    ),
    brandImage: yup.mixed().notRequired(),
});

const BrandingForm = () => {
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            businessLogo: undefined,
            brandColor: '#EB4334',
            font: 'Roboto',
            marketingLanguage: '',
            socialLinks: [{ type: 'linkedin', url: '' }],
            brandImage: null,
        },
    });

    return (
        <Box className="flex w-full gap-6 !important">
            <Box className="flex-1 w-[50%] flex !important">
                <FormProvider {...methods}>
                    <Box component="form" className="flex w-full flex-col gap-6 !important" onSubmit={methods.handleSubmit((data) => console.log(data))}>
                        <BusinessLogoUploader />
                        <BrandColorPicker />
                        <FontDropdown />
                        <MarketingLanguageInput />
                        <SocialLinksInput />
                        <BrandImageUploader />
                        <FormActions />
                    </Box>
                </FormProvider>
            </Box>

            <Box className="flex-1 w-[50%] flex justify-center items-start !important">
                <Card className="w-full  min-w-[350px] !important p-6 !bg-white !shadow-md !rounded-2xl">
                    <EmailPreview />
                </Card>
            </Box>
        </Box>

    );
};

export default BrandingForm; 