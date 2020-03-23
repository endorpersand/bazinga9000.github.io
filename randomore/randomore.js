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
	dctx.globalCompositeOperation = 'copy';
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

function createSvgList(value, type, size) {
	let x = value;
	let svgs = [];
	while (x >= 1) {
		svgs.push(createSvg(type, false, size));
		x -= 1;
	}

	if (x != 0) svgs.push(createSvg(type, true, size));

	return svgs;
}

function createSvg(type, isHalf, size) {
	let svg = document.createElement('img');
	let src = "";
	if (isHalf) {
		src = 'randomore/resources/comparisons/half' + type + '.svg';
	} else {
		src = 'randomore/resources/comparisons/' + type + '.svg';
	}

	svg.setAttribute('src', src);
	svg.setAttribute('width', size);
	svg.setAttribute('height', size);
	return svg;
}


function prettyNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function generateOre() {
	//make sure the seed is changed
	let seed = parseInt(document.getElementById("seed").value);
	Math.seedrandom(seed);
	document.getElementById("seed").value = seed;

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
		'english_complex': englishComplexOre,
		'chinese': chineseOre,
		'japanese_on': japaneseOnOre,
		'viet': vietnameseOre
	};

	let name = language_functions[language]();

	//reduce previous elements to atoms
	let ids = ["rarity", "miningtext", "toolinfo", "armorinfo"];

	for (e of ids) {
		let elem = document.getElementById(e);
		if (elem !== null) {
			elem.outerHTML = "";
		}
	}


	let name_elem = document.getElementById('name');
	name_elem.innerHTML = "";
	name_elem.appendChild(document.createTextNode(toTitleCase(name)));
	name_elem.setAttribute('style', 'text-shadow: -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff;')

	if (language == "chinese") {
		name_elem.style.fontFamily = 'Kanit';
	}



	let red = Math.floor(256 * Math.random());
	let green = Math.floor(256 * Math.random());
	let blue = Math.floor(256 * Math.random());

	let colorhex = rgbToHex(red, green, blue);

	name_elem.style.color = colorhex;


	let blocks = ['anvil', 'beacon', 'blue_ice', 'bone_block_side', 'brown_mushroom_block', 'coal_block', 'diamond_block', 'emerald_block', 'glowstone', 'gold_block', 'iron_block', 'lapis_block', 'lectern_top', 'mushroom_stem', 'purpur_block', 'quartz_block_bottom', 'redstone_block'];
	let items = ['asbestos', 'black_dye', 'blaze_powder', 'blue_dye', 'bone_meal', 'breccia', 'brown_dye', 'charcoal', 'classic_gem', 'clay_ball', 'coal', 'coarse', 'cyan_dye', 'diamond', 'dried_kelp', 'egg', 'emerald', 'fire_charge', 'flint', 'gray_dye', 'green_dye', 'iron_ingot', 'lapis_lazuli', 'light_blue_dye', 'light_gray_dye', 'magnetite', 'mica', 'orange_dye', 'phantom_membrane', 'prismarine_crystals', 'prismarine_shard', 'pyrite', 'quartz', 'red_dye', 'redstone_dust', 'ruby', 'scute', 'slime_ball', 'tailings', 'white_dye', 'yellow_dye'];
	let ores = ['coal_ore', 'emerald_ore', 'lapis_ore', 'ore1', 'ore10', 'ore11', 'ore12', 'ore13', 'ore14', 'ore15', 'ore2', 'ore3', 'ore4', 'ore5', 'ore6', 'ore7', 'ore8', 'ore9', 'quartz_ore'];

	let ore_power = 0.25;

	let spawn_rarities = {
		"stone": () => getRandomPowerAugmented(0.00005, 0.0015, ore_power),
		"diorite": () => getRandomPowerAugmented(0.00005, 0.0015, ore_power),
		"andesite": () => getRandomPowerAugmented(0.00005, 0.0015, ore_power),
		"granite": () => getRandomPowerAugmented(0.00005, 0.0015, ore_power),
		"dirt": () => getRandomPowerAugmented(0.0001, 0.0015, ore_power),
		"gravel": () => getRandomPowerAugmented(0.0001, 0.0015, ore_power),
		"sand": () => getRandomPowerAugmented(0.0001, 0.0015, ore_power),
		"red_sand": () => getRandomPowerAugmented(0.0001, 0.0015, ore_power),
		"soul_sand": () => getRandomPowerAugmented(0.0001, 0.0015, ore_power),
		"obsidian": () => getRandomPowerAugmented(0.001, 0.003, ore_power),
		"end_stone": () => getRandomPowerAugmented(0.0005, 0.002, ore_power),
		"netherrack": () => getRandomPowerAugmented(0.00001, 0.00175, ore_power)
	}

	//aesthetic information
	let blockcanvas = document.getElementById('blockcanvas');
	let itemcanvas = document.getElementById('itemcanvas');
	let oreblockcanvas = document.getElementById('oreblockcanvas');
	let orecanvas = document.createElement('canvas');
	orecanvas.setAttribute('id', 'orecanvas');
	orecanvas.setAttribute('width', canvas_size);
	orecanvas.setAttribute('height', canvas_size);

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

	//mining information
	let round = (n, d = 0) => Math.round(n * 10 ** d) / 10 ** d
	let rarity = spawn_rarities[spawnblock]();
	console.log(rarity);

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

		rtext = "Rarity: 1 vein per " + prettyNumber(Math.floor(1/rarity)) + " Stone blocks between " + bottom + " and " + top;

	} else {
		rtext = "Rarity: 1 vein per " + prettyNumber(Math.floor(1/rarity)) + " " + toTitleCase(spawnblock.replace("_", " ") + " blocks");
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
	mining_info_text.setAttribute('style', 'align-items: center;');

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

	let materials = [
		"wood", "stone", "iron", "diamond"
	]

	let harvestlevel = choose(materials);

	let hcanvas = document.createElement("canvas");
	hcanvas.setAttribute('width', 128);
	hcanvas.setAttribute('height', 32);

	// __mineableCanvas__ should be a valid canvas
	// __spawnBlock__ is the ore's spawnblock
	// __mineableBy__ is the material that can mine the ore
	// __DIRECTORY__ is the directory to the images

	let pickaxeBlocks = ['stone', 'granite', 'diorite', 'andesite', 'obsidian', 'netherrack', 'end_stone'];
	let mimg = document.createElement('img');
	mimg.src = `randomore/resources/comparisons/${pickaxeBlocks.includes(spawnblock) ? 'pickaxe' : 'shovel'}.png`;
	let mctx = hcanvas.getContext('2d');
	mctx.imageSmoothingEnabled = false;

	mimg.onload = () => {
		[mimg.width, mimg.height] = [hcanvas.width, hcanvas.height];
		mctx.drawImage(mimg, -hcanvas.height * materials.indexOf(harvestlevel), 0, hcanvas.width, hcanvas.height);
	}

	mining_info_text.appendChild(hcanvas);

	/*
	let harvest_element = document.createElement("span");
	harvest_element.setAttribute("style", "color: " + hlcolors[harvestlevel] + ";");
	harvest_element.appendChild(document.createTextNode(toTitleCase(harvestlevel)));

	mining_info_text.appendChild(harvest_element);
	*/

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
		let swordDamage = Math.floor(choose([4,4,5,6,7,10]) * getRandomArbitrary(0.5,2)) / 2;


		let toolinfodiv = document.createElement('div');
		toolinfodiv.setAttribute('id', 'toolinfo');
		toolinfodiv.setAttribute('style', 'align-items: center;');

		let th1 = document.createElement('h1');
		th1.appendChild(document.createTextNode("Tool Information"));
		toolinfodiv.appendChild(th1);

		let damage = document.createElement('div');
		damage.setAttribute('id', 'damage');
		damage.setAttribute('style', 'display: flex; align-items: center;');

		let dh1 = document.createElement('h2');
		dh1.appendChild(document.createTextNode("Sword Damage: "));
		dh1.setAttribute('style', 'margin-right: 10px;')
		damage.appendChild(dh1);

		let sdm = swordDamage;

		for (i of createSvgList(sdm,"heart",32)) {
			damage.appendChild(i);
		}

		toolinfodiv.appendChild(damage);
		//toolinfodiv.appendChild(document.createElement('br'));

		let toolcanvi = document.createElement('div')
		toolcanvi.setAttribute('id', 'toolcanvi');
		toolcanvi.setAttribute('style', 'display: flex; align-items: center;');


		let durability = Math.floor(choose([32, 131, 250, 250, 250, 250, 1561, 1561, 2500]) * getRandomArbitrary(0.5, 2));


		let durabdiv = document.createElement('div');
		durabdiv.setAttribute('id', 'durability');
		durabdiv.setAttribute('style', 'align-items: center; margin-right: 30px;');

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

		let dcanvas = document.createElement('canvas');
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
		toolcanvi.appendChild(durabdiv);

		//mining speed
		let miningspeed = round(choose([4, 6, 6, 6, 8, 8, 12]) * getRandomArbitrary(0.75, 1.5), 1);


		let miningspeeddiv = document.createElement('div');
		miningspeeddiv.setAttribute('id', 'miningspeed');
		miningspeeddiv.setAttribute('style', 'align-items: center; margin-right: 30px;');

		dh1 = document.createElement('h2');
		dh1.appendChild(document.createTextNode("Mining Speed: " + miningspeed + "× Fist"));
		dh1.setAttribute('style', 'margin-right: 10px;')
		miningspeeddiv.appendChild(dh1);


		let miningcomps = [
			['wood', 2],
			['stone', 4],
			['iron', 6],
			['diamond', 8],
			['gold', 12],
			[name, miningspeed]
		];

		let maxmining = Math.max(12, miningspeed);

		miningcomps = miningcomps.sort((a, b) => a[1] - b[1]);

		let mcanvas = document.createElement('canvas');
		mcanvas.setAttribute('id', 'miningspeedcanvas');
		mcanvas.setAttribute('width', 500);
		mcanvas.setAttribute('height', 6 * 32);

		let miningctx = mcanvas.getContext('2d');

		n = 0;
		w = mcanvas.width - 32;

		for (i of miningcomps) {
			if (i[0] != name) {
				miningctx.fillStyle = compcolors[i[0]];
			} else {
				miningctx.fillStyle = colorhex;
			}
			miningctx.fillRect(32, n * 32, Math.floor(w * i[1] / maxmining), 32);

			if (i[0] != name) {
				let img = document.createElement('img');
				img.setAttribute('src', 'randomore/resources/comparisons/' + i[0] + ".png");
				img.mining_n = n;
				img.onload = function() {
					miningctx.drawImage(this, 0, 32 * this.mining_n, 32, 32);
				}
			} else {
				itemcanvas.mining_n = n;
				draw_mining = function(ic) {
					miningctx.drawImage(ic, 0, 32 * ic.mining_n, 32, 32);
				}


				if (loadFlag) {
					draw_mining(itemcanvas);
				} else {
					functions.push(draw_mining);
				}
			}

			n += 1;
		}

		miningspeeddiv.appendChild(mcanvas);
		toolcanvi.appendChild(miningspeeddiv);

		//tool enchantability
		let tool_ench = round(choose([5, 10, 10, 14, 14, 14, 15, 15, 15, 22]) * getRandomArbitrary(0.75, 2.5), 1);


		let tool_ench_div = document.createElement('div');
		tool_ench_div.setAttribute('id', 'tool_ench_');
		tool_ench_div.setAttribute('style', 'align-items: center;');

		dh1 = document.createElement('h2');
		dh1.appendChild(document.createTextNode("Tool Enchantability: " + tool_ench));
		dh1.setAttribute('style', 'margin-right: 10px;')
		tool_ench_div.appendChild(dh1);


		let tenchcomps = [
			['wood', 15],
			['stone', 5],
			['iron', 14],
			['diamond', 10],
			['gold', 22],
			[name, tool_ench]
		];

		let maxtenchantability = Math.max(22, tool_ench);

		tenchcomps = tenchcomps.sort((a, b) => a[1] - b[1]);

		let tecanvas = document.createElement('canvas');
		tecanvas.setAttribute('id', 'toolenchcanvas');
		tecanvas.setAttribute('width', 500);
		tecanvas.setAttribute('height', 6 * 32);

		let tenchctx = tecanvas.getContext('2d');

		n = 0;
		w = tecanvas.width - 32;

		for (i of tenchcomps) {
			if (i[0] != name) {
				tenchctx.fillStyle = compcolors[i[0]];
			} else {
				tenchctx.fillStyle = colorhex;
			}
			tenchctx.fillRect(32, n * 32, Math.floor(w * i[1] / maxtenchantability), 32);

			if (i[0] != name) {
				let img = document.createElement('img');
				img.setAttribute('src', 'randomore/resources/comparisons/' + i[0] + ".png");
				img.tench_n = n;
				img.onload = function() {
					tenchctx.drawImage(this, 0, 32 * this.tench_n, 32, 32);
				}
			} else {
				itemcanvas.tench_n = n;
				draw_tench = function(ic) {
					tenchctx.drawImage(ic, 0, 32 * ic.tench_n, 32, 32);
				}


				if (loadFlag) {
					draw_tench(itemcanvas);
				} else {
					functions.push(draw_tench);
				}
			}

			n += 1;
		}

		tool_ench_div.appendChild(tecanvas);
		toolcanvi.appendChild(tool_ench_div);


		toolinfodiv.appendChild(toolcanvi);
		document.body.appendChild(toolinfodiv);

	} else {
		let th1 = document.createElement('h2')
		th1.setAttribute('id','toolinfo');
		th1.appendChild(document.createTextNode(toTitleCase(name) + " cannot be made into tools."));
		document.body.appendChild(th1);
	}


	if (canMakeArmor) {
		let swordDamage = Math.floor(choose([4,4,5,6,7,10]) * getRandomArbitrary(0.5,2)) / 2;


		let armorinfodiv = document.createElement('div');
		armorinfodiv.setAttribute('id', 'armorinfo');
		armorinfodiv.setAttribute('style', 'align-items: center;');

		let th1 = document.createElement('h1');
		th1.appendChild(document.createTextNode("Armor Information"));
		armorinfodiv.appendChild(th1);

		let armor_protection = document.createElement('div');
		armor_protection.setAttribute('id', 'armorprotection');
		armor_protection.setAttribute('style', 'display: flex; align-items: center;');

		let ph1 = document.createElement('h2');
		ph1.appendChild(document.createTextNode("Armor Protection: "));
		ph1.setAttribute('style', 'margin-right: 10px;')
		armor_protection.appendChild(ph1);

		/*
		prot_chest = random.randint(3,12)
            prot_leggings = max(1, prot_chest - random.randint(1, 5))
            prot_boots = max(1, prot_leggings - random.randint(1, 5))
            prot_helmet = max(1, prot_boots - random.randint(0,2))
            */

        let prot_chest = getRandomInt(3,12);
        let prot_leggings = Math.max(1, prot_chest - getRandomInt(1,5))
        let prot_helmet = Math.max(1, prot_leggings - getRandomInt(1,5))
        let prot_boots = Math.max(1, prot_helmet - getRandomInt(0,2))

        prot_chest /= 2;
        prot_leggings /= 2;
        prot_helmet /= 2;
        prot_boots /= 2;

		let totalprot = prot_chest + prot_leggings + prot_helmet + prot_boots;

		for (i of createSvgList(totalprot,"armor",32)) {
			armor_protection.appendChild(i);
		} 

		armorinfodiv.appendChild(armor_protection);

		let iad = document.createElement('div');
		iad.setAttribute('style','display: flex; align-items: center;')

		for (i of [["Helmet",prot_helmet], ["Chestplate",prot_chest], ["Leggings",prot_leggings], ["Boots",prot_boots]]) {
			let e = document.createElement("div");
			e.setAttribute('style','display: flex; align-items: center; margin-right: 20px')
			let h = document.createElement("h3");
			h.appendChild(document.createTextNode(i[0] + ": "))
			h.setAttribute('style','margin-right: 5px')
			e.appendChild(h);
			for (s of createSvgList(i[1],"armor",16)) {
				e.appendChild(s);
			}

			iad.appendChild(e);
		}
		armorinfodiv.appendChild(iad)

		let armor_toughness = 0;

		if (Math.random() < 0.25) {
			armor_toughness = choose([1,1,1,2,2,3,4])

			let e = document.createElement('h3')
			e.appendChild(document.createTextNode("Each piece of this armor grants " + armor_toughness + " armor toughness."))
			armorinfodiv.appendChild(e)
		}


		twenty_reduction = round(20*(1 - (Math.min(25,Math.max(totalprot/5, totalprot - (20/(2 + armor_toughness))))/25)),2) ;
		console.log(totalprot, twenty_reduction)
		let dmgreduction = document.createElement('h3')
		dmgreduction.appendChild(document.createTextNode("A 20 damage attack will be reduced to " + twenty_reduction + " damage when wearing a full set of " + toTitleCase(name) + " armor."))
		armorinfodiv.appendChild(dmgreduction)

		document.body.appendChild(armorinfodiv);


	} else {
		let th1 = document.createElement('h2')
		th1.setAttribute('id','armorinfo');
		th1.appendChild(document.createTextNode(toTitleCase(name) + " cannot be made into armor."));
		document.body.appendChild(th1);
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

function getRandomPowerAugmented(min,max,power) {
	return getRandomArbitrary(min**power, max**power)**(1/power);
}


function toTitleCase(str) {
	return str.split(' ').map(x => x[0].toUpperCase() + x.slice(1)).join(' ');
}



randomizeSeed();
generateOre();