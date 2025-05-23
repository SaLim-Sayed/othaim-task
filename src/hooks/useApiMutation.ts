import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import axios from 'axios';

type ApiMutationProps<TInput, TResponse> = {
  url: string;
  config?: UseMutationOptions<TResponse, unknown, TInput>;
  method?: 'post' | 'put' ;
};

export function useApiMutation<TInput = any, TResponse = any>({
  url,
  config,
  method="post"
}: ApiMutationProps<TInput, TResponse>) {
  return useMutation<TResponse, Error, TInput>({
    mutationFn: async body => {
      const {data} = await axios[method](url, body);
      return data;
    },
    
    ...config,
  });
}
