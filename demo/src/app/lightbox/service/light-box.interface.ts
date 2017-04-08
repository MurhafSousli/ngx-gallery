export interface LightBoxState {
    active: boolean;
    images?: LightBoxImage[];
    currIndex?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
}

export interface LightBoxImage {
    src: string;
    thumbnail?: string;
    text?: string;
}

export interface LightBoxConfig {
    width?,
    height?,
    transition?,
    thumb?: {
        width?;
        height?;
        position?;
        overlay?;
    }
}
