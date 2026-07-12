import { Component, ReactNode } from 'react';

// Generic React error boundary. `fallback` can be a node, or a function that
// receives the caught error (used to surface WebGL failures on-page so a device
// that can't run the 3D scene degrades visibly instead of silently).
export class ModelBoundary extends Component<
  { children: ReactNode; fallback: ReactNode | ((err: Error) => ReactNode); label?: string; onError?: (err: Error) => void },
  { failed: boolean; error: Error | null }
> {
  state = { failed: false, error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { failed: true, error }; }
  componentDidCatch(err: unknown) {
    console.warn(`[tiger] ${this.props.label ?? 'scene'} failed:`, err);
    this.props.onError?.(err instanceof Error ? err : new Error(String(err)));
  }
  render() {
    if (!this.state.failed) return this.props.children;
    const { fallback } = this.props;
    return typeof fallback === 'function'
      ? fallback(this.state.error ?? new Error('unknown'))
      : fallback;
  }
}
