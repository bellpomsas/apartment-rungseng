import { useRef } from 'react';
import { ReceiptData } from '../App';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ReceiptPreviewProps {
  data: ReceiptData;
}

export function ReceiptPreview({ data }: ReceiptPreviewProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  // คำนวณค่าน้ำ
  const waterUnits = data.waterUnitEnd - data.waterUnitStart;
  const waterCost = Math.max(waterUnits * 18, 150);

  // คำนวณค่าไฟ
  const electricUnits = data.electricUnitEnd - data.electricUnitStart;
  const electricCost = electricUnits * 9;

  // คำนวณค่าปรับ
  const lateFee = data.lateDays * 50;

  // คำนวณค่าจอดรถ
  const parkingCost = data.parkingSpaces * 500;

  // รวมทั้งหมด
  const totalCost = data.roomRate + waterCost + electricCost + data.garbageFee + lateFee + parkingCost;

  // แปลงวันที่เป็นภาษาไทย
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear() + 543;
    
    return `เลขห้อง ${data.roomNumber} วันที่ ${day}/${month}/${year}`;
  };

  const handleGeneratePDF = async () => {
    if (!receiptRef.current) return;

    try {
      // สร้าง canvas จาก HTML element
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });

      // สร้าง PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`ใบเสร็จห้อง${data.roomNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('เกิดข้อผิดพลาดในการสร้าง PDF');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4 flex justify-between items-center">
        <h2>ตัวอย่างใบเสร็จ</h2>
        <button
          onClick={handleGeneratePDF}
          className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors"
        >
          ดาวน์โหลด PDF
        </button>
      </div>

      {/* ใบเสร็จ */}
      <div ref={receiptRef} className="bg-white p-8 border-2 border-black">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-xl mb-1">รุ่งแสงอพาร์ทเมนต์</h1>
          <p className="text-sm">
            134 หมู่ 1 ซอย ดอดมหาวิจัน ตำบลบางเสาธง อำเภอบางเสาธง สมุทรปราการ 10570 โทร : 092-391-3682
          </p>
          <p className="text-sm">{formatDate(data.date)}</p>
        </div>

        {/* ตาราง */}
        <table className="w-full border-collapse border-2 border-black text-sm">
          <thead>
            <tr className="border-2 border-black">
              <th className="border-2 border-black p-2 text-center bg-gray-100">รายละเอียด</th>
              <th className="border-2 border-black p-2 text-center bg-gray-100">ต้นเดือน</th>
              <th className="border-2 border-black p-2 text-center bg-gray-100">สิ้นเดือน</th>
              <th className="border-2 border-black p-2 text-center bg-gray-100">จำนวนหน่วย</th>
              <th className="border-2 border-black p-2 text-center bg-gray-100">ราคาต่อหน่วย</th>
              <th className="border-2 border-black p-2 text-center bg-gray-100">จำนวนเงิน</th>
            </tr>
          </thead>
          <tbody>
            {/* ค่าห้อง */}
            <tr className="border-2 border-black">
              <td className="border-2 border-black p-2">ค่าห้องประจำ (ค่าห้องขั้นต่ำ150บาท)</td>
              <td className="border-2 border-black p-2 text-center">-</td>
              <td className="border-2 border-black p-2 text-center">-</td>
              <td className="border-2 border-black p-2 text-center">-</td>
              <td className="border-2 border-black p-2 text-center">-</td>
              <td className="border-2 border-black p-2 text-right">฿{data.roomRate.toFixed(2)}</td>
            </tr>

            {/* ค่าน้ำ */}
            <tr className="border-2 border-black">
              <td className="border-2 border-black p-2">ค่าไฟฟ้า</td>
              <td className="border-2 border-black p-2 text-center">{data.waterUnitStart}</td>
              <td className="border-2 border-black p-2 text-center">{data.waterUnitEnd}</td>
              <td className="border-2 border-black p-2 text-center">{waterUnits}</td>
              <td className="border-2 border-black p-2 text-center">฿{18.00}</td>
              <td className="border-2 border-black p-2 text-right">฿{waterCost.toFixed(2)}</td>
            </tr>

            {/* ค่าไฟ */}
            <tr className="border-2 border-black">
              <td className="border-2 border-black p-2">ค่าน้ำ</td>
              <td className="border-2 border-black p-2 text-center">{data.electricUnitStart}</td>
              <td className="border-2 border-black p-2 text-center">{data.electricUnitEnd}</td>
              <td className="border-2 border-black p-2 text-center">{electricUnits}</td>
              <td className="border-2 border-black p-2 text-center">฿{9.00}</td>
              <td className="border-2 border-black p-2 text-right">฿{electricCost.toFixed(2)}</td>
            </tr>

            {/* ค่าขยะ */}
            <tr className="border-2 border-black">
              <td className="border-2 border-black p-2" colSpan={5}>ค่าขยะ</td>
              <td className="border-2 border-black p-2 text-right">{data.garbageFee}</td>
            </tr>

            {/* ค่าปรับ */}
            <tr className="border-2 border-black">
              <td className="border-2 border-black p-2" colSpan={5}>
                ค่าปรับล่าช้า เกินกำหนด วันสุดท้ายของเดือน - วันที่ 5 ของทุกเดือน ( เกินปรับวันละ 50 บาท ) จำนวน .......วัน
              </td>
              <td className="border-2 border-black p-2 text-right">{lateFee}</td>
            </tr>

            {/* ค่าจอดรถ */}
            <tr className="border-2 border-black">
              <td className="border-2 border-black p-2" colSpan={5}>ค่าจอดรถ เดือนละ 500 บาท</td>
              <td className="border-2 border-black p-2 text-right">{parkingCost}</td>
            </tr>

            {/* รวมเงิน */}
            <tr className="border-2 border-black bg-gray-100">
              <td className="border-2 border-black p-2 text-center" colSpan={5}>
                รวมเป็นเงินทั้งหมด
              </td>
              <td className="border-2 border-black p-2 text-right">
                {totalCost.toLocaleString('th-TH', { minimumFractionDigits: 0 })}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Footer */}
        <div className="mt-4 text-sm text-center">
          <p>*** กรุณาชำระเงินภายในวันที่ 5 ของทุกเดือน ***</p>
        </div>
      </div>
    </div>
  );
}