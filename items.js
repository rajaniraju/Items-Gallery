let items;
let selectedItems;
let url = './items.json';
 
let subType = [];
let uniqueSubtypes = [];

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
  <option id="selected">${subtype}</option>
 `)})
    document.getElementById("selection").innerHTML = selectionDisplay;
    
    
    //getting the currently selected item.


    //displaying images accordingly 
    let itemDisplay = items.map((item)=>{return(`<div class="mix col-sm-3 page1 page4 margin30">
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

function gettingSubtypeInSelection() {
    
}