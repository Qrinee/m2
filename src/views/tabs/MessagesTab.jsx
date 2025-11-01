// src/components/MojProfil/tabs/MessagesTab.js
import React from 'react';
import { FaInbox } from 'react-icons/fa';

export default function MessagesTab() {
  return (
    <div className="mp-tab-content">
      <h2 className="mp-tab-title">Skrzynka pocztowa</h2>
      <div className="mp-messages">
        <div className="mp-messages-empty">
          <FaInbox className="mp-messages-empty__icon" />
          <h3>Brak wiadomości</h3>
          <p>Twoja skrzynka pocztowa jest pusta</p>
        </div>
      </div>
    </div>
  );
}