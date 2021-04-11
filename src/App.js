import { Container, Content } from 'react-bulma-components';

import { MessagesProvider } from 'components/notification/MessagesContext';
import PageFooter from 'components/footer/PageFooter';
import Projects from 'components/projects/Projects';
import Settings from 'components/settings/Settings';
import { SettingsProvider } from 'components/settings/SettingsContext';
import Toolbar from 'components/toolbar/Toolbar';

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
