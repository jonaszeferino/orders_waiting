import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Quotation() {
  let [skuQuotationIcms, setSkuQuotationIcms] = useState(0);
  let [skuQuotationTotal, setSkuQuotationTotal] = useState(0);

  // gris adVAloren
  let [skuQuotationFactor, setSkuQuotationFactor] = useState(0);
  let [skuQuotationRowGrisValue, setSkuQuotationRowGrisValue] = useState(0);
  let [skuQuotationRowAdValorenValue, setSkuQuotationRowAdValorenValue] =
    useState(0);
  let [skuQuotationRowShhipingCost, setSkuQuotationRowShhipingCost] =
    useState(0);

  // Dimensões e produto
  let [skuQuotationPrice, setSkuQuotationPrice] = useState(0);
  let [skuQuotation, setSkuQuotation] = useState(0);
  let [skuQuotationQty, setSkuQuotationQty] = useState(0);
  let [skuQuotationWeight, setSkuQuotationWeight] = useState(0);
  let [skuQuotationHeight, setSkuQuotationHeight] = useState(0);
  let [skuQuotationWidth, setSkuQuotationWidth] = useState(0);
  let [skuQuotationLength, setSkuQuotationLength] = useState(0);
  let [skuQuotationVol, setSkuQuotationVol] = useState(0);

  let [volumeQuotation, setVolumeQuotation] = useState(0);
  let [gris, setGris] = useState(0);
  let [icmsS, setIcmsS] = useState(0);

  const apiCall = (event) => {

    //Cálculo 1
    const volume =
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

    setVolumeQuotation(volume);
    setSkuQuotationVol(better);
  };

    // Cálculo 2 

     const grisAdvaloren = (event) =>{
      (skuQuotationPrice *
        (skuQuotationRowGrisValue + skuQuotationRowAdValorenValue)) /
        100 +
      skuQuotationRowShhipingCost +
      skuQuotationFactor;

    setGris(grisAdvaloren);
      };
    // Cálculo 3

    const icms = (event) => {
      const calculatedIcms = (skuQuotationRowShhipingCost + gris) / (1 - skuQuotationIcms / 100);
      setIcmsS(calculatedIcms);
    };
    console.log(
      "frete: " +
        skuQuotationRowShhipingCost +
        " " +
        gris +
        " " +
        "valor calculado" +
        icmsS
    );
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
          onChange={(event) => setSkuQuotationWeight(event.target.value)}
        ></input>
      </label>
      <span> </span>
      <label type="text">
        Altura / mm
        <input
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationHeight}
          onChange={(event) => setSkuQuotationHeight(event.target.value)}
        ></input>
      </label>
      <label type="text">
        Comprimento / mm
        <input
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationWidth}
          onChange={(event) => setSkuQuotationWidth(event.target.value)}
        ></input>
      </label>
      <label type="text">
        Profundidade / mm
        <input
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationLength}
          onChange={(event) => setSkuQuotationLength(event.target.value)}
        ></input>
      </label>
      <label type="text">
        Fator Ex.: 167
        <input
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationFactor}
          onChange={(event) => setSkuQuotationFactor(event.target.value)}
        ></input>
      </label>
      <label type="text">
        Quantidade do SKU
        <input
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationQty}
          onChange={(event) => setSkuQuotationQty(event.target.value)}
        ></input>
      </label>
      <br />
      <h3> Qual o peso será usado: </h3>
      <span>{skuQuotationVol}</span>
      <h3> Como foi feito o cálculo: </h3>
      <span>
        {" "}
        volume = ( {skuQuotationHeight} / 1000) * ({skuQuotationWidth} / 1000) *
        ({skuQuotationLength} / 1000) * {skuQuotationFactor}
        <br /> Resultado: {volumeQuotation.toFixed(2)} kg
      </span>
      <h3> Dados:</h3>
      Verifique na tabela qual o valor da faixa de peso:{" "}
      {volumeQuotation.toFixed(2)} kg
      <label type="text">
        <input
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationRowShhipingCost}
          onChange={(event) =>
            setSkuQuotationRowShhipingCost(event.target.value)
          }
        ></input>
      </label>
      <h3>Dados para cálculo:</h3>
      <label type="text">
        Preço do Produto
        <input
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationPrice}
          onChange={(event) => setSkuQuotationPrice(event.target.value)}
        ></input>
      </label>
      <label type="text">
        Gris
        <input
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationRowGrisValue}
          onChange={(event) => setSkuQuotationRowGrisValue(event.target.value)}
        ></input>
      </label>
      <label type="text">
        Valoren Gris
        <input
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationRowAdValorenValue}
          onChange={(event) =>
            setSkuQuotationRowAdValorenValue(event.target.value)
          }
        ></input>
      </label>
      <br />
      <h3>Cálculo do ICMS</h3>
      <label type="text">
        Percentual de ICMS
        <input
          className={styles.card}
          required={true}
          type="number"
          value={skuQuotationIcms}
          onChange={(event) => setSkuQuotationIcms(event.target.value)}
        ></input>
      </label>
      <br />
      <span>Valor calculado do icms: {icmsS}</span>
      <br />
      <button className={styles.card} onClick={apiCall}>
        Verificar
      </button>
      <div>
        <span>total:{skuQuotationTotal} </span> <br />
        <span>volume:{volumeQuotation.toFixed(2) + " kg"} </span> <br />
        {/* <span>gris:{grisAdvaloren} </span> <br /> */}
        <span>imcs:{icmsS} </span> <br />
      </div>
    </div>
  );
}
