import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, RotateCcw, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
  isolate?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  copied: boolean;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  private popstateListener: (() => void) | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      copied: false,
      showDetails: false
    };
  }

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    console.error("🔴 [Fuji App ErrorBoundary Caught Exception]:", error);
    console.error("Component Stack:", errorInfo.componentStack);
  }

  public componentDidMount() {
    // Auto-recover if user navigates back/forward or changes path
    if (typeof window !== 'undefined') {
      this.popstateListener = () => {
        if (this.state.hasError) {
          this.setState({ hasError: false, error: null, errorInfo: null });
        }
      };
      window.addEventListener('popstate', this.popstateListener);
    }
  }

  public componentWillUnmount() {
    if (typeof window !== 'undefined' && this.popstateListener) {
      window.removeEventListener('popstate', this.popstateListener);
    }
  }

  private handleTryAgain = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  private handleClearCacheAndReset = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
      }
    } catch {
      window.location.href = '/';
    }
  };

  private handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  private handleCopyDiagnostics = () => {
    const errorText = `Fuji Japanese Institute Error Diagnostic:
Error: ${this.state.error?.name || 'Error'}: ${this.state.error?.message || 'Unknown'}
URL: ${typeof window !== 'undefined' ? window.location.href : 'SSR'}
Time: ${new Date().toISOString()}
Stack:
${this.state.error?.stack || 'No stack trace'}
Component Stack:
${this.state.errorInfo?.componentStack || 'No component stack'}`;

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(errorText).then(() => {
        this.setState({ copied: true });
        setTimeout(() => this.setState({ copied: false }), 2500);
      }).catch(() => {});
    }
  };

  public render() {
    if (this.state.hasError) {
      const isIsolated = this.props.isolate;

      return (
        <div className={isIsolated ? "p-6 bg-red-50/50 rounded-2xl border border-red-100 my-4 text-center" : "min-h-screen bg-fuji-light flex items-center justify-center p-4"}>
          <div className={isIsolated ? "max-w-md mx-auto" : "max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 text-center"}>
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-50 text-fuji-red mx-auto mb-4 flex items-center justify-center shadow-inner">
              <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <h2 className="text-xl sm:text-2xl font-display font-bold text-fuji-indigo mb-2">
              {this.props.fallbackTitle || "Something went wrong"}
            </h2>

            <p className="text-xs sm:text-sm text-fuji-slate/75 mb-6 leading-relaxed max-w-sm mx-auto">
              {this.props.fallbackMessage || "We encountered an unexpected issue rendering this section. You can retry, clear your session cache, or return to the main dashboard."}
            </p>

            <div className="flex flex-col gap-2.5 mb-6">
              <button
                type="button"
                onClick={this.handleTryAgain}
                className="w-full py-3 rounded-xl bg-fuji-red text-white font-bold text-sm hover:bg-fuji-darkRed transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-fuji-red/20 active:scale-98"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Again</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={this.handleReload}
                  className="py-2.5 rounded-xl bg-gray-100 text-fuji-indigo font-bold text-xs hover:bg-gray-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reload Page</span>
                </button>

                <button
                  type="button"
                  onClick={this.handleGoHome}
                  className="py-2.5 rounded-xl bg-gray-100 text-fuji-indigo font-bold text-xs hover:bg-gray-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Go to Homepage</span>
                </button>
              </div>

              <button
                type="button"
                onClick={this.handleClearCacheAndReset}
                className="text-xs text-fuji-slate/60 hover:text-fuji-red transition-colors underline py-1 cursor-pointer font-medium"
              >
                Clear Cache & Reset Session
              </button>
            </div>

            {/* Diagnostic Details Panel */}
            <div className="border-t border-gray-100 pt-4 text-left">
              <button
                type="button"
                onClick={() => this.setState({ showDetails: !this.state.showDetails })}
                className="w-full flex items-center justify-between text-xs text-gray-500 hover:text-gray-700 py-1 cursor-pointer"
              >
                <span className="font-semibold flex items-center gap-1.5">
                  <span>Diagnostic Info</span>
                  {this.state.error && (
                    <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-mono">
                      {this.state.error.name}
                    </span>
                  )}
                </span>
                {this.state.showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {this.state.showDetails && (
                <div className="mt-3 p-3 bg-gray-900 text-gray-200 rounded-xl text-[11px] font-mono overflow-hidden">
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-800">
                    <span className="text-red-400 font-bold truncate max-w-[200px]">
                      {this.state.error?.message || "Unspecified runtime exception"}
                    </span>
                    <button
                      type="button"
                      onClick={this.handleCopyDiagnostics}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 text-[10px] cursor-pointer"
                    >
                      {this.state.copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      <span>{this.state.copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-2 text-[10px] text-gray-400">
                    <p className="text-gray-300 whitespace-pre-wrap">{this.state.error?.stack || 'No stack trace available.'}</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
