$(document).ready(function(){
	var starWars = {
		hero: "",
		heroHP: 0,
		heroAP: 0,
		dark: "",
		darkHP: 0,
		darkCAP: 0,
		darkSS: 0,
		level: 6,
		skillsCounter: 1,
		poisonCounter: 0,
		bombardment: 0,
		rally: 0,
		fight: false,
		nextMatch: false,	
		heroWin: false,
		darkWin: false,	
		endGame: false,

		wookie: [100, 4, "Wookie", true, "Thick Skin", false, "Empower", false, "Bombardment", false],
		ewok: [120, 4, "Ewok", true, "Poison", false, "Sneak Attack", false, "Rally Tribe", false],
		kyloren: [200, 6, "Kylo Ren", true],
		vader: [250, 15, "Darth Vader", true],

		kylorenSkills: ["Force Drain", "Force Choke", "Thought Bomb"],
		vaderSkills: ["Force Lightning", "Force Destruction", "Force Rage"],

		heroDisplay: function() {			
			if(starWars.hero === starWars.wookie) {				
				$("#arenaHero").attr("src", "assets/images/wookie.jpg");
				$(".statsTextHeroes").html("Wookie:<br> 100 HP<br>Attack Power: 4<br> Power Increment: 4");		
				$(".statsTextHeroes").append("<br><br>Skills: <br>");
				$(".statsTextHeroes").append("1: Thick Skin: Block 100% damage<br>");
				$(".statsTextHeroes").append("2: Empower: Gain 50% of current AP<br>");
				$(".statsTextHeroes").append("3: Bombardment: Inflict 1-50 damage<br>");
				starWars.heroDisplaymicro();
				$("#wookie").addClass("faded");
			}
			else if(starWars.hero === starWars.ewok) {
				$("#arenaHero").attr("src", "assets/images/ewok.jpg");				
				$(".statsTextHeroes").html("Ewok:<br> 120 HP<br>Attack Power: 4<br> Power Increment: 4");
				$(".statsTextHeroes").append("<br><br>Skills: <br>");
				$(".statsTextHeroes").append("1: Poison: Prevent enemy skill<br>");
				$(".statsTextHeroes").append("2: Sneak: Deal 1.3 times AP <br>");
				$(".statsTextHeroes").append("3: Rally: Deal and block 3-12 damage<br>");
				starWars.heroDisplaymicro();
				$("#ewok").addClass("faded");
			}
		},

		heroDisplaymicro: function() {
			$("#arenaHero, .statsTextHeroes").removeClass("invisible");
			$("#arenaHero, .statsTextHeroes").hide();
			$("#arenaHero, .statsTextHeroes").delay(400).fadeIn("slow");	
		},

		darkDisplay: function() {			
			if(starWars.dark === starWars.kyloren) {								
				$("#arenaDark").attr("src", "assets/images/kyloren.jpg");
				$(".statsTextDark").html("Kylo:<br> 200 HP<br> Counter Attack Power: 6");
				$(".statsTextDark").append("<br><br>Skills: <br>");
				$(".statsTextDark").append("Force Drain: Current Hero HP / 10<br>");
				$(".statsTextDark").append("Force Choke: CAP * 3<br>"); 
				$(".statsTextDark").append("Thought Bomb: Initial Hero AP * 2");
				starWars.darkDisplaymicro();									
				$("#kyloren").addClass("faded");
			}

			else if(starWars.dark === starWars.vader) {
				$("#arenaDark").attr("src", "assets/images/vader.jpg");
				$(".statsTextDark").html("Vader:<br> 250 HP <br> Counter Attack Power: 15");
				$(".statsTextDark").append("<br><br>Skills: <br>");
				$(".statsTextDark").append("Force Lightning: Current CAP * 2<br>");
				$(".statsTextDark").append("Force Destruction: Current Hero HP / 2<br>"); 
				$(".statsTextDark").append("Force Rage: Increment CAP by 5");
				starWars.darkDisplaymicro();
				$("#darthvader").addClass("faded");
			}
		},

		darkDisplaymicro: function() {
			$("#arenaDark, .statsTextDark").removeClass("invisible");
			$("#arenaDark, .statsTextDark").hide();						
			$("#arenaDark, .statsTextDark").delay(400).fadeIn("slow");		
		},

		fightStart: function() {
			if (starWars.hero !== "" && starWars.dark !== "") {
				$("#msgBox").html("Use your skills wisely to defeat a Sith.<br>")
				$("#msgBox").append("Skill descriptions are on the left.<br>")
				$("#theButton").html("Attack");
				$("#heroHP").html(starWars.hero[0]);
				$("#heroAP").html(starWars.hero[1]);
				heroHP = starWars.hero[0];
				heroAP = starWars.hero[1];
				$("#darkHP").html(starWars.dark[0]);
				$("#darkCAP").html(starWars.dark[1]);
				darkHP = starWars.dark[0];
				darkCAP = starWars.dark[1];
				$("#heroRTstats, #darkRTStats").removeClass("invisible");
				$("specialBox").empty();
				starWars.fight = true;
			}			
		},

		attack: function() {
			if (heroHP > 0 && darkHP > 0)	{
				darkHP -= heroAP;
				heroHP -= darkCAP;
				heroAP += starWars.hero[1];
				
				starWars.secondSkill();
				starWars.thirdSkill();

				$("#specialBox").html(starWars.hero[2] + " inflicts " + heroAP + " damage<br>");
				if (starWars.hero[2] === "Wookie" && starWars.hero[7] === true) {
					$("#specialBox").append(starWars.hero[2] + " uses Empower - increasing AP by " + (Math.floor(heroAP / 3)) + "<br>");
					starWars.hero[7] = false;					
				}	
				else if (starWars.hero[2] === "Wookie" && starWars.hero[9] === true) {
					$("#specialBox").append(starWars.hero[2] + " uses Bombardment - inflicting extra " + starWars.bombardment + " damage<br>");
					starWars.hero[9] = false;
				}						
				else if (starWars.hero[2] === "Ewok" && starWars.hero[7] === true) {
					$("#specialBox").append(starWars.hero[2] + " uses Sneak - inflicting extra " + (Math.floor(heroAP * 0.3)) + " damage<br>");
					starWars.hero[7] = false;
				}
				else if (starWars.hero[2] === "Ewok" && starWars.hero[9] === true) {
					$("#specialBox").append(starWars.hero[2] + " uses Rally - inflicting extra " + starWars.rally + " damage<br>");
					$("#specialBox").append(starWars.hero[2] + " blocks " + starWars.rally + " damage<br>");
					starWars.hero[9] = false;
				}			

				$("#specialBox").append(starWars.dark[2] + " inflicts " + darkCAP + " damage<br>");

				starWars.firstSkill();

				starWars.darkSpecialSkill();
				heroHP -= starWars.darkSS;
				starWars.skillsCounter ++;				

				if (heroHP <= 0) {
					//$("#msgBox").html(starWars.dark[2] + " has overwhelmed you");
					$("#specialBox").append("<br><br>" + starWars.dark[2] + " has overwhelmed you")
					heroHP = 0;
					if (starWars.hero[2] === 'Wookie') {
						starWars.wookie[3] = false;
					}
					if (starWars.hero[2] === 'Ewok') {
						starWars.ewok[3] = false;
					}	
					starWars.dark[0] = darkHP;
					starWars.nextMatch = true;
					starWars.darkWin = true;
					starWars.endGameFunc();
					$("#theButton").html("Continue");
					$("#skill1, #skill2, #skill3").addClass("faded");
				}
				if (darkHP <= 0) {			
					//$("#msgBox").html("The Dark side is no match to the " + starWars.hero[2]);
					$("#specialBox").append("<br><br>" + "The Dark side is no match to the " + starWars.hero[2]);
					darkHP = 0;
					if (starWars.dark[2] === 'Kylo Ren') {
						starWars.kyloren[3] = false;
					}		
					if (starWars.dark[2] === 'Darth Vader') {
						starWars.vader[3] = false;
					}		
					starWars.hero[0] = heroHP;
					starWars.nextMatch = true;
					starWars.heroWin = true;	
					starWars.endGameFunc();				
					$("#theButton").html("Continue");
					$("#skill1, #skill2, #skill3").addClass("faded");	
				}
				
				starWars.skillsCounterFunc();
				$("#heroHP").html(heroHP);
				$("#darkHP").html(darkHP);
				$("#heroAP").html(heroAP);
				$("#darkCAP").html(darkCAP);
				
			}
		},	

		firstSkill: function() {
			if (starWars.hero[2] === "Wookie" && starWars.hero[5] === true) {
				var totalDmg = darkCAP + starWars.darkSS;
				heroHP += totalDmg;
				$("#specialBox").html(starWars.dark[2] + " attempts to inflict " + totalDmg + " damage<br>");
				$("#specialBox").append("Wookie blocks " + totalDmg + " damage<br>");
				starWars.hero[5] = false;
			}				
		},

		secondSkill: function() {
			if (starWars.hero[2] === "Wookie" && starWars.hero[7] === true) {
				darkHP += heroAP;
				heroAP = Math.floor(heroAP * 1.5);
			}
			else if (starWars.hero[2] === "Ewok" && starWars.hero[7] === true) {
				heroAP -= starWars.hero[1];
				darkHP -= Math.floor((heroAP - starWars.hero[1]) * 0.3);
				//starWars.hero[7] = false;
			}
		},

		thirdSkill: function() {
			if (starWars.hero[2] === "Wookie" && starWars.hero[9] === true) {
				starWars.bombardment = Math.floor(Math.random() * 50) + 1;
				darkHP -= starWars.bombardment;				
			}
			else if (starWars.hero[2] === "Ewok" && starWars.hero[9] === true) {
				starWars.rally = Math.floor(Math.random() * 9) + 3;
				darkHP -= starWars.rally;
				heroHP += starWars.rally
			}
		},

		skillsCounterFunc: function() {
			if (starWars.heroWin === false && starWars.darkWin === false)
				if ((starWars.skillsCounter % 2) === 0) {
					$("#skill1, #skill2, #skill3").removeClass("faded");
				}
				else if ((starWars.skillsCounter % 2) === 1) {
					$("#skill1, #skill2, #skill3").addClass("faded");
				}
		},

		darkSpecialSkill: function() {
			var randomNumber = Math.floor(Math.random() * starWars.level);

			if (starWars.hero[2] === "Ewok" && starWars.hero[5] === true && starWars.poisonCounter > 0  ) {									
						starWars.darkSS = 0;
						starWars.poisonCounter--;
						//if (starWars.poisonCounter === 0) {
						//	starWars.hero[5] === false;
						//}
						if (starWars.poisonCounter === 0) {
							darkHP -= heroAP;
							$("#specialBox").append(starWars.hero[2] + " uses Poison to interrupt spells<br>");	
						}
						if (randomNumber < 3) {
							if (starWars.dark[2] === "Kylo Ren") {
								$("#specialBox").append(starWars.dark[2] + " failed to cast " + starWars.kylorenSkills[randomNumber] + " due to poison");
							}
							else if (starWars.dark[2] === "Darth Vader") {
								$("#specialBox").append(starWars.dark[2] + " failed to cast " + starWars.vaderSkills[randomNumber] + " due to poison");
							}
						}
			}

			else if (starWars.poisonCounter === 0) {
				if (starWars.dark[2] === "Kylo Ren") {
					switch (randomNumber) {
						case 0:
							starWars.darkSS = Math.floor(heroHP / 10);
							break;
						case 1:
							starWars.darkSS = starWars.dark[1] * 3;
							break;
						case 2:
							starWars.darkSS = 2 * starWars.hero[1];
							break;
						case 3: 
						case 4:
						case 5:
							starWars.darkSS = 0;
							break;
					}

					starWars.firstSkill();
					if (starWars.darkSS !== 0) {
						$("#specialBox").append("Kylo Ren inflicts " + starWars.kylorenSkills[randomNumber] + " for an additional " + starWars.darkSS + " damage");
					}
				}
				if (starWars.dark[2] === "Darth Vader") {
					switch (randomNumber) {
						case 0:
							starWars.darkSS = darkCAP * 2;
							break;
						case 1:
							starWars.darkSS = Math.floor(heroHP / 2);
							break;
						case 2:						
							starWars.darkSS = 0;
							darkCAP += 5;
							$("#specialBox").append("Darth Vader uses "+ starWars.vaderSkills[randomNumber] + " increasing his CAP by five");
							break;
						case 3: 
						case 4:
						case 5:
							starWars.darkSS = 0;
							break;
					}

					if (starWars.darkSS !== 0) {					
						$("#specialBox").append("Darth Vader inflicts "+ starWars.vaderSkills[randomNumber] + " for an additional " + starWars.darkSS + " damage");
					}
				}
			}
		},

		nextRoundHeroWin: function() {
			starWars.darkDisplay();
			darkHP = starWars.dark[0];
			darkCAP = starWars.dark[1];
			$("#darkHP").html(darkHP);
			$("#darkCAP").html(darkCAP);
			starWars.nextRoundBoth();
		},

		nextRoundDarkWin: function() {
			starWars.heroDisplay();
			heroHP = starWars.hero[0];
			heroAP = starWars.hero[1];
			$("#heroHP").html(heroHP);
			$("#heroAP").html(heroAP);	
			starWars.nextRoundBoth();		
		},

		nextRoundBoth: function() {
			$("#theButton").html("Attack");
			$("#skill1, #skill2, #skill3").addClass("faded");
			skillsCounter = 0;
		},

		wipeOut: function() {
			$("#arenaHero, #arenaDark, #heroRTstats, #darkRTStats").addClass("invisible");
			$(".statsTextHeroes, .statsTextDark").empty();
			$("#specialBox").html("Defeat the Dark Side with your crossbows and spears!<br>");
			$("#specialBox").append("Attack Power(AP) is used to damage a Sith. Counter Attack Power(CAP) is the Sith's equivalent<br>");
			$("#specialBox").append("Using attack button damages the enemy and increments your AP<br>");
			$("#specialBox").append("A Sith randomly casts a strong spell<br>");
			$("#specialBox").append("You can use a special skill every other turn");
			$("#heroHP, #darkHP, #heroAP, #darkCAP").html(00);
			$("#theButton").html("Fight");
			$("#theButton").removeClass("faded");
			$("#msgBox").html("Read guide below.<br>");
			$("#msgBox").append("Select a Hero and a Sith then click Fight to start.");			

			starWars.hero = "";
			starWars.dark = "";
			starWars.fight = false;
			starWars.nextMatch = false;
			starWars.heroWin = false;
			starWars.darkWin = false;	
			starWars.endGame = false;
			starWars.skillsCounter = 1;
			starWars.poisonCounter = 0;

			starWars.wookie = [100, 4, "Wookie", true, "Thick Skin", false, "Empower", false, "Bombardment", false];
			starWars.ewok = [120, 5, "Ewok", true, "Poison", false, "Sneak Attack", false, "Rally Tribe", false];
			starWars.kyloren = [200, 6, "Kylo Ren", true];
			starWars.vader = [250, 15, "Darth Vader", true];

			$("#kyloren, #darthvader, #wookie, #ewok").removeClass("faded");

			$("#skill1, #skill2, #skill3").addClass("faded");
		},

		goodGame: function() {
			$("#theButton").addClass("faded");
			starWars.endGame = true;
		},

		endGameFunc: function() {
			if (starWars.kyloren[3] === false && starWars.vader[3] === false) {
				$("#msgBox").html("You have destroyed the Dark Side!");
				$("#darkHP").html("0");
				starWars.goodGame();
			}	
			else if (starWars.wookie[3] === false && starWars.ewok[3] === false) {
				$("#msgBox").html("You lost to the Dark Side");
				$("#heroHP").html("0");
				starWars.goodGame();
			}	
		},
	}

	$("#wookie").click(function() {		
		if (starWars.fight === false && starWars.wookie[3] === true) {
			starWars.hero = starWars.wookie;
			if (starWars.ewok[3] === true) {
				$("#ewok").removeClass("faded");
			}
			starWars.heroDisplay();	
		}
	});

	$("#ewok").click(function() {
		if (starWars.fight === false && starWars.ewok[3] === true) {
			starWars.hero = starWars.ewok;
			if (starWars.wookie[3] === true) {
				$("#wookie").removeClass("faded");
			}
			starWars.heroDisplay();	
		}
	});

	$("#kyloren").click(function() {
		if (starWars.fight === false && starWars.kyloren[3] === true) {
			starWars.dark = starWars.kyloren;
			if (starWars.kyloren[3] === true) {
				$("#darthvader").removeClass("faded");
			}
			starWars.darkDisplay();	
		}
	});

	$("#darthvader").click(function() {
		if (starWars.fight === false && starWars.vader[3] === true) {
			starWars.dark = starWars.vader;
			if (starWars.kyloren[3] === true) {
				$("#kyloren").removeClass("faded");
			}
			starWars.darkDisplay();	
		}
	});	

	$("#theButton").click(function() {		
		if (starWars.endGame === false) {
			if (starWars.heroWin === false && starWars.darkWin === false ) {
				if (starWars.fight !== true) {
					starWars.fightStart();
				}
				else {
					starWars.attack();
					return;
				}
			}
			else if (starWars.heroWin === true && starWars.darkWin === false) {
				if (starWars.kyloren[3] === false) {
					starWars.dark = starWars.vader;
					starWars.nextRoundHeroWin();
					$("#specialBox").empty();
					starWars.heroWin = false;	
				}
				else if (starWars.vader[3] === false) {
					starWars.dark = starWars.kyloren;
					starWars.nextRoundHeroWin();
					$("#specialBox").empty();
					starWars.heroWin = false;
				}				
			}
			else if (starWars.heroWin === false && starWars.darkWin === true) {
				if (starWars.wookie[3] === false) {
					starWars.hero = starWars.ewok;
					starWars.nextRoundDarkWin();
					$("#specialBox").empty();
					starWars.darkWin = false;			
				}
				else if (starWars.ewok[3] === false) {	
					starWars.hero = starWars.wookie;
					starWars.nextRoundDarkWin();
					$("#specialBox").empty();
					starWars.darkWin = false;
				}
			}				
		}		
	});	

	$("#skill1").click(function() {
		if (starWars.endGame === false && starWars.fight === true && (starWars.skillsCounter % 2) === 0) {
			if (starWars.hero[2] === "Ewok") {		
				starWars.poisonCounter = 1;
			}
			starWars.hero[5] = true;
			starWars.attack();
		}
	});

	$("#skill2").click(function() {
		if (starWars.endGame === false && starWars.fight === true && (starWars.skillsCounter % 2) === 0) {
			starWars.hero[7] = true;
			starWars.attack();			
		}
	});

	$("#skill3").click(function() {
		if (starWars.endGame === false && starWars.fight === true && (starWars.skillsCounter % 2) === 0) {
			starWars.hero[9] = true;
			starWars.attack();
		}
	});

	$("#restartButton").click(function() {
		starWars.wipeOut();	
	});	
});			