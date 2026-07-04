import { Component, ReactNode } from 'react';

// If the GLB fails to load (missing/corrupt), swap in the fallback silhouette
// so the canvas is never blank.
export class ModelBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(err: unknown) { console.warn('[tiger] model failed, using fallback:', err); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
