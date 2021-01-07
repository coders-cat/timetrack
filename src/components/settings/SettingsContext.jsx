import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import db from '../../db/db';

const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    const fetchSettings = async () => {
      setSettings(await db.settings.toArray());
    };
    fetchSettings();
  }, []);

  const updateSetting = async (setting) => {
    await db.settings.update(setting.id, setting);
    setSettings(await db.settings.toArray());
  };

  const getSetting = async (key) => db.settings.get({ key });

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        getSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const SettingsConsumer = SettingsContext.Consumer;

export { SettingsContext, SettingsProvider, SettingsConsumer };

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
