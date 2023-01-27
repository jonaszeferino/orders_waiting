import { useState } from "react";
import styles from "../styles/Home.module.css";
import ErrorPage from "./error-page";
import { format, differenceInDays } from "date-fns";

export default function Reservations() {
  let [reservationStock, setReservationStock] = useState([]);
  let [reservationUser, setReservationUser] = useState();
  let [reservationBasic, setReservationBasic] = useState();
  let [isError, setError] = useState(false);

  const apiCall = (event) => {
    const url = `https://hub.omniplat.io/v1/clients/${reservationUser}/reservations/unfinished`;

    fetch(url, {
      headers: new Headers({
        Authorization: process.env.NEXT_PUBLIC_LE_AUTH,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Dados Incorretos");
        }
      })
      .then((result) => setReservationStock(result))
      .catch((error) => setError(true));
  };

  return (
    <div>
      <h3 className={styles.title}>Minhas Reservas</h3>
      <h2 className={styles.grid}>
        {" "}
        <br />
        <label type="text">
          Client:
          <input
            className={styles.card}
            required={true}
            type="text"
            value={reservationUser}
            onChange={(event) => setReservationUser(event.target.value)}
          ></input>
        </label>
        <button className={styles.card} onClick={apiCall}>
          Verificar
        </button>
      </h2>

      {/* If ternário abaixo, dentro do HTML única forma de fazer */}

      {isError === true ? (
        <ErrorPage message={`Verifique as Credenciais`}></ErrorPage>
      ) : (
        <div className={styles.grid}>
          {reservationStock.map((reserve) => {
            const isOutdated =
              differenceInDays(new Date(), new Date(reserve.createdAt)) > 10;
            return (
              <div className={styles.card} key={reserve.id}>
                <span>Cliente: {reserve.clientId}</span> <br />
                <span>Canal: {reserve.channelId}</span> <br />
                <span>Location: {reserve.locationId}</span> <br />
                <span>Sku: {reserve.skuId}</span> <br />
                <span>Pedido: {reserve.orderId}</span> <br />
                <span>Quantidade: {reserve.quantity}</span> <br />
                <span>
                  Data:{" "}
                  {format(new Date(reserve.createdAt), "dd/MM/yyyy HH:mm:ss")}
                </span>
                <br />
                <span>
                  Dias Nesse Status:{" "}
                  <strong>
                    {" "}
                    {differenceInDays(new Date(), new Date(reserve.createdAt))}
                  </strong>
                </span>
                {"  "}-
                {isOutdated && (
                  <span style={{ color: "red", font: "bold" }}>
                    {`Reserva parada a ${differenceInDays(
                      new Date(),
                      new Date(reserve.createdAt)
                    )} dias`}
                  </span>
                )}
                <br />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
