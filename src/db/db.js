import Dexie from 'dexie';

const db = new Dexie('timetracker');

db.version(1).stores({
  settings: '++id, &key, name, value, type',
  projects: '++id, client, name, &[client+name]',
  workunits:
    '++id, projectId, startTime, endTime, [projectId+endTime], [projectId+startTime+endTime]'
});

db.on('populate', () => {
  db.settings.add({ key: 'startDate', name: 'Start Date', value: new Date(), type: 'date' });
  db.settings.add({
    key: 'endDate',
    name: 'End date',
    value: (() => {
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      return date;
    })(),
    type: 'date'
  });
  db.settings.add({ key: 'showHidden', name: 'Show hidden', value: false, type: 'bool' });
});

export default db;
