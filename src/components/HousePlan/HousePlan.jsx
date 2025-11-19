import React, { useState } from 'react';
import { floorPlans, getFloorPlans } from '../../utils/floorPlans';
import './HousePlan.css';

const HousePlan = ({ houseid }) => {
  const [activeTab, setActiveTab] = useState('parter');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Pobierz plany dla konkretnego domu
  const housePlans = getFloorPlans(houseid);
  const plan = housePlans[activeTab];

  // Sprawdź czy dom ma poddasze
  const hasPoddasze = housePlans.poddasze !== undefined;

  const totalArea = plan.rooms.reduce((sum, room) => sum + room.area, 0);

  return (
    <div className='cdf'>
      <div className="floor-plan-container">
        <div className="tabs">
          <button
            className={activeTab === 'parter' ? 'active' : ''}
            onClick={() => handleTabClick('parter')}
          >
            Rzut parteru
          </button>
          {hasPoddasze && (
            <button
              className={activeTab === 'poddasze' ? 'active' : ''}
              onClick={() => handleTabClick('poddasze')}
            >
              Rzut poddasza
            </button>
          )}
        </div>
        <div className="content">
          <div className="plan-image">
            <img src={plan.image} alt={`Rzut ${activeTab}`} />
          </div>
          <div className="plan-table">
            <table>
              <thead>
                <tr>
                  <th>Pomieszczenie</th>
                  <th>Powierzchnia [m²]</th>
                </tr>
              </thead>
              <tbody>
                {plan.rooms.map((room, index) => (
                  <tr key={index}>
                    <td>{room.name}</td>
                    <td>{room.area.toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="total">
                  <td>Łącznie</td>
                  <td>{totalArea.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HousePlan;