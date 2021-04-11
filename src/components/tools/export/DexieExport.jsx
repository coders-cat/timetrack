import { Button, Form, Progress } from 'react-bulma-components';
import { useContext, useRef, useState } from 'react';

import { MessagesContext } from 'components/notification/MessagesContext';
import db from 'db/db';
import { exportDB } from 'dexie-export-import';

const DexieExport = () => {
  const { addException, clearErrors } = useContext(MessagesContext);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('');
  const linkRef = useRef();

  const { Field, Control } = Form;

  const progressCallback = ({ totalRows, completedRows }) => {
    setProgress((completedRows / totalRows) * 100);
  };

  const exportDexie = async () => {
    clearErrors();
    setProgress(0);
    try {
      const blob = await exportDB(db, { prettyJson: true, progressCallback });
      setUrl(window.URL.createObjectURL(blob));
      linkRef.current.click();
      setProgress(0);
    } catch (ex) {
      addException(ex);
    }
  };

  return (
    <Field>
      <Control>
        <Button color="primary" onClick={exportDexie}>
          Export
        </Button>
        {progress > 0 && (
          <Progress max={100} value={progress} color="primary" size="small" />
        )}
        <a
          ref={linkRef}
          download="dexie-export.json"
          href={url}
          className="is-hidden"
        >
          download
        </a>
      </Control>
    </Field>
  );
};

export default DexieExport;
