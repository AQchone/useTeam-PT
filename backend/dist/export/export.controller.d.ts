export declare class ExportController {
    triggerExport(): Promise<{
        ok: boolean;
        error: string;
    } | {
        ok: any;
        error?: undefined;
    }>;
}
