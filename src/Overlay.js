export default function Overlay() {
  return (
    <div className='container'>
      <div className='main-title'>
        <h1>Holographic</h1>
        <h2>
          New Three.js Material by{' '}
          <a href='https://andersonmancini.dev'>Anderson Mancini</a>
        </h2>
        <div className='buttons'>
          <button
            onClick={() => {
              window.open('https://github.com/ektogamat/threejs-holographic-material', 'tab')
            }}
          >
            DOWNLOAD FOR REACT THREE FIBER
          </button>
          <button disabled>DOWNLOAD FOR VANILLA THREE.JS</button>
        </div>
      </div>
    </div>
  )
}
