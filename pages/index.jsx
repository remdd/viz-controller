import React, { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import cx from 'classnames'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

const clientClasses = [
  'flash',
  'flash-fast',
  'zoom',
  'spin',
  'freakout',
  'pulse',
  'throb',
  'cycle1',
  'cycle2',
  'none',
]
const fonts = [
  'bungee',
  'special-elite',
  'bowlby-one',
  'freckle-face',
]
const fontColors = [
  'black',
  'white',
  'red',
]

export default function Home() {
  const [status, setStatus] = useState('init')
  const [data, setData] = useState({})

  const initTempData = { text1: '', text2: '' }

  const [tempData, setTempData] = useState(initTempData)

  const setClientClass = async (clientClass) => {
    console.log(`toggling ${clientClass}`)
    try {
      const newData = { ...data, clientClass: clientClass }
      const res = await axios.post(`${SERVER_URL}/data`, newData)
      setData(res.data)
      setStatus('done')
    } catch (err) {
      setStatus(err)
    }
  }

  const setFont = async (font) => {
    console.log(`setting font: ${font}`)
    try {
      const newData = { ...data, font: font }
      const res = await axios.post(`${SERVER_URL}/data`, newData)
      setData(res.data)
      setStatus('done')
    } catch (err) {
      setStatus(err)
    }
  }

  const setFontColor = async (fontColor) => {
    console.log(`setting font: ${fontColor}`)
    try {
      const newData = { ...data, fontColor: fontColor }
      const res = await axios.post(`${SERVER_URL}/data`, newData)
      setData(res.data)
      setStatus('done')
    } catch (err) {
      setStatus(err)
    }
  }

  const onSubmit1 = async (e) => {
    e.preventDefault()
    try {
      const newData = { ...data, text1: tempData.text1 }
      const res = await axios.post(`${SERVER_URL}/data`, newData)
      setData(res.data)
      setTempData(initTempData)
      setStatus('done')
    } catch (err) {
      setStatus(err)
    }
  }

  const onSubmit2 = async (e) => {
    e.preventDefault()
    try {
      const newData = { ...data, text2: tempData.text2 }
      const res = await axios.post(`${SERVER_URL}/data`, newData)
      setData(res.data)
      setTempData(initTempData)
      setStatus('done')
    } catch (err) {
      setStatus(err)
    }
  }

  const onChange = (e) => {
    const newTempData = Object.assign({}, tempData)
    newTempData[e.target.id] = e.target.value
    setTempData(newTempData)
  }

  const clearText1 = async () => {
    setTempData(initTempData)
    try {
      const newData = { text1: '', ...data }
      const res = await axios.post(`${SERVER_URL}/data`, newData)
      setData(res.data)
      setTempData(initTempData)
      setStatus('done')
    } catch (err) {
      setStatus(err)
    }
  }

  const clearText2 = async () => {
    setTempData(initTempData)
    try {
      const newData = { text2: '', ...data }
      const res = await axios.post(`${SERVER_URL}/data`, newData)
      setData(res.data)
      setTempData(initTempData)
      setStatus('done')
    } catch (err) {
      setStatus(err)
    }
  }

  return (
    <div className="box-border flex flex-col items-center justify-start w-screen h-screen ">
      <Head>
        <title>Vizlizer 2 Controller</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-wrap justify-center max-w-xl px-4 py-8 my-2 bg-gray-100">
        <div className="flex flex-col justify-start m-auto">
          <div>
            <form className="flex flex-col items-center justify-center" onSubmit={onSubmit1}>
              <input
                name="text1"
                id="text1"
                type="text"
                value={tempData.text1}
                placeholder={data.text1}
                onChange={onChange}
                className="box-border block w-full px-4 py-1 m-4 mb-0 border-2 border-gray-400 border-solid"
              />

              <div>
                <button
                  type="submit"
                  className="inline-block px-4 py-1 m-4 bg-blue-100 border-2 border-blue-500 border-solid rounded-md"
                >
                  Submit
                </button>
                <button
                  onClick={clearText1}
                  className="inline-block px-4 py-1 m-4 bg-gray-100 border-2 border-gray-500 border-solid rounded-md"
                >
                  Clear
                </button>
              </div>
            </form>

            <form className="flex flex-col items-center justify-center" onSubmit={onSubmit2}>
              <input
                name="text2"
                id="text2"
                type="text"
                value={tempData.text2}
                placeholder={data.text2}
                onChange={onChange}
                className="box-border block w-full px-4 py-1 m-4 mb-0 border-2 border-gray-400 border-solid"
              />

              <div>
                <button
                  type="submit"
                  className="inline-block px-4 py-1 m-4 bg-blue-100 border-2 border-blue-500 border-solid rounded-md"
                >
                  Submit
                </button>
                <button
                  onClick={clearText2}
                  className="inline-block px-4 py-1 m-4 bg-gray-100 border-2 border-gray-500 border-solid rounded-md"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>

          <h2 className="my-2 text-center">CSS classes</h2>
          <div className="flex flex-row flex-wrap justify-center">
            {clientClasses.map((clientClass, index) => (
              <button
                key={index}
                className={cx(
                  clientClass === data.clientClass && 'bg-red-200 border-red-400 text-gray-900',
                  clientClass !== data.clientClass && 'bg-yellow-100 border-yellow-400 text-gray-500',
                  "uppercase px-4 py-1 mx-2 my-2 border-solid border-2 rounded-md"
                )}
                onClick={() => setClientClass(clientClass)}
              >
                {clientClass}
              </button>
            ))}
          </div>

          <h2 className="my-2 text-center">Fonts</h2>
          <div className="flex flex-row flex-wrap justify-center">
            {fonts.map((font, index) => (
              <button
                key={index}
                className={cx(
                  data.font === font && 'bg-red-200 border-red-400 text-gray-900',
                  data.font !== font && 'bg-indigo-100 border-indigo-400 text-gray-500',
                  "uppercase px-4 py-1 mx-2 my-2 border-solid border-2 rounded-md"
                )}
                onClick={() => setFont(font)}
              >
                {font}
              </button>
            ))}
          </div>

          <h2 className="my-2 text-center">Text colors</h2>
          <div className="flex flex-row flex-wrap justify-center">
            {fontColors.map((fontColor, index) => (
              <button
                key={index}
                className={cx(
                  data.fontColor === fontColor && 'bg-red-200 border-red-400 text-gray-900',
                  data.fontColor !== fontColor && 'bg-yellow-100 border-yellow-400 text-gray-500',
                  "uppercase px-4 py-1 mx-2 my-2 border-solid border-2 rounded-md"
                )}
                onClick={() => setFontColor(fontColor)}
              >
                {fontColor}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* <div className="w-full mt-8">
        <h2 className="mt-4">Status</h2>
        <pre className="">
          {JSON.stringify(status, null, 2)}
        </pre>

        <h2 className="mt-4">Data</h2>
        <pre className="">
          {JSON.stringify(data, null, 2)}
        </pre>

        <h2 className="mt-4">TempData</h2>
        <pre className="">
          {JSON.stringify(tempData, null, 2)}
        </pre>
      </div> */}
    </div>
  )
}
