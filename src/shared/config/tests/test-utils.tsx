import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Queries, queries } from '@testing-library/dom'
import { render, renderHook, RenderHookOptions, RenderOptions } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AlertProvider, AuthProvider } from '../../providers'

export const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: Infinity,
    },
  },
})

function customRender<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(ui: React.ReactElement, options: Omit<RenderOptions<Q, Container, BaseElement>, 'wrapper'> = {}) {
  return render<Q, Container, BaseElement>(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={testQueryClient}>
        <AlertProvider>
          <AuthProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </AuthProvider>
        </AlertProvider>
      </QueryClientProvider>
    ),
    ...options,
  })
}

function customRenderHook<
  Result,
  Props,
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(
  hookResult: (initialProps: Props) => Result,
  options: Omit<RenderHookOptions<Props, Q, Container, BaseElement>, 'wrapper'> = {},
) {
  return renderHook(hookResult, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={testQueryClient}>
        <AlertProvider>
          <AuthProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </AuthProvider>
        </AlertProvider>
      </QueryClientProvider>
    ),
    ...options,
  })
}

export { customRender as render }
export { customRenderHook as renderHook }
