let items;//json data through fetch call.
let selectedItem;//current subtype selection.
let url = './items.json';
let currentItems = [];//
let subType = [];//filtered array after filtering sub type.
const MAX_ITEMS = 3;//number of images displaying per page.
let currentStartIndex = 0;

//getting the currently selected sub type.
function updateFilteredItems() {
    
    selectedItem = document.getElementById("selection").value;
  
  
//since items contains all json data currentItems here is items.
    if (selectedItem == "All") {
        currentItems = items;    
    }
    else {//here currentItems is filtered data
        currentItems = items.filter(item => item.imageSubType === selectedItem);    
    }
    
    console.log(currentItems);    
}
//function to get the currently selected item.And change images accordingly.
function onFilterChanged() {
    updateFilteredItems();   
    currentStartIndex = 0;
    loadImageMarkup(currentStartIndex);
}

//this funcion is called when page is loaded.
async function onPageLoad() {
    let response = await fetch(url);
    items = await response.json();
    
    subType.push("All");

    for (i = 0; i < items.length; i++) {
        let imageSubType = items[i].imageSubType;
        
        subType.push(imageSubType);
    }    

    //inorder to get unique elements in the array.
    let unique = [...new Set(subType)];
       
    //getting uniqueSubtype in selection dropdown.
    let selectionDisplay = unique.map((subtype) => {
        return (`<option>${subtype}</option>`)
    })
    document.getElementById("selection").innerHTML = selectionDisplay;
    itemSelected = updateFilteredItems();
    let itemDisplayMarkup = getMarkup(0); 
    document.getElementById("container").innerHTML = ` <div id="grid" class="row">${itemDisplayMarkup}</div>`;    
}

//to get the html for loading images.
function getMarkup(startIndex) {
    let displayArray=[]
    let display;
    let lastIndex = startIndex + MAX_ITEMS;    
    let loopMax = currentItems.length < lastIndex ? currentItems.length : lastIndex;
    console.log("startIndex:", startIndex, "lastIndex:", lastIndex, "loopMax:", loopMax);

    for (let i = startIndex; i < loopMax; i++) {
        display =  `<div class="mix col-sm-3 page1 page4 margin30">
        <button id="modal" onclick="onImageClicked('${currentItems[i].imageUrl}', '${currentItems[i].imageType}', '${currentItems[i].imageSubType}','${currentItems[i].filename}','${currentItems[i].filepath}','${currentItems[i].imageSize}')">
        <div class="item-img-wrap ">
        <img src="${currentItems[i].imageUrl}" height="250">
        </div> 
        </button>
        </div>`
        displayArray.push(display);
    }     
   
    return displayArray;
}
//to load images in the page.
function loadImageMarkup(startIndex) { 
    let itemDisplayMarkup = getMarkup(startIndex); 
    document.getElementById("container").innerHTML = ` <div id="grid" class="row">${itemDisplayMarkup}</div>`;
}


//to display the model when image is clicked
function onImageClicked(url, imageType, imageSubType, filename, filepath, imageSize) { 
    //todo pass everything as object
    let title = document.getElementById("exampleModalLabel")
    title.innerHTML=`${imageSubType}`
    let img = document.getElementById("img-current");
    img.src = url;
    let fileName=document.getElementById("img-filename");
    let filePath= document.getElementById("img-filepath");
    let imagetype= document.getElementById("img-type");
    let imagesubtype= document.getElementById("img-subtype");
    let imagesize = document.getElementById("img-size");
    fileName.innerHTML = `${filename}`;
    filePath.innerHTML = `${filepath}`;
    imagetype.innerHTML = `${imageType}`;
    imagesubtype.innerHTML = `${imageSubType}`;
    imagesize.innerHTML = `${imageSize}`;
    const options = {};
    var myModal = new bootstrap.Modal(document.getElementById('imagemodal'), options);
    myModal.show();
}
//functionality when previous is clicked.
function onPreviousClicked() { 
    if (currentStartIndex > 0) {
        currentStartIndex--;
        loadImageMarkup(currentStartIndex);
    } 
    
   
}
//functionality when next is clicked.
function onNextClicked() { 
    
    if (currentStartIndex < currentItems.length) {
        currentStartIndex++;
        loadImageMarkup(currentStartIndex);
    }
    
    
}
// To disable previous and next buttons whenever necessary.
function updateButtonState() { 
    if (currentStartIndex <= 0) {
        document.getElementById('btnPrevious').disabled = true;
    }
    
    if (currentStartIndex >= currentItems.length) {
        document.getElementById('btnNext').disabled = true;
    }
}