import React from 'react';

export const Header = () => {
  return (
    <header className="bg-primary">
      <div className="container">
        <nav className="navbar">
          <span className="navbar__brand mobile">News</span>
          <span className="navbar__brand desktop">Accelerated News</span>
          <ul>
            <li>
              <a className="navbar__link active" href="/">
                Headlines
              </a>
            </li>
            <li>
              <a className="navbar__link" href="/sports">
                Sports
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
