
if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, "fill", {
        enumerable: false,
        value: function(value) {

            // Steps 1-2.
            if (this == null) {
              throw new TypeError('this is null or not defined');
            }

            var O = Object(this);

            // Steps 3-5.
            var len = O.length >>> 0;

            // Steps 6-7.
            var start = arguments[1];
            var relativeStart = start >> 0;

            // Step 8.
            var k = relativeStart < 0 ?
              Math.max(len + relativeStart, 0) :
              Math.min(relativeStart, len);

            // Steps 9-10.
            var end = arguments[2];
            var relativeEnd = end === undefined ?
              len : end >> 0;

            // Step 11.
            var final = relativeEnd < 0 ?
              Math.max(len + relativeEnd, 0) :
              Math.min(relativeEnd, len);

            // Step 12.
            while (k < final) {
              O[k] = value;
              k++;
            }

            // Step 13.
            return O;
        }
    });
}
if (!Array.prototype.copy) {
    Object.defineProperty(Array.prototype, "copy", {
        enumerable: false,
        value:function(){
            if (this == null) {
              throw new TypeError('this is null or not defined');
            }
            var O =new Object(this);
            return O.slice();
            // print([1,2,3].copy())
        }
    });
}
if (!Array.prototype.flatten) {
    Object.defineProperty(Array.prototype, "flatten", {
        enumerable: false,
        value:function(){
            if (this == null) {
              throw new TypeError('this is null or not defined');
            }
            var O =new Object(this);
            return O.reduce(function(a, b) {
              return a.concat(b);
            }, []);
        }
    });
}

if (!Object.prototype.k) {
    Object.defineProperty(Object.prototype, "k", {
        enumerable: false,
        value:function(){
            if (this == null) {
              throw new TypeError('this is null or not defined');
            }
            var O =new Object(this);
            return Object.keys(O);
        }
    });
}

var inf = Infinity;
var min = Math.min;

function range(shape){
    return Array.prototype.concat([0],Object.keys(new Int8Array(shape)).map(Number).slice(1));
    // print(typeof range(5)[0])
}
function len(a){
    return (a.constructor && a.constructor.name=="Array") ? a.length : -1;
}

function zeros(shape){
    if(shape.length==0) return [];
    if(shape.length==1) shape=shape[0];
    var a=new Array(),i=0;
    if(typeof(shape)=='number' ){
        a=new Array(shape).fill(0);
        return a;
    }else {
        for(var j=0;j<shape[0];j++){
            a[j]=zeros(shape.slice(1));
        }
        return a;
    }
    return -1;
}

function array(shape){
    if(typeof shape=='number'){
        return new Array(shape||0)
    }else{
        var matrix = [];
        for(var i=0; i<shape[0]; i++) {
            matrix[i] = new Array(shape[1]);
        }
        return matrix;
    }
}

function print(){
    for (i = 0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
}

function format(formatString, replacementArray) {
    return formatString.replace(
        /\{(\d+)\}/g, // Matches placeholders, e.g. '{1}'
        function formatStringReplacer(match, placeholderIndex) {
            // Convert String to Number
            placeholderIndex = Number(placeholderIndex);
            // Make sure that index is within array bounds
            if (
                placeholderIndex < 0 ||
                    placeholderIndex > replacementArray.length - 1
            ) {
                return placeholderIndex;
            }
            // Replace placeholder with value from replacement array
            return replacementArray[placeholderIndex];
        }
    );
    // print(zeros([10,2]))
}

function levenshtein(a, b){
  if(a.length == 0) return b.length; 
  if(b.length == 0) return a.length; 

  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};



/**
* FUNCTION: argmin( arr )
*   Computes the minimum value of a numeric array and returns the corresponding array indices.
*
* @param {Array} arr - array of values
* @returns {Array} array indices
*/
function argmin( arr ) {
    if ( !Array.isArray( arr ) ) {
        throw new TypeError( 'argmin()::invalid input argument. Must provide an array.' );
    }
    var len = arr.length,
        min = arr[ 0 ],
        idx = [ 0 ],
        val;

    for ( var i = 1; i < len; i++ ) {
        val = arr[ i ];
        if ( val < min ) {
            min = val;
            idx.length = 0;
            idx.push( i );
        }
        else if ( val === min ) {
            idx.push( i );
        }
    }
    return idx;  
} 
function argmax( arr ) {
    if ( !Array.isArray( arr ) ) {
        throw new TypeError( 'argmin()::invalid input argument. Must provide an array.' );
    }
    var len = arr.length,
        min = arr[ 0 ],
        idx = [ 0 ],
        val;

    for ( var i = 1; i < len; i++ ) {
        val = arr[ i ];
        if ( val > min ) {
            min = val;
            idx.length = 0;
            idx.push( i );
        }
        else if ( val === min ) {
            idx.push( i );
        }
    }
    return idx;  
} 

var sum = function(a){
    return a.flatten().reduce(function(a, b) {
        return a + b;
    }) || 0;
}

function d2(a, b) {
  var sum = 0
  var n
  for (n = 0; n < a.length; n++) {
    sum += Math.pow(a[n] - b[n], 2)
  }
  return sum
}

function euclidean_pdist(a,b){
    return Math.sqrt(Math.pow(a - b, 2));
}

function euclidean_norm(a,b){
    return Math.sqrt(Math.pow(a - b, 2))*(1/((a + b)/2));
}


function euclidean_norm(a,b){
    return Math.sqrt(Math.pow(a - b, 2))*(1/((a + b)/2));
}


function euclidean_distance(a, b) {
    return Math.sqrt(d2(a,b))
    // print("euclidean_distance "+euclidean_pdist(19, 1))
}



 function dtw(x, y, dist){

    // Computes Dynamic Time Warping (DTW) of two sequences.
    // :param array x: N1*M array
    // :param array y: N2*M array
    // :param func dist: distance used as cost measure
    // Returns the minimum distance, the cost matrix, the accumulated cost matrix, and the wrap path.

    var c = len(x);
    var r = len(y);

    if(c==0 || r==0) return -1;

    
    var D0   = zeros([c + 1, r + 1]);

    D0[0]    = D0[0].fill(inf);
    D0[0][0] = 0

    for(var i=1; i < D0.length;) D0[i++][0]=inf;

    var D1 = [];

    // EXAMPLE 1
    // [[ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
    //  [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
    //  [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
    //  [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
    //  [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
    //  [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
    //  [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
    //  [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
    //  [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]
    //  [ 0.  0.  0.  0.  0.  0.  0.  0.  0.  0.]]
    // EXAMPLE 3
    // [[ 0.  0.  0.]
    //  [ 0.  0.  0.]
    //  [ 0.  0.  0.]
    //  [ 0.  0.  0.]
    //  [ 0.  0.  0.]
    //  [ 0.  0.  0.]
    //  [ 0.  0.  0.]
    //  [ 0.  0.  0.]]

    for(var row=1; row < c;row++){
        D1[row]=[]
        for(var col=1; col<r;col++){
            D1[row].push(D0[row][col]);
        }
    }


    // EXAMPLE 1
    // [[ 1.  1.  1.  2.  2.  2.  2.  3.  2.  0.]
    //  [ 1.  1.  1.  2.  2.  2.  2.  3.  2.  0.]
    //  [ 0.  0.  0.  1.  1.  1.  1.  2.  1.  1.]
    //  [ 0.  0.  0.  1.  1.  1.  1.  2.  1.  1.]
    //  [ 1.  1.  1.  0.  0.  0.  0.  1.  0.  2.]
    //  [ 3.  3.  3.  2.  2.  2.  2.  1.  2.  4.]
    //  [ 1.  1.  1.  0.  0.  0.  0.  1.  0.  2.]
    //  [ 0.  0.  0.  1.  1.  1.  1.  2.  1.  1.]
    //  [ 1.  1.  1.  0.  0.  0.  0.  1.  0.  2.]
    //  [ 1.  1.  1.  2.  2.  2.  2.  3.  2.  0.]]
    // EXAMPLE 3
    // [[ 3.  5.  6.]
    //  [ 3.  3.  6.]
    //  [ 5.  4.  7.]
    //  [ 4.  6.  3.]
    //  [ 8.  8.  8.]
    //  [ 3.  4.  7.]
    //  [ 2.  5.  6.]
    //  [ 5.  5.  6.]]
    x.forEach(function(x_d,i){
        y.forEach(function(y_d,j){
            if(!D1[i])D1[i]=[];
            // print(format("i,j  {2},{3} of {4},{5}  x,y {0},{1} ",[x_d,y_d,i+1,j+1,len(D0),len(D0[0])]))
            d=dist(x_d,y_d)
            D1[i][j] = d
            a=(i+1)
            b=(j+1)
            D0[a][b] = d
        });
    });



    var C = D1.copy()
    // EXAMPLE 1
    // [[  1.   2.   3.   5.   7.   9.  11.  14.  16.  16.]
    //  [  2.   2.   3.   5.   7.   9.  11.  14.  16.  16.]
    //  [  2.   2.   2.   3.   4.   5.   6.   8.   9.  10.]
    //  [  2.   2.   2.   3.   4.   5.   6.   8.   9.  10.]
    //  [  3.   3.   3.   2.   2.   2.   2.   3.   3.   5.]
    //  [  6.   6.   6.   4.   4.   4.   4.   3.   5.   7.]
    //  [  7.   7.   7.   4.   4.   4.   4.   4.   3.   5.]
    //  [  7.   7.   7.   5.   5.   5.   5.   6.   4.   4.]
    //  [  8.   8.   8.   5.   5.   5.   5.   6.   4.   6.]
    //  [  9.   9.   9.   7.   7.   7.   7.   8.   6.   4.]]
    // EXAMPLE 3
    // [[  3.   8.  14.]
    //  [  6.   6.  12.]
    //  [ 11.  10.  13.]
    //  [ 15.  16.  13.]
    //  [ 23.  23.  21.]
    //  [ 26.  27.  28.]
    //  [ 28.  31.  33.]
    //  [ 33.  33.  37.]]
    range(c).forEach(function(x_d,i){
        range(r).forEach(function(y_d,j){

            D1[i][j]         += min(D0[i][j], D0[i][(j+1)], D0[(i+1)][j])
            D0[(i+1)][(j+1)] += min(D0[i][j], D0[i][(j+1)], D0[(i+1)][j])

        });
    });

    // var path;
    // if(len(x)==1){
    //     path = zeros(len(y)), range(len(y))
    // }else if(len(y) == 1){
    //     path = range(len(x)), zeros(len(x))
    // }
    // else{
    //     path = _traceback(D0)
    // }
    var dl=D1.length-1
    // print(D1[dl],1-(D1[dl][D1[dl].length-1]) ,(dl+1+D1[dl].length));
    return [1-(D1[dl][D1[dl].length-1] / (dl+1+D1[dl].length))]//, C, D1, path]
}


function _traceback(D){
    var i =D.length-2;
    var j=D[0].length-2//, j = array([D.length,D[0].length]) - 2
    var p= [i], q = [j]

    while ((i > 0) || (j > 0)){
        tb = argmin([D[i][j], D[i][j+1], D[i+1][j]])[0]

        if((tb == 0)){
            i -= 1
            j -= 1
        } else if((tb == 1)){
            i -= 1
        }
        else{ // (tb == 2):
            j -= 1
        }

        p.push(i)
        q.push(j)
    }
    return [ p.reverse(),q.reverse()]
}



function mapV(obj){
    return Object.keys(obj).map(function ( key ) { return [key,obj[key]] });
}

function pairs(arr){
    return arr.map(function ( obj ) { return mapV(obj) });
}




function Classifier(alg,templates,dist,gap){
    var self=this;
    
    // Need to add option to differentiate between continuous stream data
    // and discrete data. Like FFT shouldn't be sequentially modifying the
    // input stream (it needs to fully clear the template)
    self.is_discrete=false;

    self.algo=alg;
    self.dist=dist;
    self.tmp=templates||[];
    self.stream=[];
    self.labels={}
    self.odds={};
    self.frame_size=350;
    self.gap=gap || 1;
    self.gap_counter=0;


    self.sample = function(el){

        if((self.stream.length)&&(self.stream.length!=0)&&(self.frame_size==self.stream.length)){
            self.stream.shift();

        };
        self.stream.push(el);
        self.gap_counter=self.gap_counter+1;

        if(self.gap_counter==self.gap && (self.frame_size>=self.stream.length)){
            self.odds=new Object({});
            for(var ex=0; ex<self.tmp.length; ex++){
                self.odds[ex]=self.algo(self.tmp[ex], self.stream, self.dist)[0];
            }
            max = argmax(Object.keys(self.odds).map(function ( key ) { return self.odds[key] }));
            console.log("Most Likely: "+max+", "+self.odds[max]);
            self.gap_counter=0;
        }

    }

    self.classify = function(){
        self.best=0;
        // print(self.labels);
        // print(self.labels.k().map(self.run));
        self.odds=self.labels.k().map(function(k,i){return {label:k,p:self.run(k)}; })
        RenderNodes(self.odds,self.best);
        // self.algo(self.tmp[0], self.labels[label], self.dist)[0]
    }


    self.store = function(label){
        label=label+'';
        if(label){

            self.labels[label]=[self.tmp.copy()];
            console.log('STORED SAMPLE',self.tmp,self.labels[label]);
        }
    }
    self.run=function(label){
        // console.log('Testing Live',label,self.labels);
        console.log('TMP',self.tmp,'LABEL: '+label+' dat:',self.labels[label]);
        var v = self.algo(self.tmp.copy(), self.labels[label][0], self.dist)[0];
        if(v>self.best)self.best=v;
        return v;
    }
    self.record = function(label,buffer){
        if(!buffer)return -1;
        // if(!self.labels[label])self.labels[label]=[];
        self.tmp=Array.prototype.slice.call(buffer);

    }
    self.stream_record = function(data){
        if(!data)return -1;
        if(!self.tmp)self.tmp=[];
        if((self.tmp.length)&&(self.tmp.length!=0)&&(self.frame_size<=self.tmp.length)){
            while(self.frame_size<=self.tmp.length){

                self.tmp.shift();
            }
        };
        self.tmp.push(data);

    }

    return this;
}





window.DTWClass=new Classifier(dtw,[],euclidean_norm);
window.cur_lab="1";
function chkey(e,d){
    // console.log('KEY PRESSED, Changing label to ',e);

    if(e.key && /\d/.test(e.key) || /Digit\d/.test(e.code)){
        console.log('KEY PRESSED, Changing label to ',e.key||e.code);
        window.cur_lab=e.key||e.code.replace('Digit','');
        DTWClass.store(window.cur_lab);
        DTWClass.classify();
        RenderNodes(DTWClass.odds,self.best);
    }
    if( (e.key && e.key=="r") || e.code=="KeyR"){
        console.log('RUNNING',window.cur_lab);
        DTWClass.run(window.cur_lab)
    }else if( (e.key && e.key=="s") || e.code=="KeyS"){
        console.log('STORING',window.cur_lab);
        DTWClass.store(window.cur_lab);
        DTWClass.classify();
        RenderNodes(DTWClass.odds,self.best);

    }else if( (e.key && e.key=="c") || e.code=="KeyC"){
        console.log('CLASSIFY');
        DTWClass.classify();
    }
    // console.log('E',e,d);
}

document.body.addEventListener("keyup",chkey)