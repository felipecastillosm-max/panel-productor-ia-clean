// src/components/PanelProductorIA.jsx
import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const guardadas = localStorage.getItem('ideasGuardadas');
      if (guardadas) setIdeasGuardadas(JSON.parse(guardadas));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ideasGuardadas', JSON.stringify(ideasGuardadas));
    }
  }, [ideasGuardadas]);

  const confirmarCapitulo = () => {
    const num = capituloSiguiente.trim() === ''
      ? numeroCapitulo
      : parseInt(capituloSiguiente);

    setCapituloActual('');
    setNumeroCapitulo(num);
    setHistorialCapitulos([...historialCapitulos, { numero: num, nombre: capituloActual }]);
    setCapituloSiguiente('');
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

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
        Radio Online Loartune 🎙️
      </h1>

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
        </div>

        {mostrarHistorial && (
          <div className="pt-4 space-y-2">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">Historial de capítulos</h2>
            <ul className="space-y-1">
              {historialCapitulos.map((cap, idx) => (
                <li key={idx} className="text-sm text-gray-800 dark:text-white">
                  Capítulo {cap.numero}: {cap.nombre || '[Sin nombre]'}
                </li>
              ))}
            </ul>
          </div>
        )}

       {historialVisible && (
  <ul className="space-y-2 pt-4">
    {historialCapitulos.map((cap, index) => (
      <li
        key={index}
        className="flex justify-between items-center p-3 bg-gray-200 dark:bg-gray-700 rounded-md shadow-sm"
      >
        <span className="text-gray-800 dark:text-white">
          📌 {cap.numero} — {cap.nombre}
        </span>
        <button
          onClick={() => {
            setCapituloActual(cap.nombre || `Capítulo ${cap.numero}`);
            setIdeasGuardadas(cap.ideas || []);
          }}
          className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Recuperar
        </button>
      </li>
    ))}
  </ul>
)}

              <label className="flex items-center gap-2 w-full">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const nuevasIdeas = [...ideasGuardadas];
                    nuevasIdeas[index] = {
                      texto: item.texto,
                      checked: e.target.checked,
                    };
                    setIdeasGuardadas(nuevasIdeas);
                  }}
                  checked={item.checked}
                />
                <span
                  className={
                    (item.checked ? 'line-through text-gray-500 dark:text-gray-400' : '') + ' flex-1'
                  }
                >
                  • {item.texto}
                </span>
              </label>
              <button
                onClick={() => setIdeasGuardadas(ideasGuardadas.filter((_, i) => i !== index))}
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

