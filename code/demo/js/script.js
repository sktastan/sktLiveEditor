var el = document.getElementById("IDp");

el.addEventListener('mouseover', function(){
    console.log('mouseover event!');
});

el.onmouseleave = function(){
    console.log('mouseleave event!'); 
}

el.onclick = function(){ alert('mouseclick event!'); }