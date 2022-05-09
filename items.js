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

}

function getMarkup() {
    let itemDisplayMarkup = currentItems.map((item) => {
        return (`<div class="mix col-sm-3 page1 page4 margin30">
    <button id="modal" onclick="onImageClicked('${item.imageUrl}', '${item.imageType}', '${item.imageSubType}')">
    <div class="item-img-wrap ">
        <img src="${item.imageUrl}" height="250">
    </div> 
    </button>
    </div>`)
    });

    return itemDisplayMarkup;
}

function onImageClicked(url,imageType, imageSubType, imageSize) { 
    console.log(url);
    console.log(imageType);
    console.log(imageSubType);
    let img = document.getElementById("img-current");
    img.src = url;

    const options = {};
    var myModal = new bootstrap.Modal(document.getElementById('imagemodal'), options);
    myModal.show();
}