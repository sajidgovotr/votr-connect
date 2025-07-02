import { ICampaign } from "./campaign";

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    dataTestId?: string
}

export interface AvatarProps {
    url?: string;
    width: number;
    height: number;
}

export interface BreadcrumbsProp {
    data: { name: string; active: boolean; url: string; onItemClick?: () => void }[];
}




export interface CampaignCardProps {
    campaign: ICampaign
}

export type CampaignOfferType = {
    type: string
    name: string;
    description: string;
    isSelected: boolean;
    icon?: JSX.Element;
    iconActive?: JSX.Element;
}[];