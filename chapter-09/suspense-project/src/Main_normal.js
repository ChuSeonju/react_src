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
    <p style={{ color: 'white' }}>TODO: Build Menu</p>
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
    <>
      <SiteLayout menu={<Menu />}>
        <Callout>Welcome to the Site</Callout>
        <ErrorBoundary>
          <h1>TODO: Home page</h1>
          <p>Complete the main contents for the this home page</p>
        </ErrorBoundary>
      </SiteLayout>
    </>
  );
}
