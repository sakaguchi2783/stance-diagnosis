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
import './App.css';

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
      { text: "自分の感覚ですぐに決める", type: "エース" },
      { text: "価格や品質を慎重に比較する", type: "バランサー" },
      { text: "まず友人や店員に聞き、あとは自分の感性で選ぶ", type: "パワー" },
      { text: "直感で将来敵に価値が見込めるもの", type: "フレックス" },
    ],
  },
  {
    id: 2,
    text: "スケジュールを管理するとき、どの方法が一番しっくりきますか？",
    options: [
      { text: "無理なくきちんとした計画を立てる", type: "エース" },
      { text: "その時々によって臨機応変に対応する", type: "バランサー" },
      { text: "細かいことにこだわらず確実にこなせる状態にする", type: "パワー" },
      { text: "周囲と調整しながら進める", type: "フレックス" },
    ],
  },
  {
    id: 3,
    text: "問題が発生したとき、どのように対処しますか？",
    options: [
      { text: "迅速に行動する", type: "エース" },
      { text: "一旦、落ち着いて考える", type: "バランサー" },
      { text: "まず誰かに相談する", type: "パワー" },
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
      { text: "人生はある程度決まっている、だから感覚で決める", type: "フレックス" },
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
      { text: "すぐに打ち解けるが、その後受け入れるかはまた別", type: "エース" },
      { text: "少し時間がかかるが話せる", type: "バランサー" },
      { text: "相手の出方を見ながら話す", type: "パワー" },
      { text: "自然体に話せる", type: "フレックス" },
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
    text: "自分のアイデアを人に説明するとき、どうしますか？",
    options: [
      { text: "すぐに話し始める", type: "エース" },
      { text: "要点だけをまとめて話す", type: "バランサー" },
      { text: "面白さが伝わるように話す", type: "パワー" },
      { text: "直感的に説明する", type: "フレックス" },
    ],
  },
  {
    id: 9,
    text: "ミーティング・会議中、どのように発言しますか？",
    options: [
      { text: "必要ならすぐに自分の意見を言う", type: "エース" },
      { text: "タイミングを見計らって発言する", type: "バランサー" },
      { text: "他の人の意見に同意しながら話す", type: "パワー" },
      { text: "自然に流れに任せて発言する", type: "フレックス" },
    ],
  },
  {
    id: 10,
    text: "自由な時間ができたとき、どう過ごしますか？",
    options: [
      { text: "今やりたいことをすぐに実行", type: "エース" },
      { text: "ゆっくりと考えながら過ごす", type: "バランサー" },
      { text: "やりたかったことややるべきことを実践", type: "パワー" },
      { text: "まず誰と過ごすかを決め計画する", type: "フレックス" },
    ],
  },
  {
    id: 11,
    text: "旅行の計画を立てるとき、どう進めますか？",
    options: [
      { text: "すぐに予定を決めて動き出す", type: "エース" },
      { text: "しっかりとプランを立ててから行動", type: "バランサー" },
      { text: "周囲の人に相談しながら決める", type: "パワー" },
      { text: "その時の状況や気分で決める", type: "フレックス" },
    ],
  },
  {
    id: 12,
    text: "仕事や勉強を始めるとき、どのように取り組みますか？",
    options: [
      { text: "とにかくすぐに始める", type: "エース" },
      { text: "計画を立ててから進める", type: "バランサー" },
      { text: "他の人に相談してから始める", type: "パワー" },
      { text: "その場で決めながら進める", type: "フレックス" },
    ],
  },
  {
    id: 13,
    text: "友人との予定がキャンセルされた場合、どうしますか？",
    options: [
      { text: "すぐに新しい予定を立てる", type: "エース" },
      { text: "時間を有効に使うために考える", type: "バランサー" },
      { text: "他の友人に連絡を取る", type: "パワー" },
      { text: "その瞬間の気分で行動を決める", type: "フレックス" },
    ],
  },
  {
    id: 14,
    text: "新しい趣味を始めるとき、どうしますか？",
    options: [
      { text: "とりあえず、やってみる", type: "エース" },
      { text: "じっくり調べてから始める", type: "バランサー" },
      { text: "先にアドバイスを求めたり、楽しみを見つける", type: "パワー" },
      { text: "その場で感じたことを大切にする", type: "フレックス" },
    ],
  },
  {
    id: 15,
    text: "家事や掃除をするとき、どのように取り組みますか？",
    options: [
      { text: "すぐに手をつける", type: "エース" },
      { text: "計画的に進める", type: "バランサー" },
      { text: "誰かと一緒に取り組む", type: "パワー" },
      { text: "その時の気分で始める", type: "フレックス" },
    ],
  },
  {
    id: 16,
    text: "何か新しい知識を学ぶとき、どうしますか？",
    options: [
      { text: "実際にやってみる", type: "エース" },
      { text: "まずはしっかりと調べてから", type: "バランサー" },
      { text: "他の人に教えてもらう", type: "パワー" },
      { text: "感覚で覚える", type: "フレックス" },
    ],
  },
  {
    id: 17,
    text: "大きなプロジェクトに取り組む際、どう進めますか？",
    options: [
      { text: "すぐに行動に移す", type: "エース" },
      { text: "計画的にステップを踏んで進める", type: "バランサー" },
      { text: "他の人と相談しながら進める", type: "パワー" },
      { text: "その場の状況に合わせて柔軟に進める", type: "フレックス" },
    ],
  },
  {
    id: 18,
    text: "会話中、話題が変わるとき、どう対応しますか？",
    options: [
      { text: "すぐに新しい話題に切り替える", type: "エース" },
      { text: "一度考えてから話す", type: "バランサー" },
      { text: "相手に質問してから話す", type: "パワー" },
      { text: "自然に流れに任せる", type: "フレックス" },
    ],
  },
];


function App() {
  const [showHome, setShowHome] = useState(true);
  const [questions] = useState(questionsData);  // setQuestionsは削除
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({ エース: 0, バランサー: 0, パワー: 0, フレックス: 0 });

  const startQuiz = () => {
    setShowHome(false);
  };

  const handleAnswer = (type) => {
    setAnswers((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(currentQuestion + 1);  // Move to results
    }
  };

  return (
    <div className="container">
      {showHome ? (
        <Home onStart={startQuiz} />
      ) : questions.length > 0 && currentQuestion < questions.length ? (
        <Question question={questions[currentQuestion]} onAnswer={handleAnswer} />
      ) : (
        <Results results={answers} />
      )}
    </div>
  );
}

function Home({ onStart }) {
  return (
    <div id="home">
      <img src="/path/to/スタイル4ロゴサブ - コピー.png" alt="スタイル4ロゴ" />
      <h1>スタイル４</h1>
      <p>あなたはどのタイプ？</p>
      <button onClick={onStart}>タイプ診断スタート</button>
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
      <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
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
