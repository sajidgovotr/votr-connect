import { format } from "date-fns";
import moment from "moment";

interface ITableEntries {
    lowerLimit: number;
    higherLimit: number;
}


export function getCurrentTableEntries(
    limit: number,
    pageNo: number
): ITableEntries {
    const higherLimit = pageNo * limit;
    const lowerLimit = higherLimit - limit + 1;
    return {
        lowerLimit,
        higherLimit
    };
}

export function pxToRem(num: number, baseNumber: number = 16): string {
    return `${num / baseNumber}rem`;
}

export function isBlobURL(url: string): boolean {
    const urlObject: URL = new URL(url);
    return urlObject.protocol === "blob:";
}

export function formatNumberWithSuffix(value: number, toFixed: number): string {
    if (value < 1000) {
        return value.toString();
    } else if (value < 1000000) {
        return (value / 1000).toFixed(toFixed || 0) + "K";
    } else if (value < 1000000000) {
        return (value / 1000000).toFixed(toFixed || 0) + "M";
    } else {
        return (value / 1000000000).toFixed(toFixed || 0) + "B";
    }
}

export function capitalizeFirstLetter(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDashedString(str: string): string {
    if (!str) return str;

    // Split the string by hyphens
    const words = str.split('-');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word =>
        capitalizeFirstLetter(word)
    );

    // Join the words with spaces
    return capitalizedWords.join(' ');
}

// Usage example
// formatDashedString("account-management") => "Account Management"

export function determineTier(positions: number): string {
    if (positions <= 10000) {
        return "Tier 1 | Under 10k";
    } else if (positions > 10000 && positions <= 100000) {
        return "Tier 2 | 10,001 - 100k";
    } else if (positions > 100000 && positions <= 300000) {
        return "Tier 3 | 100,001 - 300k";
    } else if (positions > 300000 && positions <= 500000) {
        return "Tier 4 | 300,001 - 500k";
    } else if (positions > 500000) {
        return "Tier 5 | Over 500k";
    } else {
        return "Invalid number of positions";
    }
}

export const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    try {
        return format(new Date(dateString), "MMM dd, yyyy");
    } catch (e) {
        console.error(e);
        return dateString;
    }
};

export const getCellValue = <T extends Record<string, unknown>>(item: T, keys: string[]): string | Date => {
    if (keys.length === 1) {
        const value = item[keys[0]];
        if (typeof value === "string" && isDateString(value)) {
            return parseDateString(value);
        }
        return value as string | Date;
    }

    let value: unknown = item;

    keys.forEach((key: string): void => {
        if (typeof value === "object" && value !== null) {
            value = (value as Record<string, unknown>)[key];
        }
    });

    if (typeof value === "string" && isDateString(value)) {
        return parseDateString(value);
    }

    return value as string | Date;
};

const isDateString = (value: unknown): boolean => {
    return (
        typeof value === "string" &&
        moment(value, ["DD-MM-YYYY", "DD MMM YYYY"], true).isValid()
    );
};

const parseDateString = (dateString: string): Date => {
    return moment(dateString, ["DD-MM-YYYY", "DD MMM YYYY"]).toDate();
};

export const updateObject = <T extends Record<string, unknown>>(obj: T, key: string, value: unknown): T => {
    const keys: string[] = key.split('.');

    if (keys.length === 1) {
        return { ...obj, [key]: value };
    }

    const newObj: T = { ...obj };
    let current: Record<string, unknown> = newObj;

    for (let i: number = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...(current[keys[i]] as Record<string, unknown>) };
        current = current[keys[i]] as Record<string, unknown>;
    }

    current[keys[keys.length - 1]] = value;

    return newObj;
};

export const createFormData = (payload: Record<string, unknown>): FormData => {
    const formData: FormData = new FormData();

    Object.entries(payload).forEach(([key, value]: [string, unknown]): void => {
        if (typeof value === "object" && value !== null) {
            if (Array.isArray(value)) {
                formData.append(key, JSON.stringify(value));
            } else if (value instanceof File || value instanceof Blob) {
                formData.append(key, value);
            } else {
                formData.append(key, JSON.stringify(value));
            }
        } else if (typeof value === "boolean" || typeof value === "number") {
            formData.append(key, String(value));
        } else if (typeof value === "string") {
            formData.append(key, value);
        }
    });

    return formData;
};
