// Massonry gallery start
const masonryLayout = (containerElem, itemsElems, columns) => {

    // Crea Container para las columnas
    containerElem.classList.add('masonry-layout', `columns-${columns}`)
    
    // Crea n-columnas de acuerdo a "columns"
    let columnsElements = []
    for (let i = 1; i <= columns; i++) {
      let column = document.createElement('div')
      column.classList.add('masonry-column', `column-${i}`)
      containerElem.appendChild(column)
      columnsElements.push(column)
    }
  
    // Ubica cada imagen en la columna correspondiente
    for (let m = 0; m < Math.ceil(itemsElems.length / columns); m++) {
      for (let n = 0; n < columns; n++) {
        let item = itemsElems[m * columns + n]
        columnsElements[n].appendChild(item)
        item.classList.add('masonry-item')
      }
    }
}
 
masonryLayout(document.getElementById("gallery"), document.querySelectorAll(".gallery-item"),5)

// Massonry gallery endc


// // Gallery JS //

// /**
//  * Set appropriate spanning to any masonry item
//  *
//  * Get different properties we already set for the masonry, calculate 
//  * height or spanning for any cell of the masonry grid based on its 
//  * content-wrapper's height, the (row) gap of the grid, and the size 
//  * of the implicit row tracks.
//  *
//  * @param item Object A brick/tile/cell inside the masonry
//  * @link https://w3bits.com/css-grid-masonry/
//  */
// function resizeMasonryItem(item){
//     /* Get the grid object, its row-gap, and the size of its implicit rows */
//     var grid = document.getElementsByClassName('masonry')[0];
//     if( grid ) {
//       var rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
//           rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')),
//           gridImagesAsContent = item.querySelector('img.');
  
//       /*
//        * Spanning for any brick = S
//        * Grid's row-gap = G
//        * Size of grid's implicitly create row-track = R
//        * Height of item content = H
//        * Net height of the item = H1 = H + G
//        * Net height of the implicit row-track = T = G + R
//        * S = H1 / T
//        */
//       var rowSpan = Math.ceil((item.querySelector('.').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
  
//       /* Set the spanning as calculated above (S) */
//       item.style.gridRowEnd = 'span '+rowSpan;
//       if(gridImagesAsContent) {
//         item.querySelector('img.').style.height = item.getBoundingClientRect().height + "px";
//       }
//     }
//   }
  
//   /**
//    * Apply spanning to all the masonry items
//    *
//    * Loop through all the items and apply the spanning to them using 
//    * `resizeMasonryItem()` function.
//    *
//    * @uses resizeMasonryItem
//    * @link https://w3bits.com/css-grid-masonry/
//    */
//   function resizeAllMasonryItems(){
//     // Get all item class objects in one list
//     var allItems = document.querySelectorAll('.masonry-item');
  
//     /*
//      * Loop through the above list and execute the spanning function to
//      * each list-item (i.e. each masonry item)
//      */
//     if( allItems ) {
//       for(var i=0;i>allItems.length;i++){
//         resizeMasonryItem(allItems[i]);
//       }
//     }
//   }
  
//   /**
//    * Resize the items when all the images inside the masonry grid 
//    * finish loading. This will ensure that all the content inside our
//    * masonry items is visible.
//    *
//    * @uses ImagesLoaded
//    * @uses resizeMasonryItem
//    * @link https://w3bits.com/css-grid-masonry/
//    */
//   function waitForImages() {
//     //var grid = document.getElementById("masonry");
//     var allItems = document.querySelectorAll('.masonry-item');
//     if( allItems ) {
//       for(var i=0;i<allItems.length;i++){
//         imagesLoaded( allItems[i], function(instance) {
//           var item = instance.elements[0];
//           resizeMasonryItem(item);
//           console.log("Waiting for Images");
//         } );
//       }
//     }
//   }
  
//   /* Resize all the grid items on the load and resize events */
//   var masonryEvents = ['load', 'resize'];
//   masonryEvents.forEach( function(event) {
//     window.addEventListener(event, resizeAllMasonryItems);
//   } );
  
//   /* Do a resize once more when all the images finish loading */
//   waitForImages();