// src/components/PanelProductorIA.jsx
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

const PanelProductorIA = () => {
  const [capituloActual, setCapituloActual] = useState('');
  const [capituloSiguiente, setCapituloSiguiente] = useState('');
  const [numeroCapitulo, setNumeroCapitulo] = useState(1);
  const [idea, setIdea] = useState('');
  const [ideasGuardadas, setIdeasGuardadas] = useState([]);
  const [historialCapitulos, setHistorialCapitulos] = useState(() => {
    const data = localStorage.getItem('historialCapitulos');
    return data ? JSON.parse(data) : [];
  });
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  const [bloques, setBloques] = useState([]);
const [bloqueNuevo, setBloqueNuevo] = useState('');
const [descripcionBloque, setDescripcionBloque] = useState('');


  useEffect(() => {
    const guardadas = localStorage.getItem('ideasGuardadas');
    if (guardadas) setIdeasGuardadas(JSON.parse(guardadas));
    const bloquesGuardados = localStorage.getItem('bloquesPrograma');
    if (bloquesGuardados) setBloques(JSON.parse(bloquesGuardados));
  }, []);

  useEffect(() => {
    localStorage.setItem('ideasGuardadas', JSON.stringify(ideasGuardadas));
  }, [ideasGuardadas]);

  useEffect(() => {
    localStorage.setItem('bloquesPrograma', JSON.stringify(bloques));
  }, [bloques]);

  const confirmarCapitulo = () => {
    const num = capituloSiguiente.trim() === ''
      ? capituloActual.trim() === ''
        ? 1
        : isNaN(capituloActual)
          ? 1
          : parseInt(capituloActual.match(/\d+/)) + 1
      : parseInt(capituloSiguiente);

    const nombre = `Capítulo ${num}`;

    setCapituloActual(nombre);
    setNumeroCapitulo(num);
    setCapituloSiguiente('');

    const nuevoHistorial = [
      ...historialCapitulos,
      {
        numero: num,
        nombre: nombre,
        ideas: [...ideasGuardadas],
      },
    ];

    setHistorialCapitulos(nuevoHistorial);
    localStorage.setItem('historialCapitulos', JSON.stringify(nuevoHistorial));
  };

  const manejarKeyDown = (e) => {
    if (e.key === 'Enter') confirmarCapitulo();
    if (e.key === ' ') setCapituloSiguiente('');
  };

  const guardarIdea = () => {
    if (idea.trim() !== '') {
      setIdeasGuardadas([...ideasGuardadas, { texto: idea, checked: false }]);
      setIdea('');
    }
  };

  const limpiarTodo = () => {
    setIdeasGuardadas([]);
  };

  const eliminarHistorialItem = (index) => {
    const actualizado = historialCapitulos.filter((_, i) => i !== index);
    setHistorialCapitulos(actualizado);
    localStorage.setItem('historialCapitulos', JSON.stringify(actualizado));
  };
const agregarBloque = () => {
  if (bloqueNuevo.trim() !== '') {
    setBloques([...bloques, { nombre: bloqueNuevo, descripcion: descripcionBloque }]);
    setBloqueNuevo('');
    setDescripcionBloque('');
  }
};

  
  const eliminarBloque = (index) => {
    const actualizados = bloques.filter((_, i) => i !== index);
    setBloques(actualizados);
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Capítulo ${numeroCapitulo}: ${capituloActual || '[Sin nombre]'}`, 10, 20);

    doc.setFontSize(12);
    doc.text('Ideas guardadas:', 10, 30);
    ideasGuardadas.forEach((idea, index) => {
      doc.text(`• ${idea.texto}`, 10, 40 + index * 10);
    });

    let y = 40 + ideasGuardadas.length * 10 + 10;
    doc.text('🧱 Bloques del programa:', 10, y);
    bloques.forEach((bloque, i) => {
      doc.text(`• ${bloque.nombre}: ${bloque.descripcion}`, 10, y + 10 + i * 10);
    });

    doc.save(`Capitulo_${numeroCapitulo}.pdf`);
  };

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto bg-loartune-negro text-white rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold text-center text-loartune-rojo">Radio Online Loartune</h1>

      <div className="flex gap-4 items-center">
        <input
          type="text"
          value={capituloActual}
          onChange={(e) => setCapituloActual(e.target.value)}
          placeholder="Nombre del capítulo"
          className="border rounded-md p-2 flex-1"
        />
        <input
          type="text"
          value={capituloSiguiente}
          onChange={(e) => setCapituloSiguiente(e.target.value)}
          onKeyDown={manejarKeyDown}
          placeholder={numeroCapitulo.toString()}
          className="border rounded-md p-2 w-32"
        />
        <button
          onClick={confirmarCapitulo}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Confirmar ➡️
        </button>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Escribe tu idea, frase o acción para el programa"
          className="w-full p-3 border rounded-md dark:bg-gray-800 dark:text-white"
        />

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={guardarIdea}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Guardar idea 💡
          </button>
          <button
            onClick={limpiarTodo}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Limpiar todo 🧽
          </button>
          <button
            onClick={() => setMostrarHistorial(!mostrarHistorial)}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
          >
            {mostrarHistorial ? 'Ocultar historial 📂' : 'Ver historial 📁'}
          </button>
          <button
            onClick={exportarPDF}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Exportar PDF 📄
          </button>
        </div>
<div className="pt-6 border-t border-gray-400 dark:border-gray-600">
  <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Bloques del programa</h2>
  
  <div className="flex flex-col sm:flex-row gap-2">
    <input
      type="text"
      value={bloqueNuevo}
      onChange={(e) => setBloqueNuevo(e.target.value)}
      placeholder="Nombre del bloque"
      className="flex-1 p-2 border rounded dark:bg-gray-800 dark:text-white"
    />
    <textarea
      value={descripcionBloque}
      onChange={(e) => setDescripcionBloque(e.target.value)}
      placeholder="Descripción del bloque"
      className="flex-1 p-2 border rounded dark:bg-gray-800 dark:text-white h-24 resize-y overflow-y-auto"
    />
    <button
      onClick={agregarBloque}
      className="bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700"
    >
      Agregar Bloque ➕
    </button>
  </div>

  <ul className="mt-4 space-y-2">
    {bloques.map((bloque, idx) => (
      <ul className="mt-4 space-y-2">
  {bloques.map((bloque, idx) => (
    ...
  ))}
</ul>

<input
  type="text"
  value={descripcionBloque}
  onChange={(e) => setDescripcionBloque(e.target.value)}
  placeholder="Descripción del bloque"
  className="flex-1 p-2 border rounded dark:bg-gray-800 dark:text-white"
/>


        {mostrarHistorial && (
          <div className="pt-4 space-y-2">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Historial de capítulos</h2>
            <ul className="space-y-1">
              {historialCapitulos.map((cap, idx) => (
                <li key={idx} className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 p-2 rounded">
                  <span className="text-gray-800 dark:text-white">
                    📌 Capítulo {cap.numero}: {cap.nombre || '[Sin nombre]'}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setCapituloActual(cap.nombre || `Capítulo ${cap.numero}`);
                        setIdeasGuardadas(cap.ideas || []);
                      }}
                      className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Recuperar
                    </button>
                    <button
                      onClick={() => eliminarHistorialItem(idx)}
                      className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
  
 

export default PanelProductorIA;
