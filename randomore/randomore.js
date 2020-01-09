function randomizeSeed() {
	let v = Math.floor(Math.random() * 10000000000);
	document.getElementById("seed").value = v;
	generateOre();
}



function choose(array) {
	return array[Math.floor(array.length * Math.random())]
}


canvas_size = 128;


//thank mr endr
function drawColoredImageOntoCanvas(canvas, image, color) {
	// dctx = destination canvas context
	// image (mask)
	// fillStyle = color of mask
	let dctx = canvas.getContext('2d');
	let layer = document.createElement('canvas');
	dctx.imageSmoothingEnabled = false;
	[layer.width, layer.height] = [canvas.width, canvas.height];
	let lctx = layer.getContext('2d');
	lctx.imageSmoothingEnabled = false;
	dctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	lctx.fillStyle = color;
	lctx.fillRect(0, 0, layer.width, layer.height);
	lctx.globalCompositeOperation = 'destination-in';
	lctx.drawImage(canvas, 0, 0, canvas_size, canvas_size);
	dctx.globalCompositeOperation = 'multiply';
	dctx.drawImage(layer, 0, 0, canvas_size, canvas_size);
}



/*
function fillMask(dctx, image, fillStyle) {
    // dctx = destination canvas context
    // image (mask)
    // fillStyle = color of mask
    let layer = document.createElement('canvas');
    [layer.width, layer.height] = [dctx.canvas.width, dctx.canvas.height];
    let lctx = layer.getContext('2d');
    lctx.fillStyle = fillStyle;
    lctx.fillRect(0, 0, layer.width, layer.height);
    lctx.globalCompositeOperation = 'destination-in';
    lctx.drawImage(image, 0, 0);
    dctx.globalCompositeOperation = 'multiply';
    dctx.drawImage(layer, 0, 0);
}

*/
function getComparisonImage(name) {
	let img = document.createElement('img');
	img.setAttribute('src', 'randomore/resources/comparisons/' + name + ".png");
	return img;
}

function createHeart(isHalf, size) {
	let svg = document.createElement('img');
	let src = "";
	if (isHalf) {
		src = 'randomore/resources/comparisons/halfheart.svg';
	} else {
		src = 'randomore/resources/comparisons/heart.svg';
	}

	svg.setAttribute('src', src);
	svg.setAttribute('width', size);
	svg.setAttribute('height', size);
	return svg;
}


function generateOre() {
	//make sure the seed is changed
	Math.seedrandom(document.getElementById("seed").value);

	let language = document.getElementById('language').value;

	if (language == 'random') {
		let languages = [];

		for (i of document.getElementById('language')) {
			if (i.value != 'random') {
				languages.push(i.value);
			}
		}

		language = choose(languages);
		Math.seedrandom(document.getElementById("seed").value);
	}

	let language_functions = {
		'english': englishOre,
		'chinese': chineseOre,
		'japanese_on': japaneseOnOre
	};

	let name = language_functions[language]();

	//reduce previous elements to atoms
	let ids = ['name', "blockimage", "itemimage", "oreimage", "baseimage", "rarity", "blockcanvas", "itemcanvas", "oreblockcanvas", "miningtext", "toolinfo"];

	for (e of ids) {
		let elem = document.getElementById(e);
		if (elem !== null) {
			elem.outerHTML = "";
		}
	}


	let name_elem = document.createElement("h1")
	name_elem.appendChild(document.createTextNode(toTitleCase(name)));
	name_elem.setAttribute('id', 'name');
	name_elem.setAttribute('style', 'text-shadow: -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff;')

	if (language == "chinese") {
		name_elem.style.fontFamily = 'Kanit';
	}


	document.body.appendChild(name_elem);


	let red = Math.floor(256 * Math.random());
	let green = Math.floor(256 * Math.random());
	let blue = Math.floor(256 * Math.random());

	let colorhex = rgbToHex(red, green, blue);

	name_elem.style.color = colorhex;


	let blocks = ['anvil', 'beacon', 'blue_ice', 'bone_block_side', 'brown_mushroom_block', 'coal_block', 'diamond_block', 'emerald_block', 'glowstone', 'gold_block', 'iron_block', 'lapis_block', 'lectern_top', 'mushroom_stem', 'purpur_block', 'quartz_block_bottom', 'redstone_block'];
	let items = ['asbestos', 'black_dye', 'blaze_powder', 'blue_dye', 'bone_meal', 'breccia', 'brown_dye', 'charcoal', 'classic_gem', 'clay_ball', 'coal', 'coarse', 'cyan_dye', 'diamond', 'dried_kelp', 'egg', 'emerald', 'fire_charge', 'flint', 'gray_dye', 'green_dye', 'iron_ingot', 'lapis_lazuli', 'light_blue_dye', 'light_gray_dye', 'magnetite', 'mica', 'orange_dye', 'phantom_membrane', 'prismarine_crystals', 'prismarine_shard', 'pyrite', 'quartz', 'red_dye', 'redstone_dust', 'ruby', 'scute', 'slime_ball', 'tailings', 'white_dye', 'yellow_dye'];
	let ores = ['coal_ore', 'emerald_ore', 'lapis_ore', 'ore1', 'ore10', 'ore11', 'ore12', 'ore13', 'ore14', 'ore15', 'ore2', 'ore3', 'ore4', 'ore5', 'ore6', 'ore7', 'ore8', 'ore9', 'quartz_ore'];


	let spawn_rarities = {
		"stone": () => getRandomArbitrary(0.05, 1.5),
		"diorite": () => getRandomArbitrary(0.05, 1.5),
		"andesite": () => getRandomArbitrary(0.05, 1.5),
		"granite": () => getRandomArbitrary(0.05, 1.5),
		"dirt": () => getRandomArbitrary(0.1, 1.5),
		"gravel": () => getRandomArbitrary(0.1, 1.5),
		"sand": () => getRandomArbitrary(0.1, 1.5),
		"red_sand": () => getRandomArbitrary(0.1, 1.5),
		"soul_sand": () => getRandomArbitrary(0.1, 1.5),
		"obsidian": () => getRandomArbitrary(1, 3),
		"end_stone": () => getRandomArbitrary(0.5, 2),
		"netherrack": () => getRandomArbitrary(0.01, 1.75)
	}

	//aesthetic information
	let blockcanvas = document.createElement('canvas');
	blockcanvas.setAttribute('id', 'blockcanvas');
	blockcanvas.setAttribute('width', canvas_size);
	blockcanvas.setAttribute('height', canvas_size);

	let itemcanvas = document.createElement('canvas');
	itemcanvas.getContext('2d').fillRect(0,0,100,100);
	itemcanvas.setAttribute('id', 'itemcanvas');
	itemcanvas.setAttribute('width', canvas_size);
	itemcanvas.setAttribute('height', canvas_size);


	let orecanvas = document.createElement('canvas');
	orecanvas.setAttribute('id', 'orecanvas');
	orecanvas.setAttribute('width', canvas_size);
	orecanvas.setAttribute('height', canvas_size);

	let oreblockcanvas = document.createElement('canvas');
	oreblockcanvas.setAttribute('id', 'oreblockcanvas');
	oreblockcanvas.setAttribute('width', canvas_size);
	oreblockcanvas.setAttribute('height', canvas_size);


	let blockimage = "randomore/resources/block/" + choose(blocks) + ".png";
	let blockimagee = document.createElement('img');
	blockimagee.setAttribute('src', blockimage);
	blockimagee.onload = () => drawColoredImageOntoCanvas(blockcanvas, blockimagee, colorhex);

	loadFlag = false;
	let functions = [];
	let itemimage = "randomore/resources/item/" + choose(items) + ".png";
	let itemimagee = document.createElement('img');
	itemimagee.setAttribute('src', itemimage);
	itemimagee.onload = function() {
		drawColoredImageOntoCanvas(itemcanvas, itemimagee, colorhex);
		for (f of functions) {
			f(itemcanvas);
		}
		loadFlag = true;
	}

	let oreimage = "randomore/resources/ore/" + choose(ores) + ".png";


	let spawnblock = choose(Object.keys(spawn_rarities));
	let baseimage = "randomore/resources/ore_block/" + spawnblock + ".png";
	let baseimagee = document.createElement('img');
	baseimagee.setAttribute('src', baseimage);
	baseimagee.onload = function() {
		let oreimagee = document.createElement('img');
		oreimagee.setAttribute('src', oreimage);
		oreimagee.onload = function() {
			let ctx = oreblockcanvas.getContext('2d');
			ctx.imageSmoothingEnabled = false;
			drawColoredImageOntoCanvas(orecanvas, oreimagee, colorhex);
			ctx.drawImage(baseimagee, 0, 0, canvas_size, canvas_size);
			ctx.drawImage(orecanvas, 0, 0, canvas_size, canvas_size);
		}
	}

	for (c of [blockcanvas, itemcanvas, oreblockcanvas]) {
		document.body.appendChild(c);
	}

	//mining information
	let round = (n, d = 0) => Math.round(n * 10 ** d) / 10 ** d
	let rarity = round(spawn_rarities[spawnblock](), 4);

	let top = 0;
	let bottom = 0;

	let raritydiv = document.createElement('div');
	raritydiv.setAttribute('id', 'rarity');
	raritydiv.setAttribute('style', 'display: flex; align-items: center;');

	let rtext = '';

	if (spawnblock == 'stone') {
		if (Math.random() < 0.2) {
			bottom = getRandomInt(5, 35);
			top = getRandomInt(75, 135);
		} else {
			bottom = getRandomInt(5, 75);
			top = bottom + getRandomInt(7, 30);
		}

		rtext = "Rarity: " + rarity + "% of Stone between " + bottom + " and " + top;

	} else {
		rtext = "Rarity: " + rarity + "% of " + toTitleCase(spawnblock.replace("_", " "));
	}

	let rtextelem = document.createElement('h2');
	rtextelem.appendChild(document.createTextNode(rtext));

	raritydiv.appendChild(rtextelem);

	document.body.appendChild(raritydiv);

	if (spawnblock == 'stone') {
		let left = document.createElement('h3');
		left.setAttribute('id', 'leftnumber');
		left.setAttribute('style', 'margin-left: 50px;')
		left.appendChild(document.createTextNode(0));
		raritydiv.appendChild(left);

		let canvas = document.createElement('canvas');
		canvas.setAttribute('id', 'raritycanvas');
		canvas.setAttribute('width', 512);
		canvas.setAttribute('height', 32);
		canvas.setAttribute('style', 'border:1px solid #ffffff; display:inline; margin-left: 10px; margin-right: 10px;');

		let ctx = canvas.getContext("2d");
		ctx.fillStyle = "#ff0000";
		ctx.fillRect(0, 0, 512, 32);
		ctx.fillStyle = "#00ff00";
		ctx.fillRect(2 * bottom, 0, 2 * (top - bottom), 32);

		raritydiv.appendChild(canvas);

		let right = document.createElement('h3');
		right.setAttribute('id', 'rightnumber');
		right.appendChild(document.createTextNode(256));
		raritydiv.appendChild(right);
	}


	let vein_bottom = getRandomInt(1, 3);
	let vein_top = vein_bottom + getRandomInt(1, 10);

	let mining_info_text = document.createElement("h2");
	mining_info_text.setAttribute('id', 'miningtext');

	let message = "Spawns in Veins between " + vein_bottom + " and " + vein_top + " blocks large.";

	mining_info_text.appendChild(document.createTextNode(message));
	mining_info_text.appendChild(document.createElement('br'));

	let x = Math.random();

	if (x < 0.25) {
		let drop_bottom = getRandomInt(2, 4);
		let drop_top = drop_bottom + getRandomInt(1, 3);
		message = "Drops between " + drop_bottom + ' and ' + drop_top + ' pieces when mined, ';
	} else if (x < 0.75) {
		message = "Drops one piece when mined, ";
	} else {
		message = "Yields one piece when smelted, ";
	}


	if (x < 0.75) {
		let xpb = getRandomInt(1, 5);
		let xpt = xpb + getRandomInt(1, 5);
		message += "giving " + xpb + "-" + xpt + " XP for each ore mined.";
	} else {
		message += "giving " + choose([1, 1, 1, 1, 2]) + " XP for each ore smelted.";
	}

	mining_info_text.appendChild(document.createTextNode(message));
	mining_info_text.appendChild(document.createElement('br'));

	message = "Harvest Level: ";
	mining_info_text.appendChild(document.createTextNode(message));

	let hlcolors = {
		"wood": "#6B511F",
		"stone": "#898989",
		"iron": "#C1C1C1",
		"diamond": "#27B29A"
	}

	let harvestlevel = choose(Object.keys(hlcolors));

	let harvest_element = document.createElement("span");
	harvest_element.setAttribute("style", "color: " + hlcolors[harvestlevel] + ";");
	harvest_element.appendChild(document.createTextNode(toTitleCase(harvestlevel)));

	mining_info_text.appendChild(harvest_element);
	document.body.appendChild(mining_info_text);


	let canMakeTools = Math.random() < 0.75;
	let canMakeArmor = Math.random() < 0.75;

	let compcolors = {
		"wood": "#6B511F",
		"stone": "#898989",
		"iron": "#C1C1C1",
		"diamond": "#27B29A",
		"gold": "#F5CC27",
		"leather": "#A6472E",
		"chain": "#6B6B6B"
	}

	if (canMakeTools) {
		let swordDamage = getRandomInt(4, 20) / 2;


		let toolinfodiv = document.createElement('div');
		toolinfodiv.setAttribute('id', 'toolinfo');
		toolinfodiv.setAttribute('style', 'align-items: center;');


		let damage = document.createElement('div');
		damage.setAttribute('id', 'damage');
		damage.setAttribute('style', 'display: flex; align-items: center;');

		let dh1 = document.createElement('h2');
		dh1.appendChild(document.createTextNode("Sword Damage: "));
		dh1.setAttribute('style', 'margin-right: 10px;')
		damage.appendChild(dh1);

		let sdm = swordDamage;

		while (sdm >= 1) {
			damage.appendChild(createHeart(false, 32));
			sdm -= 1;
		}

		if (sdm != 0) damage.appendChild(createHeart(true, 32));


		toolinfodiv.appendChild(damage);
		toolinfodiv.appendChild(document.createElement('br'));

		let durability = Math.floor(choose([32, 131, 250, 250, 250, 250, 1561, 1561, 2500]) * getRandomArbitrary(0.5, 2));


		let durabdiv = document.createElement('div');
		durabdiv.setAttribute('id', 'durability');
		durabdiv.setAttribute('style', 'style', 'display: flex; align-items: center;');

		dh1 = document.createElement('h2');
		dh1.appendChild(document.createTextNode("Durability: " + durability));
		dh1.setAttribute('style', 'margin-right: 10px;')
		durabdiv.appendChild(dh1);


		let durabcomps = [
			['gold', 32],
			['wood', 59],
			['stone', 131],
			['iron', 250],
			['diamond', 1561],
			[name, durability]
		];

		let maxdurab = Math.max(1561, durability);

		durabcomps = durabcomps.sort((a, b) => a[1] - b[1]);

		dcanvas = document.createElement('canvas');
		dcanvas.setAttribute('id', 'durabilitycanvas');
		dcanvas.setAttribute('width', 500);
		dcanvas.setAttribute('height', 6 * 32);

		let durabctx = dcanvas.getContext('2d');

		let n = 0;
		let w = dcanvas.width - 32;

		for (i of durabcomps) {
			if (i[0] != name) {
				durabctx.fillStyle = compcolors[i[0]];
			} else {
				durabctx.fillStyle = colorhex;
			}
			durabctx.fillRect(32, n * 32, Math.floor(w * i[1] / maxdurab), 32);

			if (i[0] != name) {
				let img = document.createElement('img');
				img.setAttribute('src', 'randomore/resources/comparisons/' + i[0] + ".png");
				img.n = n;
				img.onload = function() {
					durabctx.drawImage(this, 0, 32 * this.n, 32, 32);
				}
			} else {
				itemcanvas.durab_n = n;
				draw_durab = function(ic) {
					console.log(ic);
					durabctx.drawImage(ic, 0, 32 * ic.durab_n, 32, 32);
				}


				if (loadFlag) {
					draw_durab(itemcanvas);
				} else {
					functions.push(draw_durab);
				}
			}

			n += 1;
		}

		durabdiv.appendChild(dcanvas);

		toolinfodiv.appendChild(durabdiv);
		document.body.appendChild(toolinfodiv);

	}
}


function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function randint(a, b) {
	return
}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function toTitleCase(str) {
	return str.replace(
		/\w\S*/g,
		function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}
	);
}