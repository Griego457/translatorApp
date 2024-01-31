import React, { useEffect, useState } from "react";
import Select from "react-select";
import api from "../api/api";
import "./home.css";

const Home = () => {
  const [optionDatas, setOptionDatas] = useState({});
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [textToTranslate, setTextToTranslate] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    api
      .get(`getLanguages`)
      .then((response) => {
        const options = response.data.data.languages.map((data) => {
          return {
            value: data.code,
            label: data.name,
          };
        });
        setOptionDatas(options);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const selectSourceLangauge = (event) => {
    setSourceLanguage(event.value);
  };
  const selectTargetLangauge = (event) => {
    setTargetLanguage(event.value);
  };

  const getTextToTranslate = (event) => {
    setTextToTranslate(event.target.value);
  };

  const translateText = () => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", sourceLanguage);
    encodedParams.set("target_language", targetLanguage);
    encodedParams.set("text", textToTranslate);
    api
      .post(`translate`, encodedParams)
      .then((response) => {
        setTranslatedText(response.data.data.translatedText);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <h1>Translator Online</h1>
      <div className="language-selector-container">
        <div className="language-selector-content">
          <Select
            className="language-select"
            onChange={(e) => selectSourceLangauge(e)}
            options={optionDatas}
          />
          <Select
            className="language-select"
            onChange={(e) => selectTargetLangauge(e)}
            options={optionDatas}
          />
        </div>
      </div>
      <div className="input-result-container">
        <div className="input-result-content">
          <div className="input input-container">
            <textarea
              className="input-result"
              name="postContent"
              placeholder="Put text you want to translate"
              rows={15}
              onChange={(e) => getTextToTranslate(e)}
            ></textarea>
          </div>
          <div className="input result-container">
            <textarea
              className="input-result"
              name="postContent1"
              placeholder="Translation"
              disabled={true}
              value={translatedText}
              rows={15}
            ></textarea>
          </div>
        </div>
      </div>
      <div>
        <button className="translate-button" onClick={translateText}>
          {" "}
          Translate
        </button>
      </div>
    </>
  );
};

export default Home;
