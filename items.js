let items;
let selectedItem;
let url = './items.json';
let currentItems = [];
let subType = [];
let uniqueSubtypes = [];

function getValue() {
    //getting the currently selected item.
    selectedItem = document.getElementById("selection").value;
    console.log(selectedItem);
    //put the selected items in new array.
    currentItems = items.filter(item => item.imageSubType === selectedItem);
    console.log(currentItems);
}

function changeImages() {
    //getting the currently selected item.And change images accordingly.
    itemSelected = getValue();
    let itemDisplayMarkup = getMarkup();
    
    document.getElementById("container").innerHTML = ` <div id="grid" class="row">${itemDisplayMarkup}</div>`;
    
}
//the below funcion is called when page is loaded.
async function getImage() {
    let response = await fetch(url);
    items = await response.json();
    console.log(items);
    for (i = 0; i < items.length; i++) {
        let imageSubType = items[i].imageSubType;
        subType.push(imageSubType);
        //inorder to get unique elements in the array.
        let unique = [...new Set(subType)];
        uniqueSubtypes = unique
    }
    console.log(uniqueSubtypes);

    //getting uniqueSubtype in selection dropdown.
    let selectionDisplay = uniqueSubtypes.map((subtype) => {
        return (` 
    <option>${subtype}</option>
    `)
    })
    document.getElementById("selection").innerHTML = selectionDisplay;

    //displaying images accordingly 
    itemSelected = getValue();
    let itemDisplayMarkup = getMarkup();
    document.getElementById("container").innerHTML = ` <div id="grid" class="row">${itemDisplayMarkup}</div>`;
    let paginationDisplayMarkup = getPagination();
    document.getElementById("bottom-pagination").innerHTML = `${paginationDisplayMarkup}`
    const list_element = document.getElementById("elementList");
    const pagination_element = document.getElementsByClassName("pagination");
    let currentPage = 1;
    let rows = 1;
    displayList(currentItems, list_element, rows, currentPage);
}
//to display the html contents
function getMarkup() {
    let itemDisplayMarkup = currentItems.map((item) => {
        return (`<div class="mix col-sm-3 page1 page4 margin30">
    <button id="modal" onclick="onImageClicked('${item.imageUrl}', '${item.imageType}', '${item.imageSubType}','${item.filename}','${item.filepath}','${item.imageSize}')">
    <div class="item-img-wrap ">
        <img src="${item.imageUrl}" height="250">
    </div> 
    </button>
    </div>
    `)
    });
    
    return itemDisplayMarkup;
    
}
function displayList( currentItems,wrapper,rows_per_page,page) {

    wrapper.innerHTML = "";
    page--;
    let pageCount = Math.ceil(currentItems.length / rows_per_page);
    let start = rows_per_page * page;
    let end = start * rows_per_page;
    let paginatedItems = currentItems.slice(start, end);
    console.log(paginatedItems);
    for (let i = 0; i < paginatedItems.length; i++){
       
        let item = paginatedItems[i];
        console.log(item);
        let item_element = document.createElement("div");
    }
}
function getPagination() {
    
    
    let paginationMarkup = 
    ( `
              <div class="col-sm-6">
                  <ul class="pagination">
                      <li>
                          <a href="#" aria-label="Previous">
                              <span aria-hidden="true">«</span>
                          </a>
                      </li>
                      <li id="elementList" class="active"><a href="#">1</a></li>
                      <li><a href="#">2</a></li>
                      <li><a href="#">3</a></li>
                      
                      <li>
                          <a href="#" aria-label="Next">
                              <span aria-hidden="true">»</span>
                          </a>
                      </li>
                  </ul>
              </div>
              <div class="col-sm-6 text-right">
                  <em>Displaying 1 to 7 (of 50 posts)</em>
                 
              </div>
              
         `)
         return paginationMarkup;
    }
    

//to display the model when image is clicked
function onImageClicked(url,imageType, imageSubType,filename,filepath, imageSize) { 
    console.log(url);
    console.log(imageType);
    console.log(imageSubType);
    console.log(imageSize);
    let title = document.getElementById("exampleModalLabel")
    title.innerHTML=`${imageSubType}`
    let img = document.getElementById("img-current");
    img.src = url;
    let fileName=document.getElementById("img-filename");
    let filePath= document.getElementById("img-filepath");
    let imagetype= document.getElementById("img-type");
    let imagesubtype= document.getElementById("img-subtype");
    //let imageDimension=document.getElementById("img-dimensions");
    let imagesize = document.getElementById("img-size");
    fileName.innerHTML = `${filename}`;
    filePath.innerHTML = `${filepath}`;
    imagetype.innerHTML = `${imageType}`;
    imagesubtype.innerHTML = `${imageSubType}`;
    //imageDimension.innerHTML = `${imagedimension}`;
    imagesize.innerHTML = `${imageSize}`;
    const options = {};
    var myModal = new bootstrap.Modal(document.getElementById('imagemodal'), options);
    myModal.show();
}