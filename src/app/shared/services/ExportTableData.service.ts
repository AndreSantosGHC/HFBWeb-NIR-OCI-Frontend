// export.service.ts
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export type ExportType = 'csv' | 'excel' | 'pdf';

@Injectable({
  providedIn: 'root'
})
export class ExportTableDataService {

  async exportTable(
    exportType: ExportType,
    apiUrl: string,
    request: any,
    columns: any[],
    fileName: string
  ): Promise<void> {
    try {
      // Remove paginação do request
      const exportRequest = {
        ...request,
        page: 0,
        size: 10000 // Aumentei para 10.000 registros
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'authorization': 'bearer ' + localStorage.getItem('auth_token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exportRequest)
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar dados para exportação');
      }

      const data = await response.json();
      const records = data.content || data.data || data;

      switch (exportType) {
        case 'csv':
          this.exportToCSV(records, columns, fileName);
          break;
        case 'excel':
          this.exportToExcel(records, columns, fileName);
          break;
        case 'pdf':
          this.exportToPDF(records, columns, fileName);
          break;
      }

    } catch (error) {
      console.error('Erro na exportação:', error);
      throw error;
    }
  }

  private exportToCSV(data: any[], columns: any[], fileName: string): void {
    const headers = columns.map(col => col.header);
    const csvHeaders = headers.join(',') + '\n';

    const csvContent = data.map(row => {
      return columns.map(col => {
        const value = this.getFormattedValue(row, col.field, col.format);
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(',');
    }).join('\n');

    const blob = new Blob([csvHeaders + csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${fileName}.csv`);
  }

  private exportToExcel(data: any[], columns: any[], fileName: string): void {
    const headers = columns.map(col => col.header);
    const worksheetData = [
      headers,
      ...data.map(row => columns.map(col => this.getFormattedValue(row, col.field, col.format)))
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados');

    // Formatação de células para datas
    this.applyExcelFormatting(worksheet, columns, data.length);

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, `${fileName}.xlsx`);
  }

  private exportToPDF(data: any[], columns: any[], fileName: string): void {
    const doc = new jsPDF();

    const tableColumn = columns.map(col => col.header);
    const tableRows = data.map(row =>
      columns.map(col => {
        const value = this.getFormattedValue(row, col.field, col.format);
        return String(value).substring(0, 50);
      })
    );

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: 'linebreak'
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      margin: { top: 20 },
      pageBreak: 'auto',
      rowPageBreak: 'auto'
    });

    doc.save(`${fileName}.pdf`);
  }

  // Método melhorado para obter valores formatados
  private getFormattedValue(obj: any, path: string, format?: string): any {
    const rawValue = this.getNestedValue(obj, path);

    // Formatação baseada no tipo de dado
    if (this.isDate(rawValue)) {
      return this.formatDate(rawValue, format);
    }

    if (Array.isArray(rawValue)) {
      return rawValue.map(item => this.formatArrayItem(item)).join(', ');
    }

    if (typeof rawValue === 'object' && rawValue !== null) {
      return this.formatObject(rawValue);
    }

    return rawValue !== null && rawValue !== undefined ? String(rawValue) : '';
  }

  // Obtém valor aninhado (mantém sua lógica original)
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => {
      if (current === null || current === undefined) return '';
      return current[key] !== undefined ? current[key] : '';
    }, obj);
  }

  // Verifica se é uma data
  private isDate(value: any): boolean {
    if (value instanceof Date) return true;
    if (typeof value === 'string') {
      const date = new Date(value);
      return !isNaN(date.getTime());
    }
    return false;
  }

  // Formata datas no padrão brasileiro
  private formatDate(value: Date | string, format?: string): string {
    const date = new Date(value);
    if (isNaN(date.getTime())) return String(value);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    switch (format) {
      case 'date':
        return `${day}/${month}/${year}`;
      case 'time':
        return `${hours}:${minutes}`;
      case 'datetime':
      default:
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
  }

  // Formata itens de array
  private formatArrayItem(item: any): string {
    if (typeof item === 'object' && item !== null) {
      return item.nome || item.name || item.descricao || item.description ||
             item.toString?.() || JSON.stringify(item);
    }
    return String(item);
  }

  // Formata objetos
  private formatObject(obj: any): string {
    return obj.nome || obj.name || obj.descricao || obj.description ||
           obj.toString?.() || JSON.stringify(obj);
  }

  // Aplica formatação especial para Excel (opcional)
  private applyExcelFormatting(worksheet: XLSX.WorkSheet, columns: any[], dataLength: number): void {
    // Você pode adicionar formatação específica para células aqui
    // Ex: formatação de data, moeda, etc.
  }
}
