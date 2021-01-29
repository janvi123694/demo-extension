let blockButton = document.querySelector('.block')   // btn 
let blockSite = document.getElementById('block-site');  // input 
let blockedSiteList = document.querySelector('.list-group')  // ul 
let globalBlockList = []; // to prevent dups

chrome.runtime.sendMessage({type:"getList"} , function(blockList){
  globalBlockList = blockList; 
  for(let i =0;i<blockList.length;i++){
      addSiteToBeBlocked(blockList[i].site); 
  }
})


function addSiteToBeBlocked(value){
    let li = document.createElement("li");  
    li.classList.add('list-group-item'); 

    let i = document.createElement('i');
    i.classList.add('fas'); 
    i.classList.add('fa-trash'); 
     
    let div = document.createElement('div'); // li->div(contains val & i) ->i
    div.classList.add('d-flex'); 
    div.classList.add('justify-content-between')
    div.innerHTML+=`<p> ${value} </p>`;
    div.append(i); 
    
    li.append(div); 
    blockedSiteList.appendChild(li);

    i.addEventListener('click' , function(){
        i.parentNode.parentNode.remove();   // ui update 

        chrome.runtime.sendMessage({type:"add", site: value} , function(response){  // data updat e
        console.log(response); 
        })
    
    })

}

blockButton.addEventListener('click', function(){
    let value = blockSite.value;  // url entered in input 
    if(value){  // if teh user hasnt simply clicked
        for(let i =0;i<globalBlockList.length;i++){
            if(globalBlockList[i].site==value){
                blockSite.value=""; 
                return; // clear the ip and return in case of dup vakues
            }
        }
        globalBlockList.push({site:value});  // 
        addSiteToBeBlocked(value)
        blockSite.value ="" // clear input 

        chrome.runtime.sendMessage({type:"add", site: value} , function(response){
            console.log(response); 
        })
    }
});

