let userName = null;
let input = document.getElementById("userInput");

document.addEventListener('DOMContentLoaded', function() {
  var checkButton = document.getElementById('getUserButton');
  checkButton.addEventListener('click', function() {
   userName = document.getElementById('userInput').value;
    updateData();
  }, false);
}, false);



async function updateData() {
    let jsonData;
    const result = await fetch(getApiLink(userName));
    jsonData = await result.json();
    if (jsonData['code'] != 200) {
        alert("API Error "+ getErrorMessage(jsonData['code']));
        return;
    } 

    // JSON accessor
    let playerData = jsonData['data'][0];

    // Root Objects
    let global = playerData.global;
    let guild = playerData.guild;
    let meta = playerData.meta;
    let ranking = playerData.ranking;
    let uuid = playerData.uuid; 
    userName = playerData.username;
    let title = playerData.rank;

    

    // Update HTML
    {
    // document.getElementById("title").innerHTML = playerData.username + "'s player data"; 
    document.getElementById("blocksWalked").innerHTML = 'Blocks Walked: ' + global.blocksWalked; 
    document.getElementById("mobsKilled").innerHTML = 'Mobs Killed: ' + global.mobsKilled; 
    document.getElementById("totalLevelCombined").innerHTML = 'Total Level: ' + global.totalLevel.combined; 
    document.getElementById("pvpKills").innerHTML = 'PVP Kills: ' + global.pvp.kills; 
    document.getElementById("pvpDeaths").innerHTML = 'PVP Deaths: ' + global.pvp.deaths; 
    document.getElementById("deaths").innerHTML = 'PVP Deaths: ' + global.deaths; 
    document.getElementById("discoveries").innerHTML = 'Discoveries: ' + global.discoveries; 
    document.getElementById("swarmsWon").innerHTML = 'Swarms Won: ' + global.eventsWon; 
    }

    document.getElementById("playtime").innerHTML = 'Playtime: ' + (Math.ceil(100*(meta.playtime*4.7)/60))/100 + ' hours';
    let firstJoin = meta.firstJoin;
    let lastJoin = meta.lastJoin;
    let rank = meta.tag.value;
    let veteran = meta.playtime;
    let guildStats = {"name": guild.name, "rank": guild.rank};

    // Rank Check
    let rankColor = null;
    switch (title) {
        case "Player":
            switch (rank) {
                case "VIP":
                    rankColor = "green";
                    break;
                case "VIP+":
                    rankColor = "darkCyan";
                    break;
                case "HERO":
                    rankColor = "purple";
                    break;
                case "CHAMPION":
                    rankColor = "gold";
                    break;
                default:
                    rankColor = "gray"
                    break;
            }
        break;
        case "Administrator":
            rankColor = "red";
            break;
        case "Moderator":
            rankColor = "yellow";
            break;
        case "Builder":
            rankColor = "aqua";
            break;
        case "Item":
            rankColor = "aqua";
            break;  
        case "Game Master":
            rankColor = "aqua";
            break;      
        case "CMD":
            rankColor = "aqua";
            break;
        case "Hybrid":
            rankColor = "aqua";
            break;
        case "Media":
            rankColor = "purple";
            break;
        
    }

    let currentServer = null;

    if (meta.location.online) {
        currentServer = meta.location.server;
    }

    let nametag;
    if (currentServer === null) {
        setHtmlTo('nametagServer', 'text', '[offline]');
        setHtmlTo('nametagServer', 'color', 'gray');

        setHtmlTo('nametagUsername', 'text', userName);
        setHtmlTo('nametagUsername', 'color', rankColor);
    } else {
        setHtmlTo('nametagServer', 'text', '[' + currentServer + ']');
        setHtmlTo('nametagServer', 'color', 'gray');

        setHtmlTo('nametagUsername', 'text', userName);
        setHtmlTo('nametagUsername', 'color', rankColor);
        
    }


    document.getElementById('bodyRender').src= "https://visage.surgeplay.com/full/350/" + uuid;
    document.getElementById('content').style.visibility = "visible";
    document.getElementById('bodyRender').style.visibility = "visible";


}

function getApiLink(name) {
    return "https://api.wynncraft.com/v2/player/"+name+"/stats";
}
function getErrorMessage(errorCode) {
    var message;
    switch (errorCode) {
        case 400:
            message = "400 - Bad Request";
            break;
        case 404:
            message = "404 - Not Found";
            break;
        case 429:
            message = "429 - Too Many Requests";
            break;
        case 500:
            message = "500 - Internal Server Error";
            break;
        case 502:
            message = "502 - Bad Gateway";
            break;
        case 502:
            message = "503 - Service Unavailable";
            break;
        default:
            message = "Unknown Error"
            break;
    }
    return message; 
}

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("getUserButton").click();
    document.getElementById('content').style.visibility = "hidden" 
  }
});

function setHtmlTo(elementId, attribute, value) {
    switch (attribute) {
        case "text":
            document.getElementById(elementId).innerHTML = value;
            break;
        case "color":
            document.getElementById(elementId).style.color = value;
            break;
        default:
            document.getElementById(elementId).innerHTML = value;
            break;
    }

}
