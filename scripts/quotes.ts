const quotes: string[] = [
    "\"AAAAAAAAAAAAAAAAAAAAAAAh!!!\"\n-???",
    "\"Sometimes you just need a old NES and a dirty towel\"\n-IGM news",
    "\"A bread and rice makes a good brunch\"\n-40y/o womem",
    "\"The ornithorhyncus is the commom animal of nowhere\"\n-Cam Bridge biologist",
    "\"In rainy days, go outside and talk with some friends\"\n-GigaChad",
    "\"OK!\"\n-Rammus mains",
    "\"Shut up and play league of legends\"\n-Your Worst Enemie",
    "\"Ever say Never\"\n-Justin Trieber",    
    "\"One time someone asked to Dalai Lama, \"what impress you the most?\"\nHe said:\n...\"\n-Someone to Dalai Lama",
    "\"Have bread in the Heaven?\"\n-Starving man",    
    "\"You are actually thinking.\"\n-Neurocientist",  
    "\"Content-creator mode ON!!!\nHELLO EVERYONE, WELCOME TO MY CHANNEL!!! TODAY WE'LL DISCOVER WHY THE EARTH IS FLAT!!!\"\n-Flatearth youtuber",
    "\"Comunist!!!\"\n-Liberalist people to comunists",  
    "\"You're a Monster!!!\"\n-Comunist people to liberalist",  
    "\"Thanks for be playing this simple and easy puzzle game ;)\"\n-The Programmer",
    "\"What is Happiness\"\n-Philosophers",
    "\"Bye.\"\n-The Death",
]

let numbersPassed: number[] = [];

export default function GetQuote(): string{
    let n: number = Math.floor(love.math.random()*quotes.length);

    if (numbersPassed.length == quotes.length) {
        numbersPassed = [];
    }

    while (numbersPassed.includes(n)) {
        n = Math.floor(love.math.random()*quotes.length);
    }

    numbersPassed.push(n);

    return quotes[n];
}