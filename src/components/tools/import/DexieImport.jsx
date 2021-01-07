import React, { useState, useContext } from 'react';
import { importDB } from 'dexie-export-import';
import { useDropzone } from 'react-dropzone';
import { Progress, Form, Icon } from 'react-bulma-components';
import { confirmAlert } from '../../modal/ConfirmModal';
import { MessagesContext } from '../../notification/MessagesContext';
import Alert from '../../notification/Alert';

import db from '../../../db/db';

const DexieImport = () => {
  const { addException, clearErrors } = useContext(MessagesContext);
  const [progress, setProgress] = useState(0);

  const onDrop = (acceptedFiles) => {
    const progressCallback = ({ totalRows, completedRows }) => {
      setProgress((completedRows / totalRows) * 100);
    };

    const importDexie = async (file) => {
      clearErrors();
      setProgress(0);
      try {
        // eslint-disable-next-line no-console
        console.log(`Importing ${file.name}`);
        db.close();
        await db.delete();
        await importDB(file, { progressCallback });
        // eslint-disable-next-line no-console
        console.log('Import complete');
        setProgress(0);
      } catch (ex) {
        addException(ex);
      } finally {
        // @TODO Find a better way to rerender all components with new data...
        window.location.reload();
      }
    };

    const confirmImport = (file) => {
      confirmAlert({
        title: 'Database Import',
        onConfirm: () => importDexie(file),
        onClose: () => {},
        message: (
          <Alert
            color="danger"
            uid="alerto-confirm-import"
            message="Warning, this will completely destroy your current data, make sure you have a fresh usable backup before import. Are you sure you want to continue?"
            dismissible={false}
            timeOut={0}
          />
        ),
      });
    };

    const [file] = acceptedFiles;
    confirmImport(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const { Field, Control, InputFile } = Form;

  return (
    <div>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <div {...getRootProps()}>
        <form>
          <Field>
            <Control>
              <InputFile
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...getInputProps({
                  icon: <Icon icon="upload" />,
                  label: isDragActive
                    ? 'Drop the files here ...'
                    : 'Drag`n drop some file here, or click to select file to import',
                  placeholder: 'Textarea',
                  color: 'danger',
                  boxed: true,
                  fileName: false,
                  style: { display: 'block' },
                })}
              />
            </Control>
            {progress > 0 && <Progress max={100} value={progress} color="primary" size="small" />}
          </Field>
        </form>
      </div>
    </div>
  );
};

export default DexieImport;
