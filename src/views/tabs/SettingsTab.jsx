// src/components/MojProfil/tabs/SettingsTab.js
import React from 'react';

export default function SettingsTab() {
  return (
    <div className="mp-tab-content">
      <h2 className="mp-tab-title">Ustawienia konta</h2>
      <div className="mp-settings">
        <div className="mp-settings-group">
          <h3 className="mp-settings-group__title">Powiadomienia</h3>
          <div className="mp-settings-item">
            <label className="mp-settings-item__label">
              <input type="checkbox" defaultChecked className="mp-settings-item__checkbox" />
              Powiadomienia email
            </label>
          </div>
          <div className="mp-settings-item">
            <label className="mp-settings-item__label">
              <input type="checkbox" defaultChecked className="mp-settings-item__checkbox" />
              Powiadomienia o nowych ofertach
            </label>
          </div>
        </div>
        
        <div className="mp-settings-group">
          <h3 className="mp-settings-group__title">Prywatność</h3>
          <div className="mp-settings-item">
            <label className="mp-settings-item__label">
              <input type="checkbox" defaultChecked className="mp-settings-item__checkbox" />
              Publiczny profil
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}