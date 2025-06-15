
import { toast } from '@/hooks/use-toast';

export const showSuccessToast = (title: string, description?: string) => {
  toast({
    title,
    description,
    className: 'bg-green-50 border-green-200 text-green-800',
  });
};

export const showErrorToast = (title: string, description?: string) => {
  toast({
    title,
    description,
    variant: 'destructive',
  });
};

export const showWarningToast = (title: string, description?: string) => {
  toast({
    title,
    description,
    className: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  });
};

export const showInfoToast = (title: string, description?: string) => {
  toast({
    title,
    description,
    className: 'bg-blue-50 border-blue-200 text-blue-800',
  });
};
