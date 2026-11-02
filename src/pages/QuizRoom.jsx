import { useState } from 'react'

const questions = [
  {
    question: 'What is the basic structural and functional unit of life?',
    options: ['Tissue', 'Cell', 'Organ', 'Organ system'],
    answer: 'Cell',
    explanation: 'The cell is the smallest structural and functional unit of life.'
  },
  {
    question: 'Which organelle is primarily responsible for ATP production?',
    options: ['Ribosome', 'Golgi apparatus', 'Mitochondrion', 'Lysosome'],
    answer: 'Mitochondrion',
    explanation: 'Mitochondria produce most of the ATP used by eukaryotic cells.'
  },
  {
    question: 'What is the primary pigment involved in photosynthesis?',
    options: ['Melanin', 'Chlorophyll', 'Hemoglobin', 'Keratin'],
    answer: 'Chlorophyll',
    explanation: 'Chlorophyll absorbs light energy needed for photosynthesis.'
  },
  {
    question: 'Which molecule carries genetic information?',
    options: ['ATP', 'DNA', 'Glucose', 'Lipid'],
    answer: 'DNA',
    explanation: 'DNA stores hereditary information in most living organisms.'
  },
  {
    question: 'What is the process by which plants lose water vapor through their leaves?',
    options: ['Respiration', 'Transpiration', 'Fermentation', 'Germination'],
    answer: 'Transpiration',
    explanation: 'Transpiration is the loss of water vapor, mainly through leaf stomata.'
  }
]

function QuizRoom() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState('')
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState([])

  function submitAnswer() {
    if (!selected) return

    const correct = selected === questions[current].answer

    if (correct) {
      setScore(score + 1)
    }

    setAnswers([
      ...answers,
      {
        question: questions[current].question,
        selected,
        answer: questions[current].answer,
        correct,
        explanation: questions[current].explanation
      }
    ])

    if (current + 1 === questions.length) {
      setFinished(true)
    } else {
      setCurrent(current + 1)
      setSelected('')
    }
  }

  function restartQuiz() {
    setCurrent(0)
    setSelected('')
    setScore(0)
    setAnswers([])
    setFinished(false)
  }

  return (
    <main style={{ padding: '40px', maxWidth: '850px', margin: 'auto' }}>
      <h1>🧠 Quiz Room</h1>
      <p>Challenge yourself and test your Biology knowledge.</p>

      {finished ? (
        <section>
          <h2>Quiz Completed!</h2>
          <h3>Your Score: {score} / {questions.length}</h3>

          <h3>Answer Review</h3>
          {answers.map((item, index) => (
            <article key={index} style={{ padding: '15px', marginBottom: '12px', border: '1px solid #ddd' }}>
              <strong>{index + 1}. {item.question}</strong>
              <p>Your answer: {item.selected}</p>
              <p>Correct answer: {item.answer}</p>
              <p>{item.correct ? '✓ Correct' : '✗ Incorrect'}</p>
              <p>{item.explanation}</p>
            </article>
          ))}

          <button onClick={restartQuiz}>Try Again</button>
        </section>
      ) : (
        <section>
          <p>Question {current + 1} of {questions.length}</p>

          <h2>{questions[current].question}</h2>

          {questions[current].options.map(option => (
            <label
              key={option}
              style={{
                display: 'block',
                padding: '12px',
                margin: '10px 0',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selected === option}
                onChange={() => setSelected(option)}
              />
              {' '}{option}
            </label>
          ))}

          <button onClick={submitAnswer} disabled={!selected}>
            {current + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
          </button>
        </section>
      )}
    </main>
  )
}

export default QuizRoom