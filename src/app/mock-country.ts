import { Country } from "./country";


export let COUNTRIES: Country[] = [
    {
        name:"USA",
        quanity: Math.round(Math.random()*1000),
        percentage:"0"
    },{
        name:"China",
        quanity: Math.round(Math.random()*1000),
        percentage:"0"
    },{
        name:"Kazakhstan",
        quanity: Math.round(Math.random()*1000),
        percentage:"0"
    },{
        name:"Mongolia",
        quanity: Math.round(Math.random()*1000),
        percentage:"0"
    },{
        name:"India",
        quanity: Math.round(Math.random()*1000),
        percentage:"0"
    },{
        name:"Russia",
        quanity: Math.round(Math.random()*1000),
        percentage:"0"
    }
]; 
let total:number = 0;
for (let i = 0; i < COUNTRIES.length;i++) {
    total += COUNTRIES[i].quanity;
}

for (let i = 0; i < COUNTRIES.length;i++) {
    COUNTRIES[i].percentage = (COUNTRIES[i].quanity/total).toFixed(2); 
}