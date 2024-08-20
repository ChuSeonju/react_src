import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { error: null };

  // 생명주기함수: 내부에서 오류가 발생했을때 호출되는 메서드
  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (error) return <fallback error={error} />;
    return children;
  }
}
