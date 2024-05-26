import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { GrUpdate } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";
import UpdateProduct from "./UpdateProduct";
import CreateItem from "./CreateItem";

const AdminStyles = styled.div`
  .admin-ctnr {
    padding: 70px 100px;
    background-color: white;
  }

  .admin-pnl-ttl {
    font-family: "URW DIN Cond", Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 2.5rem;
    padding-bottom: 20px;
  }

  .categories {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: "URW DIN SemiCond", Arial, Helvetica, sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
  }
  .leftsd {
    display: flex;
    flex-direction: row;
  }
  .box {
    height: 60px;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 0 40px;
  }

  .box:hover {
    box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px;
    background-color: rgb(250, 250, 250);
    cursor: pointer;
  }

  hr {
    margin-bottom: 30px;
    height: 3px;
    background-color: gray;
  }

  .data-table {
    border-collapse: collapse;
    width: 100%;
    font-size: medium;
  }

  tbody {
    overflow-y: scroll;
    max-height: 700px;
    display: block;
  }
  thead {
    width: 100%;
  }
  tbody::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  tbody::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background: gray;
  }
  tbody::-webkit-scrollbar-thumb {
    height: 20px;
    background: black;
  }
  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  .data-table td,
  .data-table th {
    padding: 8px;
    text-align: center;
    font-size: 1rem;
  }
  div > img {
    width: 100%;
    height: 160px;
    object-fit: contain;
  }

  .img-ctnr {
    min-width: 150px;
    min-height: 150px;
    display: inline-block;
  }

  th .data-img {
  }
  .data-img {
    display: flex;
    align-items: center;
  }

  .bright {
    filter: brightness(50%);
  }
`;

const transNum = (number) => {
  const options = {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return "PLN " + number.toLocaleString("en-US", options);
};

const UsersDisplay = (props) => {
  return (
    <AdminStyles>
      <div>
        <table className="data-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>COUNTRY</th>
              <th>POSTCODE</th>
            </tr>
          </thead>

          <tbody>
            {props.users?.map((user, key) => (
              <tr key={key}>
                <th>{user.userFirstName + " " + user.userLastName}</th>
                <th>{user.userEmail}</th>
                <th>{user.userCountry}</th>
                <th>{user.userZip}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminStyles>
  );
};

const OrdersDisplay = (props) => {
  return (
    <AdminStyles>
      <div>
        <table className="data-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>COLOR</th>
              <th>SIZE</th>
              <th>USER</th>
            </tr>
          </thead>

          <tbody>
            {props.orders?.map((order, key) => (
              <tr key={key}>
                <th>{order.name}</th>
                <th>{transNum(order.price)}</th>
                <th>{order.quantity}</th>
                <th>{order.color}</th>
                <th>{order.size}</th>
                <th>{order.userEmail}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminStyles>
  );
};

const ItemsDisplay = (props) => {
  const setUpdate = (item) => {
    props.other.showUpdate();
    localStorage.setItem("edititem", JSON.stringify(item));
    window.dispatchEvent(new Event("storage2"));
  };

  const DeleteItem = (item) => {
    axios
      .post("https://clothingbrandbackend.onrender.com/deleteProduct", item)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    props.getProducts();
  };

  return (
    <AdminStyles>
      <div>
        <table className="data-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>PRICE</th>
              <th>UPDATE ITEM</th>
              <th>REMOVE</th>
            </tr>
          </thead>
          <hr />
          <tbody>
            {props.items?.map((item, key) => (
              <tr key={key}>
                <th className="data-img">
                  <div className="img-ctnr">
                    <img src={item.path} alt="item-jpg" />
                  </div>
                  <th style={{ display: "inline-block", textAlign: "left" }}>
                    {item.name}
                  </th>
                </th>

                <th>{transNum(item.price)}</th>
                <th>
                  <GrUpdate
                    style={{ width: "25px", height: "25px", cursor: "pointer" }}
                    onClick={() => setUpdate(item)}
                  />
                  {props.other.isUpdate() ? (
                    <UpdateProduct {...props.other} />
                  ) : (
                    <div></div>
                  )}
                </th>
                <th>
                  <TiDeleteOutline
                    style={{ width: "40px", height: "40px", cursor: "pointer" }}
                    onClick={() => DeleteItem(item)}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminStyles>
  );
};

const AdminPanel = (props) => {
  const [users, setUsers] = useState();
  const [items, setItems] = useState();
  const [orders, setOrders] = useState();
  const [data, setData] = useState("users");

  useEffect(() => {
    console.log(data);
    axios
      .post("https://clothingbrandbackend.onrender.com/getUsers")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));

    getProducts();
    getOrders();
  }, [data]);

  const getProducts = () => {
    axios
      .post("https://clothingbrandbackend.onrender.com/getProducts")
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  };

  const getOrders = () => {
    axios
      .post("https://clothingbrandbackend.onrender.com/getOrders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  };

  const addItem = () => {
    props.showCreate();
  };

  return (
    <AdminStyles>
      <div>
        <div className="admin-ctnr">
          <div className="admin-pnl-ttl">
            <i>ADMIN PANEL</i>
          </div>
          <div className="categories">
            <div className="leftsd ">
              <div className="box" onClick={() => setData("users")}>
                VIEW USERS
              </div>
              <div className="box" onClick={() => setData("orders")}>
                VIEW ORDERS
              </div>
              <div className="box" onClick={() => setData("items")}>
                VIEW ITEMS
              </div>
            </div>
            <div className="rightsd">
              <div className="box" onClick={() => addItem()}>
                ADD ITEM
              </div>
            </div>
          </div>
          <hr />
          <div>
            {(() => {
              switch (data) {
                case "items":
                  return (
                    <ItemsDisplay
                      items={items}
                      getProducts={getProducts}
                      other={props}
                    />
                  );
                case "users":
                  return <UsersDisplay users={users} />;
                case "orders":
                  return <OrdersDisplay orders={orders} />;
                default:
                  return <ItemsDisplay items={items} other={props} />;
              }
            })()}
          </div>
        </div>
      </div>
    </AdminStyles>
  );
};

export default AdminPanel;
