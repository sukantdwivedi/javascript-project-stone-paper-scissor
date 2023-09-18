const openRule = document.getElementById("rule-button")
const cloaseRule = document.getElementById("close-rule")
const gameRule = document.getElementById("game-rule")
// ---------------------------------------------------
const nextBtn = document.getElementById("next");

openRule.addEventListener("click", ()=>{
    gameRule.style.visibility = "visible";
});
cloaseRule.addEventListener("click", ()=>{
    gameRule.style.visibility = "hidden";
});

const rock = document.getElementById("rock");
const scissor = document.getElementById("scissor");
const paper = document.getElementById("paper");
const main = document.querySelector("main");
const yourScore = document.getElementById("your-score");
const computerScore = document.getElementById("computer-score");

// local storage ----------------------
let gameScoreData = {
    pc: 0,
    user: 0,
};
let getScore = JSON.parse(localStorage.getItem("score"));
console.log(getScore);
if (getScore) {
    computerScore.innerHTML = getScore.pc;
    yourScore.innerHTML = getScore.user;
}
const playAgain = () => {
    openRule.style.right = "3rem";
    nextBtn.style.visibility = "hidden";
    main.innerHTML = "";
    return (main.innerHTML = `
        <div class="play-game">
            <button onclick='playGameStart(id)' id="rock" class="rock">
              <div><img src="/images/rock.png" alt="" /></div>
              <img src="./images/Line1.png" alt="" class="line1" />
            </button>
            <button onclick='playGameStart(id)' id="scissor" class="scissor">
              <div><img src="/images/scissor.png" alt="" /></div>
              <img src="./images/Line2.png" alt="" class="line2" />
            </button>
            <button onclick='playGameStart(id)' id="paper" class="paper">
              <div><img src="/images/paper.png" alt="" /></div>
              <img src="./images/Line3.png" alt="" class="line3" />
            </button>
          </div>
    `);
};
const playGameStart = (id) => {
    let pcChoice = ['rock', 'paper', 'scissor'];
    let pcChoiceName = pcChoice[Math.floor(Math.random() * 3 + 1)]
    let myChoice = id;
    let changeBorderColor = () => {
      if (tieUpBorderColor === false) {
        if (myChoice === "rock") {
          document.getElementsByClassName("innerWin")[0].style.backgroundColor =
            "#0074b6";
        } else if (myChoice === "paper") {
          document.getElementsByClassName("innerWin")[0].style.backgroundColor =
            "#ffa943";
        } else if (myChoice === "scissor") {
          document.getElementsByClassName("innerWin")[0].style.backgroundColor =
            "#bd00ff";
        }
        if (pcChoiceName === "rock") {
          document.getElementsByClassName("innerLose")[0].style.backgroundColor =
            "#0074b6";
        } else if (pcChoiceName === "paper") {
          document.getElementsByClassName("innerLose")[0].style.backgroundColor =
            "#ffa943";
        } else if (pcChoiceName === "scissor") {
          document.getElementsByClassName("innerLose")[0].style.backgroundColor =
            "#bd00ff";
        }
      }
      if (tieUpBorderColor === true) {
        if (pcChoiceName === "rock") {
          userPickTieUp.style.backgroundColor = "#0074b6";
          pcPickTieUp.style.backgroundColor = "#0074b6";
        } else if (pcChoiceName === "paper") {
          userPickTieUp.style.backgroundColor = "#ffa943";
          pcPickTieUp.style.backgroundColor = "#ffa943";
        } else if (pcChoiceName === "scissor") {
          userPickTieUp.style.backgroundColor = "#bd00ff";
          pcPickTieUp.style.backgroundColor = "#bd00ff";
        }
      }
      tieUpBorderColor = false;
    };
    if (pcChoiceName === myChoice) {
      openRule.style.right = "3rem";
      nextBtn.style.visibility = "hidden";

      try {
        main.innerHTML = "";
        return (main.innerHTML = `
      <div class="tieUp">
          <div id='userPickTieUp' class="userPickTieUp">
            <p class="tieUpText">YOU PICKED</p>
            <div>
              <img src="/images/${id}.png" alt="" />
            </div>
          </div>
          <div id='pcPickTieUp' class="pcPickTieUp">
            <p class="tieUpText">PC PICKED</p>
            <div>
              <img src="/images/${pcChoiceName}.png" alt="" />
            </div>
          </div>
          <div class="tieUpResText">
            <h3>TIE UP</h3>
            <button onclick='playAgain()'>REPLAY</button>
          </div>
        </div>
      `);
      } finally {
        tieUpBorderColor = true;
        changeBorderColor();
      }
    } else if (
      (myChoice === "rock" && pcChoiceName === "scissor") ||
      (myChoice === "paper" && pcChoiceName === "rock") ||
      (myChoice === "scissor" && pcChoiceName === "paper")
    ) {
      // winning situation......
      openRule.style.right = "12rem";
      nextBtn.style.visibility = "visible";
      let localBroswerDAta = JSON.parse(localStorage.getItem("score"));
      if (
        localBroswerDAta !== null &&
        localBroswerDAta.user !== 0 &&
        localBroswerDAta.user !== null
      ) {

        let scoreData = JSON.parse(localStorage.getItem("score"));
        scoreData.user++;
        localStorage.setItem("score", JSON.stringify(scoreData));
        let updatedScore = JSON.parse(localStorage.getItem("score"));
        yourScore.innerHTML = updatedScore.user;
      } else if (gameScoreData.user === 0) {
        gameScoreData.user++;
        localStorage.setItem("score", JSON.stringify(gameScoreData));
        let scoreData = JSON.parse(localStorage.getItem("score"));
        yourScore.innerHTML = scoreData.user;
      }
      try {
        main.innerHTML = "";
        return (main.innerHTML = `
      <div class="gameResult winningGame">
          <div class="userPick">
            <div class="fistInner">
              <div class="secondInner">
                <div class="innerWin">
                  <div class="resPlay">
                    <img src="./images/${id}.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <p class="userPickText">YOU PICKED</p>
          </div>
          <div class="computerPick">
            <div class="innerLose">
              <div class="resPlay"><img src="./images/${pcChoiceName}.png" alt="" /></div>
            </div>
            <p class="pcPickText">PC PICKED</p>
          </div>
          <div class="winResultText">
            <h3>YOU WIN</h3>
            <p>AGAINST PC</p>
            <button onclick='playAgain()'>PLAY AGAIN</button>
          </div>
        </div>
      `);
      } finally {
        changeBorderColor();
      }
    } else if (
      (myChoice === "scissor" && pcChoiceName === "rock") ||
      (myChoice === "rock" && pcChoiceName === "paper") ||
      (myChoice === "paper" && pcChoiceName === "scissor")
    ) {
      openRule.style.right = "3rem";
      nextBtn.style.visibility = "hidden";
      // losing situation.....
      let localBroswerDAta = JSON.parse(localStorage.getItem("score"));
      if (
        localBroswerDAta !== null &&
        localBroswerDAta.pc !== 0 &&
        localBroswerDAta.pc !== null
      ) {
        
        let scoreData = JSON.parse(localStorage.getItem("score"));
        scoreData.pc++;
        localStorage.setItem("score", JSON.stringify(scoreData));
        let updatedScore = JSON.parse(localStorage.getItem("score"));
        computerScore.innerHTML = updatedScore.pc;
      } else if (gameScoreData.pc === 0) {
        gameScoreData.pc++;
        localStorage.setItem("score", JSON.stringify(gameScoreData));
        let scoreData = JSON.parse(localStorage.getItem("score"));
        computerScore.innerHTML = scoreData.pc;
      }
      try {
        main.innerHTML = "";
        return (main.innerHTML = `
      <div class="gameResult losingGame">
          <div class="computerPick">
            <div class=" innerLose">
              <div class="resPlay"><img src="./images/${id}.png" alt="" /></div>
            </div>
            <p class="pcPickText">YOUR PICKED</p>
          </div>
          <div class="userPick">
            <div class="fistInner">
              <div class="secondInner">
                <div class="innerWin">
                  <div class="resPlay">
                    <img src="./images/${pcChoiceName}.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <p class="userPickText">PC PICKED</p>
          </div>
          <div class="winResultText">
            <h3>YOU LOST</h3>
            <p>AGAINST PC</p>
            <button onclick='playAgain()'>PLAY AGAIN</button>
          </div>
        </div>
      `);
      } finally {
        changeBorderColor();
      }
    }
};
rock.onclick = () => playGameStart(rock.id);
scissor.onclick = () => playGameStart(scissor.id);
paper.onclick = () => playGameStart(paper.id);