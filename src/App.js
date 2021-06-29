import { Container, Content } from 'react-bulma-components';

import InfoSettingsBar from 'components/toolbar/InfoSettingsBar';
import { MessagesProvider } from 'components/notification/MessagesContext';
import PageFooter from 'components/footer/PageFooter';
import Projects from 'components/projects/Projects';
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
              <InfoSettingsBar />
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
