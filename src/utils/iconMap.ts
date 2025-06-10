import {
  Router,
  Upload,
  List,
  Settings,
  Api,
  CloudUpload,
  Storage,
  Code,
  Webhook,
  Dataset,
  Cloud,
} from '@mui/icons-material';

export const iconMap: { [key: string]: any } = {
  router: Router,
  upload: Upload,
  list: List,
  settings: Settings,
  api: Api,
  cloudUpload: CloudUpload,
  storage: Storage,
  code: Code,
  webhook: Webhook,
  database: Dataset,
  cloud: Cloud,
};

export const getIcon = (iconKey: string) => {
  return iconMap[iconKey] || Settings; // Default to Settings icon if key not found
}; 