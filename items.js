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
    let itemDisplay = currentItems.map((item)=>{return(`<div class="mix col-sm-3 page1 page4 margin30">
    <div class="item-img-wrap ">
        <img src="${item.imageUrl}" height="250" class="img-responsive" alt="workimg">
        <div class="item-img-overlay">
            <a title="Dogs" href="${item.imageUrl}" class="show-image">
                <span class="close">&times;></span>
                <p>Some text in the Modal..</p>
            </a>
        </div>
    </div> 
</div>`)});
    document.getElementById("container").innerHTML = ` <div id="grid" class="row">${itemDisplay}</div>`;
    
}

async function getImage() {
    let response = await fetch(url);
    items = await response.json();
    console.log(items);
    for (i = 0; i < items.length; i++){
        let imageSubType = items[i].imageSubType;
        subType.push(imageSubType);
        //inorder to get unique elements in the array.
        let unique = [...new Set(subType)];
            uniqueSubtypes = unique
        }
        console.log(uniqueSubtypes);


    //getting uniqueSubtype in selection dropdown.
    let selectionDisplay = uniqueSubtypes.map((subtype)=>{return(` 
    <option>${subtype}</option>
    `)})
    document.getElementById("selection").innerHTML = selectionDisplay;
    
   
   
    


    //displaying images accordingly 
     itemSelected = getValue();
    let itemDisplay = currentItems.map((item)=>{return(`<div class="mix col-sm-3 page1 page4 margin30">
    <div class="item-img-wrap ">
        <img src="${item.imageUrl}" height="250" class="img-responsive" alt="workimg">
        <div class="item-img-overlay">
            <a title="Dogs" href="${item.imageUrl}" class="show-image">
                <span class="close">&times;></span>
                <p>Some text in the Modal..</p>
            </a>
        </div>
    </div> 
</div>`)});
    document.getElementById("container").innerHTML = ` <div id="grid" class="row">${itemDisplay}</div>`;
         
}

