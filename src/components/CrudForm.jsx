import React, { useState, useEffect } from "react";

const CrudForm = () => {
  const [cartData, setCartData] = useState({
    id: "",
    Product_name: "",
    Address: "",
    Owner_name: "",
    Quantity: "",
  });

  const [cartAllData, setCartAllData] = useState([]);
  const [error, setError] = useState("");
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  useEffect(() => {}, [cartData, cartAllData, editIndex]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCartData((prevState) => ({
      ...prevState,
      [name]: value,
      id: prevState.id || Date.now(),
    }));
  };

  const handleEdit = (id, index) => {
    const cartDataEdit = cartAllData.find((item) => item.id == id);
    setEditIndex(index);

    setEdit(true);

    setCartData({
      id: id,
      Product_name: cartDataEdit.Product_name,
      Address: cartDataEdit.Address,
      Owner_name: cartDataEdit.Owner_name,
      Quantity: cartDataEdit.Quantity,
    });
  };

  const handleDelete = (id) => {
    const cartDataDelete = cartAllData.filter((item) => item.id !== id);
    setCartAllData(cartDataDelete);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { Product_name, Address, Owner_name, Quantity } = cartData;

    if (
      Product_name.trim() === "" ||
      Address.trim() === "" ||
      Owner_name.trim() === "" ||
      Quantity.trim() === ""
    ) {
      setError("Please fill all the fields");
      return;
    }

    if (edit) {
      // Create a copy of the array and update the item at the specific index
      const updatedData = [...cartAllData];
      updatedData[editIndex] = { ...cartData };
      setCartAllData(updatedData);
      setEdit(false);
      setEditIndex(null);
    } else {
      setCartAllData([...cartAllData, { ...cartData }]);
    }

    // Reset form and clear error message
    setCartData({
      id: "",
      Product_name: "",
      Address: "",
      Owner_name: "",
      Quantity: "",
    });
    setError("");
  };

  return (
    <div>
      <form>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-6 col-lg-6">
            <input
              type="text"
              className="login"
              name="Product_name"
              placeholder="Product Name"
              value={cartData.Product_name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6">
            <input
              type="text"
              className="login"
              name="Address"
              placeholder="Address"
              value={cartData.Address}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6">
            <input
              type="text"
              className="login"
              name="Owner_name"
              placeholder="Owner Name"
              value={cartData.Owner_name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6">
            <input
              type="number"
              className="login"
              name="Quantity"
              placeholder="Quantity"
              value={cartData.Quantity}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6">
            <button className="submitButton" onClick={(e) => handleSubmit(e)}>
              {edit ? "Edit" : "Submit"}
            </button>
          </div>
        </div>
      </form>
      <div>
        {cartAllData && (
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Product Name</th>
                <th>Address</th>
                <th>Owner Name</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartAllData &&
                cartAllData.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <th>{index + 1}</th>
                      <th>{item.Product_name}</th>
                      <th>{item.Address}</th>
                      <th>{item.Owner_name}</th>
                      <th>{item.Quantity}</th>
                      <th>
                        <div>
                          <button
                            className="editButton"
                            onClick={() => handleEdit(item.id, index)}
                          >
                            Edit
                          </button>
                          <button
                            className="deleteButton"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CrudForm;
