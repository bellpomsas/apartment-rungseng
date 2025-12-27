import { useState } from 'react';
import { ReceiptData } from '../App';

interface ReceiptFormProps {
  onSubmit: (data: ReceiptData) => void;
}

export function ReceiptForm({ onSubmit }: ReceiptFormProps) {
  const [formData, setFormData] = useState<ReceiptData>({
    roomNumber: '',
    roomRate: 0,
    date: new Date().toISOString().split('T')[0],
    waterUnitStart: 0,
    waterUnitEnd: 0,
    electricUnitStart: 0,
    electricUnitEnd: 0,
    garbageFee: 0,
    lateDays: 0,
    parkingSpaces: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof ReceiptData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="mb-6">กรอกข้อมูลใบเสร็จ</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">
            เลขห้อง
          </label>
          <input
            type="text"
            value={formData.roomNumber}
            onChange={(e) => handleChange('roomNumber', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block mb-2">
            ค่าห้อง (บาท)
          </label>
          <input
            type="number"
            value={formData.roomRate}
            onChange={(e) => handleChange('roomRate', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block mb-2">
            วันที่
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="border-t pt-4">
          <h3 className="mb-4">
            ค่าน้ำ (ขั้นต่ำ 150 บาท, 18 บาท/หน่วย)
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">
                จำนวนหน่วยต้นเดือน
              </label>
              <input
                type="number"
                value={formData.waterUnitStart}
                onChange={(e) => handleChange('waterUnitStart', Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block mb-2">
                จำนวนหน่วยสิ้นเดือน
              </label>
              <input
                type="number"
                value={formData.waterUnitEnd}
                onChange={(e) => handleChange('waterUnitEnd', Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="mb-4">
            ค่าไฟ (9 บาท/หน่วย)
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">
                จำนวนหน่วยต้นเดือน
              </label>
              <input
                type="number"
                value={formData.electricUnitStart}
                onChange={(e) => handleChange('electricUnitStart', Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block mb-2">
                จำนวนหน่วยสิ้นเดือน
              </label>
              <input
                type="number"
                value={formData.electricUnitEnd}
                onChange={(e) => handleChange('electricUnitEnd', Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-2">
            ค่าขยะ (บาท)
          </label>
          <input
            type="number"
            value={formData.garbageFee}
            onChange={(e) => handleChange('garbageFee', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block mb-2">
            จำนวนวันที่เกินกำหนด (50 บาท/วัน)
          </label>
          <input
            type="number"
            value={formData.lateDays}
            onChange={(e) => handleChange('lateDays', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            กำหนดชำระ: วันสุดท้ายของเดือน ถึง วันที่ 5 ของเดือนถัดไป
          </p>
        </div>

        <div>
          <label className="block mb-2">
            จำนวนที่จอดรถ (500 บาท/คัน)
          </label>
          <input
            type="number"
            value={formData.parkingSpaces}
            onChange={(e) => handleChange('parkingSpaces', Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          สร้างใบเสร็จ
        </button>
      </form>
    </div>
  );
}
