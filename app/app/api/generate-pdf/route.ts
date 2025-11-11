import { NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';

export async function POST(req: Request) {
  const { folio } = await req.json();
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  page.drawText('Miami Permit Application', { x: 50, y: 700, size: 24, color: rgb(0, 0.3, 0.6) });
  page.drawText(`Folio: ${folio || 'N/A'}`, { x: 50, y: 650, size: 16 });
  const pdfBytes = await pdfDoc.save();
  return new NextResponse(pdfBytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Miami_Permit_${folio || 'filled'}.pdf"`
    }
  });
}
