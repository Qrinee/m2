import React, { useState, useRef } from "react";

import { TABS } from './constans.js';
import "./styles.css";
import SuccessScreen from "../../views/SuccessScreen.jsx";
import TabPodstawowe from "./tabs/TabPodstawowe.jsx";
import TabZdjecia from "./tabs/TabZdjecia.jsx";
import TabLokalizacja from "./tabs/TabLokalizacja.jsx";
import TabSzczegoly from "./tabs/TabSzczegoly.jsx";
import TabDodatkowe from "./tabs/TabDodatkowe.jsx";
import TabPodsumowanie from "./tabs/TabPodsumowanie.jsx";
import { useFormData } from "../../hooks/useFormData.js";
import { useFileUpload } from "../../hooks/useFileUpload.js";

export default function Add() {
  const [active, setActive] = useState("podstawowe");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedProperty, setSubmittedProperty] = useState(null);

  const { formData, updateField, resetForm } = useFormData();
  const { files, addFiles, toggleCover, removeFile, resetFiles } = useFileUpload();

  const tabClickAllowed = false;
  const dropRef = useRef();

  
  const isPositiveNumber = (v) => {
    if (v === null || v === undefined || v === "") return false;
    const n = Number(String(v).replace(",", "."));
    return !Number.isNaN(n) && n >= 0;
  };

  const isPositiveInteger = (v) => {
    if (v === null || v === undefined || v === "") return false;
    const n = Number(v);
    return Number.isInteger(n) && n > 0;
  };

  const validateTab = (tabId) => {
    switch (tabId) {
      case "podstawowe":
        if (!formData.tytul.trim()) {
          alert("Wypełnij pole: Tytuł ogłoszenia (wymagane).");
          return false;
        }
        if (!formData.cena.calkowita || !isPositiveNumber(formData.cena.calkowita)) {
          alert("Podaj poprawną cenę całkowitą.");
          return false;
        }
        if (!formData.rodzajOferty.typ) {
          alert("Wybierz rodzaj oferty.");
          return false;
        }
        if (!formData.typNieruchomosci) {
          alert("Wybierz typ nieruchomości.");
          return false;
        }
        return true;

      case "lokalizacja":
        if (!formData.lokalizacja.miasto.trim()) {
          alert("Wypełnij pole: Miasto (wymagane).");
          return false;
        }
        if (!formData.lokalizacja.wojewodztwo.trim()) {
          alert("Wypełnij pole: Województwo (wymagane).");
          return false;
        }
        return true;

      case "szczegoly":
        if (!formData.powierzchnia.calkowita || !isPositiveNumber(formData.powierzchnia.calkowita)) {
          alert("Podaj poprawną powierzchnię całkowitą.");
          return false;
        }
        if (!formData.pomieszczenia.pokoje || !isPositiveInteger(formData.pomieszczenia.pokoje)) {
          alert("Podaj poprawną liczbę pokoi.");
          return false;
        }
        if (!formData.pomieszczenia.lazienki || !isPositiveInteger(formData.pomieszczenia.lazienki)) {
          alert("Podaj poprawną liczbę łazienek.");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const next = () => {
    if (!validateTab(active)) return;

    const idx = TABS.findIndex((t) => t.id === active);
    if (idx < TABS.length - 1) {
      setActive(TABS[idx + 1].id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const back = () => {
    const idx = TABS.findIndex((t) => t.id === active);
    if (idx > 0) setActive(TABS[idx - 1].id);
  };

  
  const onDropFiles = (e) => {
    e.preventDefault();
    if (e.dataTransfer?.files) addFiles(e.dataTransfer.files);
    if (dropRef.current) dropRef.current.classList.remove("dragover");
  };
  
  const onDragOver = (e) => {
    e.preventDefault();
    if (dropRef.current) dropRef.current.classList.add("dragover");
  };
  
  const onDragLeave = () => {
    if (dropRef.current) dropRef.current.classList.remove("dragover");
  };
  
  const onFileInputChange = (e) => {
    addFiles(e.target.files);
    e.target.value = null;
  };

  




const submitAll = async () => {
  if (!validateTab("szczegoly")) return;

  setIsSubmitting(true);
  setSubmitError(null);

  try {
    const formDataToSend = new FormData();
    
    
    formDataToSend.append('tytul', formData.tytul);
    formDataToSend.append('opis', formData.opis);
    formDataToSend.append('cena', JSON.stringify(formData.cena));
    formDataToSend.append('rodzajOferty', JSON.stringify(formData.rodzajOferty));
    formDataToSend.append('typNieruchomosci', formData.typNieruchomosci);
    formDataToSend.append('lokalizacja', JSON.stringify(formData.lokalizacja));
    formDataToSend.append('powierzchnia', JSON.stringify(formData.powierzchnia));
    formDataToSend.append('pomieszczenia', JSON.stringify(formData.pomieszczenia));
    formDataToSend.append('budynek', JSON.stringify(formData.budynek));
    formDataToSend.append('pietro', JSON.stringify(formData.pietro));
    formDataToSend.append('udogodnienia', JSON.stringify(formData.udogodnienia));
    formDataToSend.append('informacjePrawne', JSON.stringify(formData.informacjePrawne));
    formDataToSend.append('dodatkoweInformacje', formData.dodatkoweInformacje);

    
    formDataToSend.append('promocje', JSON.stringify({
      standard: true, 
      
      
    }));

    
    files.forEach(file => {
      formDataToSend.append('files', file.file);
    });

    const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/properties`, {
      method: 'POST',
      body: formDataToSend,
      credentials: 'include'
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || `Błąd HTTP: ${response.status}`);
    }

    
    if (result.paymentUrl) {
      
      window.location.href = result.paymentUrl;
      return; 
    }

    
    setSubmittedProperty({
      tytul: formData.tytul,
      lokalizacja: `${formData.lokalizacja.miasto}, ${formData.lokalizacja.wojewodztwo}`,
      cena: formData.cena.calkowita,
      id: result.property?._id
    });
    
    setSubmitSuccess(true);
    
  } catch (error) {
    setSubmitError(error.message);
  } finally {
    setIsSubmitting(false);
  }
};
  const handleResetForm = () => {
    resetForm();
    resetFiles();
    setActive("podstawowe");
    setSubmitSuccess(false);
    setSubmitError(null);
    setSubmittedProperty(null);
  };

  const addAnotherProperty = () => {
    handleResetForm();
  };

  
  if (submitSuccess) {
    return (
      <div className="page">
        <div className="card">
          <SuccessScreen
            submittedProperty={submittedProperty}
            onAddAnother={addAnotherProperty}
            onViewMyProperties={() => window.location.href = '/moje-nieruchomosci'}
            onViewProperty={(id) => window.open(`/ogloszenie/${id}`, '_blank')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="page">

      <div className="card">

        <div className="tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab-trigger ${active === t.id ? "active" : ""}`}
              onClick={(e) => {
                if (tabClickAllowed) setActive(t.id);
                else e.preventDefault();
              }}
              aria-selected={active === t.id}
              role="tab"
              id={`tab-${t.id}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="tab-panel">
          {active === "podstawowe" && (
            <TabPodstawowe 
              value={formData} 
              updateField={updateField} 
              onNext={next} 
            />
          )}
          {active === "zdjecia" && (
            <TabZdjecia
              files={files}
              dropRef={dropRef}
              onDropFiles={onDropFiles}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onFileInputChange={onFileInputChange}
              toggleCover={toggleCover}
              removeFile={removeFile}
              onNext={next}
              onBack={back}
            />
          )}
          {active === "lokalizacja" && (
            <TabLokalizacja
              value={formData}
              updateField={updateField}
              onNext={next}
              onBack={back}
            />
          )}
          {active === "szczegoly" && (
            <TabSzczegoly
              value={formData}
              updateField={updateField}
              onNext={next}
              onBack={back}
            />
          )}
          {active === "dodatkowe" && (
            <TabDodatkowe
              value={formData}
              updateField={updateField}
              onNext={next}
              onBack={back}
            />
          )}
          {active === "podsumowanie" && (
            <TabPodsumowanie
              formData={formData}
              files={files}
              onBack={back}
              onSubmit={submitAll}
              isSubmitting={isSubmitting}
              submitError={submitError}
            />
          )}
        </div>
      </div>
    </div>
  );
}