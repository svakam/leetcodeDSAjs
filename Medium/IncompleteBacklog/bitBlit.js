/*
Bit Blit is a classic low level graphics interview question that may date back to the 1980s. Yes, last century. You are unlikely to encounter this in an interview for most jobs today, but it still makes a great practice problem for dealing with multi-dimensional arrays and being strategic about iteration directions.

Traditionally this problem is about [raster images](https://www.adobe.com/creativecloud/file-types/image/raster.html) but we'll make this about ASCII art. Given a large picture (represented by characters in a 2D matrix), we want to copy a subregion from a source location to a destination location within that large picture. 

The function is given a rectangular 2D matrix of single characters, source and destination points, and a size, copy the characters from the source region to the destination. The trick is to do this in-place, modifying the original array without allocating any new memory.

Each of the source and destination points are (x, y) coordinates into the matrix. The size is also two dimensional, consisting of a height and width.

For example:

********************************
*                              *
*   S--7---                    *
*   3     |                    *
*   _______                    *
*                              *
*                              *
*               D              *
*                              *
*                              *
*                              *
********************************

The top left corners of the source and destination regions are indicated by S and D respectively. The size is 7 wide by 3 high.
 

EXAMPLE(S)
function getBuffer() {
  return [
    ["*", "*", "|", "|"],
    ["*", "*", "|", "|"],
    ["-", "-", "/", "/"],
    ["-", "-", "/", "/"]
  ];
}
console.log("Original Matrix")
console.log(getBuffer());

console.log("Basic example");
let buffer = getBuffer();
bitblit(buffer, 0, 0, 2, 2, 2, 2);
console.log(buffer);

The buffer after the bit blit is:
[
  [ '*', '*', '|', '|' ],
  [ '*', '*', '|', '|' ],
  [ '-', '-', '*', '*' ],
  [ '-', '-', '*', '*' ]
]

Notice the block of stars that was originally in the upper left has been copied to the lower right.

As another example, let's do the same thing but start the source block at (1, 1). Now the output is:
[
  [ '*', '*', '|', '|' ],
  [ '*', '*', '|', '|' ],
  [ '-', '-', '*', '|' ],
  [ '-', '-', '-', '/' ]
]

Notice that in overwriting the upper left corner of the destination, we still correctly copied the original character, the '/' to the new location.
 
[
  [ '1', '2', '3', '4' ],
  [ '5', '6', '7', '8' ],
  [ '9', '10', '11', '12' ],
  [ '13', '14', '15', '16' ]
]

source: 1,1, dims: 2x2
dest: 2,2

result:
[
  [ '1', '2', '3', '4' ],
  [ '5', '6', '7', '8' ],
  [ '9', '10', '6', '7' ],
  [ '13', '14', '10', '11' ]
]

NOT
[
  [ '1', '2', '3', '4' ],
  [ '5', '6', '7', '8' ],
  [ '9', '10', '6', '7' ],
  [ '13', '14', '10', '6' ]
]


[
  [ '1', '2', '3', '4' ],
  [ '5', '6', '7', '8' ],
  [ '9', '10', '11', '12' ],
  [ '13', '14', '15', '16' ]
]

[
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,16] -> S = @6, len = 2, wid = 2, D = @3
]



[1,2,3,4],
[5,6,7,8],
[9,10,1,2],
[13,14,5,6]

so we'll need to copy the source region into its own subarray 
copy the values from the subarray to destination


[
  
]

x and width = row
y and height = col

FUNCTION SIGNATURE
function bitblit(buffer, srcx, srcy, destx, desty, width, height)
'''

if(srcx < 0 || srcy < 0 || destx < 0 || desty < 0 || 
  ){
  return; 
}

for i in range 0 to width
  for j in range 0 to height
    buffer[destx + i][desty + j] = buffer[srcx + i][srcy + j]
*/

/*
source: 1,1   dest: 2,2       size: 2x2
starting point: destx+width,desty+height
order: bottom to top, right to left

---------------
[1,2,3,4],
[5,6,7,8],
[6,7,11,12],
[10,11,15,16]

source: 1,1   dest: 0,0       size: 2x2
starting point: destx,desty
order: top to bottom, left to right

// determine starting point of copying
if desty - srcy > 0
  copy starty = srcy
  endy = srcy+height
  directiony = 1
else
  copy starty = srcy + height
  endy = srcy
  directiony = -1
if destx - srcx > 0
  copy startx = srcx
  endx = srcx+width
  directionx = 1
else
  copy startx = srcx + width
  endx = srcx
  directionx = -1

for i in range startX to endX
  for j in range startY to endY
    buffer[startX + (directionx * i)][startY + (directiony * j)] = buffer[srcx + directionx][srcy + directiony]

source: 1,1   dest: 0,2       size: 2x2


source: 1,1   dest: 3,0       size: 2x2

*/

function bitblit(buffer, srcx, srcy, dstx, dsty, width, height) {
    const dx = dstx >= srcx && srcx + width > dstx ? -1 : 1;
    const xstart = dx === 1 ? 0 : width - 1;
    const xend = dx === 1 ?  width : -1;
   
    const dy = dsty >= srcy && srcy + height > dsty ? -1 : 1;
    const ystart = dy === 1 ? 0 : height - 1;
    const yend = dy === 1 ? height : -1;
  
    for (let x = xstart; x != xend; x += dx) {
      for (let y = ystart; y != yend; y += dy) {
        buffer[dstx + x][dsty + y] = buffer[srcx + x][srcy + y];
      }
    }
  }