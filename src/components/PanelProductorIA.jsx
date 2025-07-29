// src/components/PanelProductorIA.jsx
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

const PanelProductorIA = () => {
  const [idea, setIdea] = useState('');
  const [ideasGuardadas, setIdeasGuardadas] = useState(() => {
    const datosGuardados = localStorage.getItem('ideasGuardadas');
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });
  const [capituloActual, setCapituloActual] = useState('');
  const [capituloSiguiente, setCapituloSiguiente] = useState('');
  const [historialCapitulos, setHistorialCapitulos] = useState([]);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  useEffect(() => {
    localStorage.setItem('ideasGuardadas', JSON.stringify(ideasGuardadas));
  }, [ideasGuardadas]);

  const guardarIdea = () => {
    if (idea.trim() !== '') {
      setIdeasGuardadas([
        ...ideasGuardadas,
        { texto: idea, checked: false }
      ]);
      setIdea('');
    }
  };

  const manejarKeyDown = (e) => {
    if (e.key === 'Enter') {
      const siguiente = capituloActual && !isNaN(capituloActual)
        ? parseInt(capituloActual) + 1
        : 1;
      setCapituloSiguiente(siguiente.toString());
    } else if (e.key === ' ') {
      setCapituloSiguiente('');
    }
  };

  const confirmarCapitulo = () => {
    if (capituloActual.trim() !== '') {
      setHistorialCapitulos([...historialCapitulos, capituloActual]);
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Ideas del Productor IA', 10, 10);
    ideasGuardadas.forEach((item, index) => {
      doc.text(`• ${item.texto}`, 10, 20 + index * 10);
    });
    doc.save('ideas_productor_ia.pdf');
  };

  const borrarTodo = () => {
    setIdeasGuardadas([]);
    localStorage.removeItem('ideasGuardadas');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
        Radio Online Loartune 🎙️
      </h1>

      <div className="flex justify-between items-center space-x-4">
        <div className="flex-1">
          <input
            type="text"
            value={capituloActual}
            onChange={(e) => setCapituloActual(e.target.value)}
            placeholder="Nombre del capítulo"
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div>
          <input
            type="text"
            value={capituloSiguiente}
            onChange={(e) => setCapituloSiguiente(e.target.value)}
            onKeyDown={manejarKeyDown}
            placeholder={
              capituloActual.trim() === '' || isNaN(capituloActual)
                ? '1'
                : (parseInt(capituloActual) + 1).toString()
            }
            className="border rounded-md p-2 w-24 text-center"
          />
        </div>
        <button
          onClick={confirmarCapitulo}
          className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700"
        >
          Confirmar
        </button>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Escribe tu idea, frase o acción para el programa"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
        />
        <div className="flex flex-wrap gap-3">
          <button
            onClick={guardarIdea}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Guardar idea 💡
          </button>
          <button
            onClick={borrarTodo}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Borrar todo 🗑️
          </button>
          <button
            onClick={() => setMostrarHistorial(!mostrarHistorial)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Historial 📚
          </button>
          <button
            onClick={exportarPDF}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Exportar PDF 📄
          </button>
        </div>

        {mostrarHistorial && (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md mt-4">
            <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Historial de capítulos:</h3>
            <ul className="list-disc pl-6 text-gray-800 dark:text-white">
              {historialCapitulos.map((cap, idx) => (
                <li key={idx}>{cap}</li>
              ))}
            </ul>
          </div>
        )}

        <ul className="space-y-2 pt-4">
          {ideasGuardadas.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm text-gray-800 dark:text-white"
            >
              <label className="flex items-center gap-2 w-full">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const nuevasIdeas = [...ideasGuardadas];
                    nuevasIdeas[index] = {
                      texto: typeof item === 'string' ? item : item.texto,
                      checked: e.target.checked,
                    };
                    setIdeasGuardadas(nuevasIdeas);
                  }}
                  checked={typeof item === 'object' && item.checked}
                />
                <span
                  className={
                    (typeof item === 'object' && item.checked
                      ? 'line-through text-gray-500 dark:text-gray-400'
                      : '') + ' flex-1'
                  }
                >
                  • {typeof item === 'string' ? item : item.texto}
                </span>
              </label>

              <button
                onClick={() =>
                  setIdeasGuardadas(ideasGuardadas.filter((_, i) => i !== index))
                }
                className="text-red-500 hover:text-red-700 font-bold text-sm"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PanelProductorIA;
