import AboutModal from 'components/about/AboutModal';
import { Navbar } from 'react-bulma-components';
import ToolsModal from 'components/tools/ToolsModal';
import logo from './logo.svg';
import octocat from './octocat.png';
import { useState } from 'react';

const Toolbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Navbar active={open} fixed={(open && 'top') || undefined}>
      <Navbar.Brand>
        <Navbar.Item
          renderAs="a"
          href="https://coders.cat"
          title="Coders.cat"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img src={logo} alt="Logo coders.cat" width="163" height="69" />
        </Navbar.Item>
        <Navbar.Burger onClick={() => setOpen((isOpen) => !isOpen)} />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container position="end">
          <Navbar.Item renderAs="span">
            <ToolsModal />
          </Navbar.Item>
          <Navbar.Item renderAs="span">
            <AboutModal />
          </Navbar.Item>
          <Navbar.Item
            renderAs="a"
            href="https://github.com/coders-cat/timetrack"
            title="Fork me on GitHub"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src={octocat} alt="Octocat GitHub logo" />
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default Toolbar;
