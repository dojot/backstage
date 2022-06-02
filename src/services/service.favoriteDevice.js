import { userPool } from "../db/index.js";

export const favoriteDevice = async (deviceId, userName, tenant) => {
  const result = await userPool.query(
    "SELECT * FROM favorite_devices WHERE device_id = $1 AND user_name = $2 AND tenant = $3",
    [deviceId, userName, tenant],
  );

  if (result.rowCount) {
    const favoriteId = result.rows[0].id;
    await userPool.query("DELETE FROM favorite_devices WHERE id = $1", [
      favoriteId,
    ]);

    return false;
  }

  await userPool.query(
    "INSERT INTO favorite_devices(device_id, user_name, tenant) VALUES($1, $2, $3)",
    [deviceId, userName, tenant],
  );

  return true;
};

export const getFavoriteDevicesForDevicesPage = async (deviceIds) => {
  const params = deviceIds.map((_, index) => `$${index + 1}`);

  if(params.length > 0) {
    const result = await userPool.query(
      `SELECT * FROM favorite_devices WHERE device_id IN (${params})`,
      deviceIds,
    );

    return result.rows
  }

  return [];
};

export const getAllFavoriteDevices = async (user, tenant) => {
  const result = await userPool.query(
    `SELECT * FROM favorite_devices WHERE user_name = $1 AND tenant = $2`,
    [user, tenant],
  );

  return result.rows;
};


export const removeFavorite = async (userName, tenant, deviceId) => {
  const favoriteDevice = await userPool.query(
    "SELECT * FROM favorite_devices WHERE device_id = $1 AND user_name = $2 AND tenant = $3",
    [deviceId, userName, tenant],
  );

  if (favoriteDevice.rowCount) {
    const favoriteId = favoriteDevice.rows[0].id;
    await userPool.query("DELETE FROM favorite_devices WHERE id = $1 AND user_name = $2 AND tenant = $3", [
      favoriteId,
      userName,
      tenant,
    ]);

    return false;
  }

  return false
}