var exports = exports || {};

(function(app){
  app.createVector = function(x,y) {
  var X = x;  //private 
  var Y = y;  //private
  
  //this code returns a point
  var vector = function(obj){
    var newVec   = {
      x: obj.x + X,
      y: obj.y + Y
    };
    return newVec;
  };
  
  //gives us the length of the vector
  vector.len = function() {
    return Math.sqrt(X*X + Y*Y);
  };
   
  //return X
  vector.getX = function() {
    return X;
  };
  
  //return Y
  vector.getY = function() {
    return Y;
  };
  
  //return a vector that is the sum of the two vectors
  vector.add = function(vector) {
    return createVector(vector.getX() + X, vector.getY() + Y);
  };
  
  //return a vector that is the result of this vector subtract the other
  vector.sub = function(vector) {
    return createVector(X - vector.getX(), Y - vector.getY());
  };
  
  return vector; //return the closure
};

  app.createLibrary = function() {
    function createLibrary() {
  var __books = [];
  var __videos = [];
  var __music = [];

  //basic item class; takes in the private item attribute and obj
  function item(__attributes, obj) {
    var index = Object.keys(obj).sort();

    for (var i = 0; i < index.length; i++) {
      __attributes[index[i]] = obj[index[i]];
    }

    if (__attributes.title === undefined) {
      __attributes.title = "unknown";
    }

    //set properites; takes in an obj
    this.set = function(obj) {
      var prop = Object.keys(obj).sort();
      for (var i = 0; i < prop.length; i++) {
        __attributes[prop[i]] = obj[prop[i]];
      }
    };

    //get individual attributes; returns undefined if there are none
    this.get = function(attribute) {
      return __attributes[attribute];
    };

    //returns a list of property names
    this.properties = function() {
      return Object.keys(__attributes);
    };
  }

  //function that helps compares arrays
  function compareArray(arr1, arr2) {
    if (!arr1 || !arr2 || arr1.length !== arr2.length) {
      return false;
    }
    arr1 = arr1.sort();
    arr2 = arr2.sort(); //sort so we can do element by element comparison
    for (var i = 0, l = arr1.length; i < l; i++) {
      // Check if we have nested arrays
      if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
        // recurse into the nested arrays
        if (!compareArray(arr1[i], arr2[i]))
          return false;
      } else if (arr1[i] != arr2[i]) {
        //Warning - does not handle for two different object instances
        return false;
      }
    }
    return true;
  }

  //function that returns an item object
  function createItem(obj) {
    var __attributes = []; //private variable of item's attributes

    var add = new item(__attributes, obj);

    return add; //return item with closure
  }

  //needs title and author
  function createBook(obj) {
    var item = createItem(obj);
    if (item.get("author") === undefined) {
      item.set({
        author: "unknown"
      });
    }
    return item;
  }

  //needs title and artist
  function createMusic(obj) {
    var item = createItem(obj);
    if (item.get("artist") === undefined) {
      item.set({
        artist: "unknown"
      });
    }
    return item;
  }

  //needs title and director
  function createVideo(obj) {
    var item = createItem(obj);
    if (item.get("director") === undefined) {
      item.set({
        director: "unknown"
      });
    }
    return item;
  }

  //private function to compare objects; assume that we are merging objects from the start
  function compareAll(arr, obj) {
    var objIndex = Object.keys(obj); //keys to the obj's properties
    var index = Object.keys(arr); //get keys to items currently in the array
    for (var i = 0; i < index.length; i++) {
      var currObj = arr[index[i]]; //get current object;
      for (var j = 0; j < objIndex.length; j++) {
        //comparing, bearing in mind arrays are a possible value 
        if (currObj.get(objIndex[j]) !== undefined) {
          if (currObj.get(objIndex[j]) instanceof Array && obj[objIndex[j]] instanceof Array) {
            if (!compareArray(currObj.get(objIndex[j]), obj[objIndex[j]])) {
              break;
            }
          } else {
            if (currObj.get(objIndex[j]) != obj[objIndex[j]]) {
              break;
            }
          }
        }
        if (j === objIndex.length - 1) {
          return true; //return true if there is an Object that does not clash
        }
      }
    }
    return false;
  }

  //This function is used to check whether the item is already in the library;
  //checks whether the relevant array already contains the item
  function contains(arr, obj) {
    if (obj.type === "book") {
      return compareAll(__books, obj);
    }
    if (obj.type === "music") {
      return compareAll(__music, obj);
    }
    if (obj.type === "video") {
      return compareAll(__videos, obj);
    }
  }

  //This function is used for adding things;
  //check if item exists in library; takes a list of arrays to search and object to look for
  //need to check if this works for multiple arrays
  function addFind(arr, obj) {
    var objIndex = Object.keys(obj); //get all the properties of obj
    //check through the different arrays
    for (var i = 0; i < arr.length; i++) {
      var collection = arr[i]; //the current array we are searching
      var currIndex = Object.keys(collection); //index for the current array
      //check through the individual array
      for (var j = 0; j < currIndex.length; j++) {
        var currObj = collection[currIndex[j]];
        //compare the different attributes
        for (var k = 0; k < objIndex.length; k++) {
          if (currObj[objIndex[k]] !== undefined && currObj[objIndex[k]] !== obj[objIndex[k]]) {
            break; //move on to the next item in collection if something clashes
          }
          if (k === objIndex.length - 1) {
            return currObj; //return object if it does have conflicting properties; there should only be one since we are constantly merging
          }
        }
      }
    }
  }

  //Following two are used to find and remove object; first one is for specific items, second if for the general object
  //find specific for item object types; needs to match exactly
  function itemFind(arr, obj, remove) {
    var objIndex = obj.properties();
    var currIndex = Object.keys(arr); //array index
    for (var i = 0; i < currIndex.length; i++) {
      var currCom = arr[currIndex[i]];
      for (var j = 0; j < objIndex.length; j++) {
        if (obj.get(objIndex[j]) instanceof Array && currCom.get(objIndex[j]) instanceof Array) {
          if (!compareArray(obj.get(objIndex[j]), currCom.get(objIndex[j]))) {
            break;
          }
        } else {
          if (obj.get(objIndex[j]) !== currCom.get(objIndex[j])) {
            break;
          }
        }
        if (j == objIndex.length - 1) {
          if (remove) {
            arr = arr.splice(i, 1);
          }
          return currCom;
        }
      }
    }
  }

  //find for general objects
  function randFind(arr, obj, remove) {
    var toDelete = [];
    var objIndex = Object.keys(obj); //get all the properties of obj
    for (var i = 0; i < arr.length; i++) {
      var collection = arr[i]; //the current array we are searching
      var currIndex = Object.keys(collection); //index for the current array
      for (var j = 0; j < currIndex.length; j++) {
        var currObj = collection[currIndex[j]];
        for (var k = 0; k < objIndex.length; k++) {
          if (currObj.get(objIndex[k]) === undefined) {
             break;
          } else if (currObj.get(objIndex[k]) instanceof Array) { //find something within the list/array
            if (currObj.get(objIndex[k]).indexOf(obj[objIndex[k]]) < 0) {
              break;
            }

          } else {
            if (currObj.get(objIndex[k]) !== obj[objIndex[k]]) {
              break;
            }
          }
          if (k === objIndex.length - 1) {
            if (remove) {
              collection = collection.splice(j, 1);
              j--;
            }
            toDelete.push(currObj); //return objects that have no conflicts 
          }
        }
      }
    }
    return toDelete; //return all objects with no conflicts
  }

  //merge the items; we use the set function for the old item because we know that no properties in the new item clash with it
  function merge(old, update) {
    old.set(update);
  }

  //function to add an item object; called by the library object
  function addItem(obj) {
    if (obj.type === "book") {
      if (contains(__books, obj)) {
        var book = addFind([__books], obj); //find the object
        merge(book, obj); //merge item
      } else {
        __books.push(createBook(obj)); //insert a new item
      }
    } else if (obj.type === "music") {
      if (contains(__music, obj)) {
        var song = addFind([__music], obj); //find the object
        merge(song, obj); //merge item
      } else {
        __music.push(createMusic(obj)); //insert a new item
      }
    } else {
      if (contains(__videos, obj)) {
        var video = addFind([__videos], obj); //find the object
        merge(video, obj); //merge item
      } else {
        __videos.push(createVideo(obj)); //insert a new item
      }
    }
  }

  //function that find/removes item objects; accepts an obj with properties and a boolean to decide whether to remove or not to
  //searches through all the three different collections
  function edit(obj, remove) {
    var toDelete;
    //check if it is a specific item that is given
    if (obj instanceof item) {
      //find the specific item and remove it
      var type = obj.get("type");
      if (type === "book") {
        toDelete = itemFind(__books, obj, remove);
      } else if (type === "music") {
        toDelete = itemFind(__music, obj, remove);
      } else {
        toDelete = itemFind(__videos, obj, remove);
      }
    } else {
      //check all the arrays for similar items
      toDelete = randFind([__books, __music, __videos], obj, remove);
    }
    return toDelete;
  }

  var library = []; //general object

  //add method; calls upon the createItem method
  library.add = function(obj) {
    if (!obj.hasOwnProperty('type') || obj.type !== 'book' && obj.type !== 'music' && obj.type !== 'video') {
      throw new TypeError("Item needs to be of type book, music or video!"); //type checking
    } else {
      addItem(obj);
    }
  };

  library.remove = function(obj) {
    return edit(obj, true);
  };

  library.find = function(obj) {
    return edit(obj, false);
  };

  return library;
}
  }

})(exports);