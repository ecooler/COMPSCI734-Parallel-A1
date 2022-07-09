"use strict";

function sleep (ms) {
  return new Promise(resolve => setTimeout (resolve, ms));
}

const Channel = require(`@nodeguy/channel`);

function take (ch) { return ch.shift() }
function send (ch, v) { ch.push(v) }

let achan = Channel ()  // 0, 1, 2, ...

async function agent () { 
    var count = 0
	for (;;) {
        let m = await take (achan)
		count += 1;
        console.log (`take "${m}"`)
        await sleep (100)
    }
}

async function setup () {
	agent ();
    
    let s = ["the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog",]
	
	for (let m of s) {
        console.log (`send "${m}"`)
	   	let len = await send (achan, m)
	}
}

function Main() {
    setup().then(() => console.log (`... done`))
}

Main ()
