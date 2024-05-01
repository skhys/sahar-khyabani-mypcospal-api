const knex = require("knex")(require("../knexfile"));
const index = async (_req, res) => {
  try {
    const inventoryItems = await knex
      .select(
        "inventories.id",
        "warehouses.warehouse_name",
        "item_name",
        "description",
        "category",
        "status",
        "quantity"
      )
      .from("inventories")
      .join("warehouses", "warehouses.id", "warehouse_id");

    res.status(200).json(inventoryItems);
  } catch (err) {
    res.status(400).send(`Error retrieving Inventory List Items: ${err}`);
  }
};

const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex("inventories")
      .where({ id: req.params.id })
      .delete();

    if (!rowsDeleted) {
      return res
        .status(404)
        .json({ message: `Inventory with ID ${req.params.id} not found` });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: `Unable to delete inventory: ${error}` });
  }
};

const findInventoryItem = async (req, res) => {
  try {
    const inventoryItemFound = await knex("inventories")
      .select(
        "inventories.id",
        "warehouses.warehouse_name",
        "item_name",
        "description",
        "category",
        "status",
        "quantity"
      )
      .join("warehouses", "warehouses.id", "inventories.warehouse_id")
      .where("inventories.id", req.params.id)
      .first();

    if (!inventoryItemFound) {
      return res.status(404).json({
        message: `Error retrieving Inventory item with ID ${req.params.id}.`,
      });
    }
    res.status(200).json(inventoryItemFound);
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong. Error ${error}`,
    });
  }
};

const edit = async (req, res) => {
  const { id } = req.params;
  const { warehouse_id, item_name, description, category, status, quantity } =
    req.body;

  if (
    !warehouse_id ||
    !item_name ||
    !description ||
    !category ||
    !status ||
    !quantity
  ) {
    return res.status(400).json({ error: "Unsuccessful. All fields required" });
  }

  const existingInventoryID = await knex("inventories").where({ id }).first();

  if (!existingInventoryID) {
    return res.status(404).json({ error: "Inventory ID not found" });
  }

  const existingWarehouseID = await knex("warehouses")
    .where({ id: warehouse_id })
    .first();

  if (!existingWarehouseID) {
    return res.status(400).json({ error: "Invalid Warehouse ID" });
  }

  if (isNaN(quantity)) {
    return res.status(400).json({ error: "Quantity must be a number" });
  }

  try {
    const parsedQuantity = parseInt(quantity);
    await knex("inventories").where({ id }).update({
      item_name,
      description,
      category,
      status,
      quantity: parsedQuantity,
      warehouse_id,
    });

    const updatedInventory = await knex("inventories").where({ id }).first();

    return res.status(200).json(updatedInventory);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addInventoryItem = async (req, res) => {
  const { warehouse, itemName, description, category, status, quantity } =
    req.body;
  if (
    !warehouse ||
    !itemName ||
    !description ||
    !category ||
    !status ||
    !quantity
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (isNaN(quantity)) {
    return res.status(400).json({ message: "Quantity must be a number" });
  }
  try {
    const [id] = await knex("inventories").insert({
      warehouse_id: warehouse,
      item_name: itemName,
      description,
      category,
      status,
      quantity: parseInt(quantity),
    });

    const newRecord = await knex
      .select(
        "id",
        "warehouse_id",
        "item_name",
        "description",
        "category",
        "status",
        "quantity"
      )
      .from("inventories")
      .where({ id })
      .first();

    res.status(201).json(newRecord);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Unable to create new inventory item: ${error}` });
  }
};

module.exports = { index, remove, edit, addInventoryItem, findInventoryItem };
