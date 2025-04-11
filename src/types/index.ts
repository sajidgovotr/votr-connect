export interface Label {
    value: string;
    label: string;
}

export interface AuditLogEntry {
    timestamp: string;
    user: string;
    action: string;
    clientResource: string;
    details: string;
} 