const {ValidationError, ResourceNotFoundError} = require("../utils/exceptions");

function skuService(skuDao, positionDao) {
  const getById = (id) => {
    return skuDao.getById(id);
  };
  const getAll = async () => {
    return await skuDao.getAll();
  };
  const add = async (
    description,
    weight,
    volume,
    notes,
    price,
    availableQuantity
  ) => {
    return await skuDao.add(
      description,
      weight,
      volume,
      notes,
      price,
      availableQuantity
    );
  };
  const updateById = async (
    id,
    newDescription,
    newWeight,
    newVolume,
    newNotes,
    newPrice,
    newAvailableQuantity
  ) => {
    const sku = await skuDao.getById(id);
    await skuDao.updateSku(
      id,
      newDescription,
      newWeight,
      newVolume,
      newNotes,
      newPrice,
      newAvailableQuantity
    );
    if (sku.position !== null) {
      await positionDao.update(
        sku.position,
        newWeight,
        newVolume,
        sku.weight,
        sku.volume
      );
    }
  };
  const updatePosition = async (id, position) => {

    const sku = await skuDao.getById(id);
    const skuByPosition = await skuDao.getByPosition(position)
    if(skuByPosition.length > 0) {
      throw new ValidationError("Position already used")
    }
    const positionObject = await positionDao.getById(position)
    await skuDao.updatePosition(sku.id, position);
    await positionDao.update(sku.position, 0, 0, sku.weight, sku.volume);
    await positionDao.update(position, sku.weight, sku.volume, 0, 0);
  };

  const remove = async (id) => {
    try {
      const skuToDelete = await skuDao.getById(id)
      if (skuToDelete.position !== undefined) {
        await positionDao.update(skuToDelete.position, 0, 0, skuToDelete.weight, skuToDelete.volume);
      }
      await skuDao.remove(id);
    } catch (err) {
      console.log('Resource already deleted')
    }
  };

  const deleteSkuData = async () => {
    const res = await skuDao.deleteSkuData();
  };
  return {
    getById: getById,
    getAll: getAll,
    add: add,
    updateById: updateById,
    updatePosition: updatePosition,
    remove: remove,
    deleteSkuData: deleteSkuData,
  };
}

module.exports = skuService;
