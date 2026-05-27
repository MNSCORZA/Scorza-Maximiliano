import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToExcel = (orders, startDate, endDate, statusFilter) => {
  const headers = [
    'ID Órden',
    'Fecha',
    'Cliente',
    'Email',
    'Teléfono',
    'Estado',
    'Productos',
    'Total Facturado'
  ];

  const rows = orders.map(order => {
    const dateObj = order.date?.seconds ? order.date.toDate() : new Date(order.date);
    const formattedDate = dateObj.toLocaleDateString('es-AR') + ' ' + dateObj.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    const clientName = `${order.buyer?.nombre || ''} ${order.buyer?.apellido || ''}`.trim();
    const productDetails = order.items?.map(item => `${item.titulo} (x${item.cantidad})`).join(' | ') || '';

    return [
      order.id,
      formattedDate,
      clientName,
      order.buyer?.email || '',
      order.buyer?.telefono || '',
      order.status?.toUpperCase(),
      productDetails,
      Number(order.total || 0)
    ];
  });

  const worksheetData = [headers, ...rows];
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  const range = XLSX.utils.decode_range(worksheet['!ref']);
  const colWidths = [];
  for (let C = range.s.c; C <= range.e.c; ++C) {
    let maxLen = 10;
    for (let R = range.s.r; R <= range.e.r; ++R) {
      const cell = worksheet[XLSX.utils.encode_cell({ r: R, c: C })];
      if (cell && cell.v) {
        const len = cell.v.toString().length;
        if (len > maxLen) maxLen = len;
      }
    }
    colWidths.push({ wch: maxLen + 2 });
  }
  worksheet['!cols'] = colWidths;

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte de Ventas');
  
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
  
  const fileName = `reporte_ventas_${statusFilter}_${startDate || 'inicio'}_al_${endDate || 'fin'}.xlsx`;
  saveAs(dataBlob, fileName);
};

export const exportToPDF = (orders, startDate, endDate, statusFilter) => {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  
  doc.setFillColor(79, 70, 229);
  doc.rect(0, 0, 297, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('DE TODO - CONTROL CENTRAL', 15, 18);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('REPORTE INTELIGENTE DE FINANZAS Y CONTABILIDAD', 15, 25);

  doc.setFontSize(9);
  doc.text(`Filtro Estado: ${statusFilter.toUpperCase()}`, 220, 15);
  doc.text(`Desde: ${startDate || 'Origen'}`, 220, 21);
  doc.text(`Hasta: ${endDate || 'Hoy'}`, 220, 27);

  const totalFacturado = orders.reduce((acc, curr) => acc + Number(curr.total || 0), 0);
  const ticketPromedio = orders.length > 0 ? totalFacturado / orders.length : 0;

  doc.setFillColor(248, 250, 252);
  doc.rect(15, 48, 267, 18, 'F');
  doc.setDrawColor(241, 245, 249);
  doc.rect(15, 48, 267, 18, 'S');

  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('TOTAL FACTURADO (PERÍODO)', 20, 54);
  doc.text('ÓRDENES PROCESADAS', 110, 54);
  doc.text('TICKET PROMEDIO', 200, 54);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.text(`$ ${totalFacturado.toLocaleString('es-AR')}`, 20, 61);
  doc.text(`${orders.length} Ventas`, 110, 61);
  doc.text(`$ ${Math.round(ticketPromedio).toLocaleString('es-AR')}`, 200, 61);

  const tableHeaders = [['ID Órden', 'Fecha / Hora', 'Cliente', 'Email', 'Estado', 'Monto Total']];
  
  const tableRows = orders.map(order => {
    const dateObj = order.date?.seconds ? order.date.toDate() : new Date(order.date);
    const formattedDate = dateObj.toLocaleDateString('es-AR') + ' ' + dateObj.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    const clientName = `${order.buyer?.nombre || ''} ${order.buyer?.apellido || ''}`.trim();
    
    return [
      order.id,
      formattedDate,
      clientName,
      order.buyer?.email || '',
      order.status?.toUpperCase(),
      `$ ${Number(order.total || 0).toLocaleString('es-AR')}`
    ];
  });

  autoTable(doc, {
    startY: 74,
    head: tableHeaders,
    body: tableRows,
    theme: 'grid',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
      halign: 'left',
      cellPadding: 3
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [51, 65, 85],
      cellPadding: 3
    },
    columnStyles: {
      0: { cellWidth: 45 },
      1: { cellWidth: 35 },
      2: { cellWidth: 50 },
      3: { cellWidth: 65 },
      4: { cellWidth: 30 },
      5: { cellWidth: 42, halign: 'right', fontStyle: 'bold' }
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250]
    },
    margin: { left: 15, right: 15 },
    didDrawPage: (data) => {
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(`Página ${data.pageNumber} de ${pageCount}`, 265, 202);
    }
  });

  doc.save(`reporte_financiero_${statusFilter}_${startDate || 'inicio'}_al_${endDate || 'fin'}.pdf`);
};
