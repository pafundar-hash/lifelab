import { useRef, useState } from 'react'

function BioScanRoom() {
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState('')
  const [cameraOpen, setCameraOpen] = useState(false)
  const [stream, setStream] = useState(null)
  const [identifying, setIdentifying] = useState(false)
const [identification, setIdentification] = useState(null)
const [error, setError] = useState('')
  const videoRef = useRef(null)
  const fileInputRef = useRef(null)

  function handleImageUpload(event) {
    async function identifyPlant() {
  if (!image) return

  setIdentifying(true)
  setIdentification(null)
  setError('')

  try {
    const response = await fetch(image)
    const blob = await response.blob()

    const formData = new FormData()
    formData.append('image', blob, 'plant-observation.jpg')

    const result = await fetch('http://localhost:5000/api/identify-plant', {
      method: 'POST',
      body: formData
    })

    const data = await result.json()

    if (!result.ok) {
      throw new Error(data.error || 'Plant identification failed.')
    }

    setIdentification(data)
  } catch (err) {
    setError(err.message || 'Something went wrong. Please try again.')
  } finally {
    setIdentifying(false)
  }
}
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      return
    }

    if (image?.startsWith('blob:')) {
      URL.revokeObjectURL(image)
    }

    setImage(URL.createObjectURL(file))
    setFileName(file.name)
  }

  async function openCamera() {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false
      })

      setStream(mediaStream)
      setCameraOpen(true)

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      }, 100)
    } catch {
      alert('Camera access failed. Please allow camera permission or upload a photo instead.')
    }
  }

  function closeCamera() {
    stream?.getTracks().forEach(track => track.stop())
    setStream(null)
    setCameraOpen(false)
  }

  function capturePhoto() {
    const video = videoRef.current

    if (!video || !video.videoWidth) return

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    const photo = canvas.toDataURL('image/jpeg', 0.9)

    if (image?.startsWith('blob:')) {
      URL.revokeObjectURL(image)
    }

    setImage(photo)
    setFileName('Camera capture.jpg')
    closeCamera()
  }

  return (
    <main className="bioscan-page">
      <header className="bioscan-heading">
        <span className="bioscan-eyebrow">LIFELAB ORGANISM DISCOVERY</span>
        <h1>🌿 BioScan Room</h1>
        <p>
          Capture or upload an organism photo to begin your biological discovery.
        </p>
      </header>

      <section className="bioscan-types">
        <div>🌱 <span>Plants</span></div>
        <div>🦋 <span>Animals</span></div>
        <div>🍄 <span>Fungi</span></div>
      </section>

      <section className="bioscan-upload">
        <div className="bioscan-upload-icon">📷</div>
        <h2>Start your observation</h2>
        <p>Use your camera or choose an image from your device.</p>

        <div className="bioscan-actions">
          <button onClick={openCamera}>Open Camera</button>

          <button onClick={() => fileInputRef.current?.click()}>
            Upload Photo
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          hidden
        />
      </section>

      {cameraOpen && (
        <section className="bioscan-camera">
          <h2>Camera Preview</h2>

          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="bioscan-video"
          />

          <div className="bioscan-actions">
            <button onClick={capturePhoto}>Capture Photo</button>
            <button onClick={closeCamera}>Cancel</button>
          </div>
        </section>
      )}

      {image && (
        <section className="bioscan-preview">
          <div>
            <span className="bioscan-eyebrow">YOUR OBSERVATION</span>
            <h2>Image Preview</h2>
            <p>{fileName}</p>
          </div>

          <img src={image} alt="Uploaded organism observation" />

          <div className="bioscan-identification">
  <button
    onClick={identifyPlant}
    disabled={identifying}
  >
    {identifying ? 'Identifying Plant...' : '🔍 Identify Plant'}
  </button>

  {error && (
    <p className="bioscan-error">{error}</p>
  )}
</div>
        </section>
      )}
   
      {identification && (
        <section className="bioscan-results">
          <span className="bioscan-eyebrow">IDENTIFICATION RESULTS</span>
          <h2>🌿 Possible Plant Matches</h2>

          {identification.results?.length > 0 ? (
            identification.results.slice(0, 5).map((item, index) => (
              <article
                className="bioscan-result-card"
                key={item.species?.scientificNameWithoutAuthor || index}
              >
                <h3>
                  {item.species?.scientificNameWithoutAuthor || 'Unknown species'}
                </h3>

                <p>
                  Common names: {item.species?.commonNames?.join(', ') || 'Not available'}
                </p>

                <p>
                  Family: {item.species?.family?.scientificNameWithoutAuthor || 'Not available'}
                </p>

                <p>
                  Confidence: {((item.score || 0) * 100).toFixed(1)}%
                </p>
              </article>
            ))
          ) : (
            <p>No likely plant matches were returned. Try another clear photo.</p>
          )}

          <p className="bioscan-note">
            These are automated suggestions, not definitive scientific identifications.
            Verify important findings using reliable botanical references.
          </p>
        </section>
      )}
    </main>
  )
}


export default BioScanRoom