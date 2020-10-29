const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMsgs: []
        }
    },
    methods: {
        attackMonster(){
            this.currentRound++
            const attackValue = getRandomValue(5,12);
            this.monsterHealth -= attackValue;
            this.addLogMsg('player', 'attacks', attackValue);
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandomValue(8,15);
            this.playerHealth -= attackValue;
            this.addLogMsg('monster', 'attacks', attackValue);
        },
        specialAttackMonster(){
            this.currentRound++
            const attackValue = getRandomValue(10,25);
            this.monsterHealth -= attackValue;
            this.addLogMsg('player', 'special attacks', attackValue);
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;
            const healValue = getRandomValue(8,20);
            ((this.playerHealth + healValue) > 100) ? this.playerHealth = 100 : this.playerHealth += healValue;
            this.addLogMsg('player', 'heal', healValue);
            this.attackPlayer();
        },
        restartGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMsgs = [];
        },
        surrender(){
            this.winner = 'surrender'
        },
        addLogMsg(who, what, value){
            this.logMsgs = [
                {
                    actionBy: who,
                    actionType: what,
                    actionValue: value
                },
                ...this.logMsgs
            ];
        }
    },
    computed: {
        reducePlayerBarHealth(){
            if(this.playerHealth  < 0){
                return { width: '0%' }
            }
            return { width: `${this.playerHealth}%` }
        },
        reduceMonsterBarHealth(){
            if(this.monsterHealth  < 0){
                return { width: '0%' }
            }
            return { width: `${this.monsterHealth}%` }
        },
        ableSpecialAttack(){
            return this.currentRound % 3 !== 0;
        },
        resultMsg(){
            return (this.winner === 'player') ? 'Congratulations!!' : 'Game over!'
        }
    },
    watch: {
        playerHealth(health){
            if (health <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if(health <= 0) {
                this.winner = 'monster';
            }

        },
        monsterHealth(health){
            if(health <= 0 && this.playerHealth <= 0){
                this.winner = 'draw';
            } else if(health <= 0){
                this.winner = 'player';
            }
        }
    },
});

app.mount('#game')