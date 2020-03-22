/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Container, Content } from 'react-bulma-components';
import Toolbar from './components/toolbar/Toolbar';
import Projects from './components/projects/Projects';
import { MessagesProvider } from './components/notification/MessagesContext';
import { SettingsProvider } from './components/settings/SettingsContext';
import Settings from './components/settings/Settings';
import PageFooter from './components/footer/PageFooter';

function App() {
  return (
    <>
      <Container>
        <Content>
          <MessagesProvider>
            <SettingsProvider>
              <Toolbar />
              <Settings />
              <Projects />
            </SettingsProvider>
          </MessagesProvider>
        </Content>
      </Container>
      <PageFooter />
    </>
  );
}

export default App;
