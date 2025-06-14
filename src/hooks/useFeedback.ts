
import { useToast } from '@/hooks/use-toast';

export const useFeedback = () => {
  const { toast } = useToast();

  const showSuccess = (message: string, description?: string) => {
    toast({
      title: message,
      description,
      variant: "default",
    });
  };

  const showError = (message: string, description?: string) => {
    toast({
      title: message,
      description,
      variant: "destructive",
    });
  };

  const showLoading = (message: string) => {
    return toast({
      title: message,
      description: "Processando...",
    });
  };

  return {
    showSuccess,
    showError,
    showLoading
  };
};
