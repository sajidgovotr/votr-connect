import { useState } from 'react';
import DomainEmptyState from "./DomainEmptyState";
import DomainDetails from './DomainDetails';

const SendingEmail = () => {
    const [domain, setDomain] = useState<string | null>("");

    // Handler for when a domain is added
    const handleAddDomain = (data: { domain: string }) => {
        setDomain(data.domain);
    };

    return domain ? (
        <DomainDetails domain={domain} />
    ) : (
        <DomainEmptyState onAddDomain={handleAddDomain} />
    );
}

export default SendingEmail;