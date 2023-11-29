export default function Overlay() {
  return (
    <div className='container'>
      <div className='main-title'>
        <h1>Holographic</h1>

        <div className='buttons'>
          <button
            onClick={() => {
              window.open(
                'https://github.com/ektogamat/threejs-holographic-material',
                'tab'
              )
            }}
          >
            DOWNLOAD FOR REACT THREE FIBER
          </button>
          <button disabled>VANILLA THREE.JS COMMING SOON</button>
        </div>

        <h2>
          <p>
            New Three.js Material by{' '}
            <a href='https://andersonmancini.dev'>Anderson Mancini</a>  - Credits:
            <a
              href='https://sketchfab.com/3d-models/star-wars-darth-vader-3d-printable-6077450fdd9d4da199d438d622c0e1ee'
              target='_blank'
            >
              {' '}
              Vader -{' '}
            </a>
            <a
              href='https://sketchfab.com/3d-models/holo-puck-4b8be9e0e41d4611a99e9641ee0f83f0'
              target='_blank'
            >
              Puck -{' '}
            </a>
            <a
              href='https://sketchfab.com/3d-models/bb-8-starwars-toy-25409a8dde8b4e7c9df6485a70df2484'
              target='_blank'
            >
              BB8
            </a>
          </p>
        </h2>
      </div>
    </div>
  )
}
