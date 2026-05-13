import React, { Component } from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, background: "#111", color: "#fff", border: "1px solid red", margin: 20 }}>
          <h2>Something went wrong in the 3D Section.</h2>
          <pre>{this.state.error?.message}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}
