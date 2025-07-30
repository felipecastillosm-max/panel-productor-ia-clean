
import React from 'react';
import { jsPDF } from "jspdf";

const ExportarPDF = () => {
  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text("Este es un PDF de ejemplo desde Panel Productor IA 🚀", 10, 10);
    doc.save("capitulo-exportado.pdf");
  };

  return (
    <button
      onClick={generarPDF}
      className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
    >
      Exportar PDF 📄
    </button>
  );
};

export default ExportarPDF;
