//Sherif Nada
//CS 312
//Assignment 2
//=============== Part 1 ================\\
function createVector(x, y){
  var _x = x; 
  var _y = y; 
  
  var vector = function(displacementVector){
    return {
          y:_y + displacementVector.y, 
          x: _x + displacementVector.x,
    };
  };
  
  vector.add = function(vector){
    return createVector(_x + vector.getX(), _y + vector.getY());
  };
    
  vector.sub = function(vector){
    return createVector(_x - vector.getX(), _y - vector.getY());
  };

  vector.getX = function(){
    return _x;
  };

  vector.getY = function(){
    return _y;
  };

  vector.len = function(){
    return Math.sqrt(_x*_x + _y*_y);
  };

  return vector;
}

//=============== Part 2 ================\\
function createLibrary(){
    var _items = [];
    
    //=============== Util Methods ================\\
  
    // Takes an item object (generated from createItem)
    // and the properties we wish to find in that item
    // returns true if all keys and their values match
    var containsAllProperties = function(item, properties){
        console.log(item);
        console.log(properties);
        var keys = Object.keys(properties);
        
        //if we ask for the object with empty properties 
        //return null array
        if(Object.keys(properties).length === 0)
            return false;
        
        for(var i = 0; i < keys.length; i++){
           
            // if property doesn't exist in our item, can't be the same
            if (item.properties().indexOf(keys[i]) < 0)
              return false;


            if(item.get(keys[i]) instanceof Array && properties[keys[i]] instanceof Array){
              if( item.get(keys[i]).sort().toString() !== properties[keys[i]].sort().toString())
                return false;
            }
            else if (item.get(keys[i]) instanceof Array){
              if( item.get(keys[i]).indexOf(properties[keys[i]].toString()) === -1)
                return false;
            }
            else if (item.get(keys[i]).toString() !== properties[keys[i]].toString()){
              return false;
            }
        }

        return true;
    };
  
    //Returns true if two items are the same
    //Two items are considered the same if the intersection of 
    //their properties all have the same values
    var isSameItem = function(item1, item2){
      var props1 = item1.properties();
      var props2 = item2.properties();
      var propsIntersection = [];
      for (var i = 0; i < props1.length; i++){
        if ( props2.indexOf(props1[i]) > -1 ){
          propsIntersection.push(props1[i]);
        }
      }
      
      for (var i = 0; i < propsIntersection.length; i++){
        var prop = propsIntersection[i];
        if (item1.get(prop).toString() !== item2.get(prop).toString())
          return false;
      }
      
      return true;
    }; 
  
    //merges two items with non-conflicting properties
    var mergeItems = function(item1, item2){
      var keys = item2.properties();
      for(var i = 0; i < keys.length; i++){
        var newProp = {};
        newProp[keys[i]] = item2.get(keys[i]); 
        item1.set(newProp);
      }
    };
  
    //item object
    var createItem = function(properties){
        var __properties = properties; 

        var properties = function(){ 
            return Object.keys(__properties); 
        };

        var get = function(attribute){ 
            return __properties[attribute]; 
        };

        var set = function(attributes){ 
            var keys = Object.keys(attributes); 
            for (var k = 0; k < keys.length; k++){ 
                __properties[keys[k]] = attributes[keys[k]]; 
            }
        }; 

        return {
          get:get, 
          set:set, 
          properties:properties
        }; 
    }; 

    //=============== Library Methods ================\\
    
    var add = function(item){
        //first check that the type is valid
      
        if(! item){
          throw new TypeError("Invalid item");
        }
      
        if (! (   item["type"] === "book"
               || item["type"] === "music" 
               || item["type"] === "video")
           ){
            throw new TypeError("Invalid item type.");
        }
        
        var newItem = createItem(item);

        //if author or title is not provided, set to unknown
        if (item["type"] === "book" && !("author" in item)){
           newItem.set({author:"unknown"}); 
        } 
        else if (item["type"] === "music" && !("artist" in item)){
            newItem.set({artist:"unknown"});
        }
        else if(item["type"] === "video" && ! ("director" in item)){
            newItem.set({director:"unknown"});
        }

        if(! ("title" in item))
           newItem.set({title:"unknown"}); 

        //check that none of the property values are undefined
        //If it's undefined then change it to "unknown"
        var keys = Object.keys(item);
        for (var i = 0; i < keys.length; i++){
            if (typeof item[keys[i]] === "undefined"){
                var property = {};
                property[keys[i]] = "unknown";
                newItem.set(property);
            }
        }
        
        //if there is a duplicate, merge items without creating a new item
        for (var i = 0; i < _items.length; i++){
          if(isSameItem(_items[i], newItem)){
            mergeItems(_items[i], newItem);
            return;
          }
        }
      
        //add item to items array
        _items.push(newItem);     
    };

    var find = function(properties){
        var out = [];
        
        for (var index = 0; index < _items.length; index++){
            if (containsAllProperties(_items[index], properties))
              out.push(_items[index]);
        }
        return out;
    };
  
  var remove = function(properties){
    var out = [];
    var index = 0; 
    while (index < _items.length){
      
      // if this item should be removed, decrease the index by 1
      // to offset the fact that the array has decreased in size
      if (containsAllProperties(_items[index], properties)){
        out.push(_items[index]);
        _items.splice(index, 1);
        index--;
      }
      index++;
    }
    
    return out;
  };

   return {
     remove:remove,
     add:add,
     find:find
   };
}

var exports = exports || {};

(function(app){
    app.createVector = createVector;
    app.createLibrary = createLibrary;
})(exports);
