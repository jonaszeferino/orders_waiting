/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import React from "react";
import styles from "../styles/Home.module.css";
import { format, differenceInDays } from "date-fns";
import Link from "next/link";

export default function orders() {
  let [orderStock, setOrderStock] = useState([]);
  let [orderUser, setOrderUser] = useState();
  let [error, setError] = useState(null);
  let [dayNumber, setDaysNumber] = useState(null);

  const apiCall = (event) => {
    const url = `https://production-order.omniplat.io/v1/clients/${orderUser}/fulfillments/locations/190410/status/WAITING?page=1`;
    setError(null);

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
      .then((result) => setOrderStock(result))
      .catch((error) => setError(true));
  };

  return (
    <div>
      <h3 className={styles.title}>Pedidos Waiting</h3>
      <h2 className={styles.grid}>
        <br />
        <label type="text">
          Client:
          <input
            className={styles.card}
            required={true}
            type="text"
            value={orderUser}
            onChange={(event) => setOrderUser(event.target.value)}
          ></input>
        </label>

        <button className={styles.card} onClick={apiCall}>
          Verificar
        </button>
      </h2>

      <ul>
        {orderStock &&
          orderStock.data &&
          orderStock.data.length > 0 &&
          orderStock.data.map((orders) => {
            const isOutdated =
              differenceInDays(new Date(), new Date(orders.createdAt)) > 5;
            return (
              <li key={orders.orderId}>
                <span>
                  Pedido:
                  {orders.orderId}
                </span>
                <br />
                {isOutdated && (
                  <span style={{ color: "red" }}>
                    Pedido parado a mais de 5 dias
                  </span>
                )}
                <br />
                <span>
                  <Link
                    href={`https://oms.chaordic.com.br/deliveries/${orders.orderId}?channel=${orders.channelId}&fid=F1`}
                    target="_blank"
                  >
                    <span>
                      <strong>Link do Pedido</strong>
                    </span>
                  </Link>
                </span>
                <br />
                <span>
                  Data do Pedido:
                  {orders.createdAt.length > 0
                    ? format(new Date(orders.createdAt), " dd/MM/yyyy")
                    : ""}
                </span>
                <br />
                LocationId:
                <span>{orders.locationId}</span>
                <br />
                Canal:
                <span>{orders.channelId}</span>
                <br />
                <br />
                <br />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
