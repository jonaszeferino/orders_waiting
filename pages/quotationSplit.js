import React, { useState } from "react";
import styles from "../styles/Home.module.css";

const Quotation = () => {
  //fundamentais para o primeiro calculo
  const [skuQuotationWeight, setSkuQuotationWeight] = useState(0.5);
  const [skuQuotationHeight, setSkuQuotationHeight] = useState(290);
  const [skuQuotationWidth, setSkuQuotationWidth] = useState(380);
  const [skuQuotationLength, setSkuQuotationLength] = useState(140);
  const [skuQuotationFactor, setSkuQuotationFactor] = useState(167);
  const [skuQuotationVolumeCalculeted, setSkuQuotationVolumeCalculeted] =
    useState(0);
  const [skuQuotationBetter, setSkuQuotationBetter] = useState();
  //fundamentais para o segundo calculo:
  const [skuQuotationGris, setSkuQuotationGris] = useState(0);
  const [skuQuotationPrice, setSkuQuotationPrice] = useState(259);
  const [skuGrisCalculated, setSkuGrisCalculated] = useState(0);
  const [skuQuotationRowGrisValue, setSkuQuotationRowGrisValue] = useState(0.6);
  const [skuQuotationRowAdValorenValue, setSkuQuotationRowAdValorenValue] =
    useState(0);
  const [skuQuotationRowShhipingCost, setSkuQuotationRowShhipingCost] =
    useState(14);
  //erros state
  const [errorMessage, setErrorMessage] = useState("");

  // funcões:
  // volume
  const calculosOne = () => {
    let volume =
      (skuQuotationHeight / 1000) *
      (skuQuotationWidth / 1000) *
      (skuQuotationLength / 1000) *
      skuQuotationFactor;

    let better;
    if (volume > skuQuotationWeight) {
      better = `Será utilizado o peso cúbico: ${volume.toFixed(
        2
      )} kg, pois ele é maior que o peso real: ${skuQuotationWeight} kg `;
    } else {
      better = `Será utilizado o peso Real: ${skuQuotationWeight} kg, pois ele é maior que o volor cúbico: ${volume.toFixed(
        2
      )} kg`;
    }

    setSkuQuotationVolumeCalculeted(volume);
    setSkuQuotationBetter(better);

    return;
  };

  const calculosTwo = () => {
    let grisCalculos =
      (skuQuotationPrice *
        (skuQuotationRowGrisValue + skuQuotationRowAdValorenValue)) /
        100 +
      skuQuotationRowShhipingCost +
      skuQuotationFactor;

    let grisFloat =
      typeof grisCalculos === "number" ? grisCalculos.toFixed(2) : grisCalculos;
    setSkuGrisCalculated(grisFloat);

    console.log(
      "Pq essa bost nao ta como numero?  " +
        skuQuotationRowShhipingCost +
        " total: " +
        grisFloat
    );

    return;
  };

  const calculosThree = () => {
    // implementation for handling width calculation
  };

  const clean = () => {
    setSkuQuotationWeight(0);
    setSkuQuotationHeight(0);
    setSkuQuotationWidth(0);
    setSkuQuotationLength(0);
    setSkuQuotationFactor(0);
    setSkuQuotationVolumeCalculeted(0);
    setSkuQuotationBetter(0);
    setSkuQuotationPrice(0);
    setSkuGrisCalculated(0);
    setSkuQuotationRowGrisValue(0);
    setSkuQuotationRowAdValorenValue(0);
    setSkuQuotationRowShhipingCost(0);
    setErrorMessage(0);
  };

  return (
    <div>
      <h3>Dimensões do Produto:</h3>
      <label type="text">
        Peso em kg
        <input
          placeholder={"0.5"}
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationWeight}
          onChange={(event) => {
            if (!isNaN(event.target.value)) {
              setSkuQuotationWeight(event.target.value);
              setErrorMessage("");
            } else {
              setErrorMessage("O valor digitado não é um número válido.");
            }
          }}
        />
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </label>
      <label type="text">
        Altura em cm
        <input
          placeholder={"10"}
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationHeight}
          onChange={(event) => setSkuQuotationHeight(event.target.value)}
        />
      </label>
      <label type="text">
        Largura em cm
        <input
          placeholder={"20"}
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationWidth}
          onChange={(event) => setSkuQuotationWidth(event.target.value)}
        />
      </label>
      <label type="text">
        Profundidade em cm
        <input
          placeholder={"20"}
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationLength}
          onChange={(event) => setSkuQuotationLength(event.target.value)}
        />
      </label>
      <br />

      <label type="text">
        Fator de Cubagem
        <input
          placeholder={"167"}
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationFactor}
          onChange={(event) => setSkuQuotationFactor(event.target.value)}
        />
      </label>

      <div>
        <h3>Qual o volume calculado:</h3>
        <span>Volume: {skuQuotationVolumeCalculeted.toFixed(2)} kg </span>
        <h3>Como foi feito o Cálculo:</h3>
        {skuQuotationBetter}
        <h3>
          Agora para verificar o calculo do Gris, pegue os seguintes dados:
        </h3>
        <span>bla bla bla</span> <br />
        <span>
          <label type="text">
            Preço de venda do SKU
            <input
              className={styles.card}
              required={true}
              type="number"
              value={skuQuotationPrice}
              onChange={(event) => setSkuQuotationPrice(event.target.value)}
            />
          </label>
          <label type="text">
            Constante do Gris
            <input
              className={styles.card}
              required={true}
              type="number"
              value={skuQuotationRowGrisValue}
              onChange={(event) =>
                setSkuQuotationRowGrisValue(event.target.value)
              }
            />
          </label>
          <label type="text">
            Constante do AdValoren
            <input
              className={styles.card}
              required={true}
              type="number"
              value={skuQuotationRowAdValorenValue}
              onChange={(event) =>
                setSkuQuotationRowAdValorenValue(event.target.value)
              }
            />
          </label>
          <br />
          <span>
            No valor a seguire, verifique no OMS a tabela de frete na faixa de
            peso de: <strong>{skuQuotationVolumeCalculeted.toFixed(2)}</strong>{" "}
            kg.
          </span>
          <br />
          <label type="text">
            Valor da faixa de peso na tabela de frete:
            <input
              className={styles.card}
              required={true}
              type="number"
              value={skuQuotationRowShhipingCost}
              onChange={(event) =>
                setSkuQuotationRowShhipingCost(event.target.value)
              }
            />
          </label>
          <br />
        </span>
        <span>Valor calculado do Gris foi: {skuGrisCalculated} </span>
      </div>

      <button className={styles.card} onClick={calculosOne}>
        Calcular Volume / Peso Cúbico
      </button>
      <button className={styles.card} onClick={calculosTwo}>
        Calcular Gris e AdValuren
      </button>
      <button className={styles.card} onClick={calculosThree}>
        Calcular 3
      </button>
      <br />
      <button className={styles.card} onClick={clean}>
        Limpar dados
      </button>
    </div>
  );
};

export default Quotation;
