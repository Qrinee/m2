import React, { useState } from 'react'
import vis from '../../assets/konfigurator/stock.png'
import './VisualConfigurator.css'
import blachanarabek from '../../assets/konfigurator/tynk/blachanarabek.png'
import tynkiblacha from '../../assets/konfigurator/tynk/tynkiblacha.png'
import tynkmineralny from '../../assets/konfigurator/tynk/tynkmineralny.png'


import oknoAntracyt from '../../assets/konfigurator/okna/antracyt.png'

import oknoBiale from '../../assets/konfigurator/okna/biale.png'
import oknoDab from '../../assets/konfigurator/okna/dab.png'
import oknoOrzech from '../../assets/konfigurator/okna/orzech.png'
import oknoSzary from '../../assets/konfigurator/okna/szary.png'
import roletyImg from '../../assets/konfigurator/rolety/rolety.png'

import wlasne from '../../assets/konfigurator/drzwi/dzrwi0.png'
import drzwi11S3 from '../../assets/konfigurator/drzwi/dzrwi11s3.png'
import drzwiP9 from '../../assets/konfigurator/drzwi/dzrwip9.png'
import drzwi14A from '../../assets/konfigurator/drzwi/dzrwi14a.png'

import dach from '../../assets/konfigurator/dach.png'

import light from '../../assets/light.png'

import lamele from '../../assets/konfigurator/tynk/lamele.png'

export default function VisualConfigurator() {
    const [tynk, setTynk] = useState(0)
    const [rolety, setRolety] = useState(0)
    const [okna, setOkna] = useState(0)
    const [drzwi, setDrzwi] = useState(0)

    return (
        <div className="visual-configurator-page">
            <div className="sticky-visualization">
                <div className='vis-overlay'>
                    <div className='element-pickable rolety'>
                        <img src={light} alt="Light" />
                    </div>
                     <div className='element-pickable rolety'>
                                <img src={dach} alt="Rolety" />
                    </div>
                    {rolety === 1 && (
                            <div className='element-pickable rolety'>
                                <img src={roletyImg} alt="Rolety" />
                            </div>
                    )}
                    {okna === 1 && (
                            <div className='element-pickable okna'>
                                <img src={oknoAntracyt} alt="Okna Antracyt" />
                            </div>
                    )}
                    {okna === 2 && (
                            <div className='element-pickable'>
                                <img src={oknoSzary} alt="Okna Szary" />
                            </div>
                    )}
                    {okna === 3 && (
                            <div className='element-pickable'>
                                <img src={oknoDab} alt="Okna Dąb" />
                            </div>
                    )}
                    {okna === 4 && (
                            <div className='element-pickable'>
                                <img src={oknoOrzech} alt="Okna Orzech" />
                            </div>
                    )}
                    {okna === 5 && (
                            <div className='element-pickable'>
                                <img src={oknoBiale} alt="Okna Białe" />
                            </div>
                    )}
                    {drzwi === 1 && (
                        <div className='element-pickable'>
                            <img src={drzwi11S3} alt="Drzwi Model 11S3" />
                        </div>
                    )}
                    {drzwi === 2 && (   
                        <div className='element-pickable'>
                            <img src={drzwiP9} alt="Drzwi Model P9" />
                        </div>
                    )}
                    {drzwi === 3 && (
                        <div className='element-pickable'>
                            <img src={drzwi14A} alt="Drzwi Model 11S3" />
                        </div>
                    )}
                    
                    {drzwi === 4 && (
                        <div className='element-pickable'>
                            <img src={wlasne} alt="Drzwi Model 11S3" />
                        </div>
                    )}
                    

                    {tynk === 1 && (
                        <div className='element-pickable'>
                            <img src={blachanarabek} alt="Blacha na rąbek" />
                        </div>
                    )}
                    {tynk === 2 && (
                        <div className='element-pickable'>
                            <img src={tynkiblacha} alt="Tynk i blacha" />
                        </div>
                    )}
                    {tynk === 3 && (
                        <div className='element-pickable'>
                            <img src={tynkmineralny} alt="Tynk mineralny" />
                        </div>
                    )}
                    {tynk === 4 && (
                        <div className='element-pickable'>
                            <img src={lamele} alt="Lamele" />
                        </div>
                    )}




                </div>
                <img src={vis} alt="Visual Configurator" className="base-image" />
            </div>

            <div className="config-container">
                <div className="config-content">
                    <div className="config-section">
                        <h3>Tynk</h3>
                        <div className="option-grid">
                            <div 
                                className={`option-tile ${tynk === 0 ? 'active' : ''}`}
                                onClick={() => setTynk(0)}
                            >
                                <div className="tile-preview"></div>
                                <span>Elewacja surowa</span>
                            </div>
                            <div 
                                className={`option-tile ${tynk === 1 ? 'active' : ''}`}
                                onClick={() => setTynk(1)}
                            >
                                <div className="tile-preview"></div>
                                <span>Blacha na rąbek</span>
                            </div>
                            <div 
                                className={`option-tile ${tynk === 2 ? 'active' : ''}`}
                                onClick={() => setTynk(2)}
                            >
                                <div className="tile-preview"></div>
                                <span>Tynk + blacha</span>
                            </div>
                            <div 
                                className={`option-tile ${tynk === 3 ? 'active' : ''}`}
                                onClick={() => setTynk(3)}
                            >
                                <div className="tile-preview"></div>
                                <span>Tynk mineralny</span>
                            </div>
                                                        <div 
                                className={`option-tile ${tynk === 4 ? 'active' : ''}`}
                                onClick={() => setTynk(4)}
                            >
                                <div className="tile-preview"></div>
                                <span>Lamele</span>
                            </div>
                        </div>
                    </div>

                    <div className="config-section">
                        <h3>Rolety</h3>
                        <div className="option-grid">
                            {['Brak', 'Standardowe'].map((typ, index) => (
                                <div 
                                    key={typ}
                                    className={`option-tile ${rolety === index ? 'active' : ''}`}
                                    onClick={() => setRolety(index)}
                                >
                                    <div className="tile-preview"></div>
                                    <span>{typ}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="config-section">
                        <h3>Okna</h3>
                        <div className="option-grid">
                            {['Antracyt', 'Szary', 'Dąb', 'Orzech', 'Biały'].map((kolor, index) => (
                                <div 
                                    key={kolor}
                                    className={`option-tile ${okna === index + 1 ? 'active' : ''}`}
                                    onClick={() => setOkna(index + 1)}
                                >
                                    <div className="tile-preview"></div>
                                    <span>{kolor}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="config-section">
                        <h3>Drzwi</h3>
                        <div className="option-grid">
                            {['Model 11S3', 'Model P9', 'Model 14A', 'Własne'].map((model, index) => (
                                <div 
                                    key={model}
                                    className={`option-tile ${drzwi === index + 1 ? 'active' : ''}`}
                                    onClick={() => setDrzwi(index + 1)}
                                >
                                    <div className="tile-preview"></div>
                                    <span>{model}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dodatkowa przestrzeń na dole */}
                    <div className="config-end">
                        <p>Koniec konfiguracji</p>
                    </div>
                </div>
            </div>
        </div>
    )
}