import React, { useState } from 'react';
import { AceIcon, BalancerIcon, PowerIcon, FlexIcon } from './icons';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const questionsData = [
  {
    id: 1,
    text: "買い物をするとき、どのように品物を選びますか？",
    options: [
      { text: "すぐに決める", type: "エース" },
      { text: "価格や品質を慎重に比較する", type: "バランサー" },
      { text: "友人や店員に意見を求める", type: "パワー" },
      { text: "直感で選ぶ", type: "フレックス" },
    ],
  },
  {
    id: 2,
    text: "スケジュールを管理するとき、どの方法が一番しっくりきますか？",
    options: [
      { text: "きちんとした計画を立てる", type: "エース" },
      { text: "その場で臨機応変に対応する", type: "バランサー" },
      { text: "細かいことにこだわらない", type: "パワー" },
      { text: "周囲と調整しながら進める", type: "フレックス" },
    ],
  },
  {
    id: 3,
    text: "問題が発生したとき、どのように対処しますか？",
    options: [
      { text: "迅速に行動する", type: "エース" },
      { text: "落ち着いて考える", type: "バランサー" },
      { text: "友人や同僚に相談する", type: "パワー" },
      { text: "自分の直感を信じる", type: "フレックス" },
    ],
  },
  {
    id: 4,
    text: "重要な決断をする際、どのように考えますか？",
    options: [
      { text: "即断即決", type: "エース" },
      { text: "細部まで検討する", type: "バランサー" },
      { text: "人の意見を参考にする", type: "パワー" },
      { text: "感覚で決める", type: "フレックス" },
    ],
  },
  {
    id: 5,
    text: "ストレスを感じたとき、どのように対処しますか？",
    options: [
      { text: "体を動かす", type: "エース" },
      { text: "落ち着いて考える", type: "バランサー" },
      { text: "誰かに話す", type: "パワー" },
      { text: "リラックスする方法を見つける", type: "フレックス" },
    ],
  },
  {
    id: 6,
    text: "初対面の人と話すとき、どのように感じますか？",
    options: [
      { text: "すぐに打ち解ける", type: "エース" },
      { text: "少し時間がかかるが話せる", type: "バランサー" },
      { text: "相手の出方を見ながら話す", type: "パワー" },
      { text: "自然に話せる", type: "フレックス" },
    ],
  },
  {
    id: 7,
    text: "新しいことに挑戦するとき、どのように感じますか？",
    options: [
      { text: "ワクワクする", type: "エース" },
      { text: "少し不安だが興味がある", type: "バランサー" },
      { text: "慎重に考える", type: "パワー" },
      { text: "自然に受け入れる", type: "フレックス" },
    ],
  },
  {
    id: 8,
    text: "自分自身についてどのように感じますか？",
    options: [
      { text: "明確な目標を持っている", type: "エース" },
      { text: "自分のペースで進む", type: "バランサー" },
      { text: "他人の意見を気にする", type: "パワー" },
      { text: "自然体でいることが多い", type: "フレックス" },
    ],
  },
  {
    id: 9,
    text: "日常生活で物を持ち上げるとき、どのように力を入れますか？",
    options: [
      { text: "つま先に体重をかける", type: "エース" },
      { text: "足全体に力を入れる", type: "バランサー" },
      { text: "かかとに体重をかける", type: "パワー" },
      { text: "バランスよく力を入れる", type: "フレックス" },
    ],
  },
  {
    id: 10,
    text: "スポーツをする際、どのように動くと一番しっくりきますか？",
    options: [
      { text: "素早い動き", type: "エース" },
      { text: "力強い動き", type: "バランサー" },
      { text: "柔軟な動き", type: "パワー" },
      { text: "安定した動き", type: "フレックス" },
    ],
  },
  {
    id: 11,
    text: "立っているとき、体重はどこに感じますか？",
    options: [
      { text: "つま先", type: "エース" },
      { text: "足の中央", type: "バランサー" },
      { text: "かかと", type: "パワー" },
      { text: "足全体", type: "フレックス" },
    ],
  },
  {
    id: 12,
    text: "歩くときの体重移動はどのように感じますか？",
    options: [
      { text: "つま先からかかと", type: "エース" },
      { text: "足全体を使っている", type: "バランサー" },
      { text: "かかとからつま先", type: "パワー" },
      { text: "バランスよく移動", type: "フレックス" },
    ],
  },
  {
    id: 13,
    text: "重い物を持つとき、どのような姿勢が一番安定しますか？",
    options: [
      { text: "前に傾く", type: "エース" },
      { text: "後ろに傾く", type: "バランサー" },
      { text: "足全体に力を入れる", type: "パワー" },
      { text: "上半身に力を入れる", type: "フレックス" },
    ],
  },
  {
    id: 14,
    text: "柔軟性を必要とする動きはどのように感じますか？",
    options: [
      { text: "簡単にできる", type: "エース" },
      { text: "やや困難", type: "バランサー" },
      { text: "困難", type: "パワー" },
      { text: "バランスよくできる", type: "フレックス" },
    ],
  },
  {
    id: 15,
    text: "突然の動きに対して、どのように反応しますか？",
    options: [
      { text: "素早く反応", type: "エース" },
      { text: "強く反応", type: "バランサー" },
      { text: "柔軟に反応", type: "パワー" },
      { text: "安定して反応", type: "フレックス" },
    ],
  },
  {
    id: 16,
    text: "運動中の力のバランスはどう感じますか？",
    options: [
      { text: "つま先寄り", type: "エース" },
      { text: "中央", type: "バランサー" },
      { text: "かかと寄り", type: "パワー" },
      { text: "全体的に均等", type: "フレックス" },
    ],
  },
  {
    id: 17,
    text: "運動後の疲労感はどこに感じますか？",
    options: [
      { text: "足の前部", type: "エース" },
      { text: "足全体", type: "バランサー" },
      { text: "足の後部", type: "パワー" },
      { text: "全身", type: "フレックス" },
    ],
  },
  {
    id: 18,
    text: "どのスポーツが得意ですか？",
    options: [
      { text: "スプリント", type: "エース" },
      { text: "重量挙げ", type: "バランサー" },
      { text: "ヨガ", type: "パワー" },
      { text: "長距離走", type: "フレックス" },
    ],
  },
];

function App() {
  const [questions] = useState(questionsData);  // setQuestionsは削除
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({ エース: 0, バランサー: 0, パワー: 0, フレックス: 0 });

  const handleAnswer = (type) => {
    setAnswers((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(currentQuestion + 1);  // Move to results
    }
  };

  return (
    <div>
      {questions.length > 0 && currentQuestion < questions.length ? (
        <Question question={questions[currentQuestion]} onAnswer={handleAnswer} />
      ) : (
        <Results results={answers} />
      )}
    </div>
  );
}

function Question({ question, onAnswer }) {
  return (
    <div>
      <h2>{question.text}</h2>
      {question.options.map((option) => (
        <button key={option.text} onClick={() => onAnswer(option.type)}>
          {option.text}
        </button>
      ))}
    </div>
  );
}

function Results({ results }) {
  const data = {
    labels: ['エース', 'バランサー', 'パワー', 'フレックス'],
    datasets: [
      {
        label: 'Your Stance Type',
        data: [results.エース, results.バランサー, results.パワー, results.フレックス],
        backgroundColor: 'rgba(34, 202, 236, 0.2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        borderWidth: 2,
      },
    ],
  };

  const maxType = Object.keys(results).reduce((a, b) => results[a] > results[b] ? a : b);

  return (
    <div>
      <h2>診断結果</h2>
      <div style={{ width: '300px', height: '300px' }}>
        <Radar data={data} />
      </div>
      <h3>あなたは{maxType}タイプです</h3>
      <div>
        <img src={{ エース: AceIcon, バランサー: BalancerIcon, パワー: PowerIcon, フレックス: FlexIcon }[maxType]} alt={maxType} style={{ width: '50px', height: '50px' }} />
      </div>
    </div>
  );
}

export default App;
