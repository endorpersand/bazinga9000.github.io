function englishOre() {
	let initials = 'bcdfghjklmnprstvwxyz'.split('').concat(['bl', 'br', 'ch', 'cl', 'cr', 'dr', 'fn', 'fl', 'fr', 'gl', 'gr', 'ph', 'pl',
		'pr', 'sh', 'sk', 'sl', 'sm', 'sn', 'sp', 'spl', 'spr', 'st', 'str', 'sw', 'qu', 'th', 'tj', 'tr', 'tw', ''
	]);

	let nuclei = ['a', 'e', 'i', 'o', 'u', 'ai', 'ay', 'ee', 'ea', 'y', 'ie', 'oa', 'ew']

	let finals = 'bcdfgklmnprstvxz'.split('').concat(['ch', 'ck', 'ct', 'ft', 'ld', 'lg', 'lk', 'lt', 'mp', 'nd', 'ng', 'nk', 'nt', 'ph', 'pt',
		'rk', 'rt', 'sh', 'sk', 'sp', 'ss', 'st', 'th', ''
	]);


	let suffixes = ['ite', 'ium', 'ane', 'ine', 'ene', 'ate', 'lite', 'lith']

	let l = suffixes.length;
	for (i = 0; i < l; i++) {
		suffixes.push("");
	}

	let syllable_count = choose([1, 1, 1, 2, 2, 3]);

	let name = "";

	for (i = 0; i < syllable_count; i++) {
		name += choose(initials) + choose(nuclei) + choose(finals)
	}

	name += choose(suffixes)

	return name;
}

function englishComplexOre() {
	let initials = [
		[''],
		['f', 't', 'n', 'r', 's', 'b', 'w', 'y', 'm', 'h', 'v', 'c', 'p', 'g', 'd', 'l', 'k', 'x', 'j', 'z'], 
		['qu', 'th', 'fr', 'wh', 'ch', 'cl', 'ts', 'pr', 'pl', 'st', 'tw', 'sh', 'bl', 'gh', 'gr', 'kn', 'tr', 'gn', 'ph', 'sp',
		 'sm', 'cr', 'sc', 'br', 'wr', 'ps', 'dr', 'sk', 'sl', 'gl', 'fl', 'sr', 'sw', 'kl', 'sn', 'dw', 'sf', 'kr', 'vr',
		 'kw', 'rh'], 
		['sch','thr', 'scr', 'str', 'spl', 'chr', 'spr', 'scl', 'shm', 'sph', 'thw', 'shl', 'phr', 'squ']
	];

	let nuclei = [
		['a', 'e', 'i', 'o', 'u'],
		['aa', 'ah', 'ai', 'ao', 'au', 'aw', 'ay', 'ea', 'ee', 'ei', 'ey', 'eo', 'eu', 'ew', 'ie', 'oa', 'oe', 'oi', 'oo', 'ou',
		 'ow', 'oy', 'ue', 'ui', 'uu', 'uy']
	]

	let finals = [
		[''],
		['f', 't', 'n', 'r', 's', 'b', 'w', 'y', 'm', 'v', 'c', 'p', 'g', 'd', 'l', 'k', 'x', 'z'], 
		['th', 'nd', 'll', 'rm', 'ch', 'ws', 'nt', 'ct', 'ss', 'ls', 'lp', 'ld', 'ck', 'ts', 'st', 'xt', 'rk', 'sh', 'dd', 'mb',
		 'pp', 'rt', 'ft', 'ks', 'gh', 'rs', 'rd', 'ms', 'mp', 'rn', 'ff', 'ng', 'ph', 'sp', 'bs', 'nk', 'wn', 'rc', 'rr', 'nc',
		 'sm', 'pt', 'ns', 'sc', 'rg', 'tt', 'rf', 'lt', 'ps', 'ds', 'lm', 'lf', 'sk', 'cs', 'nn', 'lk', 'rp', 'lb', 'gs', 'gg',
		 'mt', 'mf', 'bb', 'hs', 'fs', 'nx'], 
		['rch', 'rst', 'rve', 'lth', 'rld', 'cts', 'ght', 'nks', 'nts', 'rms', 'lts', 'rts', 'rth', 'sts', 'ngs', 'nst', 'rls',
	     'nth', 'rds', 'nds', 'rks', 'fts', 'nct', 'tch', 'nch', 'lve', 'lls', 'rns', 'lds', 'nns', 'lms', 'cks', 'lph', 'lps', 
	     'mpt', 'mst', 'pts', 'sks', 'phs', 'lfs', 'mns', 'mps', 'mph', 'lks', 'dds', 'cst', 'zzl', 'wns', 'hrs', 'rps', 'mbs',
	     'ggs', 'scs', 'rph', 'rbs', 'bbs'], 
	    ['ghts', 'nths', 'ngth', 'ckle', 'mpts', 'rlds', 'thms', 'ngst'], 
	    ['ngths', 'ngsts']
	];

	let suffixes = ['ite', 'ium', 'ane', 'ine', 'ene', 'ate', 'lite', 'lith']

	let l = suffixes.length;
	for (i = 0; i < l; i++) {
		suffixes.push("");
	}

	let syllable_count = choose([1, 1, 1, 2, 2, 3]);

	let name = "";

	for (i = 0; i < syllable_count; i++) {
		name += choose(initials[choose([0,0,0,1,1,1,1,2,2,2,2,3,3])]) + 
				choose(nuclei[choose([0,0,1])]) + 
				choose(finals[choose([0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,4,4,5])])
	}

	name += choose(suffixes)

	return name;
}

//chinese added by milo jacquet
function chineseSyllable(neutral) {
	let cons = ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's', '']
	let consI = ['b', 'p', 'm', 'd', 't', 'n', 'l', 'j', 'q', 'x', '']
	let consY = ['n', 'l', 'j', 'q', 'x', '']
	let consIsp = ['zh', 'ch', 'sh', 'r', 'z', 'c', 's']
	let vowel = ['e', 'ei', 'ou', 'en', 'eng', 'a', 'ai', 'ao', 'an', 'ang', 'wu', 'wo', 'wei', 'wen', 'weng', 'wa', 'wai', 'wan', 'wang', 'yi', 'ye', 'you', 'yin', 'ying', 'ya', 'yao', 'yan', 'yang', 'yu', 'yue', 'yun', 'yong', 'yuan', 'er']
	let vowelc = ['e', 'ei', 'ou', 'en', 'eng', 'a', 'ai', 'ao', 'an', 'ang', 'u', 'uo', 'ui', 'un', 'ong', 'ua', 'uai', 'uan', 'uang', 'i', 'ie', 'iu', 'in', 'ing', 'ia', 'iao', 'ian', 'iang', 'ü', 'üe', 'ün', 'iong', 'üan', 'er']
	let rand = Math.floor(Math.random() * 498)
	let sel_cons
	let sel_vow
	if (rand < 361) {
		sel_cons = cons[rand % 19]
		sel_vow = Math.floor(rand / 19)
	} else if (rand < 361 + 7) {
		rand = rand - (361)
		sel_cons = consIsp[rand % 7]
		sel_vow = 19
	} else if (rand < 361 + 7 + 99) {
		rand = rand - (361 + 7)
		sel_cons = consI[rand % 11]
		sel_vow = Math.floor(rand / 11) + 19
	} else if (rand < 361 + 7 + 99 + 30) {
		rand = rand - (361 + 7 + 99)
		sel_cons = consY[rand % 6]
		sel_vow = Math.floor(rand / 6) + 19 + 9
	} else {
		sel_cons = ''
		sel_vow = 33
	}

	let sel_vowel
	if (sel_cons == '') {
		sel_vowel = vowel[sel_vow]
	} else {
		sel_vowel = vowelc[sel_vow]
	}

	let syl = sel_cons + sel_vowel
	if (syl[0] == 'e' || syl[0] == 'a' || syl[0] == 'o') {
		syl = "'" + syl
	}
	syl = syl.replace(/([bpmf])uo/, '$1o')
	syl = syl.replace(/([jqx])ü/, '$1u')

	if (sel_vowel == 'ao') {
		syl = syl.replace(/ao/, 'a!o')
	} else if (/[aeo]/.test(syl)) {
		syl = syl.replace(/([aeo])/, '$1!')
	} else {
		syl = syl.replace(/([iu])/g, '$1!')
		if (syl.indexOf('!') != syl.lastIndexOf('!')) {
			syl = syl.replace(/!/, '')
		}
	}

	let tones = ['\u0304', '\u0301', '\u030c', '\u0300']
	if (neutral) {
		tones.push('')
	}
	let sel_tone = tones[Math.floor(Math.random() * tones.length)]
	syl = syl.replace(/!/, sel_tone)
	return syl
}

function chineseOre() {

	let syllables = choose([1, 1, 2, 2, 2, 2, 2, 3, 3, 3]);

	let word = chineseSyllable(false)
	for (let i = 1; i < syllables; i++) {
		word += chineseSyllable(true)
	}

	let ore_suffixes = ['', '', 'shi\u0301', 'kua\u0300ng']
	word = word + ore_suffixes[Math.floor(Math.random() * ore_suffixes.length)]

	if (word[0] == "'") {
		word = word.slice(1)
	}
	return word
}

//japanese made by milo jacquet
function japaneseOnSyllable(){
  let vowel = ['a','i','u','e','o','ya','yu','yo']
  let vowelnoy = ['a','i','u','e','o']
  let cons = ['k','g','s','z','t','d','n','h','b','m','r','']
  let lvowel = ['ai','uu','ei','ou','yuu','you']
  let final = ['k','t']
  let rand = Math.random()
  let syl
  if (rand < 0.5){
    syl = choose(cons) + choose(lvowel)
  } else if (rand < 0.7){
    syl = choose(cons) + choose(vowelnoy) + 'n;'
  } else if (rand < 0.89){
    syl = choose(cons) + choose(vowel) + choose(final) + ';'
  } else if (rand < 0.99){
    syl = choose(cons) + choose(vowel)
  } else {
    syl = 'wa' + choose(['','i','k;','t;','n;'])
  }
  return syl
}

function japaneseOnOre() {
	let syllables = choose([1, 1, 2, 2, 2, 2, 2, 3, 3, 3]);

	let word = ''
	for (let i = 0; i < syllables; i++) {
		word += japaneseOnSyllable()
	}

	let ore_suffixes = ['', '', 'kou', 'seki']
	word = word + ore_suffixes[Math.floor(Math.random() * ore_suffixes.length)]

	word = word.replace(/n;(?=[aiueo])/, 'n\'')
	word = word.replace(/n;h/g, 'nb')
	word = word.replace(/n;/g, 'n')
	word = word.replace(/[kt];([kt])/g, '$1$1')
	word = word.replace(/;/g, 'u')
	word = word.replace(/si/g, 'shi')
	word = word.replace(/[zd]i/g, 'ji')
	word = word.replace(/ti/g, 'chi')
	word = word.replace(/tu/g, 'tsu')
	word = word.replace(/du/g, 'zu')
	word = word.replace(/hu/g, 'fu')
	word = word.replace(/sy/g, 'sh')
	word = word.replace(/[zd]y/g, 'j')
	word = word.replace(/ty/g, 'ch')
	return word
}

//vietnamese implemented by endr
function vietnameseOre() {
    let initials = [
            '', 'b', 'ch', 'd', 'đ', 'gi', 'h', 'kh', 'l', 'm', 'n', 'nh', 'ph', 'r', 's', 't', 'th', 'tr', 'v', 'x',
            'c', 'g', 'ng' // [c, k, qu], [g, gh], [ngh]
        ],
        finals = ['', 'c', 'm', 'n', 'ng', 'p', 't'], // + ch, nh (for a, ê, i)
        monophs = [
            "a", "ă", "â", "e", "ê", "o", "ô", "ơ", "u", "ư", // normal monoph
            "i", "iê", "ươ", "uô", // [i, y], [iê, ia], [ươ, ưa], [uô, ua]
        ];
        tones = ['', '\u0300', '\u0301', '\u0303', '\u0309', '\u0323'];
        finals = finals.flatMap(x => [x, '']);
    let peek = iter => iter[iter.length - 1];
    let diphables = char => {
        let canDiph = [];
        if (!['ư','ươ','o','ô','u','uô'].includes(char)) canDiph.push('w_');
        if (['e','i','a'].includes(char)) canDiph.push('w_w');
        if (['a','ă','â'].includes(char)) canDiph.push('w_j');
        if (!['e','ê','i','iê'].includes(char)) canDiph.push('_j');
        if (!['o','ô','u','uô'].includes(char)) canDiph.push('_w');
        canDiph = canDiph.flatMap(x => ['_', x]);
        return canDiph;
    }
    
    let syllables = [];
    let sylcount = choose([1,1,1,2,2,3]);
    for (let i = 0; i < sylcount; i++) {
        let initial = choose(initials);
        monoph = choose(monophs);
        diphconfig = choose(diphables(monoph)),
        final = /_[jw]$/.test(diphconfig) ? '' : (['a', 'ê', 'i'].includes(peek(monoph)) ? choose([...finals, 'ch', 'nh']) : choose(finals));
        tone = choose(tones);
 
        let syllable = initial + diphconfig.replace('_', monoph) + final;
        syllable = syllable.replace(/c(i|e|ê)/, 'k$1')
                           .replace(/cw/, 'qu')
        if (peek(initial) === 'g') syllable = syllable.replace(/g(i|e|ê)/, 'gh$1');
        syllable = syllable.replace(/iê$/, 'ia')
                           .replace(/ươ$/, 'ưa')
                           .replace(/uô$/, 'ua')
                           .replace(/^iê/, 'yê')
                           .replace(/(w|u)i/, 'uy')
                           .replace(/(ă|â)j/, '$1y')
                           .replace(/j/, 'i')
                           .replace(/(a|e)w/, '$1o')
                           .replace(/ăw/, 'au')
                           .replace(/w$/, 'u')
                           .replace(/w(e|ă)/, 'o$1')
                           .replace(/wa/, () => choose(['u', 'o']) + 'a')
                           .replace(/w/, 'u')
        if (tone !== '') {
            syllable = syllable.replace(/(iưu)a/, '$1' + tone + 'a')
                               .replace(monoph, monoph + tone)
        }
        syllable = syllable.replace(/gii/, 'gi')
                           .replace(/ăy/, 'ay')
    syllables.push(syllable);
    }
    return syllables.join(' ');
}