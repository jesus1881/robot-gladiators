for (var i = 0; i < enemyInfo; i++) {
    console.log(enemyInfo[i]);
    console.log(i);
    console.log(enemyInfo[i] + " is at " + i + " index");
}
// fight or skip fucntion
var fightOrSkip = function () {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
    // conditional recursive statement
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provied a valid answer");
        return fightOrSkip();
    }
    // if player picks "skip" confirm and then stop the loop
    promptFight = promptFight.toLowerCase();
    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            //shop();
            return true;
        }
        else {
            fightOrSkip();
        }
    }
}
var fight = function (enemy) {
    // repeat and execute the as long as the eney robot is alive
    while (playerInfo.health > 0 && enemy.health > 0) {
        if (fightOrSkip()) {
            // if true, leave the fight by breaking the loop
            break;
        }
        // remove enemy's health by subtracting the amount set in the playerAttack variable
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack)
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        // check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        // remove player's health by subtracting the amount set in the enemy.attack variable
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }

    }


}


//function start game
var startGame = function () {
    //reset player stats
    playerInfo.reset();
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // let player know what round they are in, remember the array starts 0 add 1
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            // pick new enemy to  fight based on the index of the enemyArray
            var pickedEnemyObj = enemyInfo[i];
            // reset enemyHealth before statrting the new fight
            pickedEnemyObj.health = randomNumber(40, 60);
            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyObj);
            // if player is still alive and we're not at the last enemy in th array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                //ask player if thye want to use the shop
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in batlle! Game Over!");
            break;
        }
    }
    // after loop ends, player is eitther out of health or enemies to fight, run end game fucntion
    endGame();
};
// function end game the entire game
var endGame = function () {
    //if player still alive, player wins
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survive the game! You now have a score of " + playerInfo.money);
    }
    else {
        window.alert("You have lost robot in battle.");
    }
    //ask player play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

// shop function
var shop = function () {
    var shoppingOptionPrompt = window.prompt(
        "Would tou like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    switch (shoppingOptionPrompt) {
        case "REFILL": // new case
        case "refill":
            playerInfo.refillHealth();
            break;
        case "UPGRADE": // new case
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
        case "LEAVE": // new case
        case "leave":
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }

}
// function to generate a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
};
// funciton set name
var getPlayerName = function () {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?")
    }
    console.log("Your robot's name is" + name)
    return name;
};
// playerInfo
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling players health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You do not have  enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.moneu >= 7) {
            window.alert("Uprgrading player attack by 6 for 7 dollars.")
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You do not have enough money!");
        }
    }

};

console.log(playerInfo.name, playerInfo.attack, playerInfo.health);
//enemyInfo 
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }

];
//startGame
startGame();