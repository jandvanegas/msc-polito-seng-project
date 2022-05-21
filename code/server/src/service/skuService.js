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
    await skuDao.updatePosition(sku, position);
    await positionDao.update(sku.position, 0, 0, sku.weight, sku.volume);
    await positionDao.update(position, sku.weight, sku.volume, 0, 0);
  };

  const remove = async (id) => {
    const sku = await skuDao.getById(id);
    if (sku.position != null) {
      await positionDao.update(sku.position, 0, 0, sku.weight, sku.volume);
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
    deleteSkuData: deleteSkuData
  };
}

module.exports = skuService;
