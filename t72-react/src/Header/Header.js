import React from 'react';

function Header() {
  return (
    <header className="header">
      <img 
          src="./logo.png"
          alt="Logo"
          className="logo"
        />
      <h1>Welcome to T72!</h1>
      <h3>Your go-to platform for innovations in clean energy </h3>
    </header>
  );
}

export default Header;