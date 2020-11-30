export interface IDomain {
    name: string;
    expiry?: number;
    lastDetected?: number;
    possyblyAvailable?: boolean;
    addresses?: string[];
    nsname?: string;
    hostmaster?: string;
    serial?: number;
    refresh?: number;
    retry?: number;
    minttl?: number;
  }