//a constructor for adding a node to the tree
var Node = function(value, edges){
  nodes[value] = {
    value: value,
    edges: edges
  };
  return nodes[value];
};

//an object containing all the nodes in the tree
var nodes = {};

//a and b are of type Node
//find out if there is a route from a to b
const getRoute = (a,b) => {
  if (a === b) return true;
  if (!a.edges.length || !b.edges.length) return false;
  return (visit(a,b,[]) || visit(b,a,[]));
};

const visit = (A, B, visited) => {
  var edgA = A.edges;
  if (A === B) {visited.push(B); return true;}
  if (visited.includes(A)) {return false;}
  else {visited.push(A);}
  if (!edgA.hasOwnProperty('length')) {return false;}
  return edgA.some(node => {
    return visit(node, B, visited);
  });
};