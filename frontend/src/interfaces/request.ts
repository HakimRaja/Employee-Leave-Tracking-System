export interface SubmitRequestProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface DateSelectorProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    minDate?: string;
}