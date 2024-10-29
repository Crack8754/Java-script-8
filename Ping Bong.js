class Player {
    constructor(name, activeHand) {
        this.name = name;
        this.activeHand = activeHand;
        this.actions = ['hit', 'miss'];
    }

    serve() {
        console.log(`${this.name} робить подачу!`);
    }

    hit() {
        console.log(`${this.name} відбиває м'яч!`);
    }

    miss() {
        console.log(`${this.name} пропускає м'яч!`);
    }

    getRandomAction() {
        const action = this.actions[Math.floor(Math.random() * this.actions.length)];
        return action;
    }
}

class Scoreboard {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.scores = { [player1.name]: 0, [player2.name]: 0 };
    }

    addPoint(player) {
        this.scores[player.name]++;
    }

    displayScore() {
        console.log(`Рахунок: ${this.player1.name}: ${this.scores[this.player1.name]} - ${this.player2.name}: ${this.scores[this.player2.name]}`);
    }

    hasWinner() {
        return this.scores[this.player1.name] >= 21 || this.scores[this.player2.name] >= 21;
    }

    getWinner() {
        if (this.scores[this.player1.name] >= 21) return this.player1.name;
        if (this.scores[this.player2.name] >= 21) return this.player2.name;
        return null;
    }
}

class GameEngine {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.scoreboard = new Scoreboard(player1, player2);
        this.currentServer = player1; 
    }

    play() {
        this.currentServer.serve();
        while (!this.scoreboard.hasWinner()) {
            const action1 = this.player1.getRandomAction();
            const action2 = this.player2.getRandomAction();

            if (action1 === 'miss') {
                this.player1.miss();
                this.scoreboard.addPoint(this.player2);
            } else {
                this.player1.hit();
            }

            if (action2 === 'miss') {
                this.player2.miss();
                this.scoreboard.addPoint(this.player1);
            } else {
                this.player2.hit();
            }

            this.scoreboard.displayScore();
        }

        console.log(`Переможець: ${this.scoreboard.getWinner()}!`);
    }
}

const player1 = new Player("Віктор", "ліва");
const player2 = new Player("Віка", "права");

const game = new GameEngine(player1, player2);
game.play();