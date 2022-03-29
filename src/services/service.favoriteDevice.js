import {userPool} from '../db/index.js'

export const favoriteDevice = async (deviceId) => {
    console.log(deviceId)
    const result = await userPool.query('SELECT * FROM favorite_devices WHERE device_id = $1', [deviceId])
    
    if (result.rowCount) {
      const favoriteId = result.rows[0].id
      await userPool.query('DELETE FROM favorite_devices WHERE id = $1', [favoriteId])
  
      return false
    }
  
    await userPool.query('INSERT INTO favorite_devices(device_id) VALUES($1)', [deviceId])

    return true
}

export const getFavoriteDevices = async (deviceIds) => {
    const params = deviceIds.map((_, index) => `$${index + 1}`)

    const result = await userPool.query(`SELECT * FROM favorite_devices WHERE device_id IN (${params})`, deviceIds)

    return result.rows
}
