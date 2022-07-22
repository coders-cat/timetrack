import { Button, Content, Table } from 'react-bulma-components';
import { useCallback, useContext, useEffect, useState } from 'react';

import { MessagesContext } from 'components/notification/MessagesContext';
import PropTypes from 'prop-types';
import { SettingsContext } from 'components/settings/SettingsContext';
import TimeFormat from './TimeFormat';
import WorkUnitForm from './WorkUnitForm';
import { confirmAlert } from 'components/modal/ConfirmModal';
import db from 'db/db';

const WorkUnits = ({ project, onChange }) => {
  const { addException } = useContext(MessagesContext);
  const { getSetting } = useContext(SettingsContext);
  const [workunits, setWorkUnits] = useState([]);
  const [editWorkUnit, setEditWorkUnit] = useState({ projectId: project.id });
  const [showModal, setShowModal] = useState(false);

  const fetchWorkUnits = useCallback(async () => {
    const startTime = (await getSetting('startDate')).value.getTime();
    const endTime = (await getSetting('endDate')).value.getTime();

    setWorkUnits(
      await db.workunits
        .where('[projectId+startTime+endTime]')
        .between(
          [project.id, startTime, startTime],
          [project.id, endTime, endTime],
          true,
          true
        )
        .toArray()
    );
  }, [project, getSetting, setWorkUnits]);

  useEffect(() => {
    fetchWorkUnits();
  }, [fetchWorkUnits]);

  const displayDate = (time) =>
    new Date(time).toLocaleString(
      Intl.DateTimeFormat().resolvedOptions().locale,
      {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timeStyle: 'short',
        dateStyle: 'short',
      }
    );

  const onChangeDate = (event, data) => {
    if (data) {
      setEditWorkUnit((currWorkUnit) => ({
        ...currWorkUnit,
        [data.name]: data.value,
      }));
      return;
    }

    event.persist();

    setEditWorkUnit((currWorkUnit) => {
      const [propName, time] = event.target.name.split('-');
      let changed = currWorkUnit[propName];
      try {
        if (time) {
          const [hours, minutes] = event.target.value.split(':');
          const d = new Date(currWorkUnit[propName]);
          d.setHours(hours);
          d.setMinutes(minutes);
          changed = d.getTime();
        } else {
          const d = new Date(event.target.value);
          const currDate = new Date(currWorkUnit[propName]);
          d.setHours(currDate.getHours());
          d.setMinutes(currDate.getMinutes());
          changed = d.getTime();
        }
        // eslint-disable-next-line no-empty
      } catch (ex) {
        addException(ex);
      }

      return {
        ...currWorkUnit,
        [propName]: changed,
      };
    });
  };

  const cancelEdit = () => {
    setShowModal(false);
    setEditWorkUnit({ projectId: project.id });
  };

  const saveWorkUnit = async (event) => {
    event.preventDefault();
    try {
      if (editWorkUnit.id) {
        await db.workunits.update(editWorkUnit.id, editWorkUnit);
      } else {
        await db.projects.add(editWorkUnit);
      }
      onChange();
    } catch (ex) {
      addException(ex);
    }
    fetchWorkUnits();
    cancelEdit();
  };

  const edit = (workunit) => {
    setEditWorkUnit(workunit);
    setShowModal(true);
  };

  const removeWorkUnit = async (workunit) => {
    await db.workunits.delete(workunit.id);
    onChange();
    fetchWorkUnits();
  };

  const confirmRemove = (workunit) =>
    confirmAlert({
      title: 'WorkUnit Delete',
      onConfirm: () => removeWorkUnit(workunit),
      onClose: () => {},
      message: (
        <span
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
      You are going to delete this workunit from
      <strong>${displayDate(workunit.startTime)}</strong> to
      <strong>${displayDate(workunit.endTime)}</strong>.
      Are you sure?
      `,
          }}
        />
      ),
    });

  return (
    <Content>
      <WorkUnitForm
        workunit={editWorkUnit}
        show={showModal}
        onClose={cancelEdit}
        onChange={onChangeDate}
        onSubmit={saveWorkUnit}
      />
      <div className="table-container">
        <Table className="workunits-table is-stripped is-hoverable">
          <caption>
            <h3>Work Units</h3>
          </caption>
          <thead>
            <tr>
              <th>Actions</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Elapsed</th>
            </tr>
          </thead>
          <tbody>
            {workunits.map((workunit) => (
              <tr key={workunit.id}>
                <td>
                  <Button.Group size="small">
                    <Button color="primary" onClick={() => edit(workunit)}>
                      Edit
                    </Button>
                    <Button
                      className="is-danger"
                      onClick={() => confirmRemove(workunit)}
                    >
                      Delete
                    </Button>
                  </Button.Group>
                </td>
                <td>{displayDate(workunit.startTime)}</td>
                <td>{workunit.endTime && displayDate(workunit.endTime)}</td>
                <td>
                  {workunit.endTime && (
                    <TimeFormat time={workunit.endTime - workunit.startTime} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Content>
  );
};

export default WorkUnits;

WorkUnits.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
