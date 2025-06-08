import React from 'react';
import { Text } from 'react-native';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error: Error | null };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("🧨 Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Text style={{ color: 'red', padding: 20 }}>
          Something went wrong. Please restart the app.
        </Text>
      );
    }

    return this.props.children;
  }
}
