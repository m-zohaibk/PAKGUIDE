'use client';

import React from 'react';

interface ModuleErrorBoundaryProps {
  children: React.ReactNode;
  title: string;
}

interface ModuleErrorBoundaryState {
  hasError: boolean;
}

export class ModuleErrorBoundary extends React.Component<ModuleErrorBoundaryProps, ModuleErrorBoundaryState> {
  state: ModuleErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ModuleErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(`${this.props.title} crashed`, error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-900 shadow-sm">
          <h2 className="text-lg font-extrabold">{this.props.title} needs to be refreshed</h2>
          <p className="mt-2 text-sm leading-relaxed">Your profile was not lost. Refresh the module and try the eligibility check again.</p>
          <button type="button" onClick={() => this.setState({ hasError: false })} className="mt-4 rounded-xl bg-red-700 px-4 py-2 text-xs font-bold text-white hover:bg-red-800">
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
