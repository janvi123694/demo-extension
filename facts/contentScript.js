let allimgs = document.querySelectorAll('img'); 

for(let i =0;i<allimgs.length;i++){
    allimgs[i].src= chrome.extension.getURL('images/hey.jpg')
}