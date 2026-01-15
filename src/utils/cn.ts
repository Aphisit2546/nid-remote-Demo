
// Simple cn utility for merging class names
// Since we don't have clsx installed, use a simple implementation
export function cn(...inputs: (string | undefined | null | false)[]) {
    return inputs.filter(Boolean).join(' ');
}
