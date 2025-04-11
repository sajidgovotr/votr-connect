import { useParams } from 'react-router';
import LogDetailsComponent from '@/components/RestApiSandbox/components/LogDetails';

const LogDetailsPage = () => {
    const { logId } = useParams();

    return <LogDetailsComponent logId={logId} />;
};

export default LogDetailsPage; 