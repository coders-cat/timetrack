import { Columns, Container, Content, Footer } from 'react-bulma-components';

import logoBulma from './bulma-logo.png';
import logoDexie from './logo-dexie.png';
import logoReact from './react.png';

const PageFooter = () => (
  <Footer>
    <Container>
      <Content style={{ textAlign: 'center' }}>
        <h6>Powered by</h6>
        <Columns className="is-centered is-vcentered">
          <Columns.Column narrow>
            <a
              href="https://dexie.org/"
              title="Dexie"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={logoDexie} alt="Dexie" style={{ height: '32px' }} />
            </a>
          </Columns.Column>
          <Columns.Column narrow>
            <a
              href="https://reactjs.org/"
              title="React"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={logoReact} alt="React" style={{ height: '48px' }} />
            </a>
          </Columns.Column>
          <Columns.Column narrow>
            <a
              href="https://bulma.io/"
              title="Bulma"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={logoBulma} alt="Bulma" style={{ height: '32px' }} />
            </a>
          </Columns.Column>
        </Columns>
      </Content>
    </Container>
  </Footer>
);

export default PageFooter;
