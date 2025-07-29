// src/components/PanelProductorIA.jsx
import React from 'react';

const PanelProductorIA = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
        Radio Online Loartune🎙️
      </h1>
      
      {/* Aquí irán los próximos fragmentos */}
      import React, { useState } from 'react';

const PanelProductorIA = () => {
  const [idea, setIdea] = useState('');
  const [ideasGuardadas, setIdeasGuardadas] = useState([]);

  const guardarIdea = () => {
    if (idea.trim() !== '') {
      setIdeasGuardadas([...ideasGuardadas, idea]);
      setIdea('');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
        Panel del Productor IA 🎙️
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Escribe tu idea, frase o acción para el programa"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={guardarIdea}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Guardar idea 💡
        </button>
        <ul className="space-y-2 pt-4">
  {ideasGuardadas.map((item, index) => (
    <li
      key={index}
      className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm text-gray-800 dark:text-white"
    >
      <span>• {item}</span>
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

      
    </div>
  );
};

export default PanelProductorIA;
