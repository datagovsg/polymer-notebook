onmessage = function(e) {
  run(e.data);
}

function run(msg){
  var res;
  console.log(msg)
  try{
    var code = msg.code.replace(/\bvar\b/gmi,'this.');
    res = eval(code);
    res = res ? JSON.stringify(res):'';

  }catch(err){
    console.log(err);
    res = err.toString();
  }finally{
    postMessage({id:msg.id, res:res});

  }
}
