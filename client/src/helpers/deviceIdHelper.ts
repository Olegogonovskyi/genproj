import { v4 as uuidv4 } from 'uuid';

const DEVICE_ID_KEY = 'deviceId';

export function getOrCreateDeviceId(): string {
    let deviceId = localStorage.getItem(DEVICE_ID_KEY);
    if (!deviceId) {
        deviceId = uuidv4(); // генерує девайс айдішку (мало б)
        localStorage.setItem(DEVICE_ID_KEY, deviceId);
    }
    return deviceId;
}
