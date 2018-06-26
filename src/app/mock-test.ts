import { Test } from "./test";


export let TESTS: Test[] = [
    {
        states:"USA",
        value: 250,
        percentage:"0"
    },{
        states:"China",
        value: Math.round(Math.random()*1000),
        percentage:"0"
    },{
        states:"Kazakhstan",
        value: Math.round(Math.random()*1000),
        percentage:"0"
    },{
        states:"Mongolia",
        value: Math.round(Math.random()*1000),
        percentage:"0"
    },{
        states:"India",
        value: Math.round(Math.random()*1000),
        percentage:"0"
    },{
        states:"Russia",
        value: Math.round(Math.random()*1000),
        percentage:"0"
    }
]; 
let total:number = 0;
for (let i = 0; i < TESTS.length;i++) {
    total += TESTS[i].value;
}

for (let i = 0; i < TESTS.length;i++) {
    TESTS[i].percentage = (TESTS[i].value/total).toFixed(2); 
}