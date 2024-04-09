'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';

const stats = [
  { id: 1, name: 'Motivação', value: 'motivacao', path: '/rosa.png' },
  { id: 2, name: 'Signos', value: 'signos', path: '/rosquinha.png' },
  { id: 3, name: 'Depressão', value: 'depressao', path: '/coracao.png' },
  { id: 4, name: 'Amor', value: 'amor', path: '/coracao_maos.png' },
];

const Presentes = () => {
  const [telefone, setTelefone] = useState('');
  const [signo, setSigno] = useState('');

  const handleClick = async (value: string) => {
    if (!telefone) {
      alert('Por favor, insira um número de telefone');
      return;
    }

    if (value === 'motivacao') {
      try {
        const response = await fetch('http://localhost:3001/frases-motivacionais');
        const data = await response.json();
        
        // Aqui você pode usar o número de telefone junto com a chamada da API
        redirectToWhatsApp(data.frase);
        } catch (error) {
          console.error('Erro ao buscar frase motivacional:', error);
          alert('Erro ao buscar frase motivacional');
        }
    }

    if (value === 'depressao') {
      try {
        const response = await fetch('http://localhost:3001/frases-depressao');
        const data = await response.json();
        
        // Aqui você pode usar o número de telefone junto com a chamada da API
        redirectToWhatsApp(data.frase);
        } catch (error) {
          console.error('Erro ao buscar frase de apoio:', error);
          alert('Erro ao buscar frase de apoio');
        }
    }

    if (value === 'amor') {
      try {
        const response = await fetch('http://localhost:3001/frases-amor');
        const data = await response.json();
        
        // Aqui você pode usar o número de telefone junto com a chamada da API
        redirectToWhatsApp(data.frase);
        } catch (error) {
          console.error('Erro ao buscar frase de amor:', error);
          alert('Erro ao buscar frase de amor');
        }
    }

    if (value === 'signos') {
      if (!signo) {
        alert('Por favor, insira a data de aniversário');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/frases-signos?mes=${signo}`);
        const data = await response.json();
        debugger
        
        // Aqui você pode usar o número de telefone junto com a chamada da API
        redirectToWhatsApp(data.frase);
        } catch (error) {
          console.error('Erro ao buscar frase de signos:', error);
          alert('Erro ao buscar frase de signos');
        }
    }
  };

  const redirectToWhatsApp = (mensagemMotivacional: string) => {
     const mensagemEncoded = encodeURIComponent(mensagemMotivacional + "\n\nEsta mensagem foi solicitado por uma pessoa especial. Favor não responder.\nSolicitado na Live Tik Tok");
      const whatsappLink = `https://api.whatsapp.com/send?phone=+55${telefone}&text=${mensagemEncoded}`;
      window.open(whatsappLink, '_blank');
  };

  return (
    <>
      <div className="text-6xl mb-8">Envie para quem você ama. frases de </div>

      {/* Componente de apresentação de estatísticas */}
      <div className="grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-center">
        {stats.map((stat) => (
          <a
            key={stat.id}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleClick(stat.value)}
          >
            <h2 className={`mb-3 text-2xl font-semibold `}>
              {stat.name} {" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              <Image
                src={stat.path}
                alt="Vercel Logo"
                className={stat.value === 'amor' ? 'white ms-12' : 'ms-14'}
                width={stat.value === 'amor' ? 110 : 100}
                height={stat.value === 'amor' ? 48 : 24}
                priority
              />
            </p>
          </a>
        ))}
      </div>

      {/* Campo de entrada para número de telefone */}
      <InputMask
        mask="(99) 9 9999-9999"
        type="tel"
        placeholder='(_) _ ____-____'
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        className="w-auto h-12 px-3 py-2 mt-4 mb-8 text-4xl font-bold text-gray-800 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-center"
      />

      <InputMask
        mask="99"
        type="nascimento"
        placeholder='__'
        value={signo}
        onChange={(e) => setSigno(e.target.value)}
        className="w-auto h-12 px-3 py-2 mt-4 mb-8 text-4xl font-bold text-gray-800 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-center"
      />

    </>
  );
}

export default Presentes;
