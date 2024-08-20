import React from 'react';
import './main.css';
import ErrorBoundary from './ErrorBoundary';

const SiteLayout = ({ children, menu = (c) => null }) => {
  return (
    <div className="site-container">
      <div className="sidebar">{menu}</div>
      <div className="section">{children}</div>
    </div>
  );
};

const Menu = () => (
  <ErrorBoundary>
    <p style={{ color: 'white' }}>
      TODO: Build Menu
      <BreakThings />
    </p>
  </ErrorBoundary>
);

const Callout = ({ children }) => (
  <ErrorBoundary>
    <div className="callout">{children}</div>
  </ErrorBoundary>
);

const BreakThings = () => {
  throw new Error('We intentionally broke something');
};

export default function Main() {
  return (
    <SiteLayout
      menu={
        <ErrorBoundary>
          <p>Site Layout Menu</p>
          <BreakThings />
        </ErrorBoundary>
      }
    >
      <ErrorBoundary>
        <Callout>Callout</Callout>
      </ErrorBoundary>

      <ErrorBoundary>
        <h1>Contents</h1>
        <p>this is the main part of the example</p>
      </ErrorBoundary>
    </SiteLayout>
  );
}
