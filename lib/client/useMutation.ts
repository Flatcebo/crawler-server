"use client";

import { useState } from "react";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type UseMutationResult<T> = [
  (data: any) => Promise<T | null>,
  UseMutationState<T>
];

export default function useMutation<T = any>(
  URL: string
): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  const { loading, data, error } = state;

  function mutation(data: any): Promise<T | null> {
    setState({ ...state, loading: true });
    return fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json().catch(() => {}))
      .then(data => {
        setState(prev => ({ ...prev, data }));
        return data;
      })
      .catch(error => {
        setState(prev => ({ ...prev, error }));
        return null;
      })
      .then(data => {
        setState(prev => ({ ...prev, loading: false }));
        return data;
      });
  }

  return [mutation, { loading, data, error }];
}
