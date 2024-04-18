var map = L.map('map');//L is the imported library
//initilising map and specifing it should appear in the element with id ='map'
map.setView([10.1632, 76.6413], 10);//latitude,longitude & zoom
//initially the view is set to the given coodinates


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {//The TileLayer component draws the map tiles
//we’ll add a tile layer to add to our map, in this case it’s a OpenStreetMap tile layer
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


navigator.geolocation.watchPosition(success,error);//watchPosition --> keeps watching users current location

let marker,circle,zoomed;//declare outside this function so that there won't be more then one location of same user.
function success(userpos)
{
    let lat=userpos.coords.latitude;
    let lng=userpos.coords.longitude;
    let acc=userpos.coords.accuracy;//the nominal precision of a longitude measurement at a given latitude is just determined by moving the decimal point.
    if(marker)
    {
        //removing the previous markers and circles
        map.removeLayer(marker);
        map.removeLayer(circle);
    }
    marker=L.marker([lat,lng]).addTo(map);
    circle=L.circle([lat,lng],{radius:acc}).addTo(map);

    if(!zoomed)//every time we change latitude slightly the view jumps to the circle again to prevent this we only set the view of the map to palace of circle only once
    {
        zoomed=map.fitBounds(circle.getBounds());//this will set the view of map to the place where circle is
    }
    map.setView([lat,lng]);//inorder for the view to fallow the pointer whenever it is changed
}

function error(err)
{
    if(err.code==1)
    {
        alert("please allow location access")
    }
    else
    {
        alert("unable to access youur location")
    }
}
