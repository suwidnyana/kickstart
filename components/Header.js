import React from 'react';
import { Menu } from 'semantic-ui-react';
import Link from 'next/link';
export default () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      <Link href="/">
        <Menu.Item>CrowdCoin</Menu.Item>
      </Link>

      <Menu.Menu position="right">
        <Menu.Item>Campaign</Menu.Item>
        <Menu.Item>+</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
