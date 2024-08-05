var string = "This is the mid way show with Cheryl Waters";
var urlFriendly = "";

for (var i=0; i <string.length; i++){
  if (string[i] === " ") {
    urlFriendly = urlFriendly + "-";
  } else {
    urlFriendly += string[i];
  }
} 

urlFriendly = urlFriendly.toLowerCase();
console.log(urlFriendly);