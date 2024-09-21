import { useState } from "react";
import styles from "./Quiz.module.css";
import { data } from "../../assets/Data"; // Adjust the path as needed

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAnswerClick = (option) => {
    if (!answered) {
      const isCorrect = data[index].correctAnswer === option;
      setFeedback(isCorrect ? "correct" : "wrong");
      if (isCorrect) {
        setScore(score + 1);
      }
      setAnswered(true);
    }
  };

  const handleNextClick = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
      setSelectedOption("");
      setAnswered(false);
      setFeedback("");
    } else {
      setQuizComplete(true); // Mark the quiz as complete
    }
  };

  const question = data[index];

  const getResultMessage = () => {
    if (score === data.length)
      return "Very Good! You answered all questions correctly.";
    if (score >= 8) return "Good job! You got most of the questions right.";
    if (score >= 5) return "You did okay, but there's room for improvement.";
    return "Bad job! Try to review the material and try again.";
  };

  return (
    <div className={styles.quizContainer}>
      <h1>Quiz App</h1>
      <hr />

      {!quizComplete ? (
        <div className={styles.questionContainer}>
          <h2>
            Question {index + 1} of {data.length}:
          </h2>
          <p>
            {index + 1}- {question.question}
          </p>
          <ul>
            <li
              className={
                answered
                  ? feedback === "correct" && selectedOption === "option1"
                    ? styles.correct
                    : feedback === "wrong" && selectedOption === "option1"
                    ? styles.wrong
                    : ""
                  : ""
              }
              onClick={() => handleAnswerClick("option1")}
            >
              <label>
                <input
                  type="radio"
                  name={`question${index}`}
                  value="option1"
                  checked={selectedOption === "option1"}
                  onChange={handleOptionChange}
                  disabled={answered}
                />
                A- {question.option1}
              </label>
            </li>
            <li
              className={
                answered
                  ? feedback === "correct" && selectedOption === "option2"
                    ? styles.correct
                    : feedback === "wrong" && selectedOption === "option2"
                    ? styles.wrong
                    : ""
                  : ""
              }
              onClick={() => handleAnswerClick("option2")}
            >
              <label>
                <input
                  type="radio"
                  name={`question${index}`}
                  value="option2"
                  checked={selectedOption === "option2"}
                  onChange={handleOptionChange}
                  disabled={answered}
                />
                B- {question.option2}
              </label>
            </li>
            <li
              className={
                answered
                  ? feedback === "correct" && selectedOption === "option3"
                    ? styles.correct
                    : feedback === "wrong" && selectedOption === "option3"
                    ? styles.wrong
                    : ""
                  : ""
              }
              onClick={() => handleAnswerClick("option3")}
            >
              <label>
                <input
                  type="radio"
                  name={`question${index}`}
                  value="option3"
                  checked={selectedOption === "option3"}
                  onChange={handleOptionChange}
                  disabled={answered}
                />
                C- {question.option3}
              </label>
            </li>
            <li
              className={
                answered
                  ? feedback === "correct" && selectedOption === "option4"
                    ? styles.correct
                    : feedback === "wrong" && selectedOption === "option4"
                    ? styles.wrong
                    : ""
                  : ""
              }
              onClick={() => handleAnswerClick("option4")}
            >
              <label>
                <input
                  type="radio"
                  name={`question${index}`}
                  value="option4"
                  checked={selectedOption === "option4"}
                  onChange={handleOptionChange}
                  disabled={answered}
                />
                D- {question.option4}
              </label>
            </li>
          </ul>
          <button
            className={styles.nextButton}
            onClick={handleNextClick}
            disabled={!answered}
          >
            Next
          </button>
        </div>
      ) : (
        <div className={styles.resultContainer}>
          <h2>Quiz Complete!</h2>
          <p>{getResultMessage()}</p>
          <p>
            Your score: {score} out of {data.length}
          </p>
        </div>
      )}

      <div className={styles.progressContainer}>
        <p>
          Question {index + 1} of {data.length} - Answered: {score} out of{" "}
          {data.length}
        </p>
      </div>
    </div>
  );
};

export default Quiz;
