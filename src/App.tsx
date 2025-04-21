import { useState } from 'react'
import './App.css'
import imga from './assets/favicon-32x32.png'
import useLocalStore from "use-local-storage"

function App() {
  const [valor, setValor] = useState("0")
  const [operador, setOperador] = useState<"Nada" | "Somar" | "Sub" | "Div" | "Mult">("Nada")
  const [valorAnterior, setValorAnterior] = useState<number | null>(null)
  const [tema, setTema] = useLocalStore("1", "1")

  const digitarNumero = (num: number) => {
    setValor((prev) => prev === "0" ? num.toString() : prev + num.toString())
  }

  const escolherOperador = (op: typeof operador) => {
    setOperador(op)
    setValorAnterior(parseFloat(valor))
    setValor("0")
  }

  const calcular = () => {
    if (valorAnterior === null || operador === "Nada") return

    const atual = parseFloat(valor)
    let resultado = valorAnterior

    switch (operador) {
      case "Somar": resultado += atual; break
      case "Sub": resultado -= atual; break
      case "Mult": resultado *= atual; break
      case "Div": resultado /= atual; break
    }

    setValor(resultado.toString())
    setOperador("Nada")
    setValorAnterior(null)
  }

  const resetar = () => {
    setValor("0")
    setValorAnterior(null)
    setOperador("Nada")
  }

  const alterarTema = () => {
    setTema(tema === "1" ? "2" : tema === "2" ? "3" : "1")
  }

  return (
    <div className='background' data-theme={tema}>
      <div className='tema'>Tema</div>
      <div className='tipo' onClick={alterarTema}>
        <img style={{ position:"absolute", left: tema === "1" ? "0vw" : tema === "2" ? "1.75vw" : "3.5vw" }} src={imga} alt="" />
      </div>

      <div className='valor' style={{ color: tema === "2" ? "#000000" : "#FFFFFF" }}>
        {valor}
      </div>

      <div className='teclas'>
        <div className='tecladin'>
          {[7, 8, 9].map(n => <button key={n} className='tecla' onClick={() => digitarNumero(n)}>{n}</button>)}
          <button className='tecla' style={{ background: "var(--del)" }}>DEL</button>

          {[4, 5, 6].map(n => <button key={n} className='tecla' onClick={() => digitarNumero(n)}>{n}</button>)}
          <button className='tecla' onClick={() => escolherOperador("Mult")}>x</button>

          {[1, 2, 3].map(n => <button key={n} className='tecla' onClick={() => digitarNumero(n)}>{n}</button>)}
          <button className='tecla' onClick={() => escolherOperador("Sub")}>-</button>

          <button className='tecla'>.</button>
          <button className='tecla' onClick={() => digitarNumero(0)}>0</button>
          <button className='tecla' onClick={() => escolherOperador("Div")}>/</button>
          <button className='tecla' onClick={() => escolherOperador("Somar")}>+</button>
        </div>

        <div className='botoes'>
          <button style={{ background: "var(--reset)" }} onClick={resetar}>RESET</button>
          <button style={{ background: "var(--igual)" }} onClick={calcular}>=</button>
        </div>
      </div>
    </div>
  )
}

export default App
