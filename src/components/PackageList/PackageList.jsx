import React from 'react';
import p1 from '../../assets/pexels-pixabay-48148.jpg';
import p2 from '../../assets/fundamenty_gotowe.jpg';
import p3 from '../../assets/image.webp';
import p4 from '../../assets/maxresdefault.jpg';
import p5 from '../../assets/pexels-asphotography-101808.jpg';
import p6 from '../../assets/Tarasola_Essential_high_res-29.webp';
import p7 from '../../assets/gf-ZQ3b-fUVu-vFmq_szambo-1920x1080-nocrop.jpg';
import PackageCard from '../PackageCard/PackageCard';

const PackageList = ({ selectedPackages, selectPackage }) => {
  return (
    <div className="packages-section">
      <div className="packages-container">
        <PackageCard
          title="Pakiet Formalności zgłoszenia i pozwolenia na budowę"
          vat="VAT 23%"
          image={p1}
          category="formalities"
          options={[
            { id: 'formal-1', name: "Zgłoszenie Budynku Rekreacji Indywidualnej", price: "4 420" },
            { id: 'formal-2', name: "Zgłoszenie budynku Mieszkalnego lub Pozwolenie na budowę", price: "15 640" },
            { id: 'formal-3', name: "Formalność wykonam we własnym zakresie, kupuję tylko projekt", price: "8 113" },
          ]}
          selectedPackage={selectedPackages.formalities}
          onSelect={selectPackage}
        />

        <PackageCard
          title="Fundamenty"
          image={p2}
          category="foundation"
          options={[
            { id: 'foundation', name: "Ocieplona, zbrojona płyta fundamentowa", price: "26 792" },
          ]}
          selectedPackage={selectedPackages.foundation}
          onSelect={selectPackage}
        />

        <PackageCard
          title="Instalacje Sanitarne i Elektryczne"
          image={p3}
          category="utilities"
          options={[
            { id: 'utilities', name: "Pakiet Instalacje Sanitarne i Elektryczne", price: "18 990" },
          ]}
          selectedPackage={selectedPackages.utilities}
          onSelect={selectPackage}
        />

        <PackageCard
          title="Dach i Sufity"
          image={p4}
          category="roofing"
          options={[
            { id: 'roofing', name: "Pakiet Obróbki Blacharskie, Ocieplenie Sufitu, Płyty G-K Sufit", price: "18 990" },
          ]}
          selectedPackage={selectedPackages.roofing}
          onSelect={selectPackage}
        />

        <PackageCard
          title="Wykończenie pod klucz"
          image={p5}
          category="turnkey"
          options={[
            { id: 'turnkey', name: "Kompletne wykończenie pod klucz", price: "39 390" },
          ]}
          selectedPackage={selectedPackages.turnkey}
          onSelect={selectPackage}
        />

        <PackageCard
          title="Taras i Oświetlenie"
          image={p6}
          category="terrace"
          options={[
            { id: 'terrace', name: "Pakiet Taras i Oświetlenie Zewnętrzne", price: "19 675" },
          ]}
          selectedPackage={selectedPackages.terrace}
          onSelect={selectPackage}
        />

        <PackageCard
          title="Pakiet Sanitarny"
          image={p7}
          category="sanitary"
          options={[
            { id: 'sanitary', name: "Szambo 10 m³ lub oczyszczalnia", price: "17 680" },
          ]}
          selectedPackage={selectedPackages.sanitary}
          onSelect={selectPackage}
        />
      </div>
    </div>
  );
};

export default PackageList;