import { Button, Content, Form, Table } from 'react-bulma-components';
import { Fragment, useCallback, useContext, useEffect, useState } from 'react';

import { MessagesContext } from 'components/notification/MessagesContext';
import ProjectForm from './ProjectForm';
import ProjectTime from 'components/work/ProjectTime';
import { SettingsContext } from 'components/settings/SettingsContext';
import WorkSwitch from 'components/work/WorkSwitch';
import WorkUnits from 'components/work/WorkUnits';
import classNames from 'classnames';
import { confirmAlert } from 'components/modal/ConfirmModal';
import db from 'db/db';

const ProjectsTable = () => {
  const { getSetting } = useContext(SettingsContext);
  const { addException, clearErrors } = useContext(MessagesContext);
  const [editProject, setEditProject] = useState({ client: '', name: '' });
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [folds, toggleFolded] = useState({});

  const { Field, Control } = Form;
  const colNames = ['Actions', 'Client', 'Project', 'Time', 'Status'];

  const fetchProjects = useCallback(async () => {
    const showHidden = (await getSetting('showHidden')).value;
    const allProjects = (
      await db.projects.orderBy('[client+name]').toArray()
    ).map(async (p) => {
      const workUnit =
        (await db.workunits.get({ projectId: p.id, endTime: '' })) || {};
      return {
        ...p,
        workUnit,
      };
    });
    Promise.all(allProjects).then((res) => {
      const toShow = showHidden ? res : res.filter((p) => !p.hidden);
      setProjects(toShow);
    });
  }, [setProjects, getSetting]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const edit = (project) => {
    clearErrors();
    setEditProject(project);
    setShowModal(true);
  };

  const cancelEdit = () => {
    setShowModal(false);
    setEditProject({ client: '', name: '' });
  };

  const onChange = (event) => {
    event.persist();
    setEditProject((currentProject) => ({
      ...currentProject,
      [event.target.name]: event.target.value,
    }));
  };

  const saveProject = async (event) => {
    event.preventDefault();
    try {
      if (editProject.id) {
        await db.projects.update(editProject.id, editProject);
      } else {
        await db.projects.add(editProject);
      }
    } catch (ex) {
      addException(ex);
    }
    fetchProjects();
    cancelEdit();
  };

  const toggleHidden = async (prj) => {
    try {
      await db.projects.update(prj.id, { ...prj, hidden: !prj.hidden });
    } catch (ex) {
      addException(ex);
    }
    fetchProjects();
  };

  const removeProject = async (prj) => {
    try {
      await db.projects.delete(prj.id);
    } catch (ex) {
      addException(ex);
    }
    fetchProjects();
  };

  const confirmRemove = (prj) =>
    confirmAlert({
      title: 'Project Delete',
      onConfirm: () => removeProject(prj),
      onClose: () => {},
      message: (
        <>
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          You are going to delete project <strong>{prj.name}</strong>. Are you
          sure?
        </>
      ),
    });

  const setWorkUnit = (projectId, workUnit) => {
    setProjects((ps) =>
      ps.map((p) => ({ ...p, workUnit: p.id === projectId ? workUnit : {} }))
    );
  };

  return (
    <Content>
      <ProjectForm
        project={editProject}
        clients={[...new Set(projects.map((p) => p.client))]}
        onChange={onChange}
        onSubmit={saveProject}
        show={showModal}
        onClose={cancelEdit}
      />
      <div className="table-container">
        <Table className="projects-table is-hoverable is-fullwidth">
          <thead>
            <tr>
              {colNames.map((text) => (
                <th key={text}>{text}</th>
              ))}
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th colSpan="6">
                <Field kind="group">
                  <Control>
                    <Button
                      color="info"
                      onClick={() => edit({ client: '', name: '' })}
                    >
                      Add Project
                    </Button>
                  </Control>
                </Field>
              </th>
            </tr>
          </tfoot>
          <tbody>
            {projects.map((project) => (
              <Fragment key={project.id}>
                <tr>
                  <td>
                    <Button.Group size="small">
                      <Button color="primary" onClick={() => edit(project)}>
                        Edit
                      </Button>
                      <Button
                        color={project.hidden ? 'success' : 'warning'}
                        onClick={() => toggleHidden(project)}
                      >
                        {project.hidden ? 'Show' : 'Hide'}
                      </Button>
                      <Button
                        color="danger"
                        onClick={() => confirmRemove(project)}
                      >
                        Delete
                      </Button>
                    </Button.Group>
                  </td>
                  <td>{project.client}</td>
                  <td>
                    <Button
                      text
                      onClick={() => {
                        toggleFolded((currentFolds) => ({
                          ...currentFolds,
                          [project.id]: !currentFolds[project.id],
                        }));
                      }}
                    >
                      {project.name}
                    </Button>
                  </td>
                  <td>
                    <ProjectTime project={project} />
                  </td>
                  <td>
                    {project.workUnit && (
                      <WorkSwitch
                        projectId={project.id}
                        workUnit={project.workUnit}
                        setWorkUnit={(wu) => setWorkUnit(project.id, wu)}
                      />
                    )}
                  </td>
                </tr>
                <tr className={classNames({ 'is-hidden': !folds[project.id] })}>
                  <td />
                  <td colSpan="4">
                    {folds[project.id] && (
                      <WorkUnits project={project} onChange={fetchProjects} />
                    )}
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </Content>
  );
};

export default ProjectsTable;
