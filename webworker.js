importScripts('./bower_components/d3/d3.min.js');
importScripts('./bower_components/lodash/lodash.min.js');

var ctx = Object.create(null);

onmessage = function(e) {
  run(e.data);
}

function run(msg){
  var res;
  try{
    var code = msg.code.replace(/\bvar\b/gmi,'ctx.');
    res = eval(genReply(msg.id)+code);
    res = res?JSON.stringify(res):res;
  }catch(err){
    console.log(err);
    res = err.toString();
  }finally{
    postMessage({id:msg.id, res:res});

  }
}

function genReply(id){
  return 'var print=function(res){postMessage({id:'+id+', res:JSON.stringify(res)});};';
}
