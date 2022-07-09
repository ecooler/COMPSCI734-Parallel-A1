"use strict";

function sleep (ms) {
  return new Promise(resolve => setTimeout (resolve, ms));
}

const Channel = require(`@nodeguy/channel`);

function take (ch) { return ch.shift() }
function send (ch, v) { ch.push(v) }  /// NOT give !

let achan = Channel ()

async function agent () { 
    var count = 0
	for (;;) {
        let msg = await take (achan)
		count += 1;
        console.log (`agent received "${msg}", total=${count} messages`)
        await sleep (100)
        console.log (`agent ...`)
    }
}

async function setup () {
	console.log (`main`)
	
	agent ();
	
	for (let m of ["the", "quick", "brown", "fox",]) {
	   	let len = await send (achan, m)
	}
	    
	for (let m of ["jumps", "over", "the", "lazy", "dog",]) { 
	   	await send (achan, m)
	}
}

function Main() {
    setup().then(() => console.log (`... done`))
}

Main ()
