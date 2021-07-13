function randomizeSeed() {
    Math.seedrandom();
    const v = Math.floor(Math.random() * 10000000000);
    document.getElementById('seed').value = v;
}

function choose(array) {
    return array[Math.floor(array.length * Math.random())];
}

function weightedChoose(array, minMult, maxMult) {
    return choose(array) * getRandomArbitrary(minMult, maxMult);
}

const canvas_size = 128;

const POSITIVE_POTION_EFFECTS = [
    'Speed', 'Haste', 'Strength', 'Instant Health', 'Jump Boost', 'Regeneration',
    'Resistance', 'Fire Resistance', 'Water Breathing', 'Invisibility',
    'Night Vision', 'Health Boost', 'Absorption', 'Saturation', 'Luck',
    'Slow Falling', 'Conduit Power', "Dolphin's Grace", 'Hero of the Village'];

const NEGATIVE_POTION_EFFECTS = [
    'Slowness', 'Mining Fatigue', 'Instant Damage', 'Nausea', 'Blindness', 'Hunger',
    'Weakness', 'Poison', 'Wither', 'Glowing', 'Bad Luck', 'Bad Omen'
];

const SINGLE_POTENTCY_EFFECTS = [
    'Water Breathing', 'Invisibility', 'Night Vision', 'Blindness', 'Glowing'
];

const POTION_EFFECTS = POSITIVE_POTION_EFFECTS + NEGATIVE_POTION_EFFECTS;

// thank mr endr
function drawColoredImageOntoCanvas(canvas, image, color) {
    // dctx = destination canvas context
    // image (mask)
    // fillStyle = color of mask
    const dctx = canvas.getContext('2d');
    const layer = document.createElement('canvas');
    dctx.imageSmoothingEnabled = false;
    [layer.width, layer.height] = [canvas.width, canvas.height];
    const lctx = layer.getContext('2d');
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
    const img = document.createElement('img');
    img.setAttribute('src', 'randomore/resources/comparisons/' + name + '.png');
    return img;
}

function createSvgList(value, type, size) {
    let x = value;
    const svgs = [];
    while (x >= 1) {
        svgs.push(createSvg(type, 0, size));
        x -= 1;
    }

    if (x != 0) {
        svgs.push(createSvg(type, 4 * x, size));
    }
    return svgs;
}

function createSvg(type, quarter, size) {
    const svg = document.createElement('img');
    let src = '';
    switch (quarter) {
    case 0:
        src = 'randomore/resources/comparisons/' + type + '.svg';
        break;
    case 1:
        src = 'randomore/resources/comparisons/onequarter' + type + '.svg';
        break;
    case 2:
        src = 'randomore/resources/comparisons/half' + type + '.svg';
        break;
    case 3:
        src = 'randomore/resources/comparisons/threequarter' + type + '.svg';
        break;
    }

    svg.setAttribute('src', src);
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    return svg;
}

function prettyNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const compcolors = {
    wood: '#6B511F',
    stone: '#898989',
    iron: '#C1C1C1',
    diamond: '#27B29A',
    gold: '#F5CC27',
    leather: '#A6472E',
    chain: '#6B6B6B',
    netherite: '#32292A'
};

const COMPARISON_WIDTH = 400;
const COMPARISON_HEIGHT = 32;
const COMP_SPRITE_SIZE = COMPARISON_HEIGHT;
let functions = [];
function drawComparisonGraph(canvas, customOreName, customOreColor, comparisons, itemCanvas) {
    canvas.setAttribute('id', 'durabilitycanvas');
    canvas.setAttribute('width', COMPARISON_WIDTH);
    canvas.setAttribute('height', comparisons.length * COMPARISON_HEIGHT);

    const maxValue = Math.max(...comparisons.map((x) => x[1]));

    comparisons = comparisons.sort((a, b) => a[1] - b[1]);

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    let n = 0;
    const w = canvas.width - COMP_SPRITE_SIZE;

    for (i of comparisons) {
        if (i[0] != customOreName) {
            ctx.fillStyle = compcolors[i[0]];
        } else {
            ctx.fillStyle = customOreColor;
        }
        ctx.fillRect(COMP_SPRITE_SIZE, n * COMP_SPRITE_SIZE, Math.floor(w * i[1] / maxValue), COMPARISON_HEIGHT);
        if (i[0] != customOreName) {
            const img = document.createElement('img');
            img.setAttribute('src', 'randomore/resources/comparisons/' + i[0] + '.png');
            img.n = n;
            img.onload = function() {
                ctx.drawImage(this, 0, COMP_SPRITE_SIZE * this.n, COMP_SPRITE_SIZE, COMP_SPRITE_SIZE);
            };
        } else {
            // metafunctions go brrr
            draw = (function(n) {
                return function(ic) {
                    ctx.drawImage(ic, 0, COMP_SPRITE_SIZE * n, COMP_SPRITE_SIZE, COMP_SPRITE_SIZE);
                };
            }(n));

            if (loadFlag) {
                draw(itemcanvas);
            } else {
                functions.push(draw);
            }
        }

        n += 1;
    }
}

function generateOre() {
    // make sure the seed is changed
    const seed = parseInt(document.getElementById('seed').value);
    Math.seedrandom(seed);

    let language = document.getElementById('language').value;

    if (language == 'random') {
        const languages = [];

        for (i of document.getElementById('language')) {
            if (i.value != 'random') {
                languages.push(i.value);
            }
        }

        language = choose(languages);
        Math.seedrandom(document.getElementById('seed').value);
    }

    const language_functions = {
        english: englishOre,
        english_complex: englishComplexOre,
        chinese: chineseOre,
        japanese_on: japaneseOnOre,
        viet: vietnameseOre
    };

    const name = language_functions[language]();

    // reduce previous elements to atoms
    const ids = ['rarity', 'miningtext', 'toolinfo', 'armorinfo', 'specialcharacteristics'];

    for (e of ids) {
        const elem = document.getElementById(e);
        if (elem !== null) {
            elem.outerHTML = '';
        }
    }

    const name_elem = document.getElementById('name');
    name_elem.innerHTML = '';
    name_elem.appendChild(document.createTextNode(toTitleCase(name)));
    name_elem.setAttribute('style', 'text-shadow: -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff;');

    if (language == 'chinese') {
        name_elem.style.fontFamily = 'Kanit';
    }

    const red = Math.floor(256 * Math.random());
    const green = Math.floor(256 * Math.random());
    const blue = Math.floor(256 * Math.random());

    const colorhex = rgbToHex(red, green, blue);

    name_elem.style.color = colorhex;

    const blocks = ['amethyst_block', 'anvil', 'beacon', 'blue_ice', 'bone_block_side',
        'brown_mushroom_block', 'coal_block', 'copper_block', 'diamond_block', 'emerald_block',
        'glowstone', 'gold_block', 'iron_block', 'lapis_block', 'lectern_top',
        'mushroom_stem', 'purpur_block', 'quartz_block_bottom', 'redstone_block'];

    const items = ['amethyst_shard', 'asbestos', 'black_dye', 'blaze_powder',
        'blue_dye', 'bone_meal', 'breccia', 'brown_dye', 'charcoal', 'classic_gem',
        'clay_ball', 'coal', 'coarse', 'copper_ingot', 'cyan_dye', 'diamond',
        'dried_kelp', 'egg', 'emerald', 'fire_charge', 'flint', 'gray_dye',
        'iron_ingot', 'lapis_lazuli', 'light_blue_dye', 'light_gray_dye',
        'green_dye', 'magnetite', 'mica', 'netherite_ingot', 'old_quartz',
        'orange_dye', 'phantom_membrane', 'prismarine_crystals', 'prismarine_shard',
        'pyrite', 'quartz', 'red_dye', 'redstone_dust', 'ruby', 'scute',
        'slime_ball', 'tailings', 'white_dye', 'yellow_dye'];

    const ores = ['ancient_debris_side', 'coal_ore', 'emerald_ore', 'lapis_ore', 'ore1', 'ore10',
        'ore11', 'ore12', 'ore13', 'ore14', 'ore15', 'ore2', 'ore3', 'ore4',
        'ore5', 'ore6', 'ore7', 'ore8', 'ore9', 'quartz_ore'];

    const ore_power = 0.25;

    const spawn_rarities = {
        stone: () => getRandomPowerAugmented(0.00005, 0.0015, ore_power),
        diorite: () => getRandomPowerAugmented(0.00005, 0.0015, ore_power),
        andesite: () => getRandomPowerAugmented(0.00005, 0.0015, ore_power),
        granite: () => getRandomPowerAugmented(0.00005, 0.0015, ore_power),
        dirt: () => getRandomPowerAugmented(0.0001, 0.0015, ore_power),
        gravel: () => getRandomPowerAugmented(0.0001, 0.0015, ore_power),
        sand: () => getRandomPowerAugmented(0.0001, 0.0015, ore_power),
        red_sand: () => getRandomPowerAugmented(0.0001, 0.0015, ore_power),
        soul_sand: () => getRandomPowerAugmented(0.0001, 0.0015, ore_power),
        obsidian: () => getRandomPowerAugmented(0.001, 0.003, ore_power),
        end_stone: () => getRandomPowerAugmented(0.0005, 0.002, ore_power),
        netherrack: () => getRandomPowerAugmented(0.00001, 0.00175, ore_power),
        blackstone: () => getRandomPowerAugmented(0.00005, 0.0015, ore_power)
    };

    // aesthetic information
    const blockcanvas = document.getElementById('blockcanvas');
    const itemcanvas = document.getElementById('itemcanvas');
    const oreblockcanvas = document.getElementById('oreblockcanvas');
    const orecanvas = document.createElement('canvas');
    orecanvas.setAttribute('id', 'orecanvas');
    orecanvas.setAttribute('width', canvas_size);
    orecanvas.setAttribute('height', canvas_size);

    const blockimage = 'randomore/resources/block/' + choose(blocks) + '.png';
    const blockimagee = document.createElement('img');
    blockimagee.setAttribute('src', blockimage);
    blockimagee.onload = () => drawColoredImageOntoCanvas(blockcanvas, blockimagee, colorhex);

    loadFlag = false;
    functions = [];
    const itemimage = 'randomore/resources/item/' + choose(items) + '.png';
    const itemimagee = document.createElement('img');
    itemimagee.setAttribute('src', itemimage);
    itemimagee.onload = function() {
        drawColoredImageOntoCanvas(itemcanvas, itemimagee, colorhex);
        for (f of functions) {
            f(itemcanvas);
        }
        loadFlag = true;
    };

    const oreimage = 'randomore/resources/ore/' + choose(ores) + '.png';

    const spawnblock = choose(Object.keys(spawn_rarities));
    const baseimage = 'randomore/resources/ore_block/' + spawnblock + '.png';
    const baseimagee = document.createElement('img');
    baseimagee.setAttribute('src', baseimage);
    baseimagee.onload = function() {
        const oreimagee = document.createElement('img');
        oreimagee.setAttribute('src', oreimage);
        oreimagee.onload = function() {
            const ctx = oreblockcanvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            drawColoredImageOntoCanvas(orecanvas, oreimagee, colorhex);
            ctx.drawImage(baseimagee, 0, 0, canvas_size, canvas_size);
            ctx.drawImage(orecanvas, 0, 0, canvas_size, canvas_size);
        };
    };

    // mining information
    const round = (n, d = 0) => Math.round(n * 10 ** d) / 10 ** d;
    const rarity = spawn_rarities[spawnblock]();

    let top = 0;
    let bottom = 0;

    const raritydiv = document.createElement('div');
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

        rtext = 'Rarity: 1 vein per ' + prettyNumber(Math.floor(1 / rarity)) + ' Stone blocks between ' + bottom + ' and ' + top;
    } else {
        rtext = 'Rarity: 1 vein per ' + prettyNumber(Math.floor(1 / rarity)) + ' ' + toTitleCase(spawnblock.replace('_', ' ') + ' blocks');
    }

    const rtextelem = document.createElement('h2');
    rtextelem.appendChild(document.createTextNode(rtext));

    raritydiv.appendChild(rtextelem);

    document.body.appendChild(raritydiv);

    if (spawnblock == 'stone') {
        const left = document.createElement('h3');
        left.setAttribute('id', 'leftnumber');
        left.setAttribute('style', 'margin-left: 50px;');
        left.appendChild(document.createTextNode(0));
        raritydiv.appendChild(left);

        const canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'raritycanvas');
        canvas.setAttribute('width', 512);
        canvas.setAttribute('height', 32);
        canvas.setAttribute('style', 'border:1px solid #ffffff; display:inline; margin-left: 10px; margin-right: 10px;');

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(0, 0, 512, 32);
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(2 * bottom, 0, 2 * (top - bottom), 32);

        raritydiv.appendChild(canvas);

        const right = document.createElement('h3');
        right.setAttribute('id', 'rightnumber');
        right.appendChild(document.createTextNode(256));
        raritydiv.appendChild(right);
    }

    const vein_bottom = getRandomInt(1, 3);
    const vein_top = vein_bottom + getRandomInt(1, 10);

    const mining_info_text = document.createElement('h2');
    mining_info_text.setAttribute('id', 'miningtext');
    mining_info_text.setAttribute('style', 'align-items: center;');

    let message = 'Spawns in Veins between ' + vein_bottom + ' and ' + vein_top + ' blocks large.';

    mining_info_text.appendChild(document.createTextNode(message));
    mining_info_text.appendChild(document.createElement('br'));

    const x = Math.random();

    if (x < 0.25) {
        const drop_bottom = getRandomInt(2, 4);
        const drop_top = drop_bottom + getRandomInt(1, 3);
        message = 'Drops between ' + drop_bottom + ' and ' + drop_top + ' pieces when mined, ';
    } else if (x < 0.75) {
        message = 'Drops one piece when mined, ';
    } else {
        message = 'Yields one piece when smelted, ';
    }

    if (x < 0.75) {
        const xpb = getRandomInt(1, 5);
        const xpt = xpb + getRandomInt(1, 5);
        message += 'giving ' + xpb + '-' + xpt + ' XP for each ore mined.';
    } else {
        message += 'giving ' + choose([1, 1, 1, 1, 2]) + ' XP for each ore smelted.';
    }

    mining_info_text.appendChild(document.createTextNode(message));
    mining_info_text.appendChild(document.createElement('br'));

    message = toTitleCase(name) + ' ore is breakable with: ';

    mining_info_text.appendChild(document.createTextNode(message));

    const materials = [
        'wood', 'stone', 'iron', 'diamond', 'netherite'
    ];

    let harvestTool;
    if (spawnblock == 'obsidian') {
        harvestTool = choose(['diamond', 'netherite']);
    } else {
        harvestTool = choose(materials);
    }
    const harvestLevel = materials.indexOf(harvestTool);

    const hcanvas = document.createElement('canvas');
    const HARVEST_SPRITE_SIZE = 32;
    hcanvas.setAttribute('width', materials.length * HARVEST_SPRITE_SIZE);
    hcanvas.setAttribute('height', HARVEST_SPRITE_SIZE);

    // __mineableCanvas__ should be a valid canvas
    // __spawnBlock__ is the ore's spawnblock
    // __mineableBy__ is the material that can mine the ore
    // __DIRECTORY__ is the directory to the images

    const pickaxeBlocks = ['stone', 'granite', 'diorite', 'andesite', 'obsidian', 'netherrack', 'end_stone', 'blackstone'];
    const mimg = document.createElement('img');
    mimg.src = `randomore/resources/comparisons/${pickaxeBlocks.includes(spawnblock) ? 'pickaxe' : 'shovel'}.png`;
    const mctx = hcanvas.getContext('2d');
    mctx.imageSmoothingEnabled = false;

    mimg.onload = () => {
        [mimg.width, mimg.height] = [hcanvas.width, hcanvas.height];
        mctx.drawImage(mimg,
            16 * harvestLevel, 0,
            16 * (materials.length - harvestLevel + 1), 16,
            0, 0,
            HARVEST_SPRITE_SIZE * (materials.length - harvestLevel + 1), HARVEST_SPRITE_SIZE
        );
    };

    mining_info_text.appendChild(hcanvas);

    /*
	let harvest_element = document.createElement("span");
	harvest_element.setAttribute("style", "color: " + hlcolors[harvestlevel] + ";");
	harvest_element.appendChild(document.createTextNode(toTitleCase(harvestlevel)));

	mining_info_text.appendChild(harvest_element);
	*/

    document.body.appendChild(mining_info_text);

    const canMakeTools = Math.random() < 0.75;
    const canMakeArmor = Math.random() < 0.75;

    if (canMakeTools) {
        const toolinfodiv = document.createElement('div');
        toolinfodiv.setAttribute('id', 'toolinfo');
        toolinfodiv.setAttribute('style', 'align-items: center;');

        const th1 = document.createElement('h1');
        th1.appendChild(document.createTextNode('Tool Information'));
        toolinfodiv.appendChild(th1);

        const damage = document.createElement('div');
        damage.setAttribute('id', 'damage');
        damage.setAttribute('style', 'display: flex; align-items: center;');

        const bonusDamage = Math.floor(weightedChoose([-1, -1, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 6], 0.5, 2));

        // unit is POINTS OF DAMAGE
        const swordDamage = bonusDamage + 4;
        const shovelDamage = bonusDamage + 2.5;
        const pickaxeDamage = bonusDamage + 2;
        const axeDamage = bonusDamage + 7;

        const damageTypes = [
            ['Sword', swordDamage],
            ['Shovel', shovelDamage],
            ['Pickaxe', pickaxeDamage],
            ['Axe', axeDamage]
        ];

        for (const d of damageTypes) {
            const individualDamageDiv = document.createElement('div');
            const dh1 = document.createElement('h2');
            dh1.appendChild(document.createTextNode(d[0] + ' Damage'));
            dh1.setAttribute('style', 'margin-right: 10px;');
            individualDamageDiv.appendChild(dh1);

            for (i of createSvgList(d[1] / 2, 'heart', 32)) {
                individualDamageDiv.appendChild(i);
            }

            individualDamageDiv.appendChild(document.createTextNode('(' + d[1] + ')'));
            damage.append(individualDamageDiv);
        }

        toolinfodiv.appendChild(damage);
        // toolinfodiv.appendChild(document.createElement('br'));

        const oreToolHarvestLevel = toTitleCase(choose(materials));

        const oTHLHeader = document.createElement('h4');
        oTHLHeader.appendChild(document.createTextNode(toTitleCase(name) + ' Pickaxes have the same harvest level as ' + oreToolHarvestLevel + ' Pickaxes'));
        toolinfodiv.appendChild(oTHLHeader);

        const toolcanvi = document.createElement('div');
        toolcanvi.setAttribute('id', 'toolcanvi');
        toolcanvi.setAttribute('style', 'display: flex; align-items: center;');

        const durability = Math.floor(weightedChoose([32, 131, 250, 250, 250, 250, 1561, 1561, 2031, 2500], 0.5, 2));

        const durabdiv = document.createElement('div');
        durabdiv.setAttribute('id', 'durability');
        durabdiv.setAttribute('style', 'align-items: center; margin-right: 30px;');

        dh1 = document.createElement('h2');
        dh1.appendChild(document.createTextNode('Durability: ' + durability));
        dh1.setAttribute('style', 'margin-right: 10px;');
        durabdiv.appendChild(dh1);

        const durabcomps = [
            ['gold', 32],
            ['wood', 59],
            ['stone', 131],
            ['iron', 250],
            ['diamond', 1561],
            ['netherite', 2031],
            [name, durability]
        ];

        const dcanvas = document.createElement('canvas');
        drawComparisonGraph(dcanvas, name, colorhex, durabcomps, itemcanvas);
        durabdiv.appendChild(dcanvas);
        toolcanvi.appendChild(durabdiv);

        // mining speed
        const miningspeed = round(weightedChoose([4, 6, 6, 6, 8, 8, 9, 12], 0.75, 1.5), 1);

        const miningspeeddiv = document.createElement('div');
        miningspeeddiv.setAttribute('id', 'miningspeed');
        miningspeeddiv.setAttribute('style', 'align-items: center; margin-right: 30px;');

        dh1 = document.createElement('h2');
        dh1.appendChild(document.createTextNode('Mining Speed: ' + miningspeed + '× Fist'));
        dh1.setAttribute('style', 'margin-right: 10px;');
        miningspeeddiv.appendChild(dh1);

        const miningcomps = [
            ['wood', 2],
            ['stone', 4],
            ['iron', 6],
            ['diamond', 8],
            ['netherite', 9],
            ['gold', 12],
            [name, miningspeed]
        ];

        const mcanvas = document.createElement('canvas');
        drawComparisonGraph(mcanvas, name, colorhex, miningcomps, itemcanvas);
        miningspeeddiv.appendChild(mcanvas);
        toolcanvi.appendChild(miningspeeddiv);

        // tool enchantability
        const tool_ench = round(weightedChoose([5, 10, 10, 14, 14, 14, 15, 15, 15, 22], 0.75, 2.5), 1);

        const tool_ench_div = document.createElement('div');
        tool_ench_div.setAttribute('id', 'tool_ench_');
        tool_ench_div.setAttribute('style', 'align-items: center;');

        dh1 = document.createElement('h2');
        dh1.appendChild(document.createTextNode('Tool Enchantability: ' + tool_ench));
        dh1.setAttribute('style', 'margin-right: 10px;');
        tool_ench_div.appendChild(dh1);

        const tenchcomps = [
            ['wood', 15],
            ['stone', 5],
            ['iron', 14],
            ['diamond', 10],
            ['gold', 22],
            ['netherite', 15],
            [name, tool_ench]
        ];

        const tecanvas = document.createElement('canvas');
        drawComparisonGraph(tecanvas, name, colorhex, tenchcomps, itemcanvas);

        tool_ench_div.appendChild(tecanvas);
        toolcanvi.appendChild(tool_ench_div);

        toolinfodiv.appendChild(toolcanvi);
        document.body.appendChild(toolinfodiv);
    } else {
        const th1 = document.createElement('h2');
        th1.setAttribute('id', 'toolinfo');
        th1.appendChild(document.createTextNode(toTitleCase(name) + ' cannot be made into tools.'));
        document.body.appendChild(th1);
    }

    if (canMakeArmor) {
        const armorinfodiv = document.createElement('div');
        armorinfodiv.setAttribute('id', 'armorinfo');
        armorinfodiv.setAttribute('style', 'align-items: center;');

        const th1 = document.createElement('h1');
        th1.appendChild(document.createTextNode('Armor Information'));
        armorinfodiv.appendChild(th1);

        const armor_protection = document.createElement('div');
        armor_protection.setAttribute('id', 'armorprotection');
        armor_protection.setAttribute('style', 'display: flex; align-items: center;');

        const ph1 = document.createElement('h2');
        ph1.appendChild(document.createTextNode('Full Set Armor Protection: '));
        ph1.setAttribute('style', 'margin-right: 10px;');
        armor_protection.appendChild(ph1);

        const prot_chest = getRandomInt(3, 12);
        const prot_leggings = Math.max(1, prot_chest - getRandomInt(1, 5));
        const prot_helmet = Math.max(1, prot_leggings - getRandomInt(1, 5));
        const prot_boots = Math.max(1, prot_helmet - getRandomInt(0, 2));

        const totalprot = prot_chest + prot_leggings + prot_helmet + prot_boots;

        for (i of createSvgList(totalprot / 2, 'armor', 32)) {
            armor_protection.appendChild(i);
        }

        armor_protection.appendChild(document.createTextNode('(' + totalprot + ')'));

        armorinfodiv.appendChild(armor_protection);

        const iad = document.createElement('div');
        iad.setAttribute('style', 'display: flex; align-items: center;');

        for (i of [['Helmet', prot_helmet], ['Chestplate', prot_chest], ['Leggings', prot_leggings], ['Boots', prot_boots]]) {
            const e = document.createElement('div');
            e.setAttribute('style', 'display: flex; align-items: center; margin-right: 20px');
            const h = document.createElement('h3');
            h.appendChild(document.createTextNode(i[0] + ': '));
            h.setAttribute('style', 'margin-right: 5px');
            e.appendChild(h);
            for (s of createSvgList(i[1] / 2, 'armor', 16)) {
                e.appendChild(s);
            }

            e.appendChild(document.createTextNode('(' + i[1] + ')'));

            iad.appendChild(e);
        }
        armorinfodiv.appendChild(iad);

        let armor_toughness = 0;

        if (Math.random() < 0.25) {
            armor_toughness = choose([1, 1, 1, 2, 2, 3, 4]);

            const e = document.createElement('h3');
            e.appendChild(document.createTextNode('Each piece of this armor grants ' + armor_toughness + ' armor toughness.'));
            armorinfodiv.appendChild(e);
        }

        if (Math.random() < 0.25) {
            knockbackResistance = choose([0.5, 0.5, 0.5, 1, 1, 1, 1, 2]);
            const e = document.createElement('h3');
            e.appendChild(document.createTextNode('Each piece of this armor grants ' + knockbackResistance + ' point(s) of knockback resistance.'));
            armorinfodiv.appendChild(e);
        }

        twenty_reduction = round(20 * (1 - (Math.min(25, Math.max(totalprot / 5, totalprot - (20 / (2 + armor_toughness)))) / 25)), 2);
        const dmgreduction = document.createElement('h3');
        dmgreduction.appendChild(document.createTextNode('A 20 damage attack will be reduced to ' + twenty_reduction + ' damage when wearing a full set of ' + toTitleCase(name) + ' armor.'));
        armorinfodiv.appendChild(dmgreduction);

        /*
		In minecraft, the total armor durability is always a multiple of 55.

		The points are distributed amongst the individual pieces as follows:
		helmet - 11/55
		chestplate - 16/55
		leggings - 15/55
		boots - 13/55

		why is 55 the denominator? i have no idea!
		[5, 7, 15, 15, 33, 37]
		*/

        const fundamentalDurabilityUnit = Math.floor(weightedChoose([5, 7, 7, 15, 15, 15, 15, 15, 15, 33, 33, 37, 37, 50], 0.5, 2));

        const helmetDurability = 11 * fundamentalDurabilityUnit;
        const chestplateDurability = 16 * fundamentalDurabilityUnit;
        const leggingsDurability = 15 * fundamentalDurabilityUnit;
        const bootsDurability = 13 * fundamentalDurabilityUnit;
        const fullSetDurability = 55 * fundamentalDurabilityUnit;
        const ARMOR_MULTIPLIER = 55;
        const armorDurabComparisons = [
            ['leather', 5 * ARMOR_MULTIPLIER],
            ['gold', 7 * ARMOR_MULTIPLIER],
            ['chain', 15 * ARMOR_MULTIPLIER],
            ['iron', 15 * ARMOR_MULTIPLIER],
            ['diamond', 33 * ARMOR_MULTIPLIER],
            ['netherite', 37 * ARMOR_MULTIPLIER],
            [name, fullSetDurability]
        ];

        const armorDurabilityDiv = document.createElement('div');
        // armorDurabilityDiv.setAttribute('style','display: flex; align-items: center;')

        const h = document.createElement('h2');
        h.appendChild(document.createTextNode('Full Set Durability: ' + fullSetDurability));
        armorDurabilityDiv.appendChild(h);
        for (i of [['Helmet', helmetDurability], ['Chestplate', chestplateDurability], ['Leggings', leggingsDurability], ['Boots', bootsDurability]]) {
            const h = document.createElement('h3');
            h.appendChild(document.createTextNode(i[0] + ': ' + i[1]));
            armorDurabilityDiv.appendChild(h);
        }
        armorinfodiv.appendChild(armorDurabilityDiv);
        const durabilitygraph = document.createElement('canvas');
        drawComparisonGraph(durabilitygraph, name, colorhex, armorDurabComparisons, itemcanvas);
        armorinfodiv.appendChild(durabilitygraph);

        document.body.appendChild(armorinfodiv);
    } else {
        const th1 = document.createElement('h2');
        th1.setAttribute('id', 'armorinfo');
        th1.appendChild(document.createTextNode(toTitleCase(name) + ' cannot be made into armor.'));
        document.body.appendChild(th1);
    }

    // SPECIAL CHARACTERISTICS
    const consumableOre = (Math.random() < 0.1);
    const potionEffectOnHit = (canMakeTools && Math.random() < 0.1);
    const fullSetBonus = (canMakeArmor && Math.random() < 0.1);
    if (consumableOre || potionEffectOnHit || fullSetBonus) {
        const specialdiv = document.createElement('div');
        specialdiv.setAttribute('id', 'specialcharacteristics');
        specialdiv.setAttribute('style', 'align-items: center;');

        const th1 = document.createElement('h1');
        th1.appendChild(document.createTextNode('Special Characteristics'));
        specialdiv.appendChild(th1);

        if (consumableOre) {
            const h2 = document.createElement('h2');
            let consumableString = toTitleCase(name) + ' is consumable.';
            if (Math.random() < 0.5) {
                const hungerPoints = getRandomInt(1, 20);
                const saturationPoints = getRandomInt(1, 20);
                consumableString += ' Eating it will restore ' + hungerPoints + ' hunger and ' + saturationPoints + ' saturation.';
            } else {
                let potionEffect;
                if (Math.random() < 0.8) {
                    potionEffect = choose(POSITIVE_POTION_EFFECTS);
                } else {
                    potionEffect = choose(NEGATIVE_POTION_EFFECTS);
                }

                let potency = '';
                if (!SINGLE_POTENTCY_EFFECTS.includes(potionEffect)) {
                    potency = choose(['I', 'I', 'I', 'I', 'I', 'I', 'II', 'II', 'II', 'III', 'III', 'IV']);
                }

                if (potionEffect == 'Instant Health' || potionEffect == 'Instant Damage') {
                    consumableString += ' Eating it will give you ' + potionEffect + ' ' + potency + '.';
                } else {
                    const time = choose(['10s', '10s', '10s', '10s', '10s', '10s', '10s', '10s', '30s', '30s', '30s', '45s', '45s', '1m', '2m']);
                    consumableString += ' Eating it will give you ' + potionEffect + ' ';
                    if (potency != '') {
                        consumableString += potency + ' ';
                    }
                    consumableString += 'for ' + time + '.';
                }
            }

            h2.appendChild(document.createTextNode(consumableString));
            specialdiv.appendChild(h2);
        }

        if (potionEffectOnHit) {
            const h2 = document.createElement('h2');
            let pEOHString = 'Hitting an entity with any ' + toTitleCase(name) + ' tool gives them ';
            let potionEffect;
            if (Math.random() < 0.7) {
                potionEffect = choose(NEGATIVE_POTION_EFFECTS);
            } else {
                potionEffect = choose(POSITIVE_POTION_EFFECTS);
            }

            let potency = '';
            if (!SINGLE_POTENTCY_EFFECTS.includes(potionEffect)) {
                potency = choose(['I', 'I', 'I', 'I', 'I', 'I', 'II', 'II', 'II', 'III', 'III', 'IV']);
            }

            if (potionEffect == 'Instant Health' || potionEffect == 'Instant Damage') {
                pEOHString += potionEffect + ' ' + potency + '.';
            } else {
                const time = choose(['10s', '10s', '10s', '10s', '10s', '10s', '10s', '10s', '10s', '10s', '30s', '35s', '45s', '1m']);
                pEOHString += potionEffect + ' ';
                if (potency != '') {
                    pEOHString += potency + ' ';
                }
                pEOHString += 'for ' + time + '.';
            }
            h2.appendChild(document.createTextNode(pEOHString));
            specialdiv.appendChild(h2);
        }

        if (fullSetBonus) {
            const h2 = document.createElement('h2');
            let fSBString = 'Wearing a full set of ' + toTitleCase(name) + ' armor grants you permenant ';
            let potionEffect = '';
            if (Math.random() < 0.8) {
                potionEffect = choose(POSITIVE_POTION_EFFECTS);
            } else {
                potionEffect = choose(NEGATIVE_POTION_EFFECTS);
            }

            if (potionEffect == 'Instant Health') {
                potionEffect = 'Regeneration';
            } else if (potionEffect == 'Instant Damage') {
                potionEffect = 'Wither';
            }

            fSBString += potionEffect;

            if (SINGLE_POTENTCY_EFFECTS.includes(potionEffect)) {
                fSBString += '.';
            } else {
                potency = choose(['I', 'I', 'I', 'I', 'I', 'I', 'II', 'II', 'II', 'III', 'III', 'IV']);
                fSBString += ' ' + potency + '.';
            }
            h2.appendChild(document.createTextNode(fSBString));
            specialdiv.appendChild(h2);
        }
        document.body.appendChild(specialdiv);
    }
}

function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPowerAugmented(min, max, power) {
    return getRandomArbitrary(min ** power, max ** power) ** (1 / power);
}

function toTitleCase(str) {
    return str.split(' ').map(x => x[0].toUpperCase() + x.slice(1)).join(' ');
}

function share() {
    const seed = parseInt(document.getElementById('seed').value);
    const language = document.getElementById('language').value;
    const urlString = 'https://baz9k.xyz/randomore?language=' + language + '&seed=' + seed;
    navigator.clipboard.writeText(urlString).then(() => {}).catch(err => {
        alert('Error in copying text: ', err);
  	});
}

randomizeSeed();

const queryString = window.location.search;
if (queryString != '') {
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('language')) {
        document.getElementById('language').value = urlParams.get('language');
    }

    if (urlParams.has('seed')) {
        document.getElementById('seed').value = urlParams.get('seed');
    }
}

generateOre();

window.addEventListener('keydown', function(event) {
    if (event.key == 'r') {
        randomizeSeed();
        generateOre();
    }
});
