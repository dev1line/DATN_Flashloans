export const convertArrToObject = (data = [], keyName = "name") => {
  const object = {};
  data?.forEach((item) => {
    // const key = item[keyName];
    // delete item[keyName];
    object[item[keyName]] = item;
  });

  return object;
};

export const convertArrToObjectBySpecialName  = (data = [], keyName ="name") => {
  const object = {};
  //parse key name to basic name 
  data.forEach((item) => {
      let basicName = item.name.split('_')
      object[basicName[basicName.length -1]] = item
  });
  return object
}

export function getData(data={}, key='', property='name'){

  const isArray = (obj) => Object.prototype.toString.call(obj) == '[object Array]'
  const isObject = (obj) => Object.prototype.toString.call(obj) == '[object Object]'

  if(typeof property != 'string' || !(key instanceof RegExp) || !isArray(data) && !isObject(data))
    return []

  var round = {
    searchArray: [data,],
    next: {
      searchArray: []
    }
  }
  const searchArray = (array, round) => {
    const result = []
    array.forEach(e => {
      if(typeof e[property] == 'string' && key.test(e[property]))
        result.push(e)
      else
        Object.values(e).forEach(obj=>{
          if(isObject(obj) || isArray(obj))
            round.next.searchArray.push(obj)
        })
    })
    if(result.length==0)
      return false
    return result.sort((a,b) => a.name<b.name? -1 : 1)
  }

  const search = (round) => {
    if( round.searchArray.length === 0 )
      return []
    for( const obj of round.searchArray ){
      if(isArray(obj)){
        const result = searchArray(obj, round)
        if(result)
          return result
      }else if( isObject(obj)){
        if(typeof obj[property] == 'string' && key.test(obj[property]))
          return [obj]
        for( const subObj of Object.values(obj) ){
          if(isObject(subObj) || isArray(subObj))
            round.next.searchArray.push(subObj)
        }
      }
    }

    if(round.next.searchArray.length==0)
      return []
    
    round.searchArray = []
    round.next.next = round
    return search(round.next)
  }
  
  return search(round)
}