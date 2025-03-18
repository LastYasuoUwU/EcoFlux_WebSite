import React from 'react';
import { Tv, Laptop, Refrigerator, WashingMachine, Coffee } from 'lucide-react';

interface Device {
  id: number;
  name: string;
  consumption: string;
  status: 'on' | 'off' | 'standby';
  icon: React.ReactNode;
}

const devices: Device[] = [
  { id: 1, name: 'Télévision Salon', consumption: '120W', status: 'on', icon: <Tv className="w-5 h-5" /> },
  { id: 2, name: 'Ordinateur Bureau', consumption: '85W', status: 'standby', icon: <Laptop className="w-5 h-5" /> },
  { id: 3, name: 'Réfrigérateur', consumption: '150W', status: 'on', icon: <Refrigerator className="w-5 h-5" /> },
  { id: 4, name: 'Machine à Laver', consumption: '0W', status: 'off', icon: <WashingMachine className="w-5 h-5" /> },
  { id: 5, name: 'Cafetière', consumption: '0W', status: 'off', icon: <Coffee className="w-5 h-5" /> },
];

const statusColors = {
  on: 'bg-green-100 text-green-800',
  off: 'bg-gray-100 text-gray-800',
  standby: 'bg-yellow-100 text-yellow-800',
};

export const DeviceList: React.FC = () => {
  return (
    <div className="divide-y divide-gray-200">
      {devices.map((device) => (
        <div key={device.id} className="py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              {device.icon}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900">{device.name}</h4>
              <p className="text-sm text-gray-500">{device.consumption}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[device.status]}`}>
            {device.status.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
};