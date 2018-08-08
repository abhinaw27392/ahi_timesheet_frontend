
import React from 'react';
import './Footer.css';

import packageJson from '../../../package.json';

export const Footer = () => (
  <footer >
          TimeSheet Manager (v{packageJson.version})
  </footer>
)