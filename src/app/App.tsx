import { useState } from 'react';
import { ReceiptForm } from './components/ReceiptForm';
import { ReceiptPreview } from './components/ReceiptPreview';

export interface ReceiptData {
  roomNumber: string;
  roomRate: number;
  date: string;
  waterUnitStart: number;
  waterUnitEnd: number;
  electricUnitStart: number;
  electricUnitEnd: number;
  garbageFee: number;
  lateDays: number;
  parkingSpaces: number;
}

export default function App() {
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-8 text-center">
          ระบบจัดการใบเสร็จ - รุ่งแสงอพาร์ทเมนต์
        </h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <ReceiptForm onSubmit={setReceiptData} />
          </div>
          
          <div>
            {receiptData && <ReceiptPreview data={receiptData} />}
          </div>
        </div>
      </div>
    </div>
  );
}
